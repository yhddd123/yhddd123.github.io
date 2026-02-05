---
title: '格路计数'
date: 2025-11-25 22:33:51
tags: [笔记,计数]
published: true
hideInList: false
feature: 
isTop: false
---
[[浅谈再谈格路计数 吴畅.pdf]] 学习笔记。

#### 反射容斥

从 $(0,0)$ 到 $(n,m)$，无额外限制：$\binom{n+m}{n}$。

从 $(0,0)$ 到 $(n,m)$ 始终不与 $y=x+b$ 相交：$\binom{n+m}{n}-\binom{n+m}{n+b}$。将第一个交点反射过去，不合法的情况等价于从 $(-b,b)$ 到 $(n,m)$。

特别的，从 $(0,0)$ 到 $(n,n)$ 不经过 $y=x+1$ 即 $cat_n=\frac{\binom{2n}{n}}{n+1}$。

对于双边界，从 $(0,0)$ 到 $(n,m)$ 不经过 $y=x+l$ 和 $y=x+r$：$\sum_k \binom{n+m}{n-k(r-l)}-\binom{n+m}{n-k(r-l)+r}$。只有 $O(\frac{n+m}{r-l})$ 个位置有值。 ^85b7de

对于斜率有理数直线：待补。

#### 阶梯型格路

^103a08

给定不降 $a_i$。从 $(0,0)$ 到 $(n,m)$ 且路径上的 $(x,y)$ 满足 $y\le a_x$。

直接 dp $O(nm)$。可以只对其中一维容斥，$O(n^2+m)$。对于 $k$ 个障碍点，$O(k^2+n+m)$。

转化为计数 $b_i\le a_i$，$b_i$ 不降。对 $b_i$ 容斥，复杂度 $O(n^2)$。

分治 ntt 优化原始 dp。```sovle(l,r)``` 表示传入 $f_{*,a_l}$，返回 $f_{r,*}$ 的一个函数。分治左边得到 $f_{mid,*}$。此时 $mid<x\le r,a_l\le j\le a_{mid}$ 的部分是无限制的矩形，分治 ntt 可得出改矩形的右侧和上侧边界。上侧边界传入右边的分治，返回 $f_{r,*}$ 大于 $a_{mid+1}$ 的部分。拼起来即得到 $f_{r,*}$。

