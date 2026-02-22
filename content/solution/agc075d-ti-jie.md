---
title: 'agc075d 题解'
date: 2025-12-22 12:44:17
tags: [题解,计数]
published: true
hideInList: false
feature: 
isTop: false
---
[agc075d ](https://www.luogu.com.cn/problem/AT_agc075_d)

只能考虑枚举值来数序列。

固定一个 $j$，$i$ 和 $k$ 分别选 $j$ 左右两边最大的数。所以全局最大值一定被选中，不妨设全局最大值第一次出现的位置 $p\in[2,n-1]$，剩下的都是简化版本。

$p$ 一定可以作为 $i$ 或 $j$ 出现。如果 $p$ 是 $i$，那么 $j$ 一定是 $[p+1,n-1]$ 的最大值。否则 $i$ 一定是 $[1,p-1]$ 的最大值。所以枚举最大值 $i$，最大值第一次出现位置 $p$ 左边的最大值 $j$，右边除 $a_n$ 的最大值 $k$，$(i,j,k)$ 需要满足 $i\times \max(j,k)\le lim$。数量 $\sum_{i=1}^m(\frac{lim}{i})^2$ 大概就 $10^6$ 左右。

先枚举 $p$，左边方案数 $j^{p-1}-(j-1)^{p-1}$；再枚举 $k$ 第一次出现位置 $q$，右边方案数 $(k-1)^{q-p-1}(\min(k,lim-i\times k))^{n-q-1}$；最后 $a_n\le \min(i,lim-i\times \max(j,k))$。

总之枚举 $q$ 是要求形如 $\sum_{i=0}^n a^ib^{n-i}$。若 $a=b$，则为 $(n+1)a^n$；否则相当于 $\frac{a}{b}$ 的等比数列求和 $\frac{a^{n+1}-b^{n+1}}{a-b}$。

把 $q$ 算了之后枚举 $p$ 左右两边依然形如 $\sum_{i=0}^n a^ib^{n-i}$。但 $k-1=\min(k,lim-i\times k)$，即算 $q$ 时 $a=b$ 时，式子形如 $\sum_{i=0}^n ia^ib^{n-i}$。判掉 $a=b$，同样是 $b^n\sum i(\frac{a}{b})^i$，最后是 $\frac{na^{n+1}-(n+1)ba^n+ab^n}{(a-b)^2}$。

但是对于 $n=3$ 的时候涉及到 $x^0$ 有点问题，直接暴力。

```cpp
int n,m,lim,ans;
int calc(int v1,int v2,int n){
	if(v1==v2)return (n+1)*ksm(v1,n)%mod;
	if(v1<v2)swap(v1,v2);
	return (ksm(v1,n+1)+mod-ksm(v2,n+1))*ksm(v1-v2)%mod;
}
int calc1(int v1,int v2,int n){
	if(v1==v2)return n*(n+1)/2%mod*ksm(v1,n)%mod;
	return (n*ksm(v1,n+1)+mod-(n+1)*ksm(v1,n)%mod*v2%mod+v1*ksm(v2,n))%mod*ksm((v1-v2)*(v1-v2)%mod)%mod;
}
void work(){
	n=read();m=read(),lim=read();
	for(int i=1;i<=m;i++){
		for(int j=1;j<i&&i*j<=lim;j++){
			for(int k=1;k<=i&&i*j+k<=lim&&i*k<=lim;k++){
				int v=min(k,lim-i*k);
				int t=min(i,lim-i*max(j,k));
				if(v==k){
					int res=(calc(j,k,n-2)+mod-calc(j-1,k,n-2)+mod-calc(j,k-1,n-2)+calc(j-1,k-1,n-2))%mod;
					(ans+=res*t)%=mod;
				}
				else if(v==k-1){
					int res=(calc(j,k-1,n-3)+mod-calc(j-1,k-1,n-3))*(n-2)%mod;
					if(n<=5){
						for(int p=0;p<=n-3;p++){
							int res=(ksm(j,p)+mod-ksm(j-1,p))%mod;
							res=res*p%mod*ksm(k-1,n-p-3)%mod;
							(ans+=mod-res*t%mod)%=mod;
						}
					}
					else (res+=mod-(calc1(j,k-1,n-3)+mod-calc1(j-1,k-1,n-3))%mod)%=mod;
					(ans+=res*t)%=mod;
				}
				else{
					int res=(calc(j,k-1,n-2)+mod-calc(j-1,k-1,n-2)+mod-calc(j,v,n-2)+calc(j-1,v,n-2))%mod*ksm(k-1-v)%mod;
					(ans+=res*t)%=mod;
				}
			}
			int res=(ksm(j,n-2)+mod-ksm(j-1,n-2))%mod;
			res=res*min(i,lim-i*j)%mod;
			(ans+=res)%=mod;
		}
	}
	for(int i=1;i<=m;i++){//a_1=mx
		for(int k=1;k<=i&&i*k<=lim;k++){
			int v=min(k,lim-i*k);
			int t=min(i,lim-i*k);
			int res=1;
			if(v==k)res=res*(ksm(k,n-2)+mod-ksm(k-1,n-2))%mod;
			else if(v==k-1)res=res*(n-2)%mod*ksm(k-1,n-3)%mod;
			else res=res*(ksm(k-1,n-2)+mod-ksm(v,n-2))%mod*ksm(k-1-v)%mod;
			(ans+=res*t)%=mod;
		}
	}
	for(int i=1;i<=m;i++){//a_n=mx
		if(i*i+i+1<=lim){
			int x=min(m,lim-i*i)-i;
			int res=(ksm(i,n-1)+mod-ksm(i-1,n-1)+mod-(n-1)*ksm(i-1,n-2)%mod)%mod;
			(ans+=res*x)%=mod;
		}
		for(int j=1;j<i&&i*j+i+1<=lim;j++){
			int x=min(m,lim-i*j)-i;
			int res=(n-1)*(ksm(j,n-2)+mod-ksm(j-1,n-2))%mod;
			(ans+=res*x)%=mod;
		}
	}
	printf("%lld\n",ans);
}
```

