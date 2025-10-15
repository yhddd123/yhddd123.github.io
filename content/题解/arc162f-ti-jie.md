---
title: 'arc162f 题解'
date: 2023-12-31 07:45:24
tags: [题解,dp]
published: true
hideInList: false
feature: 
isTop: false
---
[arc162f](https://www.luogu.com.cn/problem/AT_arc162_f)

### 思路

$a_{x1,y2}\times a_{x2,y2}\leq a_{x1,y2}\times a_{x2,y1}$ 改为所有 $a_{x1,y1}=a_{x2,y2}=1$，都有 $a_{x1,y2}=a_{x2,y1}=1$。

观察发现，第 $i$ 行 $a_{i,j_1}=\ldots =a_{i,j_{num}}=1,(j_1<\ldots <j_{num})$，第 $ii,(ii>i)$ 行能取 $1$ 的位置是 $[1,j_1-1]$ 和 $j$ 的一个前缀。形如：

```
000010110
000010100
010110100
000000000
100000000
```

但可以空一些行和列，不方便，考虑将所有有 $1$ 的行和列压起来。设 $dp_{i,j,k}$ 表示前 $i$ 行，有 $j$ 个列有过 $1$，当前行选 $k$ 个，强制连续选。首先可以取一个前缀，$dp'_{i,j,k}=\sum_{l=k}^j dp_{i-1,j,l}$，后缀和维护。其次可以向前在  $[1,j_1-1]$  任意取，但强制连续选，枚举选 $l$ 个，$dp_{i,j,k}=\sum_{l=0}^k dp'_{i,j-l,k-l}$，维护一个斜线的前缀和。

计算答案，对于每个 $dp_{i,j,k}$，$n$ 行选 $i$ 行，$m$ 列选 $j$ 列，其他放 $0$，$ans=\sum \binom{n}{i}\times \binom{m}{j}\times dp_{i,j,k}$。再加上全取 $0$ 的情况。

注意取模优化和枚举时 $\frac{1}{2}$ 的常数。

### code

```cpp
	for(int i=1;i<=m;i++)dp[i][i]=1,ans=add(ans,C(m,i)*C(n,1)%mod);
	for(int i=2;i<=n;i++){
		for(int j=1;j<=m;j++){
			for(int k=j;~k;k--)f[j][k]=add(f[j][k+1],dp[j][k]);
		}
		for(int j=1;j<=m;j++){
			for(int k=1;k<=j;k++)f[j][k]=add(f[j][k],f[j-1][k-1]);
		}
		for(int j=1;j<=m;j++){
			for(int k=1;k<=j;k++){
				dp[j][k]=f[j][k];
			}
		}
		for(int j=1;j<=m;j++){
			for(int k=1;k<=j;k++){
				ans=add(ans,C(m,j)*C(n,i)%mod*dp[j][k]%mod);
			}
		}
	}
	printf("%lld\n",ans+1);
```