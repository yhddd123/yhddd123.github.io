---
title: 'CF2135E 题解'
date: 2025-09-20 13:58:29
tags: [题解,数学]
published: true
hideInList: false
feature: 
isTop: false
---
[https://www.luogu.com.cn/problem/CF2135E](https://www.luogu.com.cn/problem/CF2135E2)

令 $0$ 为 $-1$，$1$ 为 $1$，求前缀和。$f(s)$ 一定是前缀是 $0$，后缀是 $1$，并且 $f(s)$ 前面有 $|\min s_i|$ 个 $0$。因为 $rev(s)$ 的 $0/1$ 数量与 $s$ 相同，那么只要两者的前缀和的 min 一样，$f(s)=f(rev(s))$。

反转后的前缀和是原来的后缀和的相反数。也就是数 $\min s_i=s_n-\max s_i$ 的 $s$ 的数量。

枚举 $\min s_i=l,\max s_i=r$，要求从 $(0,0)$ 到 $(\frac{n+s_n}{2},\frac{n-l+r}{2})$