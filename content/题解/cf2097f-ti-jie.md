---
title: 'CF2097F 题解'
date: 2025-09-27 08:49:03
tags: [题解,网络流,dp]
published: true
hideInList: false
feature: 
isTop: false
---

#### [CF2097F](https://www.luogu.com.cn/problem/CF2097F)

### 思路

考虑网络流。对第 $i$ 天的第 $j$ 个机场建点 $id_{i,j}$。$S$ 向 $id_{0,j}$ 连边权为 $s_j$。$id_{i-1,j}$ 向 $id_{i,j-1}$ 连 $a_{i,j}$，$id_{i-1,j}$ 向 $id_{i,j}$ 连 $b_{i,j}$，$id_{i-1,j}$ 向 $id_{i,j+1}$ 连 $c_{i,j}$。$id_{i,j}$ 向 $T_i$ 连 $+\infty$。最后依次求 $S\to T_{1\sim m}$ 的最大流。

直接流跑不动，因为 $S\to T_i$ 到 $S\to T_{i+1}$ 的流量变化可以比较大。

最大流转最小割，分层状压。设 $dp_{i,S}$ 表示当 $S$ 与 $id_{i,j}$ 的连通状态为 $S$ 时，所需要的最小割。$dp_{i,S}=\min dp_{i-1,T}+\sum_{j\in T,k\notin S}w_{i,j,k}$。注意到 $j$ 只有和相邻的位置有边，可以逐位考虑 $S$ 的变化。设辅助转移数组 $f_{j,S}$ 表示考虑了前 $j$ 个位置，其中 $S$ 的前 $j$ 位表示第 $i+1$ 层的状态，后面的位表示第 $i$ 层的状态，转移时需要额外记录第 $i$ 层 $0$ 和 $j$ 的状态。

复杂度 $O(2^nnm)$。

### code

```cpp
int n,m,a[maxn],b[maxn],c[maxn];
int f[1<<maxn],g[maxn][1<<maxn][2];
inline void chkmn(int &u,int v){(u>v)&&(u=v);}
void work(){
	n=read();m=read();
	for(int i=0;i<n;i++)a[i]=read();
	for(int s=0;s<(1<<n);s++){
		f[s]=0;for(int i=0;i<n;i++)if(!(s&(1<<i)))f[s]+=a[i];
	}
	for(int i=1;i<=m;i++){
		for(int i=0;i<n;i++)a[i]=read();
		for(int i=0;i<n;i++)b[i]=read();
		for(int i=0;i<n;i++)c[i]=read();
		for(int i=0;i<=n;i++){
			for(int s=0;s<(1<<n+1);s++)g[i][s][0]=g[i][s][1]=inf;
		}
		for(int s=0;s<(1<<n);s++)g[0][s|((s&1)<<n)][(s>>n-1)&1]=f[s];
		for(int i=0,j=n-1,k=1;i<n;i++,j=(j==n-1?0:j+1),k=(k==n-1?0:k+1)){
			auto calc=[&](bool fl1,bool fl2,bool fl3,bool fl){
				if(fl)return 0;
				return fl1*c[j]+fl2*b[i]+fl3*a[k];
			};
			for(int s=0;s<(1<<n+1);s++){
				for(int fl=0;fl<2;fl++)if(g[i][s][fl]<=inf){
					chkmn(g[i+1][s][(s>>i)&1],g[i][s][fl]+calc(fl,(s>>i)&1,(s>>i+1)&1,(s>>i)&1));
					chkmn(g[i+1][s^(1<<i)][(s>>i)&1],g[i][s][fl]+calc(fl,(s>>i)&1,(s>>i+1)&1,((s>>i)&1)^1));
				}
			}
		}
		for(int s=0;s<(1<<n);s++){
			f[s]=min({g[n][s][0],g[n][s][1],g[n][s|(1<<n)][0],g[n][s|(1<<n)][1]});
		}
		write(f[0]),puts("");
	}
}
```



