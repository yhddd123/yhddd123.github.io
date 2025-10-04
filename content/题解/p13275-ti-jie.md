---
title: P13275 题解
date: 2025-09-17 22:03:25
tags:
  - 题解
  - 容斥
published: true
hideInList: false
feature:
isTop: false
---
[P13275](https://www.luogu.com.cn/problem/P13275)

大容斥时代来了，而我还啥都不会。

### 思路

$$ans=\sum_P\sum_Q[f(P)=f(Q)][P\cap Q=\empty]\prod_{i\in P\cup Q}a_i$$

$$[f(P)=f(Q)]=\prod_{i=0}^{n-1}[p_i=q_i]=\prod_i[2(p_i\&q_i)-p_i-q_i+1]$$

$$[f(P)=f(Q)]=\sum_{A\subseteq f(P)\cap f(Q)}\sum_{B\subseteq f(P)}\sum_{C\subseteq f(Q)}2^{|A|}(-1)^{|B|+|C|}$$

$$ans=\sum_{S}\sum_{T}2^{|S\cap T|}(-1)^{|S|+|T|}\sum_{S\subseteq f(P)}\sum_{T\subseteq f(Q)}[P\cap Q=\empty]\prod_{i\in P\cup Q} a_i$$

$$ans=\sum_{S}\sum_{T}2^{|S\cap T|}(-1)^{|S|+|T|}(\prod_{i\in U\setminus S}(2a_i+1))(\prod_{i\in S\cup T\setminus S\cap T}(a_i+1)$$

令 $f_S=\prod_{S\subseteq T}(a_T+1),g_S=\prod_{S\subseteq T}(2a_T+1)$。

$$ans=\sum_S\sum_T 2^{|S\cap T|}(-1)^{|S|+|T|}\frac{f_Sf_Tg_{S\cup T}}{(f_{S\cup T})^2}$$


$$ans=\sum_S\sum_T((-1)^{|S|}2^{|S|}f_S)((-1)^{|T|}2^{|T|}f_T)\frac{g_{S\cup T}}{(f_{S\cup T})^22^{|S\cup T|}}$$

or 卷积一下即可。

对于 $a_i+1=mod$ 的情况：维护 $val=a\times 0^b$，加减只取最低位 $0$ 的系数。

### code

```cpp

int n,a[1<<maxn],ans;
pii operator*(pii u,pii v){return {u.fi*v.fi%mod,u.se+v.se};}
pii operator/(pii u,pii v){return {u.fi*ksm(v.fi)%mod,u.se-v.se};}
pii operator+(pii u,pii v){
	if(u.se<v.se)return u;
	if(u.se>v.se)return v;
	return {(u.fi+v.fi)%mod,u.se};}
pii operator-(pii u,pii v){
	if(u.se<v.se)return u;
	if(u.se>v.se)return v;
	return {(u.fi+mod-v.fi)%mod,u.se};}
pii init(int v){
	if(!v)return {1,1};
	return {v,0};
}
int calc(pii p){return p.se?0:p.fi;}
pii f[1<<maxn],g[1<<maxn],h[1<<maxn];
void work(){
    n=read();ans=0;
    for(int i=0;i<(1<<n);i++)a[i]=read();
    for(int i=0;i<(1<<n);i++)f[i]=init((a[i]+1)%mod),g[i]=init((2*a[i]+1)%mod);
    for(int i=0;i<n;i++){
        for(int s=0;s<(1<<n);s++)if(s&(1<<i)){
            f[s^(1<<i)]=f[s^(1<<i)]*f[s];
            g[s^(1<<i)]=g[s^(1<<i)]*g[s];
        }
    }
    for(int s=0;s<(1<<n);s++){
    	h[s]={f[s].fi*((__builtin_popcount(s)&1)?mod-1:1)%mod*(1<<__builtin_popcount(s))%mod,f[s].se};
    }
    for(int i=0;i<n;i++){
    	for(int s=0;s<(1<<n);s++)if(s&(1<<i)){
    		h[s]=h[s]+h[s^(1<<i)];
    	}
    }
    for(int s=0;s<(1<<n);s++)h[s]=h[s]*h[s];
    for(int i=0;i<n;i++){
    	for(int s=0;s<(1<<n);s++)if(s&(1<<i)){
    		h[s]=h[s]-h[s^(1<<i)];
    	}
    }
    for(int s=0;s<(1<<n);s++){
    	pii p=h[s]*g[s]/f[s]/f[s];
    	(ans+=calc(p)*ksm(2,mod-1-__builtin_popcount(s)))%=mod;
    }
    printf("%lld\n",ans);
}
```