---
title: '集合幂级数'
date: 2025-05-20 18:41:27
tags: [笔记,数学]
published: true
hideInList: false
feature: 
isTop: false
---
### [位运算卷积](https://www.luogu.com.cn/problem/P4717)

有点错，原来 or 和 and 的卷积叫 FMT，xor 的卷积叫 FWT。我之前学的是什么东西。

#### or 卷积

集合并乘法：$(f*g)_S=\sum_{T1|T2=S} f_{T1}g_{T2}$。

设 $FMT(f)_S=\sum_{T\subseteq S} f_T$，也就是高维前缀和。$IFMT(f)$ 就是高维差分。

有 $FMT(A+B)=FMT(A)+FMT(B)$ 和 $FMT(f*g)_S=FMT(f)_SFMT(g)_S$。

and 卷积 则是向低维去前缀和？

这两个卷积根本就不用递归。

#### xor 卷积

$$c_i=\sum_{i=j\oplus k}a_jb_k$$

设 $FWT(f)_S=\sum_{T}(-1)^{popc(S\oplus T)} f_T$。然后可以递归：$fwt(a)=merge(fwt(a0)+fwt(a1),fwt(a0)-fwt(a1))$。

```code
void fmtor(int *a,int n,int w=1){
	for(int i=0;i<n;i++){
		for(int s=0;s<(1<<n);s++)if(s&(1<<i))(a[s]+=a[s^(1<<i)]*w)%=mod;
	}
}
void fmtand(int *a,int n,int w=1){
	for(int i=0;i<n;i++){
		for(int s=0;s<(1<<n);s++)if(s&(1<<i))(a[s^(1<<i)]+=a[s]*w)%=mod;
	}
}
void fwtxor(int *a,int n,int fl=1){
	for(int l=2;l<=n;l<<=1){
		int k=l>>1;
		for(int i=0;i<n;i+=l){
			for(int j=i;j<i+k;j++){
				int u=a[j],v=a[j+k];
				a[j]=(u+v)*fl%mod,a[j+k]=(u+mod-v)*fl%mod;
			}
		}
	}
}
int f[1<<17],g[1<<17];
void mulor(int *a,int *b,int *ans,int n){
	for(int i=0;i<(1<<n);i++)f[i]=a[i],g[i]=b[i];
	fmtor(f,n),fmtor(g,n);
	for(int i=0;i<(1<<n);i++)(f[i]*=g[i])%=mod;
	fmtor(f,n,mod-1);
	for(int i=0;i<(1<<n);i++)ans[i]=f[i],f[i]=g[i]=0;
}
void muland(int *a,int *b,int *ans,int n){
	for(int i=0;i<(1<<n);i++)f[i]=a[i],g[i]=b[i];
	fmtand(f,n),fmtand(g,n);
	for(int i=0;i<(1<<n);i++)(f[i]*=g[i])%=mod;
	fmtand(f,n,mod-1);
	for(int i=0;i<(1<<n);i++)ans[i]=f[i],f[i]=g[i]=0;
}
void mulxor(int *a,int *b,int *ans,int n){
	for(int i=0;i<(1<<n);i++)f[i]=a[i],g[i]=b[i];
	fwtxor(f,1<<n),fwtxor(g,1<<n);
	for(int i=0;i<(1<<n);i++)(f[i]*=g[i])%=mod;
	fwtxor(f,1<<n,(mod+1)/2);
	for(int i=0;i<(1<<n);i++)ans[i]=f[i],f[i]=g[i]=0;
}
```

### [子集卷积](https://www.luogu.com.cn/problem/P6097)

集合无交并乘法：$(f\times g)_S=\sum_{T1\cap T2=\varnothing,T1\cup T2=S} f_{T1}g_{T2}$。

等价于 $|T1|+|T2|=|S|$，所以取 $f'_S=f_Sx^{|S|}$，则 $(f\times g)_S=[x^{|S|}](f'*g')_S$。也称为占位多项式。

也即拆为 $n+1$ 个集合幂级数，集合幂级数做集合并乘法，集合幂级数间看做形式幂级数做加乘卷积。

