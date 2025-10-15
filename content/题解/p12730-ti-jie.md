---
title: 'P12730 题解'
date: 2025-06-10 12:39:22
tags: [题解,图论]
published: true
hideInList: false
feature: 
isTop: false
---
[P12730](https://www.luogu.com.cn/problem/P12730)

### 思路

物品 $i$、$j$ 能同时选要求 $dis(p_i,p_j)\ge d_i+d_j+1$。设 $dp_u$ 表示所选物品只覆盖到 $u$ 子树内的最大价值。将物品挂在 $p$ 的 $d$ 级祖先上。若没有物品覆盖 $u$，$dp_u=\sum dp_v$；否则枚举 $u$ 上的物品，挖去其覆盖的连通块后形成若干森林，从这些森林的根 $x$ 的 $\sum dp_x$ 处转移。

这些 $x$ 满足 $dis(p,x)=d+1$。如果是完全二叉树的特殊性质，直接枚举 $p$ 的祖先作为 $lca(p,x)$ 并记录 $f_{u,d}$ 表示 $u$ 子树内 $dis(u,x)=d$ 的 $dp_x$ 之和。发现只需要能跳祖先的性质，可以点分树。枚举 $p$ 点分树的祖先 $tp$，将 $dis(p,x)$ 拆为 $dis(p,tp)+dis(x,tp)$。记录 $f_{u,d}$ 表示点分树上 $u$ 子树内到 $u$ 在原树距离为 $d$ 的 $\sum dp_x$，$g_{u,d}$ 为到原树上 $fa_u$ 的距离为 $d$ 的 $\sum dp_x$。这些有值的 $f,g$ 只有 $O(n\log n)$ 个。

复杂度 $O(n\log n)$。

### code

```cpp
int n,m;
int head[maxn],tot;
struct nd{
	int nxt,to;
}e[maxn<<1];
void add(int u,int v){e[++tot]={head[u],v};head[u]=tot;}
int to[maxn][17],dep[maxn];
int st[17][maxn],dfn[maxn],idx;
void dfs(int u,int fa){
	st[0][dfn[u]=++idx]=fa;
	to[u][0]=fa;dep[u]=dep[fa]+1;
	for(int i=1;i<=16;i++)to[u][i]=to[to[u][i-1]][i-1];
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;if(v==fa)continue;
		dfs(v,u);
	}
}
int mmax(int u,int v){return dfn[u]<dfn[v]?u:v;}
int lca(int u,int v){
	if(u==v)return u;
	u=dfn[u],v=dfn[v];
	if(u>v)swap(u,v);u++;
	int k=__lg(v-u+1);
	return mmax(st[k][u],st[k][v-(1<<k)+1]);
}
int dis(int u,int v){return dep[u]+dep[v]-2*dep[lca(u,v)];}
int kth(int u,int k){
	for(int i=16;~i;i--)if(k&(1<<i))u=to[u][i];
	return !u?1:u;
}
bool vis[maxn];
int siz[maxn],w[maxn],sum,rt;
void getrt(int u,int fa){
	siz[u]=1,w[u]=0;
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;if(v==fa||vis[v])continue;
		getrt(v,u);siz[u]+=siz[v];w[u]=max(w[u],siz[v]);
	}
	w[u]=max(w[u],sum-siz[u]);
	if(w[u]<=sum/2)rt=u;
}
int fa[maxn];
void sovle(int u){
	vis[u]=1;getrt(u,0);
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;if(vis[v])continue;
		sum=siz[v];getrt(v,u);fa[rt]=u;sovle(rt);
	}
}
unordered_map<int,ll> f[maxn],g[maxn];
vector<tuple<int,int,int>> ask[maxn];
ll dp[maxn];
void dfs(int u){
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;if(v==to[u][0])continue;
		dfs(v);dp[u]+=dp[v];
	}
	for(auto[p,d,w]:ask[u]){
		ll sum=0;int x=p;while(x){
			if(f[x].find(d+1-dis(x,p))!=f[x].end())sum+=f[x][d+1-dis(x,p)];
			x=fa[x];
		}
		x=p;while(fa[x]){
			if(g[x].find(d+1-dis(fa[x],p))!=g[x].end())sum-=g[x][d+1-dis(fa[x],p)];
			x=fa[x];
		}
		dp[u]=max(dp[u],sum+w);
	}
	int x=u;while(x)f[x][dis(x,u)]+=dp[u],x=fa[x];
	x=u;while(fa[x])g[x][dis(fa[x],u)]+=dp[u],x=fa[x];
}
void work(){
	n=read();m=read();
	for(int i=1;i<n;i++){
		int u=read(),v=read();
		add(u,v),add(v,u);
	}
	dfs(1,0);
	for(int j=1;j<=16;j++){
		for(int i=1;i+(1<<j)-1<=n;i++)st[j][i]=mmax(st[j-1][i],st[j-1][i+(1<<j-1)]);
	}
	for(int i=1;i<=m;i++){
		int p=read(),d=read(),w=read();
		ask[kth(p,d)].pb({p,d,w});
	}
	sum=n;getrt(1,0);sovle(rt);
	dfs(1);
	printf("%lld\n",dp[1]);
}
```





