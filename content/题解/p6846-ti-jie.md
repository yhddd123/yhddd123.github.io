---
title: 'P6846 题解'
date: 2025-05-22 12:14:09
tags: [题解,数学,dp]
published: true
hideInList: false
feature: 
isTop: false
---
[P6846](https://www.luogu.com.cn/problem/P6846)

### 思路

对于一个 DAG，把所有边反向后也是 DAG。即 $x$ 步做出一个 DAG，就可以 $m-x$ 步做出对应的另一个。所以答案为 DAG 数乘 $\frac{m}{2}$。

状压 $dp_S$ 表示 $S$ 的导出子图的 DAG 数。枚举 $S$ 的子集 $T$，认为 $T$ 是无入度点集合，则 $T$ 中无边，变为 $S-T$ 的子问题。但 $T$ 可能是真正的无入度点集合的子集，尝试容斥。赋 $(-1)^{|T|+1}$ 的容斥系数，对于真正的无入度点集合 $S$，$\sum_{T\subseteq S,T\neq \emptyset}(-1)^{|T|+1}=\sum_{i=1}^{|S|}\binom{|S|}{i}(-1)^{i+1}=\binom{|S|-1}{0}=1$。这个也叫 DAG 容斥或零度点容斥？

设 $e_S$ 表示 $S$ 内是否有边。然后 $O(3^n)$ 枚举子集即可：$dp_S=\sum_{T\subseteq S,T\neq \emptyset} [e_T=0](-1)^{|T|+1} dp_{S-T}$。

进一步，可以看成从空集开始每次加上一个集合（有序），集合带有 $0/1/-1$ 的系数。对于集合幂级数 $f$，$f_T=[e_T=0](-1)^{|T|+1}$ 且 $f_0=0$，设 $g(x)=\sum_{i=0}x^i=\frac{1}{1-x}$，等价于求 $g(f)$ 在全集的系数。也即求集合幂级数 $1-f$ 的 [逆](https://www.luogu.com.cn/problem/P12232)，那逆着子集卷积做即可。复杂度 $O(2^nn^2)$，还是能快一点的。

### code

```cpp
int n,m;
int e[1<<maxn],f[1<<maxn],g[1<<maxn];
void fmt(int *a,int n,int w){
	for(int i=0;i<n;i++){
		if(w==1){
			for(int s=0;s<(1<<n);s++)if(s&(1<<i))(a[s]+=a[s^(1<<i)])%=mod;
		}
		else{
			for(int s=0;s<(1<<n);s++)if(s&(1<<i))(a[s]+=mod-a[s^(1<<i)])%=mod;
		}
	}
}
int ff[maxn+1][1<<maxn],hh[maxn+1];
void xorni(int *a,int *b,int n){//g=1/(1-f)
	for(int i=0;i<=n;i++){
		for(int s=0;s<(1<<n);s++)ff[i][s]=0;
	}
	for(int s=0;s<(1<<n);s++)ff[__builtin_popcount(s)][s]=a[s];
	for(int i=0;i<=n;i++)fmt(ff[i],n,1);
	for(int s=0;s<(1<<n);s++){
		ff[0][s]=mod+1-ff[0][s];for(int i=1;i<=n;i++)ff[i][s]=mod-ff[i][s];
		int nif=ksm(ff[0][s]);
		for(int i=0;i<=n;i++){
			hh[i]=1;
			for(int j=1;j<=i;j++)(hh[i]+=mod-ff[j][s]*hh[i-j]%mod)%=mod;
			hh[i]=hh[i]*nif%mod;
		}
		for(int i=0;i<=n;i++)ff[i][s]=hh[i];
	}
	for(int i=0;i<=n;i++)fmt(ff[i],n,-1);
	for(int s=0;s<(1<<n);s++)b[s]=ff[__builtin_popcount(s)][s];
}
void work(){
	n=read();m=read();
	for(int i=1;i<=m;i++){
		int u=read()-1,v=read()-1;
		e[(1<<u)|(1<<v)]++;
	}
	fmt(e,n,1);
	f[0]=0;for(int s=1;s<(1<<n);s++){
		if(e[s])f[s]=0;
		else f[s]=((__builtin_popcount(s)+1)&1)?-1:1;
	}
	xorni(f,g,n);
	printf("%lld\n",g[(1<<n)-1]*m%mod*(mod+1)/2%mod);
}
```