逆着做形式幂级数部分就是 [求逆](https://www.luogu.com.cn/problem/P12232)。

### [exp](https://www.luogu.com.cn/problem/P12230) & [ln](https://www.luogu.com.cn/problem/P12231)

^de2cbe

弄出占位幂级数，对集合幂级数一维 fmt，对形式幂级数一维做 ln 和 exp。

泰勒展开：$f(x)=f_{x_0}+\sum\limits_{n=1}^{+\infty}\frac{f^{(n)}(x_{0})(x - x_{0})^n}{n!}$。所以有 $e^x=\sum_{i=0} \frac{x^i}{i!}$ 和 $ln(x+1)=\sum_{i=1} (-1)^{i+1}\frac{x^i}{i}$。

把 $x$ 当成集合幂级数，设 $g=exp(f)$，则 $g_S=\sum_{i\ge 0} \frac{(f^i)_S}{i!}$，其中乘法为无交并。exp 的组合意义即有序取 $i$ 个子集再消除顺序，可以对应到 $O(3^n)$ 枚举子集的卷积 $g_S=\sum_{T\subseteq S,lowbit(T)=lowbit(S)} f_Tg_{S\oplus T}$。ln 则为其逆运算。

### Code

```cpp
void fmt(int *a,int n,int w=1){
	for(int i=0;i<n;i++){
		for(int s=0;s<(1<<n);s++)if(s&(1<<i))(a[s]+=a[s^(1<<i)]*w)%=mod;
	}
}
int ff[maxn+1][1<<maxn],gg[maxn+1][1<<maxn],hh[1<<maxn],ni[maxn+1];
void xormul(int *a,int *b,int *c,int n){//a*b=c
	for(int i=0;i<=n;i++){
		for(int s=0;s<(1<<n);s++)ff[i][s]=gg[i][s]=0;
	}
	for(int s=0;s<(1<<n);s++)ff[__builtin_popcount(s)][s]=a[s];
	for(int s=0;s<(1<<n);s++)gg[__builtin_popcount(s)][s]=b[s];
	for(int i=0;i<=n;i++)fmt(ff[i],n,1);
	for(int i=0;i<=n;i++)fmt(gg[i],n,1);
	for(int s=0;s<(1<<n);s++){
		for(int i=0;i<=n;i++){
			hh[i]=0;
			for(int j=0;j<=i;j++)(hh[i]+=ff[j][s]*gg[i-j][s])%=mod;
		}
		for(int i=0;i<=n;i++)ff[i][s]=hh[i];
	}
	for(int i=0;i<=n;i++)fmt(ff[i],n,mod-1);
	for(int s=0;s<(1<<n);s++)c[s]=ff[__builtin_popcount(s)][s];
}
void xordiv(int *a,int *b,int *c,int n){//a/b=c
	for(int i=0;i<=n;i++){
		for(int s=0;s<(1<<n);s++)ff[i][s]=gg[i][s]=0;
	}
	for(int s=0;s<(1<<n);s++)ff[__builtin_popcount(s)][s]=a[s];
	for(int s=0;s<(1<<n);s++)gg[__builtin_popcount(s)][s]=b[s];
	for(int i=0;i<=n;i++)fmt(ff[i],n,1);
	for(int i=0;i<=n;i++)fmt(gg[i],n,1);
	for(int s=0;s<(1<<n);s++){
		int nig=ksm(gg[0][s]);
		for(int i=0;i<=n;i++){
			hh[i]=ff[i][s];
			for(int j=1;j<=i;j++)(hh[i]+=mod-gg[j][s]*hh[i-j]%mod)%=mod;
			hh[i]=hh[i]*nig%mod;
		}
		for(int i=0;i<=n;i++)ff[i][s]=hh[i];
	}
	for(int i=0;i<=n;i++)fmt(ff[i],n,mod-1);
	for(int s=0;s<(1<<n);s++)c[s]=ff[__builtin_popcount(s)][s];
}
void xorni(int *a,int *b,int n){//b=1/a
	for(int i=0;i<=n;i++){
		for(int s=0;s<(1<<n);s++)ff[i][s]=0;
	}
	for(int s=0;s<(1<<n);s++)ff[__builtin_popcount(s)][s]=a[s];
	for(int i=0;i<=n;i++)fmt(ff[i],n,1);
	for(int s=0;s<(1<<n);s++){
		int nif=ksm(ff[0][s]);
		for(int i=0;i<=n;i++){
			hh[i]=1;
			for(int j=1;j<=i;j++)(hh[i]+=mod-ff[j][s]*hh[i-j]%mod)%=mod;
			hh[i]=hh[i]*nif%mod;
		}
		for(int i=0;i<=n;i++)ff[i][s]=hh[i];
	}
	for(int i=0;i<=n;i++)fmt(ff[i],n,mod-1);
	for(int s=0;s<(1<<n);s++)b[s]=ff[__builtin_popcount(s)][s];
}
void xorln(int *a,int *b,int n){//exp(a)=b
	for(int i=0;i<=n;i++){
		for(int s=0;s<(1<<n);s++)ff[i][s]=0;
	}
	for(int s=0;s<(1<<n);s++)ff[__builtin_popcount(s)][s]=a[s];
	for(int i=0;i<=n;i++)fmt(ff[i],n,1);
	for(int s=0;s<(1<<n);s++){
		for(int i=0;i<n;i++){
			hh[i]=ff[i+1][s]*(i+1)%mod;
			for(int j=1;j<=i;j++)(hh[i]+=mod-ff[j][s]*hh[i-j]%mod)%=mod;
		}
		for(int i=1;i<=n;i++)ff[i][s]=hh[i-1]*ni[i]%mod;
	}
	for(int i=1;i<=n;i++)fmt(ff[i],n,mod-1);
	b[0]=0;for(int s=0;s<(1<<n);s++)b[s]=ff[__builtin_popcount(s)][s];
}
void xorexp(int *a,int *b,int n){//ln(a)=b
	for(int i=0;i<=n;i++){
		for(int s=0;s<(1<<n);s++)ff[i][s]=0;
	}
	for(int s=0;s<(1<<n);s++)ff[__builtin_popcount(s)][s]=a[s];
	for(int i=0;i<=n;i++)fmt(ff[i],n,1);
	for(int s=0;s<(1<<n);s++){
		for(int i=0;i<n;i++){
			hh[i]=ff[i+1][s]*(i+1)%mod;
			for(int j=1;j<=i;j++)(hh[i]+=ff[j][s]*j%mod*hh[i-j]%mod*ni[i-j+1])%=mod;
		}
		for(int i=1;i<=n;i++)ff[i][s]=hh[i-1]*ni[i]%mod;
	}
	for(int i=1;i<=n;i++)fmt(ff[i],n,mod-1);
	b[0]=1;for(int s=1;s<(1<<n);s++)b[s]=ff[__builtin_popcount(s)][s];
}
```
