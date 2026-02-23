---
title: 'AT_xmascon22_f 题解'
date: 2026-01-28 18:34:29
tags: [题解,dp]
published: true
hideInList: false
feature: 
isTop: false
---
[AT_xmascon22_f](https://www.luogu.com.cn/problem/AT_xmascon22_f)

数 [[tu-k-pi-pei-shu|图 k 匹配数]]。$\bmod 2^{64}$。

做这道题的时候已经完全忘了为什么之前做 [Fast as Ryser](https://qoj.ac/contest/449/problem/2068) 的时候没有接着做这道。现在感觉，两个并不是一个级别的题。

前面是一样的，非常牛的是你可以把点数补成偶数，在图中加上 $\frac{n}{2}$ 条 $(2i,2i+1)$ 边。这样一个匹配加上新边的新图，每个点度数 $\le 2$，是一堆环和链拼起来，且现在只剩 $\frac{n}{2}$ 个点。

环可以枚举整个环最大的点，然后 dp。链直接 dp 会把每个链算两遍，但 $2^{64}$ 下 $2$ 没有逆元，倒闭了。也只能枚举链上最大的点，变成 $2i$ 出发一条链和 $2i+1$ 出发一条链，分步转移。每个 $i$ 的复杂度  $O(2^ii^2)$，总复杂度 $O(2^{\frac{n}{2}}n^2)$。

然后现在你有两个集合幂级数 $g$ 和 $h$，第 $S$ 位分别表示把 $S$ 连成一个环、一条链的方案数。发现大小为 $k$ 的匹配数即 $\frac{n}{2}$ 减去图中链的数量。那就是对每个 $i$ 求 $ans_{\frac{n}{2}-i}=[x^U](\exp(g)h^i)$。

先把 exp 做了，要 [[ji-he-mi-ji-shu#^822222|非素数模数 exp ]]。剩下的是 $\frac{n}{2}$ 个 $gh^i$ 在全集的系数。这不是 [[ji-he-mi-ji-shu#^4864c7|我们爱森林]] 干的事吗。这里还要乘 $g$，就是有一个初值。

最后还是 $O(2^{\frac{n}{2}}n^2)$，集合幂级数部分似乎并没有很慢。

```cpp
ull ff[maxn+1][1<<maxn],gg[maxn+1][1<<maxn];
void fmt1(ull *a,int n){
	for(int l=2;l<=n;l<<=1){
		int k=l>>1;
		for(int i=0;i<n;i+=l){
			for(int j=i;j<i+k;j++)a[j+k]+=a[j];
		}
	}
}
void fmt2(ull *a,int n){
	for(int l=2;l<=n;l<<=1){
		int k=l>>1;
		for(int i=0;i<n;i+=l){
			for(int j=i;j<i+k;j++)a[j+k]-=a[j];
		}
	}
}
ull tf[maxn+1],tg[maxn+1],th[maxn+1];
void xormul(ull *a,ull *b,ull *c,int n){
	for(int i=0;i<=n;i++){
		for(int s=0;s<(1<<n);s++)ff[i][s]=gg[i][s]=0;
	}
	for(int s=0;s<(1<<n);s++)ff[__builtin_popcount(s)][s]=a[s];
	for(int s=0;s<(1<<n);s++)gg[__builtin_popcount(s)][s]=b[s];
	for(int i=0;i<=n;i++)fmt1(ff[i],1<<n);
	for(int i=0;i<=n;i++)fmt1(gg[i],1<<n);
	for(int s=0;s<(1<<n);s++){
		for(int i=0;i<=n;i++)tf[i]=ff[i][s];
		for(int i=0;i<=n;i++)tg[i]=gg[i][s];
		for(int i=0;i<=n;i++){
			th[i]=0;
			for(int j=0;j<=i;j++)th[i]+=tf[j]*tg[i-j];
		}
		for(int i=0;i<=n;i++)ff[i][s]=th[i];
	}
	for(int i=0;i<=n;i++)fmt2(ff[i],1<<n);
	for(int s=0;s<(1<<n);s++)c[s]+=ff[__builtin_popcount(s)][s];
}
void exp(ull *a,ull *b,int n){
	b[0]=1;
	for(int i=0;i<n;i++)xormul(a+(1<<i),b,b+(1<<i),i);
}
void xormul1(ull *a,ull *c,int n){
	for(int i=0;i<=n;i++){
		for(int s=0;s<(1<<n);s++)ff[i][s]=0;
	}
	for(int s=0;s<(1<<n);s++)ff[__builtin_popcount(s)][s]=a[s^((1<<n)-1)];
	for(int i=0;i<=n;i++)fmt1(ff[i],1<<n);
	for(int s=0;s<(1<<n);s++){
		for(int i=0;i<=n;i++)tf[i]=ff[i][s];
		for(int i=0;i<=n;i++)tg[i]=gg[i][s];
		for(int i=0;i<=n;i++){
			th[i]=0;
			for(int j=0;j<=i;j++)th[i]+=tf[j]*tg[i-j];
		}
		for(int i=0;i<=n;i++)ff[i][s]=th[i];
	}
	for(int i=0;i<=n;i++)fmt2(ff[i],1<<n);
	for(int s=0;s<(1<<n);s++)c[s^((1<<n)-1)]+=ff[__builtin_popcount(s)][s];
}
ull hh[maxn+1][1<<maxn];
void comptrans(ull *a,ull *b,ull *c,int n){
	for(int s=0;s<(1<<n);s++)hh[0][(1<<n)-1-s]=b[s];
	for(int i=n;i;i--){
		for(int j=0;j<i;j++){
			for(int s=0;s<(1<<i-1);s++)gg[j][s]=0;
		}
		for(int s=0;s<(1<<i-1);s++)gg[__builtin_popcount(s)][s]=a[s+(1<<i-1)];
		for(int j=0;j<i;j++)fmt1(gg[j],1<<i-1);
		for(int j=n-i+1;j;j--){
			xormul1(hh[j-1]+(1<<i-1),hh[j],i-1);
		}
	}
	for(int i=0;i<=n;i++)c[i]=hh[i][0];
}

int n,N;ull a[maxn<<1][maxn<<1];
ull msk[1<<maxn];
ull f[1<<maxn][maxn<<1],g[1<<maxn],h[1<<maxn];
ull ans[maxn+1];
void work(){
	N=n=read();
	for(int i=0;i<n;i++){
		for(int j=0;j<n;j++)a[i][j]=read();
	}
	if(n&1)n++;
	for(int s=0;s<(1<<n/2);s++){
		for(int i=0;i<n/2;i++)if(!(s&(1<<i)))msk[s]|=(1ll<<2*i)|(1ll<<2*i+1);
	}
	for(int mx=2;mx<=n;mx+=2){
		for(int s=(1<<mx/2-1);s<(1<<mx/2);s++)mems(f[s],0);
		f[1<<mx/2-1][mx-2]=1;
		for(int s=(1<<mx/2-1);s<(1<<mx/2);s++){
			for(int i=0;i<mx;i++)if(f[s][i]){
				for(ull t=msk[s]&((1ll<<mx)-1);t;t&=t-1){
					int j=__builtin_ctzll(t);
					f[s^(1<<j/2)][j^1]+=f[s][i]*a[i][j];
				}
				h[s]+=f[s][i]*a[mx-1][i];
			}
		}
	}
	exp(h,g,n/2);
	for(int s=0;s<(1<<n/2);s++)h[s]=g[s],g[s]=0;
	for(int mx=2;mx<=n;mx+=2){
		for(int s=(1<<mx/2-1);s<(1<<mx/2);s++)mems(f[s],0);
		f[1<<mx/2-1][mx-2]=1;
		for(int s=(1<<mx/2-1);s<(1<<mx/2);s++){
			for(int i=0;i<mx;i++)if(f[s][i]){
				for(ull t=msk[s]&((1ll<<mx)-1);t;t&=t-1){
					int j=__builtin_ctzll(t);
					f[s^(1<<j/2)][j^1]+=f[s][i]*a[i][j];
				}
			}
			for(int i=0;i<mx-1;i++)if(f[s][i])f[s][mx-1]+=f[s][i],f[s][i]=0;
		}
		for(int s=(1<<mx/2-1);s<(1<<mx/2);s++){
			for(int i=0;i<mx;i++)if(f[s][i]){
				for(ull t=msk[s]&((1ll<<mx)-1);t;t&=t-1){
					int j=__builtin_ctzll(t);
					f[s^(1<<j/2)][j^1]+=f[s][i]*a[i][j];
				}
				g[s]+=f[s][i];
			}
		}
	}
	// for(int s=0;s<(1<<n/2);s++)cout<<g[s]<<" ";cout<<"\n";
	// for(int s=0;s<(1<<n/2);s++)cout<<h[s]<<" ";cout<<"\n";
	comptrans(g,h,ans,n/2);
	reverse(ans,ans+n/2+1);
	for(int i=0;i<=N/2;i++)printf("%llu ",ans[i]);
}
```



哦，最后看一眼洛谷题解，怎么这么短。原来以上所有步骤都是按住 high bit 在做，那为什么不直接对着 high bit 同时做以上所有事情，一个 dp 就完了。