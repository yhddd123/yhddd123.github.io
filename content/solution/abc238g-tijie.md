---
title: abc238g 题解
date: 2023-12-31 07:36:54
tags:
  - 题解
  - 哈希
published: true
hideInList: false
feature: 
isTop: false
---
[abc238g](https://www.luogu.com.cn/problem/AT_abc238_g)


### 思路

莫队 $O(n\sqrt n\log a_i)$。

哈希。

把 $a_i$ 质因数分解，指数模 $3$。直接乘过大，考虑哈希。每个质数的指数和都因为 $3$ 的倍数。

即：所有数的出现次数和是否都为 $k$ 的倍数。

法一：前缀和。给每个质数随机 $val_i$，$a_i=\sum val_p$，做前缀和。如果是完全立方数可推出 $sum_r-sum_{l-1}\mod 3=0$。因为对 $k$ 取模，所以 $val_p$ 可看作从$[0,k-1]$ 中随机。显然只做一次是不行的，重复 $b$ 次。可以大概认为单次正确率为 $\frac{1}{k}$，一道题正确率 $(1-(\frac{1}{k})^b)^{qT}$，$T$ 是测试点数。

法二：异或。给每个质数随机 $val_{i,0}$ 到 $val_{i,k-2}$ 共 $k-1$ 个值，令 $val_{i,k-1}=\oplus_{j=0}^{k-2} val_{i,j}$。从前往后，如果当前 $a_i$ 有质因数 $p$ 且 $p$ 在 $a_i$ 前已经出现 $num_p$ 次，$num_p$ 对 $k$ 取模，$hsh_i$ 异或上 $val_{p,num_p}$。做前缀异或和，如果是完全立方数可推出 $sum_r\oplus sum_{l-1}=0$。因为是异或，所以错误率极低。

法一适合 $k$ 较大，法二适合 $k$ 较小，代码用法二。

另外，既然不用莫队，可以把复杂度优化到 $O(n\log n)$，筛质数的时候记录 $g_i$ 表示 $i$ 最小的质因数。

### code

```cpp
int n,m;
int pre[maxn],cnt;
int g[maxn],f[maxn];
bool vis[maxn];
int val[maxn][3],num[maxn];
void s(int n){
	for(int i=2;i<=n;i++){
		if(!vis[i]){
			pre[++cnt]=i;g[i]=i;
			val[i][0]=rand()*rand()%inf;
			val[i][1]=rand()*rand()%inf;
			val[i][2]=val[i][0]^val[i][1];
		}
		for(int j=1;j<=cnt&&i*pre[j]<=n;j++){
			vis[i*pre[j]]=1;g[i*pre[j]]=pre[j];
			if(i%pre[j]==0)break;
		}
	}
}
void work(){
	srand(time(0));
	n=read();s(maxn-10);m=read();
	for(int i=1;i<=n;i++){
		int x=read();
		while(g[x]){
			f[i]^=val[g[x]][num[g[x]]%3];
			num[g[x]]++;
			x/=g[x];
		}
//		cout<<f[i]<<" ";
		f[i]^=f[i-1];
	}
	while(m--){
		int u=read(),v=read();
		if((f[v]^f[u-1])==0)printf("Yes\n");
		else printf("No\n");
	}
}
```