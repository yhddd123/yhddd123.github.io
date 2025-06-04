---
title: 'Primal-Dual 原始对偶算法'
date: 2025-02-07 20:15:31
tags: [笔记,网络流]
published: true
hideInList: false
feature: 
isTop: false
---
[https://oi-wiki.org/graph/flow/min-cost/#primal-dual-%E5%8E%9F%E5%A7%8B%E5%AF%B9%E5%81%B6%E7%AE%97%E6%B3%95](https://oi-wiki.org/graph/flow/min-cost/#primal-dual-%E5%8E%9F%E5%A7%8B%E5%AF%B9%E5%81%B6%E7%AE%97%E6%B3%95)

对于带负权的费用流，正常的 spfa 求增广路的费用流复杂度 $O(nmf)$。使用 Primal-Dual 后 $O(nm+m\log nf)$。

仿照 [Johnson 全源最短路](https://oi-wiki.org/graph/shortest-path/#johnson-%E5%85%A8%E6%BA%90%E6%9C%80%E7%9F%AD%E8%B7%AF%E5%BE%84%E7%AE%97%E6%B3%95)。设置势能使费用为正，然后每次增广用 dij 代替 spfa。初始势能 $h_u$ 为  $s$ 到 $u$ 的最短路，$O(nm)$ 求出。设置 $(u,v,w)$ 的边权为 $w+h_u-h_v$。设置势能后新网络上的最短路径和原网络上的最短路径对应且边权为正。

增广后图的形态会发生变化，设增广后 $s$ 到 $u$ 的距离（新边权）为 $dis_u$，更新势能为 $h_i+dis_i$。对于原有的 $(u,v)$，$dis_u+(w(u,v)+h_u-h_v)\ge dis_v$，$(u,v)$ 的新边权 $w(u,v)+h_u+dis_u-h_v-dis_v\ge 0$。对于增广路上的 $(u,v)$，$dis_u+(w(u,v)+h_u-h_v)=dis_v$，$(v,u)$ 的新边权等于 $0$。更新势能后新图上所有边的边权均非负。

```cpp
int n,m;
int s,t,flow,ans;
int head[maxn],tot=1;
struct nd{
	int nxt,to,w,c;
}e[maxn<<1];
void add(int u,int v,int w,int c){
	e[++tot]={head[u],v,w,c};head[u]=tot;
	e[++tot]={head[v],u,0,-c};head[v]=tot;
}
int h[maxn];bool vis[maxn];
void spfa(){
	queue<int> q;
	for(int i=1;i<=n;i++)h[i]=inf,vis[i]=0;
	h[s]=0,vis[s]=1,q.push(s);
	while(!q.empty()){
		int u=q.front();q.pop();vis[u]=0;
		for(int i=head[u];i;i=e[i].nxt){
			int v=e[i].to;
			if(e[i].w&&h[v]>h[u]+e[i].c){
				h[v]=h[u]+e[i].c;
				if(!vis[v])vis[v]=1,q.push(v);
			}
		}
	}
}
int dis[maxn],pre[maxn],id[maxn];
bool dij(){
	priority_queue<pii> q;
	for(int i=1;i<=n;i++)dis[i]=inf,vis[i]=0;
	dis[s]=0;q.push({0,s});
	while(!q.empty()){
		int u=q.top().se;q.pop();
		if(vis[u])continue;vis[u]=1;
		for(int i=head[u];i;i=e[i].nxt){
			int v=e[i].to,val=e[i].c+h[u]-h[v];
			if(e[i].w&&dis[v]>dis[u]+val){
				dis[v]=dis[u]+val,pre[v]=u,id[v]=i;
				q.push({-dis[v],v});
			}
		}
	}
	return dis[t]!=inf;
}
void work(){
	n=read();m=read();s=read();t=read();
	for(int i=1;i<=m;i++){
		int u=read(),v=read(),w=read(),c=read();
		add(u,v,w,c);
	}
	spfa();
	while(dij()){
		for(int i=1;i<=n;i++)h[i]+=dis[i];
		int mn=inf;
		for(int u=t;u!=s;u=pre[u])mn=min(mn,e[id[u]].w);
		flow+=mn;
		for(int u=t;u!=s;u=pre[u]){
			e[id[u]].w-=mn,e[id[u]^1].w+=mn;
            ans+=e[id[u]].c*mn;
		}
	}
	printf("%lld %lld\n",flow,ans);
}
```

例：[Q3304](https://qoj.ac/contest/776/problem/3304)。初始网络为 DAG，流量为 $2$。可以 $O(n)$ 快速求出初始势能，复杂度 $O(n\log n)$。