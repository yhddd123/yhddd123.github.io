/*
 * SPA-friendly lifecycle wrapper for fish animation
 * - Ensures `RENDERER.init()` runs whenever the container appears
 * - Listens for Quartz SPA events (prenav/nav) and popstate
 * - Uses MutationObserver + fallback polling to detect container
 * - Provides robust cleanup to avoid duplicate RAFs / listeners
 */
(function() {
  // state stored on window so it survives SPA page swaps
  window.__flyingFishState = window.__flyingFishState || {};
  const state = window.__flyingFishState;
  // persisted reverse state across navigations
  window.__fishReverse = window.__fishReverse || false;

  function injectJQueryThen(fn) {
    if (typeof window.jQuery !== 'undefined') return fn();
    if (!document.getElementById('jquery-script')) {
      const jq = document.createElement('script');
      jq.src = 'https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js';
      jq.id = 'jquery-script';
      jq.onload = fn;
      jq.onerror = () => console.error('[fish] jQuery failed to load');
      document.head.appendChild(jq);
    }
  }

  function doRealInit() {
    if (state.initialized) return;

    // require container exists
    const container = document.getElementById('jsi-flying-fish-container');
    if (!container) return; // caller will retry

    // ensure jquery first
    if (typeof window.jQuery === 'undefined') {
      injectJQueryThen(doRealInit);
      return;
    }

    // ensure RENDERER is available (script may be loaded later)
    if (typeof window.RENDERER === 'undefined' || typeof window.RENDERER.init !== 'function') {
      // try again shortly; RENDERER code may appear after this wrapper
      setTimeout(doRealInit, 50);
      return;
    }

    // clean previous state then init
    fullCleanup();

    // restore persisted reverse state if available (from localStorage first, then global)
    try {
      var stored = null;
      try { stored = localStorage.getItem('quartz_fish_reverse'); } catch(e) { stored = null; }
      if (stored === '1') {
        window.__fishReverse = false;  // 取反存储的值
      } else if (stored === '0') {
        window.__fishReverse = true;   // 取反存储的值
      }
      if (window.RENDERER) window.RENDERER.reverse = !!window.__fishReverse;
    } catch (e) {}

    try {
      window.RENDERER.init();
      state.initialized = true;
      // console.log('[fish] RENDERER.init executed (reverse=' + !!window.RENDERER.reverse + ')');
    } catch (e) {
      // console.error('[fish] RENDERER.init failed', e);
    }
  }

  function doRealCleanup() {
    // cancel RAF
    if (window.__rafId) {
      cancelAnimationFrame(window.__rafId);
      window.__rafId = null;
    }

    // try to remove event listeners and canvas created by RENDERER
    try {
      if (window.RENDERER) {
        // remove window listener
        if (window.RENDERER.watchWindowSize) {
          window.removeEventListener('resize', window.RENDERER.watchWindowSize);
        }
        // remove container listeners
        if (window.RENDERER.$container) {
          try { window.RENDERER.$container.removeEventListener('mouseenter', window.RENDERER.startEpicenter); } catch(e){}
          try { window.RENDERER.$container.removeEventListener('mousemove', window.RENDERER.moveEpicenter); } catch(e){}
        }
        // remove canvas event listener if present
        if (window.RENDERER.$canvas && window.RENDERER._onCanvasClick) {
          try { window.RENDERER.$canvas.removeEventListener('click', window.RENDERER._onCanvasClick); } catch(e){}
          window.RENDERER._onCanvasClick = null;
        }
        // remove canvas from DOM (removes any remaining listeners)
        if (window.RENDERER.$canvas && window.RENDERER.$canvas.parentNode) {
          window.RENDERER.$canvas.parentNode.removeChild(window.RENDERER.$canvas);
        }
      }
    } catch (e) {
      // console.warn('[fish] cleanup partial failure', e);
    }

    // mark uninitialized
    state.initialized = false;
  }

  function fullCleanup() {
    // disconnect observer/polling
    if (state.containerObserver) {
      try { state.containerObserver.disconnect(); } catch (e) {}
      state.containerObserver = null;
    }
    if (state._retryInterval) {
      clearInterval(state._retryInterval);
      state._retryInterval = null;
    }
    doRealCleanup();
  }

  function ensureInitWhenContainerReady() {
    if (state.initialized) return;
    const container = document.getElementById('jsi-flying-fish-container');
    if (container) {
      doRealInit();
      return;
    }

    // set up MutationObserver to watch for container insertion
    if (!state.containerObserver) {
      try {
        state.containerObserver = new MutationObserver((mutations) => {
          for (const m of mutations) {
            for (const n of m.addedNodes) {
              if (n && n.id === 'jsi-flying-fish-container') {
                setTimeout(doRealInit, 30);
                return;
              }
            }
          }
        });
        state.containerObserver.observe(document.body, { childList: true, subtree: true });
      } catch (e) {
        // fallback to polling if MutationObserver not allowed
        if (!state._retryInterval) {
          state._retryInterval = setInterval(() => {
            if (document.getElementById('jsi-flying-fish-container')) {
              doRealInit();
            }
          }, 800);
        }
      }
    }
  }

  // register cleanup hooks per Quartz recommendations
  if (typeof window.addCleanup === 'function') {
    window.addCleanup(() => {
      // console.log('[fish] window.addCleanup -> fullCleanup');
      fullCleanup();
    });
  }

  // SPA lifecycle events
  document.addEventListener('prenav', () => {
    // clean up before navigation
    // console.log('[fish] prenav -> cleaning up before navigation');
    fullCleanup();
  });

  document.addEventListener('nav', () => {
    // console.log('[fish] nav -> attempting init after navigation');
    setTimeout(() => ensureInitWhenContainerReady(), 60);
  });

  window.addEventListener('popstate', () => {
    setTimeout(() => ensureInitWhenContainerReady(), 60);
  });

  // start
  ensureInitWhenContainerReady();

  // expose helpers for debugging
  window.__flyingFishEnsureInit = ensureInitWhenContainerReady;
  window.__flyingFishFullCleanup = fullCleanup;
})();


