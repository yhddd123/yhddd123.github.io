---
title: 'XXI Open Cup, Grand Prix of Korea'
date: 2025-02-06 22:12:17
tags: [acm]
published: true
hideInList: false
feature: 
isTop: false
---
[https://qoj.ac/contest/776](https://qoj.ac/contest/776)。

[https://codeforces.com/gym/102759](https://codeforces.com/gym/102759)

cf 数据比 qoj 强的多。

### [A.Advertisement Matching](https://qoj.ac/contest/776/problem/3299)

> $n$ 种广告每种 $a_i$ 个，$m$ 个用户每人要 $b_i$ 条不相同的广告。每次 $a_i$ 或 $b_j$ $\pm 1$，问能否达成要求。

按 $a_i$ 降序。由霍尔定理等价于 $\forall x\in[1,n]$，$\sum_{i=1}^x a_i\le \sum_{i=1}^m \min(x,b_i)$。

线段树维护 $x$ ，后缀加减，树状数组维护一个值在 $a$ 中的排名。 

```cpp
int n,m,q;
int a[maxn],b[maxn];
int sum[maxn],num[maxn],val[maxn];
int tree[maxn<<1];
#define lb(x) (x&(-x))
void upd(int x,int w){
	x++;
	while(x<maxn*2)tree[x]+=w,x+=lb(x);
}
int que(int x){
	int res=0;x++;
	while(x)res+=tree[x],x-=lb(x);
	return res;
}
#define mid (l+r>>1)
#define ls nd<<1
#define rs nd<<1|1
int mn[maxn<<2],tag[maxn<<2];
void build(int nd,int l,int r){
	if(l==r){mn[nd]=val[l]-sum[l];return ;}
	build(ls,l,mid),build(rs,mid+1,r);
	mn[nd]=min(mn[ls],mn[rs]);
}
void modif(int nd,int w){
	mn[nd]+=w,tag[nd]+=w;
}
void down(int nd){
	modif(ls,tag[nd]),modif(rs,tag[nd]),tag[nd]=0;
}
void updata(int nd,int l,int r,int ql,int qr,int w){
	if(ql>qr)return ;
	if(l>=ql&&r<=qr)return modif(nd,w);
	if(tag[nd])down(nd);
	if(ql<=mid)updata(ls,l,mid,ql,qr,w);
	if(qr>mid)updata(rs,mid+1,r,ql,qr,w);
	mn[nd]=min(mn[ls],mn[rs]);
}
void work(){
	n=read();m=read();
	for(int i=1;i<=n;i++)a[i]=read();
	for(int i=1;i<=m;i++)b[i]=read();
	for(int i=1;i<=m;i++)num[b[i]]++,sum[b[i]]+=b[i];
	for(int i=1;i<=n;i++)num[i]+=num[i-1],sum[i]+=sum[i-1];
	for(int i=1;i<=n;i++)val[i]=sum[i]+(m-num[i])*i;
	for(int i=1;i<=n;i++)sum[i]=a[i];
	sort(sum+1,sum+n+1,[&](int u,int v){return u>v;});
	for(int i=1;i<=n;i++)sum[i]+=sum[i-1];
	build(1,1,n);
	for(int i=1;i<=n;i++)upd(a[i],1);
	q=read();
	while(q--){
		int op=read(),p=read();
		if(op==1){
			int pos=n-que(a[p])+1;
			updata(1,1,n,pos,n,-1);
			upd(a[p],-1),a[p]++,upd(a[p],1);
		}
		if(op==2){
			int pos=n-que(a[p]-1);
			updata(1,1,n,pos,n,1);
			upd(a[p],-1),a[p]--,upd(a[p],1);
		}
		if(op==3){
			updata(1,1,n,b[p]+1,n,1);
			b[p]++;
		}
		if(op==4){
			updata(1,1,n,b[p],n,-1);
			b[p]--;
		}
		puts(mn[1]>=0?"1":"0");
	}
}
```



### [B.B. Cactus Competition](https://qoj.ac/contest/776/problem/3300)

> $n\times m$ 的网格，权值为 $a_i+b_j$，权值 $\ge 0$ 可以通行，每次向右/下走。有多少对 $(s,t)$ 使得 $(s,1)$ 能到达 $(t,m)$。

称 $a_i+\min b_j\ge 0$ 的行为关键行。等价于 $s,t$ 间有关键行，$s$ 去到的最大关键行 $nxt_s$ 小于最小去到 $t$ 的关键行 $pre_t$。

算 $pre_i$。如果 $i$ 是关键行，二分 $pre_i$ 看 $\min_{j=i}^{pre_i} a_i+\max b_j\ge 0$。否则如果存在最小的 $p$ 使得 $a_p\ge a_i$，如果 $(i,1)$ 能去到第 $p$ 行，则 $pre_i=pre_p$。二分 $(i,1)$ 最大去到 $(i,pos)$，取 $[1,pos]$ 中最大的 $b_i$ 往下走。

然后二维数点即可。

```cpp
int n,m,ans;
int a[maxn],b[maxn];
int pmn[maxn],pmx[maxn],smn[maxn],smx[maxn];
int mn[18][maxn],mx[18][maxn];
int quemn(int l,int r){
	int k=__lg(r-l+1);
	return min(mn[k][l],mn[k][r-(1<<k)+1]);
}
int quemx(int l,int r){
	int k=__lg(r-l+1);
	return max(mx[k][l],mx[k][r-(1<<k)+1]);
}
int nxt[maxn],pre[maxn];
#define lb(x) (x&(-x))
int tree[maxn];
void upd(int x,int w){
	while(x<=n+1)tree[x]+=w,x+=lb(x);
}
int que(int x){
	int res=0;
	while(x)res+=tree[x],x-=lb(x);
	return res;
}
vector<int> id;
int rnk[maxn];
void work(){
	n=read();m=read();
	for(int i=1;i<=n;i++)a[i]=read();
	for(int i=1;i<=m;i++)b[i]=read();
	for(int i=1;i<=n;i++)mn[0][i]=mx[0][i]=a[i];
	for(int j=1;j<18;j++){
		for(int i=1;i+(1<<j)-1<=n;i++){
			mn[j][i]=min(mn[j-1][i],mn[j-1][i+(1<<j-1)]);
			mx[j][i]=max(mx[j-1][i],mx[j-1][i+(1<<j-1)]);
		}
	}
	pmn[0]=inf;for(int i=1;i<=m;i++)pmn[i]=min(pmn[i-1],b[i]);
	pmx[0]=-inf;for(int i=1;i<=m;i++)pmx[i]=max(pmx[i-1],b[i]);
	smn[m+1]=inf;for(int i=m;i;i--)smn[i]=min(smn[i+1],b[i]);
	smx[m+1]=-inf;for(int i=m;i;i--)smx[i]=max(smx[i+1],b[i]);
	pre[0]=n+1;
	for(int i=1;i<=n;i++)if(a[i]+pmn[m]>=0)id.pb(i),rnk[i]=id.size()-1;
	for(int i=1;i<=n;i++){
		pre[i]=n+1;
		if(a[i]+pmn[m]>=0){
			int l=0,r=rnk[i]-1,res=rnk[i];
			while(l<=r){
				int mid=l+r>>1;
				if(quemn(id[mid],i)+pmx[m]>=0)r=mid-1,res=mid;
				else l=mid+1;
			}
			pre[i]=id[res];
			continue;
		}
		int l=1,r=i-1,res=0,pos=m+1;
		while(l<=r){
			int mid=l+r>>1;
			if(quemx(mid,i-1)>=a[i])l=mid+1,res=mid;
			else r=mid-1;
		}
		l=1,r=m;
		while(l<=r){
			int mid=l+r>>1;
			if(a[i]+smn[mid]>=0)r=mid-1,pos=mid;
			else l=mid+1;
		}
		if(quemn(res,i)+smx[pos]>=0)pre[i]=pre[res];
	}
	for(int i=n;i;i--){
		nxt[i]=0;
		if(a[i]+pmn[m]>=0){
			int l=rnk[i]+1,r=id.size()-1,res=rnk[i];
			while(l<=r){
				int mid=l+r>>1;
				if(quemn(i,id[mid])+pmx[m]>=0)l=mid+1,res=mid;
				else r=mid-1;
			}
			nxt[i]=id[res];
			continue;
		}
		int l=i+1,r=n,res=n+1,pos=0;
		while(l<=r){
			int mid=(l+r>>1);
			if(quemx(i+1,mid)>=a[i])r=mid-1,res=mid;
			else l=mid+1;
		}
		l=1,r=m;
		while(l<=r){
			int mid=l+r>>1;
			if(a[i]+pmn[mid]>=0)l=mid+1,pos=mid;
			else r=mid-1;
		}
		if(quemn(i,res)+pmx[pos]>=0)nxt[i]=nxt[res];
	}
	for(int i=n,lst=n;i;i--){
		if(a[i]+pmn[m]>=0){
			while(lst>=i)upd(pre[lst],1),lst--;
		}
		ans+=que(nxt[i]);
	}
	printf("%lld\n",ans);
}
```

### [C.Economic One-way Roads](https://qoj.ac/contest/776/problem/3301)

> 给无向图定向，求最小边权的强连通图。

[耳分解](https://yhddd123.github.io/post/tu-lun-lian-tong-xing-wen-ti/#%E8%80%B3%E5%88%86%E8%A7%A3)

$f_s$ 表示 $s$ 内定向为强连通图的最小代价，$g_{s,i,j}$ 表示耳的代价加上 $i$ 到 $s$ 除了 $j$ 的所有点乱定向的最小代价。额外记 $sum_{u,s}$ 表示点 $u$ 到 $s$ 的乱定向的最小代价。

转移同状压拆分耳分解，复杂度 $O(2^nn^3)$。

```cpp
int n,e[18][18];
int f[1<<18],g[1<<18][18][18];
int sum[18][1<<18],val[18][18];
void work(){
	n=read();
	for(int i=0;i<n;i++){
		for(int j=0;j<n;j++){
			e[i][j]=read();
			if(e[i][j]==-1)e[i][j]=inf;
		}
	}
	for(int i=0;i<n;i++)for(int j=0;j<n;j++)if(e[i][j]<inf)val[i][j]=min(e[i][j],e[j][i]);
	for(int i=0;i<n;i++){
		for(int s=1;s<(1<<n);s++){
			int lg=__lg(s&(-s));
			sum[i][s]=sum[i][s^(s&(-s))]+val[i][lg];
		}
	}
	for(int s=0;s<(1<<n);s++){
		f[s]=inf;
		for(int i=0;i<n;i++){
			for(int j=0;j<n;j++)g[s][i][j]=inf;
		}
	}
	for(int i=0;i<n;i++)f[1<<i]=0;
	for(int s=1;s<(1<<n);s++){
		for(int i=0;i<n;i++)if(s&(1<<i)){
			for(int j=0;j<n;j++)if(s&(1<<j)){
				for(int k=0;k<n;k++)if(!(s&(1<<k))){
					if(i==j){
						for(int l=0;l<n;l++)if(!(s&(1<<l))){
							g[s|(1<<k)][l][j]=min(g[s|(1<<k)][l][j],f[s]+e[i][k]+e[k][l]+sum[k][s^(1<<i)]+sum[l][s^(1<<j)]);
						}
					}
					else g[s][k][j]=min(g[s][k][j],f[s]+e[i][k]+sum[k][s^(1<<i)^(1<<j)]);
				}
			}
		}
		for(int i=0;i<n;i++)if(!(s&(1<<i))){
			for(int j=0;j<n;j++)if(s&(1<<j)){
				for(int k=0;k<n;k++)if(!(s&(1<<k))){
					g[s|(1<<i)][k][j]=min(g[s|(1<<i)][k][j],g[s][i][j]+e[i][k]+val[i][j]+sum[k][s^(1<<j)]);
				}
			}
		}
		for(int i=0;i<n;i++)if(!(s&(1<<i))){
			for(int j=0;j<n;j++)if(s&(1<<j)){
				f[s|(1<<i)]=min(f[s|(1<<i)],g[s][i][j]+e[i][j]);
			}
		}
	}
	if(f[(1<<n)-1]==inf)f[(1<<n)-1]=-1;
	printf("%lld\n",f[(1<<n)-1]);
}
```

### [D. Just Meeting](https://qoj.ac/contest/776/problem/3302)

> 给 $n$ 个点的完全图，$m$ 条边边权已知，给剩下的边赋值并最小化使得不存在 $w(i,j)<\min(w(i,k),w(j,k))$。

有 $w(u,v)\ge\min_{(x,y)\in E(u,v)} w(x,y)$。建最大生成树，有 $w(u,v)\le\min_{(x,y)\in E(u,v)} w(x,y)$。

查询树链上的最小值判断非树边。并查集是累计 $siz_u\times siz_v\times w$。

```cpp
int n,m,ans;
struct edge{
	int u,v,w;
}g[maxn];
int f[maxn],siz[maxn];
int fd(int x){
	if(f[x]==x)return x;
	return f[x]=fd(f[x]);
}
bool vis[maxn];
int head[maxn],tot;
struct nd{
	int nxt,to,w;
}e[maxn<<1];
void add(int u,int v,int w){e[++tot]={head[u],v,w};head[u]=tot;}
int to[maxn][19],w[maxn][19],dep[maxn];
int calc(int u,int v){
	int res=inf;
	if(dep[u]<dep[v])swap(u,v);
	for(int i=18;~i;i--)if(dep[to[u][i]]>=dep[v])res=min(res,w[u][i]),u=to[u][i];
	if(u==v)return res;
	for(int i=18;~i;i--)if(to[u][i]!=to[v][i])res=min({res,w[u][i],w[v][i]}),u=to[u][i],v=to[v][i];
	return min({res,w[u][0],w[v][0]});
}
void dfs(int u){
	dep[u]=dep[to[u][0]]+1;
	for(int i=1;i<=18;i++)to[u][i]=to[to[u][i-1]][i-1],w[u][i]=min(w[u][i-1],w[to[u][i-1]][i-1]);
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;if(v==to[u][0])continue;
		to[v][0]=u,w[v][0]=e[i].w;dfs(v);
	}
}
void work(){
	n=read();m=read();
	for(int i=1;i<=m;i++)g[i]={read(),read(),read()};
	for(int i=1;i<=n;i++)f[i]=i,siz[i]=1;
	sort(g+1,g+m+1,[&](edge u,edge v){return u.w>v.w;});
	for(int i=1;i<=m;i++){
		int u=g[i].u,v=g[i].v,w=g[i].w;
		if(fd(u)!=fd(v)){
			add(u,v,w),add(v,u,w);
			u=fd(u),v=fd(v);
			ans+=siz[u]*siz[v]*w;
			f[v]=u,siz[u]+=siz[v];
			vis[i]=1;
		}
	}
	int sum=n*(n-1)/2;
	for(int i=1;i<=n;i++)if(f[i]==i)sum-=siz[i]*(siz[i]-1)/2;
	ans+=sum;
	for(int i=1;i<=n;i++)if(f[i]==i)dfs(i);
	for(int i=1;i<=m;i++)if(!vis[i]){
		if(calc(g[i].u,g[i].v)>g[i].w){puts("-1");return ;}
	}
	printf("%lld\n",ans);
}
```

### [E. Chemistry](https://qoj.ac/contest/776/problem/3303)

> 图。求多少对 $[l,r]$ 使得 $[l,r]$ 中的点和边形成一条链。

如果保证是森林，那么等价于 $\max deg_u=2$ 和 $V-E=1$。维护 $f_i$ 表示 $[i,f_i)$ 满足不存在 $deg_u>2$。维护 $g_i$ 表示 $[i,g_i)$ 满足不存在环。线段树分治或 LCT 维护。

然后对于 $[i,\min(f_i,g_i)-1]$ 内满足森林的条件，有 $V-E\ge 1$，扫描线求 $(mn,cnt)$。

```cpp
int n,m;ll ans;
vector<int> e[maxn];
int pos[maxn];
int d[maxn],f[maxn],g[maxn];
int fa[maxn],siz[maxn];
int fd(int x){
	if(fa[x]==x)return x;
	return fd(fa[x]);
}
int st[maxn],tp;
bool merge(int u,int v){
	u=fd(u),v=fd(v);
	if(u==v)return 0;
	if(siz[u]<siz[v])swap(u,v);
	fa[v]=u,siz[u]+=siz[v];st[++tp]=v;
	return 1;
}
#define mid (l+r>>1)
#define ls nd<<1
#define rs nd<<1|1
vector<pii> tree[maxn<<2];
void updata(int nd,int l,int r,int ql,int qr,pii w){
	if(ql>qr)return ;
	if(l>=ql&&r<=qr){tree[nd].pb(w);return ;}
	if(ql<=mid)updata(ls,l,mid,ql,qr,w);
	if(qr>mid)updata(rs,mid+1,r,ql,qr,w);
}
void sovle(int nd,int l,int r,bool fl=1){
	int lst=tp;
	for(auto[u,v]:tree[nd])fl&=merge(u,v);
	if(l==r){
		g[l]=g[l-1];
		while(fl&&g[l]<=n){
			int u=++g[l];
			if(u>n)break;
			int p=pos[u]-1,v;
			while(p>=0&&(v=e[u][p])>=l){
				fl&=merge(u,v);
				updata(1,1,n,l+1,min(u,v),{u,v});
				p--;
			}
		}
	}
	else sovle(ls,l,mid,fl),sovle(rs,mid+1,r,fl);
	while(tp>lst){
		int v=st[tp],u=fa[v];
		siz[u]-=siz[v],fa[v]=v;
		tp--;
	}
}
pii mn[maxn<<2];
int tag[maxn<<2];
void build(int nd,int l,int r){
	mn[nd]={0,r-l+1};
	if(l==r)return ;
	build(ls,l,mid),build(rs,mid+1,r);
}
void upd(int nd,int w){mn[nd].fi+=w,tag[nd]+=w;}
void down(int nd){
	upd(ls,tag[nd]),upd(rs,tag[nd]),tag[nd]=0;
}
pii merge(pii u,pii v){
	return {min(u.fi,v.fi),(u.fi==min(u.fi,v.fi))*u.se+(v.fi==min(u.fi,v.fi))*v.se};
}
void updata(int nd,int l,int r,int ql,int qr,int w){
	if(l>=ql&&r<=qr)return upd(nd,w);
	if(tag[nd])down(nd);
	if(ql<=mid)updata(ls,l,mid,ql,qr,w);
	if(qr>mid)updata(rs,mid+1,r,ql,qr,w);
	mn[nd]=merge(mn[ls],mn[rs]);
}
pii query(int nd,int l,int r,int ql,int qr){
	if(l>=ql&&r<=qr)return mn[nd];
	if(tag[nd])down(nd);
	if(qr<=mid)return query(ls,l,mid,ql,qr);
	if(ql>mid)return query(rs,mid+1,r,ql,qr);
	return merge(query(ls,l,mid,ql,qr),query(rs,mid+1,r,ql,qr));
}
void work(){
	n=read();m=read();
	for(int i=1;i<=m;i++){
		int u=read(),v=read();
		e[u].pb(v),e[v].pb(u);
	}
	for(int i=1;i<=n;i++){
		sort(e[i].begin(),e[i].end());
		pos[i]=lower_bound(e[i].begin(),e[i].end(),i)-e[i].begin();
	}
	f[0]=g[0]=1;
	for(int i=1,cnt=0;i<=n;i++){
		f[i]=f[i-1];
		while(!cnt&&f[i]<=n){
			int u=++f[i];
			if(u>n)break;
			int p=pos[u]-1,v;
			while(p>=0&&(v=e[u][p])>=i){
				d[v]++;if(d[v]==3)++cnt;
				d[u]++;if(d[u]==3)++cnt;
				p--;
			}
		}
		int p=pos[i],v;
		while(p<e[i].size()&&(v=e[i][p])<=f[i]){
			d[v]--;if(d[v]==2)--cnt;
			d[i]--;if(d[i]==2)--cnt;
			p++;
		}
	}
	for(int i=1;i<=n;i++)fa[i]=i,siz[i]=1;
	sovle(1,1,n);
	build(1,1,n);
	for(int i=n;i;i--){
		updata(1,1,n,i,n,1);
		int p=pos[i],v;
		while(p<e[i].size()&&(v=e[i][p]))updata(1,1,n,v,n,-1),p++;
		pii res=query(1,1,n,i,min(f[i],g[i])-1);
		if(res.fi==1)ans+=res.se;
	}
	printf("%lld\n",ans);
}
```

### [F. Interval Graph](https://qoj.ac/contest/776/problem/3304)

^0f3e81

等价于每个点只被 $\le 2$ 条线段跨过。费用流，连 $(i-1,i,2,0)$ 和 $(l_i,r_i+1,1,-w_i)$，流量为 $2$。

带负权值的费用流，[[primal-dual-yuan-shi-dui-ou-suan-fa|原始对偶]]。最开始的网络是 DAG，可以 dp 算初始的势能；转为边权为正的图，后面 dij 算最短路跑费用流。复杂度 $O(n\log n)$。

```cpp
int n;
vector<pii> upd[maxn];
int s,t,flow,ans;
int head[maxn],tot=1;
struct nd{
	int nxt,to,w,c;
}e[maxn<<2];
void add(int u,int v,int w,int c){
	e[++tot]={head[u],v,w,c};head[u]=tot;
	e[++tot]={head[v],u,0,-c};head[v]=tot;
}
int h[maxn];
int dis[maxn],pre[maxn],id[maxn];
bool vis[maxn];
bool dij(){
	priority_queue<pii> q;
	for(int i=0;i<=t;i++)dis[i]=inf,vis[i]=0;
	dis[s]=0;q.push({0,s});
	while(!q.empty()){
		int u=q.top().se;q.pop();
		if(vis[u])continue;vis[u]=1;
		for(int i=head[u];i;i=e[i].nxt){
			int v=e[i].to,val=e[i].c+h[u]-h[v];
			assert(!e[i].w||val>=0);
			if(e[i].w&&dis[v]>dis[u]+val){
				dis[v]=dis[u]+val,pre[v]=u,id[v]=i;
				q.push({-dis[v],v});
			}
		}
	}
	return dis[t]!=inf;
}
void work(){
	n=read();
	for(int i=1;i<=n;i++){
		int l=read(),r=read(),w=read();
		add(l,r+1,1,-w);
		t=max(t,r+1);
	}
	for(int i=1;i<=t;i++)add(i-1,i,2,0);
	for(int i=0;i<=t;i++)h[i]=inf;h[s]=0;
	for(int u=0;u<=t;u++){
		for(int i=head[u];i;i=e[i].nxt){
			int v=e[i].to;
			if(e[i].w)h[v]=min(h[v],h[u]+e[i].c);
		}
	}
	while(dij()){
		for(int i=0;i<=t;i++)h[i]+=dis[i];
		int mn=1;
		for(int u=t;u!=s;u=pre[u])mn=min(mn,e[id[u]].w);
		flow+=mn;
		for(int u=t;u!=s;u=pre[u]){
			e[id[u]].w-=mn,e[id[u]^1].w+=mn;
			ans+=e[id[u]].c*mn;
		}
	}
	printf("%lld\n",-ans);
}
```

### [G. LCS 8](https://qoj.ac/contest/776/problem/3305)

> 字符串 $s$，计数 $t$ 使得最长公共子序列 $\ge n-k$。$n\le 50000,k\le 3$。

dp 套 dp。内层维护 $f_{i-k,i},\dotsb,f_{i+k,i}$。外层记录第一个数 $f_{i-k}=i-k-j$，$j\le 3$，状压 $f_{i+c,i}-f_{i+c-1,i}$。枚举 $t_i=c$，只有 $O(k)$ 个本质不同的字符。复杂度 $O(n2^kk^3)$。

```cpp
int n,k,ans;
char s[maxn];
int dp[2][1<<6][4],cur;
int f[9],g[9];
void work(){
	scanf("%s",s+1);n=strlen(s+1);k=read();
	dp[0][0][0]=1;
	for(int i=1;i<=n;i++){
		for(int s=0;s<(1<<k+k);s++){
			for(int j=0;j<=k;j++)dp[i&1][s][j]=0;
		}
		int ss=0,mn=26,cnt=0;
		for(int p=max(i-k,1);p<=min(i+k,n);p++)ss|=1<<s[p]-'A';
		for(int c=0;c<26;c++)if(!(ss&(1<<c)))++cnt,mn=c;
		ss|=1<<mn;
		for(int s=0;s<(1<<k+k);s++){
			for(int j=0;j<=k;j++)if(dp[cur][s][j]){
				g[0]=max(i-1-k,0)-j;
				for(int p=1;p<=2*k;p++)g[p]=g[p-1]+((s>>p-1)&1);
				for(int c=0;c<26;c++)if(ss&(1<<c)){
					bool fl=1;int t=0;
					for(int p=0;p<=2*k;p++){
						f[p]=max({p?f[p-1]:0,g[p]+(1<=i-k+p&&i-k+p<=n&&c==::s[i-k+p]-'A'),g[p+1]});
						if(f[p]+max(n-i,n-(i-k+p))<n-k){fl=0;break;}
						if(p&&f[p-1]!=f[p])t|=(1<<p-1);
					}
					if(fl){
						int val=1ll*(c==mn?cnt:1)*dp[cur][s][j]%mod;
						(dp[i&1][t][max(i-k,0)-f[0]]+=val)%=mod;
					}
				}
			}
		}
		cur^=1;
	}
	for(int s=0;s<(1<<k+k);s++){
		for(int j=0;j<=k;j++){
			int v=max(n-k,0)-j;
			for(int ii=0;ii<k;ii++)if(s&(1<<ii))++v;
			if(v>=n-k)(ans+=dp[n&1][s][j])%=mod;
		}
	}
	printf("%lld\n",ans);
}
```

