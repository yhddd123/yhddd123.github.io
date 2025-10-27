import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  function FishComponent({ displayClass }: QuartzComponentProps) {
    return (
      <div
        className={displayClass}
        id="jsi-flying-fish-container"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1, // ✅ 保持在背景层
          pointerEvents: 'none', // ✅ 不阻挡内容点击
        }}
      >
        <canvas id="fish-canvas" width="300" height="100"></canvas>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                console.log('fish.tsx is running');
              if (typeof window !== 'undefined') {
                console.log('🟢 fish-container script running');

                // ✅ 动态加载 fish.js（只加载一次）
                if (!document.getElementById('fish-script')) {
                  const s = document.createElement('script');
                  s.src = '/static/js/fish.js';
                  s.defer = true;
                  s.id = 'fish-script';
                  s.onload = () => {
                    console.log('✅ fish.js loaded');
                    
                    // ✅ 加载完 fish.js 后绑定全局点击事件
                    window.addEventListener('click', () => {
                      if (window.RENDERER && window.RENDERER.reverseVertical) {
                        console.log('🎣 Window click: toggling');
                        window.RENDERER.reverseVertical();
                      } else {
                        console.warn('⚠️ RENDERER not ready');
                      }
                    });
                  };
                  s.onerror = e => console.error('❌ fish.js failed', e);
                  document.body.appendChild(s);
                }
              }
            `,
          }}
        ></script>
      </div>
    )
  }

  return FishComponent
}) satisfies QuartzComponentConstructor