var RENDERER = {
  POINT_INTERVAL: 5,
  FISH_COUNT: 3,
  MAX_INTERVAL_COUNT: 50,
  INIT_HEIGHT_RATE: 0.5,
  THRESHOLD: 50,
  WATCH_INTERVAL: 200,

  init: function () {
    this.setParameters();
    this.reconstructMethods();
    this.setup();
    this.bindEvent();
    this.render();
  },

  setParameters: function() {
    this.$window = window;
    this.$container = document.getElementById('jsi-flying-fish-container');

    // ⚡ 清理旧 canvas
  if (this.$canvas && this.$canvas.parentNode) {
    // remove from whichever parent currently holds it
    this.$canvas.parentNode.removeChild(this.$canvas);
  }

    // 创建新的 canvas
    this.$canvas = document.createElement('canvas');
    this.$canvas.style.position = 'absolute';
    this.$canvas.style.top = '0';
    this.$canvas.style.left = '0';
    this.$canvas.style.width = '100%';
    this.$canvas.style.height = '100%';
    this.$canvas.style.display = 'block';
    this.$container.appendChild(this.$canvas);

    // canvas 原生像素尺寸
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.$canvas.width = this.width;
    this.$canvas.height = this.height;

    this.context = this.$canvas.getContext('2d');
    this.points = [];
    this.fishes = [];
    this.watchIds = [];

  // 绑定点击事件，黑白切换
  // 存储绑定引用以便 later removeEventListener
  this._onCanvasClick = this.reverseVertical.bind(this);
  this.$canvas.addEventListener('click', this._onCanvasClick);
},


  createSurfacePoints: function () {
    const count = Math.round(this.width / this.POINT_INTERVAL);
    this.pointInterval = this.width / (count - 1);
    this.points.push(new SURFACE_POINT(this, 0));

    for (let i = 1; i < count; i++) {
      const point = new SURFACE_POINT(this, i * this.pointInterval),
        previous = this.points[i - 1];

      point.setPreviousPoint(previous);
      previous.setNextPoint(point);
      this.points.push(point);
    }
  },

  reconstructMethods: function () {
    this.watchWindowSize = this.watchWindowSize.bind(this);
    this.jdugeToStopResize = this.jdugeToStopResize.bind(this);
    this.startEpicenter = this.startEpicenter.bind(this);
    this.moveEpicenter = this.moveEpicenter.bind(this);
    this.reverseVertical = this.reverseVertical.bind(this);
    this.render = this.render.bind(this);
  },

  setup: function () {
    this.points.length = 0;
    this.fishes.length = 0;
    this.watchIds.length = 0;
    this.intervalCount = this.MAX_INTERVAL_COUNT;

    // restore persisted reverse state (if any)
    this.reverse = window.__fishReverse || false;
    this.fishes.push(new FISH(this));
    this.createSurfacePoints();
  },


  watchWindowSize : function(){
    this.clearTimer();
    this.tmpWidth = window.innerWidth;
    this.tmpHeight = window.innerHeight;
    this.watchIds.push(setTimeout(this.jdugeToStopResize, this.WATCH_INTERVAL));
    },

  clearTimer: function () {
    while (this.watchIds.length > 0) {
      clearTimeout(this.watchIds.pop());
    }
  },

  jdugeToStopResize : function(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    const stopped = (width === this.tmpWidth && height === this.tmpHeight);
        
    this.tmpWidth = width;
    this.tmpHeight = height;
    
    if(stopped){
        this.setup();
    }
  },




  bindEvent: function() {
    // 监听窗口 resize
    window.addEventListener('resize', this.watchWindowSize);

    // 鼠标事件
    this.$container.addEventListener('mouseenter', this.startEpicenter);
    this.$container.addEventListener('mousemove', this.moveEpicenter);

    // 点击 canvas 切换黑白 - 事件已在 setParameters 中绑定并保存引用
},

  getAxis: function (event) {
    const rect = this.$container.getBoundingClientRect();
    return {
      x: event.clientX - rect.left + window.scrollX,
      y: event.clientY - rect.top + window.scrollY,
    };
  },

  startEpicenter: function (event) {
    this.axis = this.getAxis(event);
  },

  moveEpicenter: function (event) {
    const axis = this.getAxis(event);
    if (!this.axis) this.axis = axis;
    this.generateEpicenter(axis.x, axis.y, axis.y - this.axis.y);
    this.axis = axis;
  },

  generateEpicenter : function(x, y, velocity){
    if(!this.points || this.points.length === 0) return;

    if(y < this.height / 2 - this.THRESHOLD || y > this.height / 2 + this.THRESHOLD){
        return;
    }
    
    var index = Math.round(x / this.pointInterval);

    // ✅ 防止 index 超出 bounds
    if(index < 0) index = 0;
    if(index >= this.points.length) index = this.points.length - 1;

    if(this.points[index]) {
        this.points[index].interfere(y, velocity);
    }
    },


    reverseVertical: function () {
    // Debug: log caller and state before toggling
    try {
      // console.log('[fish] reverseVertical() called — before:', !!this.reverse);
      // console.trace();
    } catch (e) {}

    // toggle and persist state across SPA navigations
    this.reverse = !this.reverse;
    try {
      window.__fishReverse = !!this.reverse;
      try { localStorage.setItem('quartz_fish_reverse', window.__fishReverse ? '1' : '0'); } catch(e) {}
    } catch(e){}

    this.fishes.forEach((f) => f.reverseVertical());

    try {
      // console.log('[fish] reverseVertical() completed — after:', !!this.reverse, 'persisted=', window.__fishReverse);
    } catch (e) {}
    },

  controlStatus: function () {
    this.points.forEach((p) => p.updateSelf());
    this.points.forEach((p) => p.updateNeighbors());
    if (this.fishes.length < this.FISH_COUNT) {
      if (--this.intervalCount === 0) {
        this.intervalCount = this.MAX_INTERVAL_COUNT;
        this.fishes.push(new FISH(this));
      }
    }
  },

  render: function() {
    // store RAF id so cleanup can cancel duplicates
    window.__rafId = requestAnimationFrame(this.render);
    this.controlStatus();

    function getPreferredTheme() {
      try {
        var saved = document.documentElement.getAttribute('saved-theme');
        if (saved === 'dark' || saved === 'light') return saved;
      } catch (e) {
        // ignore
      }
      try {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
      } catch (e) {
        // ignore
      }
      return 'light';
    }
    var mode = getPreferredTheme();

		this.context.clearRect(0, 0, this.width, this.height);
		this.context.fillStyle = mode== 'dark' ? 'hsl(0, 0%, 15%)' : 'hsl(0, 0%, 90%)';
		
		for(var i = 0, count = this.fishes.length; i < count; i++){
			this.fishes[i].render(this.context);
		}
		this.context.save();
		this.context.globalCompositeOperation = 'xor';
		this.context.beginPath();
		this.context.moveTo(0, this.reverse ? 0 : this.height);
		
		for(var i = 0, count = this.points.length; i < count; i++){
			this.points[i].render(this.context);
		}
		this.context.lineTo(this.width, this.reverse ? 0 : this.height);
		this.context.closePath();
		this.context.fill();
		this.context.restore();
  },
  
};

