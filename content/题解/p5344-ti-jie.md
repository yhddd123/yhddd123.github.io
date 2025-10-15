---
title: 'P5344 题解'
date: 2023-12-31 17:18:55
tags: [题解,图论]
published: true
hideInList: false
feature: 
isTop: false
---
[P5344](https://www.luogu.com.cn/problem/P5344)

### 思路

把图建出来跑 dij 即可。

对于建图，可以想到对每个操作 $1$ 建一个虚点，从 $u1$ 到 $v1$ 向虚点连代价为 $w$ 的边，从虚点向 $u2$ 到 $v2$ 连代价为 $0$ 的边。此时图中有 $n\times m$ 条边，无法接受，考虑优化建图。

按照线段树优化建图的思路，可以想到先树剖建线段树，$in$ 表示从上往下，$out$ 表示从下往上。把每条边变为多条链在线段树上分别建边。每条边有 $\log n$ 条链，每条链建 $\log n$ 条边，最短路 $O(m\log n)$，总复杂度 $O(m\log^3 n)$。

可以发现，通过树剖把树结构变为数组再优化并非最好，因为放弃了树形结构多了两个 $\log n$。可以树上倍增优化。

对于每个点 $u$ 建 $\log n$ 个虚点，记为 $in_{u,i}$ 和 $out_{u,i}$，表示从 $u$ 到往上 $2^i$ 级祖先的链， $in$ 和 $out$ 同理线段树优化建图，表示从上往下或从下往上。

和 st 表的查询一样，$u$ 到 $u$ 的祖先 $v$ 的路径可以表示为 $u$ 的第 $k$ 个虚点和使 $2^k$ 级祖先为 $v$ 的某个 $u$ 的祖先的第 $k$ 个虚点。把 $u1$ 到 $v1$ 的路径向虚点连边，等同于把 $u1$ 到 lca 和 $v1$ 到 lca 分别向虚点连边。

每个点 $u$ 有 $\log n$ 个虚点，倍增时每个虚点向上一级连 $2$ 条边。每个操作有 $1$ 个虚点，分为 $4$ 部分，每部分向虚点连 $2$ 条边。这样一共有 $n\log n+m$ 个点和 $n\log n+m$ 条边。总复杂度 $O(m\log n)$。

### code

```cpp
int n,m,s,num;
int f[maxn];
int fd(int x){
	if(x==f[x])return x;
	return f[x]=fd(f[x]);
}
struct ask{
	int u,v,uu,vv,w;
}a[maxm];
int cnt;
int head[maxm*3],tot;
struct nd{
	int nxt,to,w;
}e[maxm*12];
void add(int u,int v,int w){
	e[++tot]={head[u],v,w};
	head[u]=tot;
}
int dep[maxn],to[maxn][20];
int in[maxn][20],out[maxn][20];
void dfs(int u,int fa){
	to[u][0]=fa;in[u][0]=out[u][0]=u;
	for(int i=1;(1<<i)<dep[u];i++){
		to[u][i]=to[to[u][i-1]][i-1];
	}
	for(int i=1;(1<<i)<=dep[u];i++){
		in[u][i]=++num;out[u][i]=++num;
		add(out[u][i-1],out[u][i],0);
		add(in[u][i],in[u][i-1],0);
		add(out[to[u][i-1]][i-1],out[u][i],0);
		add(in[u][i],in[to[u][i-1]][i-1],0);
	}
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;
		if(v!=fa&&v<=n){
			dep[v]=dep[u]+1;
			dfs(v,u);
		}
	}
}
int lg[maxn];
int lca(int u,int v){
	if(u==v)return u;
	if(dep[u]<dep[v])swap(u,v);
	for(int i=lg[dep[u]];i>=0;i--)if(dep[to[u][i]]>=dep[v])u=to[u][i];
	if(u==v)return u;
	for(int i=lg[dep[u]];i>=0;i--)if(to[u][i]!=to[v][i])u=to[u][i],v=to[v][i];
	return to[u][0];
}
int kfa(int u,int k){
	int j=0;
	while(k){
		if(k&1)u=to[u][j];    
		k>>=1;
		++j;
	}
	return u;
}
void build(int u,int v,int w,int t){
	int k=lg[dep[u]-dep[v]+1];
	if(!t)add(out[u][k],num,w);
	else add(num,in[u][k],w);
	u=kfa(u,dep[u]-dep[v]+1-(1<<k));
	if(!t)add(out[u][k],num,w);
	else add(num,in[u][k],w);
}
int dis[maxm*3];
bool vis[maxm*3];
struct Dis{
	int dis,id;
	bool operator <(const Dis&tmp)const{return dis>tmp.dis;}
};
priority_queue<Dis> q;

int T;
signed main(){
	//	freopen(".in","r",stdin);
	//	freopen(".out","w",stdout);
	
	n=read();m=read();s=read();
	lg[1]=0;for(int i=2;i<=n;i++)lg[i]=lg[i>>1]+1;
	for(int i=1;i<=n;i++)f[i]=i;
	while(m--){
		int opt,u,v,w,uu,vv;opt=read();
		if(opt==1){
			u=read();v=read();uu=read();vv=read();w=read();
			if(fd(u)!=fd(v)||fd(uu)!=fd(vv))continue;
			a[++cnt]={u,v,uu,vv,w};
		}
		else{
			u=read();v=read();w=read();
			if(fd(u)==fd(v))continue;
			add(u,v,w);add(v,u,w);
			f[fd(u)]=fd(v);
		}
	}
	num=n;
	for(int i=1;i<=n;i++){
		if(!dep[i]){
			dep[i]=1;
			dfs(i,0);
		}
	}
	for(int i=1;i<=cnt;i++){
		num++;
		int tp1=lca(a[i].u,a[i].v),tp2=lca(a[i].uu,a[i].vv);
		build(a[i].u,tp1,0,0);build(a[i].v,tp1,0,0);
		build(a[i].uu,tp2,a[i].w,1);build(a[i].vv,tp2,a[i].w,1);
	}
	memset(dis,0x3f,sizeof(dis));
	dis[s]=0;q.push({0,s});
	while(!q.empty()){
		int u=q.top().id;q.pop();
		if(vis[u])continue;
		vis[u]=1;
		for(int i=head[u];i;i=e[i].nxt){
			int v=e[i].to;
			if(dis[v]>dis[u]+e[i].w){
				dis[v]=dis[u]+e[i].w;
				q.push({dis[v],v});
			}
		}
	}
	for(int i=1;i<=n;i++){
		if(dis[i]>=0x3f3f3f3f)printf("-1 ");
		else printf("%d ",dis[i]);
	}
}
```