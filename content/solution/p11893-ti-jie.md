---
title: 'P11893 题解'
date: 2025-09-19 21:02:55
tags: [题解,数学]
published: true
hideInList: false
feature: 
isTop: false
---
[P11893](https://www.luogu.com.cn/problem/P11893)

### 思路

枚举 $0/1$ 和 $3/4$ 分别几个， $0/1$ 不能放在开头，还要留至少一个 $2$。

$$ans=\sum_{i=2}^{n-3}\binom{n-1}{i}(i-1)(\sum_{j=2}^{n-i-1}\binom{n-i-1}{j}(j-1))$$

拆开 $j-1$，把 $\times j$ 扔进组合数里，后半部分 $=\sum_{j=2}^{n-i-1}(n-i-1)\binom{n-i-2}{j-1}-\sum_{j=2}^{n-i-1}\binom{n-i-1}j$。

由 $\sum_{i=0}^n\binom{n}{i}=2^n$，后半部分可以写为 $2$ 的幂次加一些系数。

整理后：

$$ans=\sum_{i=2}^{n-3}\binom{n-1}{i}(i-1)(n-i-2)(2^{n-i-1}-1)$$

希望能把 $\times i$ 相关扔进组合数里。可以有 $\binom{n-1}{i}=\frac{(n-1)\times (n-2)\times (n-3)!}{i\times (i-1)!\times (n-i-1)\times (n-i-2)!}$，所以 $(i-1)(n-i-2)=i(n-i-1)-(n-2)$。

整理后：

$$ans=(n-1)(n-2)(\sum_{i=2}^{n-3}\binom{n-3}{i-1}(2\times2^{n-i-2}-1))-(n-2)\sum_{i=2}^{n-3}\binom{n-1}{i}(2^{n-i-1}-1)$$

由 $\sum_{i=0}^n\binom{n}{i}2^i=3^n$，$ans$ 可以写为一些 $2$ 和 $3$ 的幂次减去 $O(1)$ 个多算的值。

可以一步步从暴力改式子。

边读入边取模，注意快速幂的幂次别搞成负数。

### code

```cpp
void work(){
	l=read();scanf("%s",s+1);
	for(int i=1;i<=l;i++){
		n1=n1*10+s[i]-'0',n2=n2*10+s[i]-'0';
		if(i%9==0)n1%=mod,n2%=mod-1;
	}
	n1%=mod,n2%=mod-1;
	if(l>=10)n1+=mod,n2+=mod-1;
	(ans+=2*(n1-1)*(n1-2)%mod*ksm(3,n2-3))%=mod;
	(ans+=mod-2*(n1-1)*(n1-2)%mod*(ksm(2,n2-3)+1)%mod)%=mod;
	(ans+=mod-(n1-1)*(n1-2)%mod*(ksm(2,n2-3)-2)%mod)%=mod;
	// for(int i=2;i<=n-3;i++)(ans+=2*(n-1)*(n-2)%mod*C(n-3,i-1)%mod*(pw[n-i-2]))%=mod;
	(ans+=(mod-n1+2)*ksm(3,n2-1)%mod)%=mod;
	(ans+=mod-(mod-n1+2)*(ksm(2,n2-1)+(n1-1)*ksm(2,n2-2)%mod+(n1-1)*2+1)%mod)%=mod;
	(ans+=mod-(mod-n1+2)*(ksm(2,n2-1)-2*n1)%mod)%=mod;
	// for(int i=2;i<=n-3;i++)(ans+=C(n-1,i)*(mod-n+2)%mod*(pw[n-i-1]))%=mod;
	// for(int i=2;i<=n-3;i++)(ans+=C(n-1,i)*(i-1)%mod*(n-i-2)%mod*(pw[n-i-1]-1))%=mod;
	ans%=mod,ans+=mod,ans%=mod;
	printf("%lld\n",ans);
}
```

