---
title: '01 背包：subset sum through balancing'
date: 2025-11-17 07:49:43
tags: [tricks,dp]
published: true
hideInList: false
feature: 
isTop: false
---
### 已完成今日 [你真的会 01 背包吗？(https://blog.moeebius.top/index.php/archives/15/)](https://blog.moeebius.top/index.php/archives/15/) 大学习。

> 给定 $n$ 个整数 $a_i$，问是否存在一个子集 $S$ 使得 $\sum_{i\in S}a_i=V$。

看到一篇[论文](https://dl.acm.org/doi/10.1145/3329863)，但是感觉都太神秘了。

---

直接做 $O(n^2V)$，可以除 $w$。

找到一个最长前缀 $p$ 使得 $\sum_{i=1}^p a_i\le V$，先把这个前缀全部选上，和为 $sum$。然后每次操作可以从 $[1,p]$ 中删一个数，或加入 $[p+1,n]$ 中一个数，使得目前集合的 $sum\in[V-\max a_i,V+\max a_i]$。

随机打乱可以做到 $O(\frac{n\sqrt nV}{w})$。

记 $f_{i,j,k}$ 表示还没考虑 $[1,i]$ 和 $[j,n]$，目前的和为 $k$ 是否可行。交换状态值域，记 $g_{j,k}$ 表示右端点决定到 $j$，和为 $k$，左端点最大多少。

转移可以是：$j$ 右移一位，选/不选这个物品；$i$ 左移到 $[g_{j-1,k},g_{j,k})$  之间并删掉 $a_i$。

复杂度 $O(nV)$。

代码有了。[Q7403 Subset Sum](https://qoj.ac/contest/1365/problem/7403)。


```cpp
void work(){
	n=read();c=read();
	for(int i=1;i<=n;i++)a[i]=read();a[n+1]=0;
	int p=-1,sum=0;for(int i=1;i<=n;i++){
		if(sum+a[i]>c){p=i-1;break;}
		sum+=a[i];
	}
	if(p==-1){printf("%lld\n",sum);return ;}
	// mems(f,0);
	// f[p+1][p][sum-c+B]=1;
	// for(int i=p+1;i;i--){
		// for(int j=p;j<=n;j++){
			// for(int k=-B;k<=B;k++)if(f[i][j][k+B]){
				// f[i][j+1][k+B]=1;
				// f[i-1][j][k+B]=1;
				// if(k<=0)f[i][j+1][k+a[j+1]+B]=1;
				// elsef[i-1][j][k-a[i-1]+B]=1;
			// }
		// }
	// }
	for(int o=0;o<2;o++)for(int k=-B;k<=B;k++)g[o][k+B]=0;
	g[p&1][sum-c+B]=p+1;
	for(int j=p+1;j<=n;j++){
		for(int k=-B;k<=B;k++)g[j&1][k+B]=g[(j-1)&1][k+B];
		for(int k=-B;k<=0;k++)chkmx(g[j&1][k+a[j]+B],g[(j-1)&1][k+B]);
		for(int k=B;k;k--){
			for(int i=g[(j-1)&1][k+B];i<g[j&1][k+B];i++)chkmx(g[j&1][k-a[i]+B],i);
		}
	}
	for(int i=0;i>=-B;i--)if(g[n&1][i+B]){printf("%lld\n",c+i);break;}
}
```