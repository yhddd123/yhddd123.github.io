---
title: 'P11225 题解'
date: 2024-10-25 15:27:07
tags: [题解,图论,网络流]
published: true
hideInList: false
feature: 
isTop: false
---
[P11225](https://www.luogu.com.cn/problem/P11225)

基本同 [arc106e](https://www.luogu.com.cn/problem/AT_arc106_e)。

### 思路

预处理 $k$ 个关键点的单源最短路。二分答案，就知道点 $u$ 能去哪些关键点。可以网络流，连边 $(S,u,1)$，$(a_i,T,val_i)$，如果 $dis_{i,u}\le x$ 连边 $(u,a_i,1)$，检查最大流是否为 $n$。用 Hall 定理判定，对于二分图 $G(V1,V2,E)(\lvert V1\rvert\le \lvert V2\rvert)$，$V1$ 存在完美匹配的充要条件为 $\forall X\subseteq V1,\lvert X\rvert\le\lvert N(X)\rvert$，其中 $N(X)$ 是与 $X$ 中点有边的点集。

状压 $k$ 个关键点，枚举 $N(X)$ 对应的子集为 $s$ ，$X$ 是所有使得 $\forall dis_{i,u}\le x,i\in s$ 的 $u$，高维前缀和计算。

### code

```cpp
int n,m,k;
int a[17],val[17];
int head[maxn],tot;
struct edge{
	int nxt,to,w;
}e[maxn*6];
void add(int u,int v,int w){e[++tot]={head[u],v,w};head[u]=tot;}
int dis[17][maxn];
bool vis[maxn];
priority_queue<pii> q;
int sum[1<<17],dp[1<<17];
bool check(int x){
	for(int s=1;s<(1<<k);s++){
		sum[s]=sum[s^(s&(-s))]+val[__builtin_ctz(s&(-s))];
	}
	for(int s=0;s<(1<<k);s++)dp[s]=0;
	for(int i=1;i<=n;i++){
		int s=0;
		for(int j=0;j<k;j++)if(dis[j][i]<=x)s|=1<<j;
		dp[s]++;
	}
	for(int i=0;i<k;i++){
		for(int s=0;s<(1<<k);s++){
			if(s&(1<<i))dp[s]+=dp[s^(1<<i)];
		}
	}
	for(int s=0;s<(1<<k);s++)if(dp[s]>sum[s])return 0;
	return 1;
}
void work(){
	n=read();m=read();k=read();
	for(int i=1;i<=m;i++){
		int u=read(),v=read(),w=read();
		add(u,v,w),add(v,u,w);
	}
	for(int i=0;i<k;i++)a[i]=read(),val[i]=read();
	for(int i=0;i<k;i++){
		mems(dis[i],0x3f),mems(vis,0);
		dis[i][a[i]]=0,q.push({0,a[i]});
		while(!q.empty()){
			int u=q.top().se;q.pop();
			if(vis[u])continue;vis[u]=1;
			for(int ii=head[u];ii;ii=e[ii].nxt){
				int v=e[ii].to;
				if(dis[i][v]>dis[i][u]+e[ii].w){
					dis[i][v]=dis[i][u]+e[ii].w;
					q.push({-dis[i][v],v});
				}
			}
		}
		// for(int j=1;j<=n;j++)cout<<dis[i][j]<<" ";cout<<"\n";
	}
	int l=0,r=inf,res=inf;
	while(l<=r){
		int mid=l+r>>1;
		if(check(mid))r=mid-1,res=mid;
		else l=mid+1;
	}
	printf("%lld\n",res);
}
```

