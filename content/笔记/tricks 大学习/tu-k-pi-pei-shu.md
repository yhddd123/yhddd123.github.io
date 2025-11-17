---
title: '图 k 匹配数'
date: 2025-04-15 18:50:29
tags: [笔记,dp]
published: true
hideInList: false
feature: 
isTop: false
---
[Q2068](https://qoj.ac/problem/2068)

>$n$ 个点的图。记一个匹配的权值为 $c^{|S|}$，求所有匹配的权值和。
>
>$n\le 40$。

[AT_xmascon22_f](https://atcoder.jp/contests/xmascon22/tasks/xmascon22_f)

>$n$ 个点的图，每条边 $a_{u,v}$ 种。对于 $k=1,\dotsb,\frac{n}{2}$，求大小为 $k$ 的匹配的数量。
>
>$n\le 40$。

直接状压 $O(2^nn^2)$。

在一个合法匹配的基础上加上边 $(2\times i,2\times i+1)$，新图每个点 $1\le d_u\le 2$，一定是若干个链/环。并且新图只有 $\frac{n}{2}$ 个连通块，可以 $O(2^{\frac{n}{2}}n^2)$ 状压将 $S$ 这些连通块合在一起的权值。

然后枚举子集 $O(3^{\frac{n}{2}}n)$ 或[[ji-he-mi-ji-shu#^de2cbe|集合幂级数 exp]] $O(2^{\frac{n}{2}}(\frac{n}{2})^2)$。

```cpp
int n,m,c;
int e[maxn<<1],msk[1<<maxn];
int f[1<<maxn][maxn<<1],g[1<<maxn],dp[1<<maxn];
void work(){
	n=read();m=read();c=read();
	if(n&1)n++;
	for(int i=1;i<=m;i++){
		int u=read()-1,v=read()-1;
		e[u]|=1ll<<v,e[v]|=1ll<<u;
	}
	for(int s=0;s<(1<<n/2);s++){
		for(int i=0;i<n/2;i++)if(!(s&(1<<i)))msk[s]|=(1ll<<2*i)|(1ll<<2*i+1);
	}
	for(int i=0;i<n;i++)f[1<<i/2][i]=1;
	for(int s=0;s<(1<<n/2);s++){
		for(int i=0;i<n;i++)if(f[s][i]){
			for(int t=e[i]&msk[s];t;t&=t-1){
				int j=__builtin_ctzll(t);
				(f[s^(1<<j/2)][j^1]+=f[s][i]*c)%=mod;
			}
			g[s]+=f[s][i];
		}
	}
	for(int s=0;s<(1<<n/2);s++)g[s]=g[s]%mod*(mod+1)/2%mod;
	for(int mx=2;mx<=n;mx+=2){
		for(int s=(1<<mx/2-1);s<(1<<mx/2);s++)mems(f[s],0);
		f[1<<mx/2-1][mx-2]=1;
		for(int s=(1<<mx/2-1);s<(1<<mx/2);s++){
			for(int i=0;i<mx;i++)if(f[s][i]){
				for(int t=e[i]&msk[s]&((1ll<<mx)-1);t;t&=t-1){
					int j=__builtin_ctzll(t);
					(f[s^(1<<j/2)][j^1]+=f[s][i]*c)%=mod;
				}
				if(e[i]&(1ll<<mx-1))(g[s]+=f[s][i]*c)%=mod;
			}
		}
	}
	ni[0]=ni[1]=1;for(int i=2;i<=n/2;i++)ni[i]=(mod-mod/i)*ni[mod%i]%mod;
	xorexp(g,dp,n/2);
	printf("%lld\n",dp[(1<<n/2)-1]);
}
```

