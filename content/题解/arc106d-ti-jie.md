---
title: 'arc106d 题解'
date: 2023-12-31 07:43:30
tags: [题解,数学]
published: true
hideInList: false
feature: 
isTop: false
---
[ARC106D](https://www.luogu.com.cn/problem/AT_arc106_d)


### 思路

左边到右边不好，改为任意一个到另一个。

$$ans_x=\frac{1}{2}(\sum_i^n\sum_j^n (a_i+a_j)^x-\sum_i^n (2\times a_i)^x)$$

拆开 $k$ 次方。

$$(a_i+a_j)^x=\sum_{k=0}^x (\binom{x}{k}\times {a_i}^k\times {a_j}^{x-k})$$

$$ans_x=\frac{1}{2}(\sum_{k=0}^x(\sum_i^n {a_i}^k\times \sum_j^n {a_j}^{x-k})-\sum_i^n (2\times a_i)^x)$$

预处理 $sum_k=\sum_i {a_i}^k$。

$$ans_x=\frac{1}{2}(\sum_{k=0}^x(sum_k\times sum_{x-k})-2^x\times sum_x)$$

复杂度 $O(nk+k^2)$。 

### code

```cpp
int n,x,a[maxn];
inline int ksm(int a,int b=mod-2,int p=mod){
	int ans=1;
	while(b){
		if(b&1)ans=ans*a%p;
		a=a*a%p;
		b>>=1;
	}
	return ans;
}
int ans,ni;
int fac[maxn],inv[maxn];
int C(int m,int n){return fac[m]*inv[n]%mod*inv[m-n]%mod;}
int sum[maxm],mul[maxn];
void work(){
	n=read();x=read();
	for(int i=1;i<=n;i++)a[i]=read(),mul[i]=1;
	for(int k=0;k<=x;k++){
		for(int i=1;i<=n;i++)sum[k]+=mul[i],sum[k]%=mod;
		for(int i=1;i<=n;i++)mul[i]=mul[i]*a[i]%mod;
//		cout<<sum[k]<<" ";
	}
//	cout<<"\n";
	fac[0]=1;for(int i=1;i<=x;i++)fac[i]=fac[i-1]*i%mod;
	inv[x]=ksm(fac[x]);
	for(int i=x-1;~i;i--)inv[i]=inv[i+1]*(i+1)%mod;
	ni=ksm(2);
	for(int i=1;i<=x;i++){
		ans=0;
		for(int k=0;k<=i;k++)ans+=C(i,k)*sum[k]%mod*sum[i-k]%mod,ans%=mod;
		ans+=mod-ksm(2,i)*sum[i]%mod,ans%=mod;
		ans*=ni,ans%=mod;
		printf("%lld\n",ans);
	}
}
```