[Q14730](https://qoj.ac/contest/2609/problem/14730)

```cpp
int a[maxn];
int f[110][110];
vector<int> sovle(int l,int r,int p,vector<int> &dw){
	if(r-l+1+a[r]-p+1<=100){
		for(int i=0;i<=r-l;i++)f[i][0]=dw[i];
		for(int i=0;i<=r-l;i++){
			for(int j=1;j<=a[i+l]-p;j++){
				f[i][j]=f[i][j-1];
				(i&&j<=a[i+l-1]-p)&&(inc(f[i][j],f[i-1][j]),0);
			}
		}
		vector<int> ans(a[r]-p+1);
		for(int i=0;i<=a[r]-p;i++)ans[i]=f[r-l][i];
		return ans;
	}
	if(l==r){
		vector<int> ans(a[l]-p+1,dw[0]);
		return ans;
	}
	int mid=l+r>>1;
	vector<int> dwl=dw;dwl.resize(mid-l+1);
	vector<int> mf=sovle(l,mid,p,dwl);
	vector<int> ans(a[r]-p+1),dwr(r-mid);
	{
		vector<int> ff(mf.size()),gg(r-mid+1+ff.size());
		for(int i=1;i<ff.size();i++)ff[i]=mf[i]*1ll*inv[a[mid]-p-i]%mod;
		for(int i=0;i<gg.size();i++)gg[i]=fac[i];
		ff=poly::mul(ff,gg);
		for(int i=0;i<r-mid;i++)inc(dwr[i],ff[i+a[mid]-p]*1ll*inv[i]%mod);
		// for(int i=1;i<=a[mid]-p;i++){
			// for(int j=0;j<r-mid;j++)(dwr[j]+=mf[i]*1ll*C(j+a[mid]-p-i,j))%=mod;
		// }
	}
	{
		vector<int> ff(r-mid),gg(r-mid);
		for(int i=0;i<r-mid;i++)ff[i]=dw[i+mid-l+1];
		for(int i=0;i<r-mid;i++)gg[i]=C(i+a[mid]-p-1,a[mid]-p-1);
		ff=poly::mul(ff,gg);
		for(int i=0;i<r-mid;i++)inc(dwr[i],ff[i]);
		// for(int i=0;i<r-mid;i++){
			// for(int j=i;j<r-mid;j++)(dwr[j]+=dw[i+mid-l+1]*1ll*C(j-i+a[mid]-p-1,a[mid]-p-1))%=mod;
		// }
	}
	{
		vector<int> ff(a[mid]-p+1),gg(a[mid]-p+1);
		for(int i=1;i<=a[mid]-p;i++)ff[i]=mf[i];
		for(int i=0;i<=a[mid]-p;i++)gg[i]=C(r-mid-1+i,r-mid-1);
		ff=poly::mul(ff,gg);
		for(int i=1;i<=a[mid]-p;i++)inc(ans[i],ff[i]);
		// for(int i=1;i<=a[mid]-p;i++){
			// for(int j=i;j<=a[mid]-p;j++)(ans[j]+=mf[i]*1ll*C(r-mid-1+j-i,r-mid-1))%=mod;
		// }
	}
	{
		vector<int> ff(r-mid),gg(r-mid-1+a[mid]-p);
		for(int i=0;i<r-mid;i++)ff[i]=dw[i+mid-l+1]*1ll*inv[r-mid-1-i]%mod;
		for(int i=0;i<gg.size();i++)gg[i]=fac[i];
		ff=poly::mul(ff,gg);
		for(int i=1;i<=a[mid]-p;i++)inc(ans[i],ff[r-mid-1+i-1]*1ll*inv[i-1]%mod);
		// for(int i=0;i<r-mid;i++){
			// for(int j=1;j<=a[mid]-p;j++)(ans[j]+=dw[i+mid-l+1]*1ll*C(r-mid-1-i+j-1,j-1))%=mod;
		// }
	}
	ans[0]=dw[r-mid];
	if(a[mid]==p){
		for(int i=0;i<r-mid;i++)dwr[i]=dw[i+mid-l+1];
	}
	vector<int> rf=sovle(mid+1,r,a[mid],dwr);
	for(int i=a[mid]+1;i<=a[r];i++)ans[i-p]=rf[i-a[mid]];
	return ans;
}
```

#### 拐点

^40d3b1

不按论文来了。感觉按论文分别数 右上 和 上右 拐点，似乎并不很好合起来做。不过似乎论文的推法非常自然。

称走路方向变化为一个拐点。数恰好 $k$ 个拐点的格路数。

可以用一个两维独立的递增的 $(p_i,q_i)$ 描述拐点信息。

对于无限制：

$$f(n,m,k)=\left\{ \begin{aligned} 2\binom{n-1}{\frac{k+1}{2}-1}\binom{m-1}{\frac{k+1}{2}-1} & & k\bmod 2=1\\ \binom{n-1}{\frac{k}{2}}\binom{m-1}{\frac{k}{2}-1}+\binom{n-1}{\frac{k}{2}-1}\binom{m-1}{\frac{k}{2}} & & k\bmod 2=0  \end{aligned} \right. $$

不碰到 $y=x+b$ 的格路：不合法的从 $(-b,b)$ 到 $(n,m)$，有可能变成 $k\pm 1$ 个拐点，非常爆炸。逆天的双射是：找到第一个交点，枚举接下来先往上 $i\ge 0$ 步，然后在向右一步，删掉这部分，这样一定剩 $k-1$ 个拐点。$F(n,m,b,k)=f(n,m,k)-\sum_{i\ge 0}f(n-b+1,m-b-i,k-1)$。上指标求和。最后：

$$F(n,m,b,k)=\left\{ \begin{aligned} 2\binom{n-1}{\frac{k+1}{2}-1}\binom{m-1}{\frac{k+1}{2}-1}-\binom{n+b-2}{\frac{k-1}{2}}\binom{m-b}{\frac{k-1}{2}}-\binom{n+b-2}{\frac{k-1}{2}-1}\binom{m-b}{\frac{k-1}{2}+1} & & k\bmod 2=1\\ \binom{n-1}{\frac{k}{2}}\binom{m-1}{\frac{k}{2}-1}+\binom{n-1}{\frac{k}{2}-1}\binom{m-1}{\frac{k}{2}}-2\binom{n+b-2}{\frac{k}{2}-1}\binom{m-b}{\frac{k}{2}} & & k\bmod 2=0  \end{aligned} \right. $$

舒适了。不知道有没有抄错，通过了 [agc070c](https://www.luogu.com.cn/problem/AT_agc070_c)。

以上应该不能再化简了。

不知道能不能拓展到双边界，这个组合意义有点破防。但是论文的只数一种拐点可以，待补。

```cpp
int calc(int n,int m,int k){
	if((!n||!m))return !k;
	if(k&1){
		return 2*C(n-1,(k+1)/2-1)*C(m-1,(k+1)/2-1)%mod;
	}
	else{
		return (C(n-1,k/2)*C(m-1,k/2-1)+C(n-1,k/2-1)*C(m-1,k/2))%mod;
	}
}
int calc(int n,int m,int b,int k){
	if(b<=0||m>=n+b)return 0;
	if(k&1){
		return (2*C(n-1,(k+1)/2-1)*C(m-1,(k+1)/2-1)%mod+2*mod-C(n+b-2,((k-1)/2))*C(m-b,((k-1)/2))%mod-C(n+b-2,((k-1)/2)-1)*C(m-b,((k-1)/2)+1)%mod)%mod;
	}
	else{
		return (C(n-1,(k/2))*C(m-1,(k/2)-1)+C(n-1,(k/2)-1)*C(m-1,(k/2))+mod-2*C(n+b-2,(k/2)-1)*C(m-b,(k/2))%mod)%mod;
	}
	// int res=calc(n,m,k);
	// for(int i=0;b+i<=m;i++)(res+=mod-calc(n+b-1,m-b-i,k-1))%=mod;
	// return res;
}
```

