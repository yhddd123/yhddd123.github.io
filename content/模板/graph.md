---
title: 'graph'
date: 2024-11-29 21:50:55
tags: []
published: true
hideInList: false
feature: 
isTop: false
---
## #图论 

### 边双

```cpp
int n,m;
int head[maxn],tot=1;
struct nd{
	int nxt,to;
}e[maxn<<1];
void add(int u,int v){e[++tot]={head[u],v};head[u]=tot;}
int dfn[maxn],lw[maxn],idx;
int st[maxn],tp;
vector<int> g[maxn];
int num;
bool vis[maxn];
void tar(int u,int fl){
	dfn[u]=lw[u]=++idx;st[++tp]=u;
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;
		if(i==(fl^1))continue;
		if(!dfn[v]){
			tar(v,i);
			lw[u]=min(lw[u],lw[v]);
		}
		else lw[u]=min(lw[u],dfn[v]);
	}
	if(lw[u]==dfn[u]){
		++num;
		g[num].push_back(st[tp]);
		while(st[tp--]!=u){
			g[num].push_back(st[tp]);
		}
	}
}
void work(){
	n=read();m=read();
	for(int i=1;i<=m;i++){
		int u=read(),v=read();
		add(u,v),add(v,u);
	}
	for(int i=1;i<=n;i++)if(!dfn[i])tar(i,0);
	printf("%lld\n",num);
	for(int i=1;i<=num;i++){
		printf("%lld ",g[i].size());
		for(int j:g[i])printf("%lld ",j);
		printf("\n");
	}
}
```

### 点双

```cpp
int n,m,num;
vector<int> e[maxn],g[maxn];
int dfn[maxn],idx,lw[maxn];
int st[maxn],tp;
void tar(int u){
	dfn[u]=lw[u]=++idx;st[++tp]=u;
	for(int v:e[u]){
		if(!dfn[v]){
			tar(v);
			lw[u]=min(lw[u],lw[v]);
			if(lw[v]>=dfn[u]){
				g[++num].push_back(st[tp]);
				while(st[tp--]!=v)g[num].push_back(st[tp]);
				g[num].push_back(u);
			}
		}
		else lw[u]=min(lw[u],dfn[v]);
	}
}
void work(){
	n=read();m=read();
	for(int i=1;i<=m;i++){
		int u=read(),v=read();
		e[u].push_back(v),e[v].push_back(u);
	}
	for(int i=1;i<=n;i++)if(!dfn[i]){
		int lst=idx;tar(i);
		if(idx==lst+1)g[++num].push_back(i);
	}
	printf("%lld\n",num);
	for(int i=1;i<=num;i++){
		printf("%lld ",(int)g[i].size());
		for(int j:g[i])printf("%lld ",j);printf("\n");
	}
}
```

### 无向图四元环计数

```cpp
int n,m;
int d[maxn],cnt[maxn],ans;
vector<int> e[maxn],g[maxn];
void work(){
	n=read();m=read();
	for(int i=1;i<=m;i++){
		int u=read(),v=read();
		e[u].push_back(v),e[v].push_back(u);
		d[u]++,d[v]++;
	}
	for(int u=1;u<=n;u++){
		for(int v:e[u])if(d[u]>d[v]||(d[u]==d[v]&&u>v))g[u].push_back(v);
	}
	for(int i=1;i<=n;i++){
		for(int j:g[i]){
			for(int k:e[j])if(d[i]>d[k]||(d[i]==d[k]&&i>k))ans+=cnt[k]++;
		}
		for(int j:g[i])for(int k:e[j])cnt[k]=0;
	}
	printf("%lld\n",ans);
}
```
