---
title: 图计数
date: 2024-12-12 11:55:27
tags:
  - 笔记
  - 计数
published: true
hideInList: false
feature: 
isTop: false
---
### [无向连通图计数](https://www.luogu.com.cn/problem/P10982)

总方案数 $g_n=2^{\binom{n}{2}}$，减去不连通的方案数，枚举 $1$ 所在连通块的大小。

$$f_n=g_n-\sum_{i=1}^{n-1}\binom{n-1}{i-1}f_ig_{n-i}$$

加强版 [P4841](https://www.luogu.com.cn/problem/P4841)，分治 ntt 加速。

再进一步，$f=ln(g)$。

```cpp
int n;
int f[maxn],g[maxn];
int fac[maxn],inv[maxn];
using ploy::mul;
void sovle(int l,int r){
	if(l==r){
		f[l]=(g[l]+mod-f[l]*fac[l-1]%mod)%mod;
		return ;
	}
	int mid=l+r>>1;
	sovle(l,mid);
	vector<int> p(mid-l+1),q(r-l+1);
	for(int i=l;i<=mid;i++)p[i-l]=f[i]*inv[i-1]%mod;
	for(int i=1;i<=r-l;i++)q[i]=g[i]*inv[i]%mod;
	vector<int> ans=mul(p,q);
	for(int i=mid+1;i<=r;i++)inc(f[i],ans[i-l]);
	sovle(mid+1,r);
}
void work(){
	n=read();
	fac[0]=1;for(int i=1;i<=n;i++)fac[i]=fac[i-1]*i%mod;
	inv[n]=ksm(fac[n]);for(int i=n-1;~i;i--)inv[i]=inv[i+1]*(i+1)%mod;
	for(int i=1;i<=n;i++)g[i]=ksm(2,i*(i-1)/2);
	sovle(1,n);
	printf("%lld\n",f[n]);
}
```

#### [abc236h](https://www.luogu.com.cn/problem/AT_abc236_h)

钦定若干组组内相等，方案为 $\frac{m}{lcm (d_i)}$。状压，枚举包含 $mn_S$ 的子集乘方案数和容斥系数转移。

对于 $\binom{n}{2}$ 个不等关系钦定 $i$ 个相等相等的容斥系数为 $(-1)^i$。钦定组内相等的容斥系数为构成大小为 $siz$ 无向连通图的选边方案的容斥系数之和。

$n$ 个点乱连的系数为 $\sum_{i=0}^{\frac{n(n-1)}{2}}\binom{\frac{n(n-1)}{2}}{i} (-1)^i=[\frac{n(n-1)}{2}=0]=[n=1]$。减去不连通图的贡献，$n$ 个点的无向连通图的容斥系数和为 $f_n=[n=1]-\sum_{i=1}^{n-1}C(n-1,i-1)f_i[n-i==1]$。

#### 欧拉图计数

要求偶度数且连通。偶度数图的数量 $g_n=2^{\binom{n-1}{2}}$，$1,\dotsb,n-1$ 乱连，$n$ 调整。连通的计数同无向连通图计数。

### DAG计数

钦定入度为 $0$ 的点数，分配容斥系数使得 $\sum_{T\subseteq S}f(T)=1$。

赋 $(-1)^{|T|+1}$ 的容斥系数，对于真正的无入度点集合 $S$，$\sum_{T\subseteq S,T\neq \emptyset}(-1)^{|T|+1}=\sum_{i=1}^{|S|}\binom{|S|}{i}(-1)^{i+1}=\binom{|S|-1}{0}=1$。

$$f_n=\sum_{i=1}^n (-1)^{i+1}\binom{n}{i}2^{i(n-i)}f_{n-i}$$

更多操作：[[zi-tu-ji-shu#^ac0d14|子图上的应用]]。

### perfur 序列

$n$ 个点的数和长为 $n-2$ 值域 $[1,n]$ 的序列的双射。取出编号最小的叶子结点删去，将其父亲加 到序列末端。

n 个点有标号无根树数量 $n^{n-2}$。确定度数之后 $\frac{(n-2)!}{\prod (d_u-1)!}$。已经形成 $k$ 个连通块后 $(\sum s_i)^{k-2}\prod s_i$。

#### [P6596](https://www.luogu.com.cn/problem/P6596)

设 $dp_{i,j}$ 为 $i$ 个点 $j$ 条割边的 $j+1$ 个边双的大小之积。$dp_{i,j}=\sum_k \binom{i}{k} dp_{i-k,j-1}dp_{k,0}$。$j+1$ 个点双没有顺序，再除掉 $\frac{1}{(j+1)!}$。$dp_{i,0}$ 为大小为 $i$ 的无向连通图数量减去 $j>0$ 的 $dp_{i,j}$ 再乘 $i$。答案为 $\sum dp_{n,i}n^{i-1}$。