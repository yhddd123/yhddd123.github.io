---
title: 'arc 记录 18'
date: 2025-07-21 20:41:21
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---

痛改前非。

为什么从 18 开始？因为能级也是从 K 开始！

### arc180

#### [arc180c](https://atcoder.jp/contests/arc180/tasks/arc180_c)

设 $dp_{i,j}$ 为前 $i$ 个前缀和为 $j$。

当前缀和为 $0$ 的时候，规定由最后一个转移，用 $dp_{i-1,0}$ 覆盖 $f_{a_i}$。

#### [arc180d](https://atcoder.jp/contests/arc180/tasks/arc180_d)

若区间最大值落在中间段，$a_l+a_r+mx$。

若落在左边，中间段长为 $1$。扫描线右端点，弹单调栈的时候线段树上维护 $\min_{i=p+1}^{r-1} (a_i+\max_{j=i+1}^r a_j)$。

### 181

#### [arc181d](https://atcoder.jp/contests/arc181/tasks/arc181_d)

每交换一次逆序对数减 $1$。对于位置 $i$，从第一次 $b_l\ge i$ 操作开始，连续 $\sum_{j<i} [a_j>a_i]$ 次操作逆序对数减小。差分。

### 182

#### [arc182c](https://www.luogu.com.cn/problem/AT_arc182_c)

维护质数的指数和。$\sum \prod (a_i+b_i)$=$\sum\sum_S (a_S\prod_{i\notin S}b_i)$。矩阵快速幂 $O((2^6)^3\log n)$。

#### [arc182d](https://atcoder.jp/contests/arc182/tasks/arc182_d)

去掉取模，令 $a'_i\equiv a_i(\bmod m)$，要求 $|a_i-a_{i-1}|<m$。操作时不改变相对大小关系，答案下界为 $\sum|a'_i-b'_i$，可以取到。

随便一个合法的 $b'_i$。$ans=\min \sum|a'_i-b'_i-km|$。对 $a'_i-b'_i$ 排序，尝试中位数附近 $m$ 的倍数。

### 183

#### [arc183d](https://atcoder.jp/contests/arc183/tasks/arc183_d)

权值和最大的上界是 $\sum \min siz_u,n-siz_u$，当令根为重心且每次删去的两个点属于不同子树时取到。

树的完美匹配形如：子树大小为偶数的 $u$ 和子树大小为奇数的儿子 $v$ 匹配，子树大小为奇数的 $u$ 和父亲匹配。所以删去叶子 $x$ 要求 $x$ 到 $rt$ 的路径上每个点 $u$ 子树大小奇偶性交替，删后反转。

每次取出 $rt$ 的奇偶子树中最大的，各从中删去一个点，优先队列维护。可以保证合法。

根的儿子的子树内删点顺序独立。一个一个子树删，优先删子树大小为奇数的。

### 184

#### [arc184b](https://atcoder.jp/contests/arc184/tasks/arc184_b)

按 $2^i3^jx$ 分组，组内状压轮廓线。

#### [arc184d](https://atcoder.jp/contests/arc184/tasks/arc184_d)

计算操作的方案数，要求只统计不能再进行更多操作的，即两个操作的点之间形成的矩形不能被进一步划分。

### 185

#### [arc185e](https://atcoder.jp/contests/arc185/tasks/arc185_e)

增量算贡献。$ans_i=2ans_{i-1}+\sum 2^{j-1}gcd(a_i,a_j)$。枚举约数，带 $f_d=d-\sum f_{dd}$ 的系数。