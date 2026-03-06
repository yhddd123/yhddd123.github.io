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

and 卷积 则是向低维去前缀和。

UPD：但是，事实上，FWT 版本的写法常数小得多。

#### xor 卷积

$$c_i=\sum_{i=j\oplus k}a_jb_k$$

设 $FWT(f)_S=\sum_{T}(-1)^{popc(S\oplus T)} f_T$。然后可以递归：$fwt(a)=merge(fwt(a0)+fwt(a1),fwt(a0)-fwt(a1))$。

```cpp
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

还可以拓展。对于只要求一部分无交，可以对 $|S\cap Ban|$ 做占位多项式。见 [CF2070F](https://www.luogu.com.cn/problem/CF2070F)。

### [exp](https://www.luogu.com.cn/problem/P12230) & [ln](https://www.luogu.com.cn/problem/P12231)

^de2cbe

弄出占位幂级数，对集合幂级数一维 fmt，对形式幂级数一维做 $O(n^2)$ 的 [[duo-xiang-shi-ji-shu#^b04eea|ln 和 exp]]。

把 $x$ 当成集合幂级数，设 $g=exp(f)$，则 $g_S=\sum_{i\ge 0} \frac{(f^i)_S}{i!}$，其中乘法为无交并。exp 的组合意义即有序取 $i$ 个子集再消除顺序，可以对应到 $O(3^n)$ 枚举子集的卷积 $g_S=\sum_{T\subseteq S,lowbit(T)=lowbit(S)} f_Tg_{S\oplus T}$。ln 则为其逆运算。

注意到在保证 $[x^{\empty}]F(x)=0$ 的时候，exp 只用保留前 $n+1$ 项。 

### Code

注意访问连续性。

```cpp
inline void inc(int &u,int v){((u+=v)>=mod)&&(u-=mod);}
int ff[maxn+1][1<<maxn],gg[maxn+1][1<<maxn];
void fmt1(int *a,int n){
	for(int l=2;l<=n;l<<=1){
		int k=l>>1;
		for(int i=0;i<n;i+=l){
			for(int j=i;j<i+k;j++)inc(a[j+k],a[j]);
		}
	}
}
void fmt2(int *a,int n){
	for(int l=2;l<=n;l<<=1){
		int k=l>>1;
		for(int i=0;i<n;i+=l){
			for(int j=i;j<i+k;j++)inc(a[j+k],mod-a[j]);
		}
	}
}
int tf[maxn+1],tg[maxn+1],hh[maxn+1],ni[maxn+1];
void xormul(int *a,int *b,int *c,int n){
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
			hh[i]=0;
			for(int j=0;j<=i;j++)inc(hh[i],1ll*tf[j]*tg[i-j]%mod);
		}
		for(int i=0;i<=n;i++)ff[i][s]=hh[i];
	}
	for(int i=0;i<=n;i++)fmt2(ff[i],1<<n);
	for(int s=0;s<(1<<n);s++)inc(c[s],ff[__builtin_popcount(s)][s]);
}
void xorni(int *a,int *b,int n){//b=1/a
	for(int i=0;i<=n;i++){
		for(int s=0;s<(1<<n);s++)ff[i][s]=0;
	}
	for(int s=0;s<(1<<n);s++)ff[__builtin_popcount(s)][s]=a[s];
	for(int i=0;i<=n;i++)fmt1(ff[i],1<<n);
	for(int s=0;s<(1<<n);s++){
		for(int i=0;i<=n;i++)tf[i]=ff[i][s];
		int nif=ksm(tf[0]);
		for(int i=0;i<=n;i++){
			hh[i]=1;
			for(int j=1;j<=i;j++)inc(hh[i],mod-1ll*tf[j]*hh[i-j]%mod);
			hh[i]=1ll*hh[i]*nif%mod;
		}
		for(int i=0;i<=n;i++)ff[i][s]=hh[i];
	}
	for(int i=0;i<=n;i++)fmt2(ff[i],1<<n);
	for(int s=0;s<(1<<n);s++)b[s]=ff[__builtin_popcount(s)][s];
}
void xorexp(int *a,int *b,int n){//exp(a)=b
	ni[0]=ni[1]=1;for(int i=2;i<=n;i++)ni[i]=1ll*(mod-mod/i)*ni[mod%i]%mod;
	for(int i=0;i<=n;i++){
		for(int s=0;s<(1<<n);s++)ff[i][s]=0;
	}
	for(int s=0;s<(1<<n);s++)ff[__builtin_popcount(s)][s]=a[s];
	for(int i=0;i<=n;i++)fmt1(ff[i],1<<n);
	for(int s=0;s<(1<<n);s++){
		for(int i=0;i<=n;i++)hh[i]=0;
		for(int i=0;i<=n;i++)tf[i]=ff[i][s];
		for(int i=0;i<=n;i++){
			if(i<n)hh[i]=1ll*tf[i+1]*(i+1)%mod;
			for(int j=1;j<=i;j++)inc(hh[i],1ll*tf[j]*j%mod*hh[i-j]%mod*ni[i-j+1]%mod);
		}
		for(int i=1;i<=n;i++)ff[i][s]=1ll*hh[i-1]*ni[i]%mod;
	}
	for(int i=0;i<=n;i++)fmt2(ff[i],1<<n);
	b[0]=1;for(int s=1;s<(1<<n);s++)b[s]=ff[__builtin_popcount(s)][s];
}
void xorln(int *a,int *b,int n){//ln(a)=b
	ni[0]=ni[1]=1;for(int i=2;i<=n;i++)ni[i]=1ll*(mod-mod/i)*ni[mod%i]%mod;
	for(int i=0;i<=n;i++){
		for(int s=0;s<(1<<n);s++)ff[i][s]=0;
	}
	for(int s=0;s<(1<<n);s++)ff[__builtin_popcount(s)][s]=a[s];
	for(int i=0;i<=n;i++)fmt1(ff[i],1<<n);
	for(int s=0;s<(1<<n);s++){
		for(int i=0;i<=n;i++)hh[i]=0;
		for(int i=0;i<=n;i++)tf[i]=ff[i][s];
		for(int i=0;i<n;i++){
			hh[i]=1ll*tf[i+1]*(i+1)%mod;
			for(int j=1;j<=i;j++)inc(hh[i],mod-1ll*tf[j]*hh[i-j]%mod);
		}
		for(int i=1;i<=n;i++)ff[i][s]=1ll*hh[i-1]*ni[i]%mod;
	}
	for(int i=0;i<=n;i++)fmt2(ff[i],1<<n);
	b[0]=0;for(int s=1;s<(1<<n);s++)b[s]=ff[__builtin_popcount(s)][s];
}
```

### 半在线子集卷积

$$f_S=\sum_{S\subset T} f_Tg_{S-T}$$

按 $|S|$ 从小到大分批转移。复杂度 $O(\sum i^22^i)=O(n^22^n)$。

### 非质数模数 [exp](https://www.luogu.com.cn/problem/P13843) & [ln](https://www.luogu.com.cn/problem/P13844)

^822222

直接 fmt 然后 $O(n^2)$ 做形式幂级数运算需要求逆元，不一定有。

从组合意义出发。

exp：$f_S=\sum_{T\subset S,hb(S)=hb(T)} g_Tf_{S-T}$。那就挖掉 high bit 然后对剩下的子集卷积即可。

```cpp
int tmp[1<<maxn];
void exp(int *a,int n){
	for(int s=0;s<(1<<n);s++)tmp[s]=a[s],a[s]=0;
	a[0]=1;for(int i=0;i<n;i++)xormul(tmp+(1<<i),a,a+(1<<i),i);
}
```

ln：$f_S=g_S-\sum_{T\subset S,hb(S)=hb(T)}f_Tg_{S-T}$。那就挖掉 high bit 然后对剩下的半在线子集卷积。

```cpp
void mulself(int *a,int *b,int n){
	for(int i=0;i<=n;i++){
		for(int s=0;s<(1<<n);s++)ff[i][s]=gg[i][s]=0;
	}
	for(int s=0;s<(1<<n);s++)ff[__builtin_popcount(s)][s]=a[s];
	for(int s=0;s<(1<<n);s++)gg[__builtin_popcount(s)][s]=b[s];
	for(int i=0;i<=n;i++)fmt1(ff[i],1<<n);
	for(int i=0;i<=n;i++)fmt1(gg[i],1<<n);
	for(int i=0;i<=n;i++){
		fmt2(gg[i],1<<n);
		for(int s=0;s<(1<<n);s++)if(__builtin_popcount(s)==i)gg[i][s]=mod-gg[i][s],inc(gg[i][s],a[s|(1<<n)]);
		fmt1(gg[i],1<<n);
		for(int j=i+1;j<=n;j++){
			for(int s=0;s<(1<<n);s++)inc(gg[j][s],1ll*gg[i][s]*ff[j-i][s]%mod);
		}
	}
	for(int i=0;i<=n;i++)fmt2(gg[i],1<<n);
	for(int s=0;s<(1<<n);s++)b[s]=gg[__builtin_popcount(s)][s];
}
void ln(int *a,int n){
	for(int s=0;s<(1<<n);s++)tmp[s]=a[s],a[s]=0;
	for(int i=0;i<n;i++)mulself(tmp,a+(1<<i),i);
}
```

exp 会比普通版本快一点？

#### 更进一步？

如果不仅没有逆元，还不可减，如何呢？

可能必须要题目有特殊的性质。

[Q8005](https://qoj.ac/contest/1475/problem/8005)

> 划分为若干个集合，每个集合重量 $\le lim$，集合权值为元素最大值，最小化所有集合权值之和，求方案数。

$f_S=\sum_{T\subset S,hb(S)=hb(T),sum_S\le lim}\{\max_{i\in T}a_i,1\}\times f_{S-T}$。运算为 $(\max,+)$。形式为 exp。

按 $a_i$ 排序，权值只与 $lb(S)$ 有关。

折半。有 $L\subset L',R\subset R',hb(R)\neq hb(R')$，枚举 $L,R'$，同时考虑所有 $LR$ 向 $L'R'$ 的转移。提前预处理 $L$ 的超集和 $R'$ 的子集，按 $sum_S$ 排序，双指针，复杂度 $O(2^{n/2}3^{n/2})=O(\sqrt 6^n)$。

或许可以再研究一下。

### [多项式复合集合幂级数](https://www.luogu.com.cn/problem/P10461)

求 $G(F(x))$。$[x^S]G(F(x))=\sum_{i=0}^n g_i[x^S]F^i(x)$。

组合意义：每次划掉一个包含 $hb(S)$ 的集合，划 $k$ 次有 $g_kk!$ 的系数。

设 $h_{i,j,S}$ 表示当先 $hb(S)$ 要为 $i$，还剩 $j$ 次要划的答案。初始 $h_{0,0,\empty}=g_kk!$，转移是不选或子集卷积上 $hb(S)=i$ 的 $a_S$。

```cpp
void xormul1(int *a,int *c,int n){
	for(int i=0;i<=n;i++){
		for(int s=0;s<(1<<n);s++)ff[i][s]=0;
	}
	for(int s=0;s<(1<<n);s++)ff[__builtin_popcount(s)][s]=a[s];
	for(int i=0;i<=n;i++)fmt1(ff[i],1<<n);
	for(int s=0;s<(1<<n);s++){
		for(int i=0;i<=n;i++)tf[i]=ff[i][s];
		for(int i=0;i<=n;i++)tg[i]=gg[i][s];
		for(int i=0;i<=n;i++){
			th[i]=0;
			for(int j=0;j<=i;j++)inc(th[i],1ll*tf[j]*tg[i-j]%mod);
		}
		for(int i=0;i<=n;i++)ff[i][s]=th[i];
	}
	for(int i=0;i<=n;i++)fmt2(ff[i],1<<n);
	for(int s=0;s<(1<<n);s++)inc(c[s],ff[__builtin_popcount(s)][s]);
}
int hh[maxn+1][1<<maxn];
void comp(int *a,int *b,int *c,int n){
	for(int i=0;i<=n;i++){
		for(int j=1;j<=i;j++)b[i]=1ll*b[i]*j%mod;
	}
	for(int i=0;i<=n;i++)hh[i][0]=b[i];
	for(int i=1;i<=n;i++){
		for(int j=0;j<i;j++){
			for(int s=0;s<(1<<i-1);s++)gg[j][s]=0;
		}
		for(int s=0;s<(1<<i-1);s++)gg[__builtin_popcount(s)][s]=a[s+(1<<i-1)];
		for(int j=0;j<i;j++)fmt1(gg[j],1<<i-1);
		for(int j=1;j<=n-i+1;j++){
			xormul1(hh[j],hh[j-1]+(1<<i-1),i-1);
		}
	}
	for(int s=0;s<(1<<n);s++)c[s]=hh[0][s];
}
```

在做 ln exp 上不如普通版本。

但更通用，比如 [k-exp](https://loj.ac/p/154) 之类的题目就不用推 $O(n^2)$ 的式子了。

#### 转置

^4864c7

没完，还可以转置。

[P14270 我们爱森林](https://www.luogu.com.cn/problem/P14270)。

对每个 $i$ 求 $[x^U]F^iG$。

选 $i$ 个拼起来，正着加 high bit $2^nn^3$。倒着删 high bit，设 $h_{i,S}$ 已经删 $i$ 次剩 $S$，每次 $T\subseteq S,hb(T)=hb(S),h_{i,S}f_T\to f_{i-1,S-T}$。子集差卷积。

```cpp
void xormul2(int *a,int *c,int n){
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
			for(int j=0;j<=i;j++)inc(th[i],1ll*tf[j]*tg[i-j]%mod);
		}
		for(int i=0;i<=n;i++)ff[i][s]=th[i];
	}
	for(int i=0;i<=n;i++)fmt2(ff[i],1<<n);
	for(int s=0;s<(1<<n);s++)inc(c[s^((1<<n)-1)],ff[__builtin_popcount(s)][s]);
}
int hh[maxn+1][1<<maxn];
void comptrans(int *a,int *b,int *c,int n){
	for(int s=0;s<(1<<n);s++)hh[0][(1<<n)-1-s]=b[s];
	hh[0][(1<<n)-1]=1;
	for(int i=n;i;i--){
		for(int j=0;j<i;j++){
			for(int s=0;s<(1<<i-1);s++)gg[j][s]=0;
		}
		for(int s=0;s<(1<<i-1);s++)gg[__builtin_popcount(s)][s]=a[s+(1<<i-1)];
		for(int j=0;j<i;j++)fmt1(gg[j],1<<i-1);
		for(int j=n-i+1;j;j--){
			xormul2(hh[j-1]+(1<<i-1),hh[j],i-1);
		}
	}
	for(int i=0;i<=n;i++)c[i]=hh[i][0];
}
```

