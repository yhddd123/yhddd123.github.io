---
title: '式子乱推'
date: 2025-02-24 22:24:45
tags: [做题记录,数学]
published: true
hideInList: false
feature: 
isTop: false
---
形如：给定 $m$ 次多项式 $f(k)$，求 $\sum_{k=0}^n f(k)\times \dotsb$。$m$ 较小 $n$ 极大。

### [P6620](https://www.luogu.com.cn/problem/P6620)

求 $\sum f(k)x^k\binom{n}{k}$。

普通幂转下降幂：$x^n=\sum_{i=0}^n {n \brace i}  x^{\underline{i}}$。$f(k)=\sum_{i=0}^m b_i k^{\underline{i}}$。

下降幂乘组合数：$\binom{n}{k}\times k^{\underline{m}}=\binom{n-m}{k-m}n^{\underline{i}}$。

$$=\sum_{i=0}^m b_in^{\underline{i}}\sum_{k=0}^n\binom{n-i}{k-i}x^k$$

枚举 $k-i$，提出 $x^i$，二项式定理。

$$=\sum _{i=0}^m b_in^{\underline{i}}\sum_{k=0}^{n-i}\binom{n-i}{k}x^{k+i}$$

$$=\sum _{i=0}^m b_in^{\underline{i}}x^i(x+1)^{n-i}$$

### [P6667](https://www.luogu.com.cn/problem/P6667)

求 $\sum_{k=0}^n f(k)\binom{n,k}x^k(1-x)^{n-k}$。$f(k)$ 是 $m$ 次多项式，给出 $f_0,\dotsb,f_{m}$ 的点值表示。

二项式反演，设 $f_x=\sum_{i=0}^{x} \binom{x}{i} g_i$，则 $g_x=\sum_{i=0}^x (-1)^{x-i}\binom{x}{i} f_x$。卷积。

$=\sum_{i=0}^m g_i\sum_{k=0}^{n}\binom{k}{i}\binom{n}{k}x^k(1-x)^{n-k}$。

组合恒等式，枚举 $k-i$，提出 $x^i$，二项式定理。

$$=\sum_{i=0}^m g_i\binom{n}{i}\sum_{k=0}^n\binom{n-i}{k-i}x^k(1-x)^{n-k}$$

$$=\sum_{i=0}^mg_i\binom{n}{i}x^i$$

