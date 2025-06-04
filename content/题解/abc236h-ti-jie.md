---
title: 'abc236h 题解'
date: 2024-12-13 20:33:58
tags: []
published: true
hideInList: false
feature: 
isTop: false
---
[abc236h](https://www.luogu.com.cn/problem/AT_abc236_h)

[图计数相关](https://yhddd123.github.io/post/tu-ji-shu)。

### 思路

钦定若干组组内相等，每组的方案为 $\frac{m}{lcm (d_i)}$。状压，枚举包含 $mn_S$ 的子集 $t$ 乘方案数和大小为 $|t|$ 的组的容斥系数转移。

对于 $\binom{n}{2}$ 个不等关系钦定 $i$ 个相等的容斥系数为 $(-1)^i$。钦定组内相等的容斥系数为构成大小为 $siz$ 无向连通图的选边方案的容斥系数之和。

仿照 [无向连通图计数](https://www.luogu.com.cn/problem/P10982)。$n$ 个点乱连的系数为 $\sum_{i=0}^{\frac{n(n-1)}{2}}\binom{\frac{n(n-1)}{2}}{i} (-1)^i=[\frac{n(n-1)}{2}=0]=[n=1]$。减去不连通图的贡献，$n$ 个点的组的容斥系数之和为 $f_n=[n=1]-\sum_{i=1}^{n-1}C(n-1,i-1)f_i[n-i==1]$。

### code

```cpp
int n,m,a[maxn];
int f[17];
int dp[1<<maxn],val[1<<maxn];
void work(){
	n=read();m=read();
	for(int i=0;i<n;i++)a[i]=read();
	for(int i=1;i<=n;i++){
		f[i]=(i==1);
		for(int j=1;j<i;j++)f[i]-=C(i-1,j-1)*f[j]*(i-j==1)%mod;
		f[i]+=mod,f[i]%=mod;
	}
	for(int s=1;s<(1<<n);s++){
		int p=__lg(s&(-s)),gg=gcd(val[s^(1<<p)],a[p]);
		if(!val[s^(1<<p)])val[s]=a[p];
		else if(a[p]/gg>m/val[s^(1<<p)])val[s]=m+1;
		else val[s]=a[p]/gg*val[s^(1<<p)];
	}
	dp[0]=1;
	for(int s=1;s<(1<<n);s++){
		int p=__lg(s&(-s));
		for(int t=s;t;t=(t-1)&s)if(t&(1<<p)){
			(dp[s]+=(m/val[t])%mod*dp[s^t]%mod*f[__builtin_popcount(t)])%=mod;
		}
	}
	printf("%lld\n",dp[(1<<n)-1]);
}
```