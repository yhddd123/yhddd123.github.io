---
title: 'P3337 题解'
date: 2026-02-03 19:17:33
tags: [题解,网络流]
published: true
hideInList: false
feature: 
isTop: false
---
[P3337](https://www.luogu.com.cn/problem/P3337)

全都串起来了！

先 [[xian-xing-gui-hua-dui-ou|在 OI 中更易上手的线性规划对偶]] 一下。

设每个位置要选 $a_i$ 次，要 $\min \sum a_ic_i$，约束是 $d_i-\sum_{l_i\le j\le r_i} a_j\le 0$，$a_i\ge 0$。

然后对偶：要 $\max \sum b_id_i$，约束是 $c_i\ge \sum[l_j\le i\le r_j]b_j$，$b_i\ge 0$。

这是啥，这是有 $m$ 个区间 $[l_j,r_j]$，价值 $d_j$，可以选任意次；有 $n$ 个点，限制 $c_i$，每个点只能被覆盖至多 $c_i$ 次。[[wang-luo-liu-qu-jian-fu-gai-mo-xing|网络流区间覆盖]]。

可以流。让 $i\to i+1$ 的流量表示剩余的覆盖次数，$l\to r+1$ 表示选区间 $[l,r]$。连边 $i\to i+1$，流量 $[+\infty-c_i,+\infty]$，费用 $0$，流这种边表示 $i$ 点浪费一次覆盖次数。连边 $l\to r+1$，流量不限，费用 $-d_i$。

现在费用流是 $O(nmf)$。这个增广次数应该可能是 $O(n)$ 的。再 [[primal-dual-yuan-shi-dui-ou-suan-fa|primal-dual 原始对偶]] 一下，复杂度 $O(nm+mf\log n)$。

```cpp
int n,m,c[maxn];
int s,t,flow,ans;
int head[maxn],tot=1;
struct nd{
	int nxt,to,w,c;
}e[maxn<<2];
void add(int u,int v,int w,int c){
	e[++tot]={head[u],v,w,c};head[u]=tot;
	e[++tot]={head[v],u,0,-c};head[v]=tot;
}
int h[maxn];bool vis[maxn];
void spfa(){
	queue<int> q;
	for(int i=0;i<=t;i++)h[i]=inf,vis[i]=0;
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
	for(int i=0;i<=t;i++)dis[i]=inf,vis[i]=0;
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
	n=read();m=read();
	for(int i=1;i<=n;i++)c[i]=read();
	s=0,t=n+2;
	for(int i=0;i<=n;i++){
		int v=abs(c[i]-c[i+1]);
		if(c[i]<c[i+1])add(s,i+1,v,0);
		if(c[i]>c[i+1])add(i+1,t,v,0);
	}
	for(int i=1;i<=n;i++)add(i,i+1,inf,0);
	for(int i=1;i<=m;i++){
		int l=read(),r=read(),d=read();
		add(l,r+1,inf,-d);
	}
	spfa();
	int num=0;
	while(dij()){
		for(int i=0;i<=t;i++)h[i]+=dis[i];
		int mn=inf;
		for(int u=t;u!=s;u=pre[u])mn=min(mn,e[id[u]].w);
		flow+=mn;
		for(int u=t;u!=s;u=pre[u]){
			e[id[u]].w-=mn,e[id[u]^1].w+=mn;
            ans+=e[id[u]].c*mn;
		}
		++num;
	}
	// cout<<flow<<" "<<num<<"\n";
	printf("%lld\n",-ans);
}
```

