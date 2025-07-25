---
title: 'dp 记录-容斥'
date: 2025-07-24 21:50:32
tags: [做题记录,dp]
published: true
hideInList: false
feature: 
isTop: false
---

### [arc196_c](https://www.luogu.com.cn/problem/AT_arc196_c)

容斥。钦定有 $k$ 个分解线，$k+1$ 段中后面的不能连向前面的，每段中可能还有更小的段，系数为 $(-1)^k$。

规定一个段以白点结尾。可以合法的前缀中每个黑点都要被前缀中的白点匹配。把所有白点单独拉出来，设它们在原序列中下标为 $p_i$，在这个长为 $n$ 的新序列上 dp。

设 $f_i$ 表示最后一段结尾为 $i$ 的带系数的方案数。$f_i=\binom{i}{p_i-i}(p_i-i)!-\sum_{j=1}^{i-1}\binom{i-(p_j-j)}{p_i-i-(p_j-j)}(p_i-i-(p_j-j))!f_j$

半在线卷积。可以看作 $p_j-j$ 和 $i-(p_j-j)$ 卷积，一整层的长度之和保证为 $O(n)$。
