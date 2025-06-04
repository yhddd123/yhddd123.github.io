---
title: 图论连通性问题
date: 2025-01-19 21:48:54
tags:
  - 笔记
  - 图论
published: true
hideInList: false
feature: 
isTop: false
---

![[图论与连通性问题选讲-sjy.pdf]]

![[综述图论中连通性及相关问题的一些处理方法 华东师范大学第二附属中学 万成章.pdf]]
## 耳分解

![](https://yhddd123.github.io/post-images/1738238829287.gif)

简单路径/环 $V_1,\dotsb,V_k$，其中 $V_2,\dotsb,V_{k-1}$ 不属于 $V'$，称为耳/开耳。从一个点/简单环开始不断加入耳，成为耳分解。如果全是开耳成为开耳分解。

有向图可耳分解等价于强连通；无向图可耳分解等价于边双；无向图可开耳分解等价于点双。

可以 $O(2^nn^3)$ 状压拆分耳分解。

### [P5776](https://www.luogu.com.cn/problem/P5776)

> 求最小边权的边双子图。

设 $f_s$ 表示 $s$ 的最小权边双连通分量，$g_{s,i,j}$ 表示拓展耳到 $i$，终点为 $j$。规定只有 $i\notin S$ 才能成为一个合法的耳，枚举 $i\to k$ 后将 $i$ 加入 $s$ 中，$j$ 用于区分是耳上的点还是原来的点。

转移有：加 $u\to v\to u$；$i=j$ 时再枚举一个 $l\neq j$ 以区分，$i\neq j$  时 $f_s$ 更新给 $g_{s,k,j}$。

```cpp
int n,m;
int f[1<<12],g[1<<12][12][12];
int e[12][12][2];
void work(){
	n=read();m=read();
	for(int i=0;i<n;i++){
		for(int j=0;j<n;j++)e[i][j][0]=e[i][j][1]=inf;
	}
	for(int s=0;s<(1<<n);s++){
		f[s]=inf;
		for(int i=0;i<n;i++){
			for(int j=0;j<n;j++)g[s][i][j]=inf;
		}
	}
	for(int i=1;i<=m;i++){
		int u=read()-1,v=read()-1,w=read();
		if(w<e[u][v][0])e[u][v][1]=e[u][v][0],e[u][v][0]=w;
		else if(w<e[u][v][1])e[u][v][1]=w;
		swap(u,v);
		if(w<e[u][v][0])e[u][v][1]=e[u][v][0],e[u][v][0]=w;
		else if(w<e[u][v][1])e[u][v][1]=w;
	}
	for(int i=0;i<n;i++)f[1<<i]=0;
	for(int s=1;s<(1<<n);s++){
		for(int i=0;i<n;i++)if(s&(1<<i)){
			for(int j=0;j<n;j++)if(!(s&(1<<j))){
				f[s|(1<<j)]=min(f[s|(1<<j)],f[s]+e[i][j][0]+e[i][j][1]);
			}
		}
		for(int i=0;i<n;i++)if(s&(1<<i)){
			for(int j=0;j<n;j++)if(s&(1<<j)){
				for(int k=0;k<n;k++)if(!(s&(1<<k))){
					if(i==j)g[s|(1<<k)][k][j]=min(g[s|(1<<k)][k][j],f[s]+e[i][k][0]);
					else g[s][k][j]=min(g[s][k][j],f[s]+e[i][k][0]);
				}
			}
		}
		for(int i=0;i<n;i++){
			for(int j=0;j<n;j++)if(s&(1<<j)){
				for(int k=0;k<n;k++)if(!(s&(1<<k))){
					g[s|(1<<i)][k][j]=min(g[s|(1<<i)][k][j],g[s][i][j]+e[i][k][0]);
				}
			}
		}
		for(int i=0;i<n;i++)if(!(s&(1<<i))){
			for(int j=0;j<n;j++)if(s&(1<<j)){
				f[s|(1<<i)]=min(f[s|(1<<i)],g[s][i][j]+e[i][j][0]);
			}
		}
	}
	if(f[(1<<n)-1]==inf)puts("impossible");
	else printf("%lld\n",f[(1<<n)-1]);
}
```

### [Q3301](https://qoj.ac/problem/3301)

> 给无向图定向，求最小边权的强连通图。

$f_s$ 表示 $s$ 内定向为强连通图的最小代价，$g_{s,i,j}$ 表示耳的代价加上 $i$ 到 $s$ 除了 $j$ 的所有点乱定向的最小代价。额外记 $sum_{u,s}$ 表示点 $u$ 到 $s$ 的乱定向的最小代价。

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

## 双极定向

对于一个无向图，点 $s$ 和 $t$，$4$ 个等价的问题：

- 加入 $(s,t)$ 后图点双连通。
- 图的所有点双成一条链，且 $s$ 和 $t$ 所在的点双分别在两端。
- 存在一种定向方式，形成 DAG，使得只有 $s$ 无入度，$t$ 无出度。
- 存在一个排列 p，$p_1=s$，$p_n=t$，且任意一个前缀和后缀的导出子图都连通。即依次由白染黑，黑白点都是连通的。

$3\to 4$ ：取拓扑序。$4\to 3$ ：出现在前的向出现在后的连边。$1\to 3$ ：做开耳分解。

构造：建 $s$ 为根的 dfs 树。对于一个节点 $u$，当 $fa_u$ 或 $u$ 子树返祖边去到的最浅祖先 $lw_u$ 之一被染黑时，将 $u$ 染黑。保留 $s\to t$ 的路径后，从下往上剥去叶子，对每个点维护后继的点。从 $s$ 开始沿着 $s\to t$ 的路径 dfs。不合法即不存在双极定向。

### 板子：[CF730K](https://www.luogu.com.cn/problem/CF730K)

```cpp
int n,m,s,t;
int head[maxn],tot;
struct nd{
	int nxt,to;
}e[maxn<<1];
void add(int u,int v){e[++tot]={head[u],v};head[u]=tot;}
pii g[maxn];
int lw[maxn],dfn[maxn],idx,fa[maxn];
vector<int> id;
bool vis[maxn];
bool dfs(int u){
	dfn[u]=lw[u]=++idx;vis[u]=1;
	bool fl=u==t;
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;
		if(!vis[v]){
			fa[v]=u;fl|=dfs(v);
			lw[u]=min(lw[u],lw[v]);
		}
		else lw[u]=min(lw[u],dfn[v]);
	}
	if(fl)id.pb(u);
	return fl;
}
queue<int> q;
int d[maxn];
vector<int> a[maxn];
int st[maxn],tp,rnk[maxn];
void dfs1(int u){
	if(vis[u])return ;vis[u]=1;
	st[++tp]=u;
	for(int v:a[dfn[u]])dfs1(v);
}
void work(){
	n=read();m=read();s=read();t=read();
	for(int i=1;i<=n;i++)head[i]=0;tot=0;
	for(int i=1;i<=m;i++){
		int u=read(),v=read();
		add(u,v),add(v,u);
		g[i]={u,v};
	}
	idx=0;id.clear();
	for(int i=1;i<=n;i++)vis[i]=0;
	fa[s]=0;dfs(s);
	for(int i=1;i<=n;i++)d[i]=0;
	for(int i:id)d[i]++;
	for(int i=1;i<=n;i++)d[fa[i]]++;
	for(int i=1;i<=n;i++)if(!d[i])q.push(i);
	for(int i=1;i<=n;i++)a[i].clear();
	while(!q.empty()){
		int u=q.front();q.pop();
		a[lw[u]].pb(u),a[dfn[fa[u]]].pb(u);
		d[fa[u]]--;
		if(!d[fa[u]])q.push(fa[u]);
	}
	tp=0;
	for(int i=1;i<=n;i++)vis[i]=0;
	while(id.size())dfs1(id.back()),id.pop_back();
	if(st[1]!=s||st[tp]!=t){puts("No");return ;}
	if(tp!=n){puts("No");return ;}
	for(int i=1;i<=n;i++)vis[i]=0;
	vis[st[1]]=1;
	for(int i=2;i<=tp;i++){
		int u=st[i];bool fl=0;
		for(int i=head[u];i;i=e[i].nxt){
			int v=e[i].to;
			fl|=vis[v];
		}
		if(!fl){puts("No");return ;}
		vis[u]=1;
	}
	for(int i=1;i<=n;i++)vis[i]=0;
	vis[st[tp]]=1;
	for(int i=tp-1;i;i--){
		int u=st[i];bool fl=0;
		for(int i=head[u];i;i=e[i].nxt){
			int v=e[i].to;
			fl|=vis[v];
		}
		if(!fl){puts("No");return ;}
		vis[u]=1;
	}
	for(int i=1;i<=n;i++)rnk[st[i]]=i;
	puts("Yes");
	for(int i=1;i<=m;i++){
		auto[u,v]=g[i];
		if(rnk[u]>rnk[v])swap(u,v);
		printf("%lld %lld\n",u,v);
	}
}
```

### [P9394](https://www.luogu.com.cn/problem/P9394)

> 每次染黑一个点集，要求黑白点都是连通的，最小化最大的点集大小。

建圆方树后，假设从 $s$ 去到 $t$，lca 为 $u$。代价为 $s\to t$ 路径上 $v$ 向外的子树大小之和。可以说明，对于路径上一点 $x$，下一个点为 $x$ 的重儿子最优。对于 $u$，$s,t$ 分别在重儿子子树和次重儿子子树中。设 $f_u$ 表示 $u$ 子树去到叶子的最大代价。在 lca 求最小代价。

将节点分为若干集合后跑双极定向。

```cpp
int n,m;
int head[maxn],tot;
struct nd{
	int nxt,to;
}e[maxn<<1];
void add(int u,int v){e[++tot]={head[u],v};head[u]=tot;}
int dfn[maxn],lw[maxn],idx;
int st[maxn],tp,scct;
vector<int> g[maxn];
void addg(int u,int v){g[u].pb(v),g[v].pb(u);}
void tar(int u){
	dfn[u]=lw[u]=++idx;st[++tp]=u;
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;
		if(!dfn[v]){
			tar(v);
			lw[u]=min(lw[u],lw[v]);
			if(lw[v]>=dfn[u]){
				++scct;
				addg(scct,st[tp]);
				while(st[tp--]!=v)addg(scct,st[tp]);
				addg(scct,u);
			}
		}
		else lw[u]=min(lw[u],dfn[v]);
	}
}
int siz[maxn],fa[maxn],mx[maxn],se[maxn];
int f[maxn];
pii ans;
void dfs(int u){
	siz[u]=(u<=n);
	for(int v:g[u])if(v!=fa[u]){
		fa[v]=u;dfs(v);
		siz[u]+=siz[v];
		if(siz[v]>siz[mx[u]])se[u]=mx[u],mx[u]=v;
		else if(siz[v]>siz[se[u]])se[u]=v;
	}
	int v1=u<=n,v2=u<=n;
	for(int v:g[u])if(v!=fa[u]&&v!=mx[u]){
		if(u<=n)v1+=siz[v];
		else v1=max(v1,siz[v]);
	}
	f[u]=max(v1,f[mx[u]]);
	for(int v:g[u])if(v!=fa[u]&&v!=mx[u]&&v!=se[u]){
		if(u<=n)v2+=siz[v];
		else v2=max(v2,siz[v]);
	}
	if(u<=n)v2+=n-siz[u];
	else v2=max(v2,n-siz[u]);
	v2=max({v2,f[mx[u]],f[se[u]]});
	ans=min(ans,{v2,u});
}
bool vis[maxn];
int col[maxn],cnt;
vector<int> id[maxn];
void dfs1(int u){
	if(col[u]||vis[u])return ;col[u]=cnt;
	if(u<=n)id[cnt].pb(u);
	for(int v:g[u])dfs1(v);
}
int s,t;
vector<int> h[maxn];
vector<int> a[maxn],b;
bool dfs2(int u){
	dfn[u]=lw[u]=++idx;
	bool fl=u==t;
	for(int v:h[u]){
		if(!dfn[v]){
			fa[v]=u;fl|=dfs2(v);
			lw[u]=min(lw[u],lw[v]);
		}
		else lw[u]=min(lw[u],dfn[v]);
	}
	if(fl)b.pb(u);
	return fl;
}
queue<int> q;
int d[maxn];
void dfs3(int u){
	if(vis[u])return ;vis[u]=1;
	st[++tp]=u;
	for(int v:a[dfn[u]])dfs3(v);
}
void work(){
	n=read();m=read();scct=n;
	for(int i=1;i<=m;i++){
		int u=read(),v=read();
		add(u,v),add(v,u);
	}
	tar(1);
	ans={inf,0};dfs(1);
	if(ans.se>n)vis[ans.se]=1;
	int p1=ans.se,p2=ans.se;
	for(int u=mx[ans.se];u;u=mx[u]){
		if(u>n)vis[u]=1;
		else p1=u;
	}
	for(int u=se[ans.se];u;u=mx[u]){
		if(u>n)vis[u]=1;
		else p2=u;
	}
	for(int i=1;i<=scct;i++)if(!col[i]&&!vis[i])++cnt,dfs1(i);
	s=col[p1],t=col[p2];
	for(int u=1;u<=n;u++){
		for(int i=head[u];i;i=e[i].nxt){
			int v=e[i].to;
			if(col[u]!=col[v])h[col[u]].pb(col[v]);
		}
	}
	for(int i=1;i<=cnt;i++)dfn[i]=fa[i]=0;tp=idx=0;
	dfs2(s);
	for(int i:b)d[i]++;
	for(int i=1;i<=cnt;i++)if(fa[i])d[fa[i]]++;
	for(int i=1;i<=cnt;i++)if(!d[i])q.push(i);
	while(!q.empty()){
		int u=q.front();q.pop();
		a[lw[u]].pb(u),a[dfn[fa[u]]].pb(u);
		d[fa[u]]--;
		if(!d[fa[u]])q.push(fa[u]);
	}
	for(int i=1;i<=cnt;i++)vis[i]=0;
	while(b.size())dfs3(b.back()),b.pop_back();
	printf("%lld %lld\n",ans.fi,cnt);
	for(int i=1;i<=cnt;i++){
		printf("%lld ",id[st[i]].size());
		for(int j:id[st[i]])printf("%lld ",j);puts("");
	}
}
```
