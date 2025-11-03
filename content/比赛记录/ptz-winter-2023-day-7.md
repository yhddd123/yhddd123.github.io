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

#### [B. Classical Counting Problem](https://qoj.ac/contest/1223/problem/6408)

按 $a_i$ 降序。设 $x$ 为最小的 $i\notin S$，$y$ 为最大的 $i\in S$，要求 $a_y+m\ge a_x$。固定 $x,y$ 后要 $S$ 合法，设 $l_i$ 和 $r_i$ 表示要 $S$ 合法 $i$ 最少/最多能加几次，要求 $\sum l_i\le mv\le \sum r_i$。以 $r_i$ 为例，$r_1\sim r_{x-1}$ 和 $r_y\sim r_n$ 都等于 $m$，对于 $i\in[x,y)$，若 $i\in S$，$r_i=m$，否则 $r_i=m+a_y-a_i$。

计数时容斥为 $\sum r_i\le mv$ 减去 $\sum l_i>mv$。$r_i$ 只与 $a_y$ 有关，$l_i$ 只与 $a_x$ 有关，分别固定左右端点 dp。复杂度 $O(n^4)$。

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

#### [I. Classical Minimization Problem](https://qoj.ac/contest/1223/problem/6415)

没写。

设一条线上最多有 $k$ 个点。若 $k\le n$，则 $ans=0$，否则 $ans=k-n$ ?

构造就是维护 X 和 Y 两维最多点的线。

#### [J. Classical Scheduling Problem](https://qoj.ac/contest/1223/problem/6416)

按 $b_i$ 排序。二分选 $x$ 个。枚举 $p_x=i$，$[1,i-1]$ 选 $x-1$ 个，$[i+1,n]$ 选 $\max(0,b_i-x)$ 个，优先队列维护。

#### [K. Classical Summation Problem](https://qoj.ac/contest/1223/problem/6417)

对于 $k$ 奇数，答案 $\frac{n+1}{2}n^k$。

对于 $k$ 偶数，答案要减去 $p_{\frac{k}{2}+1}-p_{\frac{k}{2}}$ 的期望除以 $2$。在 $[i,i+1)$ 处统计左右各 $\frac{k}{2}$ 的方案数。