// -------- SURFACE_POINT --------
var SURFACE_POINT = function (renderer, x) {
  this.renderer = renderer;
  this.x = x;
  this.init();
};

SURFACE_POINT.prototype = {
  SPRING_CONSTANT: 0.03,
  SPRING_FRICTION: 0.9,
  WAVE_SPREAD: 0.3,
  ACCELARATION_RATE: 0.01,

  init: function () {
    this.initHeight = this.renderer.height * this.renderer.INIT_HEIGHT_RATE;
    this.height = this.initHeight;
    this.fy = 0;
    this.force = { previous: 0, next: 0 };
  },
  setPreviousPoint: function (prev) {
    this.previous = prev;
  },
  setNextPoint: function (next) {
    this.next = next;
  },
  interfere: function (y, v) {
    this.fy = this.renderer.height * this.ACCELARATION_RATE * ((this.renderer.height - this.height - y) >= 0 ? -1 : 1) * Math.abs(v);
  },
  updateSelf: function () {
    this.fy += this.SPRING_CONSTANT * (this.initHeight - this.height);
    this.fy *= this.SPRING_FRICTION;
    this.height += this.fy;
  },
  updateNeighbors: function () {
    if (this.previous) {
      this.force.previous = this.WAVE_SPREAD * (this.height - this.previous.height);
    }
    if (this.next) {
      this.force.next = this.WAVE_SPREAD * (this.height - this.next.height);
    }
  },
  render: function (ctx) {
    if (this.previous) {
      this.previous.height += this.force.previous;
      this.previous.fy += this.force.previous;
    }
    if (this.next) {
      this.next.height += this.force.next;
      this.next.fy += this.force.next;
    }
    ctx.lineTo(this.x, this.renderer.height - this.height);
  },
};

