---
title: '自然数幂和'
date: 2026-01-20 12:47:47
tags: [tricks,数学]
published: true
hideInList: false
feature: 
isTop: false
---
记 $S_k(n)=\sum_{i=0}^ni^k$。

### 固定 $n$

$$S_k(n)+(n+1)^k=\sum_{i=0}^{n}(i+1)^k=\sum_{i=0}^k\binom{k}{i}S_i(n)$$

$$S_k(n)=\frac{1}{k+1}((n+1)^{k+1}-\sum_{i=0}^{k-1}\binom{k+1}{i}S_{i}(n))$$

然后分治 ntt。

### 固定 $k$

由递推式，是 $k+1$ 次多项式，求出 $k+2$ 个点值插值。

还可以 BM $O(k^2\log n)$，不会。