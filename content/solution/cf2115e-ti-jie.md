---
title: 'CF2115E 题解'
date: 2025-09-27 09:06:08
tags: [题解,dp]
published: true
hideInList: false
feature: 
isTop: false
---
[CF2115E](https://www.luogu.com.cn/problem/CF2115E)

### 思路

对于完全背包问题，在 $V$ 极大的时候，会选很多性价比最高的物品。令 $mx$ 为 $\frac{w_{mx}}{c_{mx}}$ 最大的物品，非性价比最高的物品至多选 $c_{mx}$ 件，因为如果存在两个时刻，非性价比最高的物品选的体积模 $c_{mx}$ 相同，那么可以把这一部分全部替换为 $c_{mx},w_{mx}$。

所以对于 $r\ge (\max c_i)^2$ 的情况，只需要做模 $c_{mx}$ 的同余最长路，即 [P9140](https://www.luogu.com.cn/problem/P9140)，转两圈即可。具体就是，当加入 $c_u,w_u$ 时，$j$ 向 $(j+c_u)\bmod c_{mx}$ 连权值为 $w_u-\lfloor\frac{j+c_u}{c_{mx}}\rfloor w_{mx}$ 的边。

现在是 DAG，只能钦定一个 $mx$，再记录有没有到过 $mx$ 这个点，还要求不能路过性价比大于 $mx$ 的点，否则会出现正权环。复杂度 $O(n^2(\max c_i))$。

对于 $r<(\max c_i)^2$ 的部分，直接暴力 dp $O(n(\max c_i)^2)$。

查询只需要枚举钦定的是什么，复杂度 $O(nq)$。

### code

```cpp
int n,m,q;
int c[maxn],w[maxn];
vector<int> e[maxn];
int f[maxn][maxn*maxn];
int g[maxn][maxn][maxn][2];
void work(){
	n=read();m=read();
	for(int i=1;i<=n;i++)c[i]=read(),w[i]=read();
	for(int i=1;i<=m;i++){
		int u=read(),v=read();
		e[u].pb(v);
	}
	for(int u=1;u<=n;u++){
		for(int i=c[u];i<maxn*maxn;i++)f[u][i]=max(f[u][i],f[u][i-c[u]]+w[u]);
		for(int v:e[u]){
			for(int i=0;i<maxn*maxn;i++)f[v][i]=max(f[v][i],f[u][i]);
		}
	}
	for(int i=1;i<=n;i++){
		for(int u=1;u<=n;u++){
			for(int j=0;j<c[i];j++)g[i][u][j][1]=-inf;
		}
		if(i==1){
			for(int j=0;j<c[i];j++)g[i][1][j][1]=0;
		}
		for(int u=1;u<=n;u++)if(w[u]*c[i]<=w[i]*c[u]){
			int gg=__gcd(c[i],c[u]);
			for(int s=0;s<gg;s++){
				for(int j=s,t=0,jj;t<2;j=jj,t+=(j==s)){
					jj=(j+c[u])%c[i];
					g[i][u][jj][0]=max(g[i][u][jj][0],g[i][u][j][0]+w[u]-(j+c[u])/c[i]*w[i]);
					g[i][u][jj][1]=max(g[i][u][jj][1],g[i][u][j][1]+w[u]-(j+c[u])/c[i]*w[i]);
				}
			}
			for(int v:e[u])if(w[v]*c[i]<=w[i]*c[v]){
				for(int j=0;j<c[i];j++){
					g[i][v][j][i==v]=max(g[i][v][j][i==v],g[i][u][j][0]);
					g[i][v][j][1]=max(g[i][v][j][1],g[i][u][j][1]);
				}
			}
		}
	}
	q=read();
	while(q--){
		int u=read(),v=read();
		if(v<maxn*maxn)printf("%lld\n",f[u][v]);
		else{
			int ans=0;
			for(int i=1;i<=n;i++)if(w[u]*c[i]<=w[i]*c[u]){
				ans=max(ans,g[i][u][v%c[i]][1]+v/c[i]*w[i]);
			}
			printf("%lld\n",ans);
		}
	}
}
```

