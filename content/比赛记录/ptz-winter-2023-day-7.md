---
title: 'Ptz Winter 2023. Day 7.'
date: 2025-10-28 21:56:10
tags: [acm]
published: true
hideInList: false
feature: 
isTop: false
---
[Petrozavodsk Winter 2023. Day 7: Gennady Korotkevich Contest 7](https://qoj.ac/contest/1223)

#### [A. Classical A+B Problem](https://qoj.ac/contest/1223/problem/6407)

不妨 $a\ge b$，则 $a$ 至少有 $n$ 的位数减 $1$ 位，共 $20$ 种。python。

#### [C. Classical Data Structure Problem](https://qoj.ac/contest/1223/problem/6409)

被击杀了。

不允许动态开点线段树，那就动态开点平衡树呗。

不知道为什么直接维护分裂区间，树高爆炸了。

改为维护差分数组 $f_i$ 和 $if_i$。

#### [D. Classical DP Problem](https://qoj.ac/contest/1223/problem/6410)

最少车 $k$ 为最大的可以放入图中的正方形大小，也即按 $a_i$ 降序后 $a_k\ge k>a_{k+1}$ 的位置。

要算前 $k$ 行每行都有车且前 $a_{k+1}$ 列每列都有车，加上转置 $a_i$ 后，再容斥掉 $k\times k$ 的 $k!$ 种填法。设 $f_{i,j}$ 表示填了 $i$ 行，前 $a_{k+1}$ 列填了 $j$ 个。

#### [E. Classical FFT Problem](https://qoj.ac/contest/1223/problem/6411)

加速 $O(n^2)$ dp。容斥 $i$ 列没选，其余列任意，要求 $\prod_{i=1}^k (a_i-x)$ 的 $0,\ldots,a_{k+1}$ 的值。分治 fft 求出系数后多点求值。

#### [H. Classical Maximization Problem](https://qoj.ac/contest/1223/problem/6414)

连边后生成树上从下往上匹配，最多剩一条。

#### [J. Classical Scheduling Problem](https://qoj.ac/contest/1223/problem/6416)

按 $b_i$ 排序。二分选 $x$ 个。枚举 $p_x=i$，$[1,i-1]$ 选 $x-1$ 个，$[i+1,n]$ 选 $\max(0,b_i-x)$ 个，优先队列维护。

#### [K. Classical Summation Problem](https://qoj.ac/contest/1223/problem/6417)

对于 $k$ 奇数，答案 $\frac{n+1}{2}n^k$。

对于 $k$ 偶数，答案要减去 $p_{\frac{k}{2}+1}-p_{\frac{k}{2}}$ 的期望除以 $2$。在 $[i,i+1)$ 处统计左右各 $\frac{k}{2}$ 的方案数。