// -------- FISH --------
var FISH = function (renderer) {
  this.renderer = renderer;
  this.init();
};

FISH.prototype = {
  GRAVITY: 0.4,
  init: function () {
    this.direction = Math.random() < 0.5;
    this.x = this.direction ? this.renderer.width + this.renderer.THRESHOLD : -this.renderer.THRESHOLD;
    this.previousY = this.y;
    this.vx = this.getRandomValue(4, 10) * (this.direction ? -1 : 1);

    if (this.renderer.reverse) {
      this.y = this.getRandomValue(this.renderer.height * 1 / 10, this.renderer.height * 4 / 10);
      this.vy = this.getRandomValue(2, 5);
      this.ay = this.getRandomValue(0.05, 0.2);
    } else {
      this.y = this.getRandomValue(this.renderer.height * 6 / 10, this.renderer.height * 9 / 10);
      this.vy = this.getRandomValue(-5, -2);
      this.ay = this.getRandomValue(-0.2, -0.05);
    }

    this.isOut = false;
    this.theta = 0;
    this.phi = 0;
  },
  getRandomValue: function (min, max) {
    return min + (max - min) * Math.random();
  },
  reverseVertical: function () {
    this.isOut = !this.isOut;
    this.ay *= -1;
  },
  controlStatus: function (ctx) {
    this.previousY = this.y;
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.ay;

    if (this.renderer.reverse) {
      if (this.y > this.renderer.height * this.renderer.INIT_HEIGHT_RATE) {
        this.vy -= this.GRAVITY;
        this.isOut = true;
      } else {
        if (this.isOut) this.ay = this.getRandomValue(0.05, 0.2);
        this.isOut = false;
      }
    } else {
      if (this.y < this.renderer.height * this.renderer.INIT_HEIGHT_RATE) {
        this.vy += this.GRAVITY;
        this.isOut = true;
      } else {
        if (this.isOut) this.ay = this.getRandomValue(-0.2, -0.05);
        this.isOut = false;
      }
    }

    if (!this.isOut) {
      this.theta += Math.PI / 20;
      this.theta %= Math.PI * 2;
      this.phi += Math.PI / 30;
      this.phi %= Math.PI * 2;
    }

    this.renderer.generateEpicenter(
      this.x + (this.direction ? -1 : 1) * this.renderer.THRESHOLD,
      this.y,
      this.y - this.previousY
    );

    if ((this.vx > 0 && this.x > this.renderer.width + this.renderer.THRESHOLD) ||
        (this.vx < 0 && this.x < -this.renderer.THRESHOLD)) {
      this.init();
    }
  },
  render: function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(Math.PI + Math.atan2(this.vy, this.vx));
    ctx.scale(1, this.direction ? 1 : -1);

    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.bezierCurveTo(-20, 15, 15, 10, 40, 0);
    ctx.bezierCurveTo(15, -10, -20, -15, -30, 0);
    ctx.fill();

    ctx.save();
    ctx.translate(40, 0);
    ctx.scale(0.9 + 0.2 * Math.sin(this.theta), 1);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(5, 10, 20, 8);
    ctx.quadraticCurveTo(12, 5, 10, 0);
    ctx.quadraticCurveTo(12, -5, 20, -8);
    ctx.quadraticCurveTo(5, -10, 0, 0);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(-3, 0);
    ctx.rotate((Math.PI / 3 + Math.PI / 10 * Math.sin(this.phi)) * (this.renderer.reverse ? -1 : 1));

    ctx.beginPath();
    if (this.renderer.reverse) {
      ctx.moveTo(5, 0);
      ctx.bezierCurveTo(10, 10, 10, 30, 0, 40);
      ctx.bezierCurveTo(-12, 25, -8, 10, 0, 0);
    } else {
      ctx.moveTo(-5, 0);
      ctx.bezierCurveTo(-10, -10, -10, -30, 0, -40);
      ctx.bezierCurveTo(12, -25, 8, -10, 0, 0);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.restore();
    this.controlStatus(ctx);
  },
};