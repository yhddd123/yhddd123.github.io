---
title: 'abc355f 题解'
date: 2023-12-31 07:40:56
tags: [题解,图论]
published: true
hideInList: false
feature: 
isTop: false
---
[abc355f](https://www.luogu.com.cn/problem/AT_abc355_f)

~~直接贺 lct 维护 mst 的代码。~~

### 思路

观察到 $w_i\le 10$，考虑分开建 $10$ 个图表示边权小于等于 $i$ 的边组成的图。连并查集，记录当前图连了 $siz_i$ 条边。

可以发现第 $i-1$ 个图是第 $i$ 个图的子图。所以差分 $siz_i-siz_{i-1}$ 可以得到原图的最小生成树中边权为 $i$ 的边数。

复杂度 $O(n\max w_i)$。

### code

```cpp
int n,m;
int f[11][maxn],siz[11];
int fd(int id,int x){
	if(f[id][x]==x)return x;
	return f[id][x]=fd(id,f[id][x]);
}
void work(){
	n=read();m=read();
	for(int i=1;i<=10;i++)for(int j=1;j<=n;j++)f[i][j]=j;
	for(int i=1;i<n;i++){
		int u=read(),v=read(),w=read();
		for(int j=w;j<=10;j++)if(fd(j,u)!=fd(j,v))f[j][fd(j,u)]=fd(j,v),siz[j]++;
	}
	for(int i=1;i<=m;i++){
		int u=read(),v=read(),w=read();
		for(int j=w;j<=10;j++)if(fd(j,u)!=fd(j,v))f[j][fd(j,u)]=fd(j,v),siz[j]++;
		int ans=0;
		for(int j=1;j<=10;j++)ans+=(siz[j]-siz[j-1])*j;
		printf("%lld\n",ans);
	}
}
```