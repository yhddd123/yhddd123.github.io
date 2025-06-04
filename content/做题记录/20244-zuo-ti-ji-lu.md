---
title: '2024.4 做题记录'
date: 2024-05-01 22:21:35
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---
## 4.7

### [CF1648D](https://www.luogu.com.cn/problem/CF1648D)

设 $dp_i$ 为从 $(1,1)$ 到 $(2,i)$ 的最小代价。答案为 $\max dp_i+s3_n-s3_{i-1}$。

$$dp_i=max(\max_{l_x\le i} dp_{l_x-1}+s2_i-s2_{l_x-1}-w_x,\max_{l_x\le j\le i} s1_j+s2_i-s2_{j-1}-w_x)$$

前面线段树维护 dp 值，按转移顺序区间 max，单点查。后面从后往前枚举 $i$，不断加入区间，维护 $\max_{x\le y} a(x)+b(y)$。另一个线段树分别维护 $maxa,maxb,maxv$。

### [CF1949F](https://www.luogu.com.cn/problem/CF1949F)

不合法情况要么完全包含要么不交，建立树形结构。按 $k_i$ 大小从小到大排序。实时记录每个爱好 $j$ 对应的最后的人 $f_j$。枚举 $i$ 的每个爱好 $j$，如果最后不合法意味着每个 $f_j$ 的爱好都被 $i$ 完全包含，否则找到一组解。如果最后不合法，所有 $f_j$ 的爱好数之和为 $k_i$。

## 4.16

### [CF1951F](https://www.luogu.com.cn/problem/CF1951F)

对于 $i<j$，如果 $p_i$>p_j$ ，无论顺序逆序对贡献为 $1$；否则一个逆序对贡献为 $2$，顺序对贡献为 $0$。构造一些位置上的逆序对数为 $\frac{k−inv(p)}{2}$ 。

### [abc348g](https://www.luogu.com.cn/problem/AT_abc348_g)

有决策单调性，主席树上二分。

## 4.18

### [CF1542E2](https://www.luogu.com.cn/problem/CF1542E2)

枚举前 $i-1$ 位相同，$p_i=x$ 且 $q_i=y$。逆序对数的差异只与后 $n-i-1$ 的排列有关。$dp_{i,j}$ 表示 $i$ 个数有 $j$ 个逆序对。

$$ans=\sum_{i=0}^{n-1} A_n^i \sum_{x=1}^{n-i-1}\sum_{y=x+1}^{n-i-1} \sum_{j=0}^{n^2}\sum_{k=0}^{j+x-y-1} dp_{n-i-1,j}\times dp_{n-i-1,k}$$

记 $f_j=\sum dp_k$。

$$ans=\sum_{i=0}^{n-1} A_n^i \sum_{j=0}^{n^2}dp_{n-i-1,j}\sum_{x=1}^{n-i-1}\sum_{y=x+1}^{n-i-1} f_{j+x-y-1}$$

记 $g_j=\sum f_k$。

$$ans=\sum_{i=0}^{n-1} A_n^i \sum_{j=0}^{n^2}dp_{n-i-1,j}\times(g_{j-2}\times(n-i-1)-\sum_{x=1}^{n-i-1}g_{j+x-n+i-2})$$

记 $h_j=\sum g_k$。

$$ans=\sum_{i=0}^{n-1} A_n^i \sum_{j=0}^{n^2}dp_{n-i-1,j}\times(g_{j-2}\times(n-i-1)-h_{j-2}+h_{j-n+i-2})$$

### [abc349g](https://www.luogu.com.cn/problem/AT_abc349_g)

[[abc349g-ti-jie|abc349g 题解]]

最直接的就是并查集倍增将两段区间并起来。

可以用类似马拉车的思路得到一个贪心算法。枚举 $i$，用 $ban_{i,j}$ 记录 $i$ 不能是 $j$，维护 $r$ 表示当前已知 $b_1\dotsb b_r$。如果 $i+a_i\ge r$ 就把 $r$ 更新到 $i+a_i$，否则什么也不做。最后在 hash 判断所有 $a_i$ 是不是都满足条件。

## 4.19

### [P3380](https://www.luogu.com.cn/problem/P3380)

线段树套 FHQ，查询排名为 $k$ 时二分再查询 $mid$ 的排名，复杂度 $O(n\log^3 n)$。

权值线段树套 FHQ，FHQ 维护位置，查询排名为 $k$ 时线段树上二分，复杂度 $O(n\log^2 n)$。

### [P7831](https://www.luogu.com.cn/problem/P7831)

拓扑排序转移。当当前是环是拆开 $c$ 最大的边。

### [CF1778E](https://www.luogu.com.cn/problem/CF1778E)

按 dfn 序，前缀线性基或合并前后缀线性基。

### [arc173e](https://www.luogu.com.cn/problem/AT_arc173_e)

观察到：只能选偶数个，且当 $n=4k+2,k>0$ 时不能全选。

线性基选偶数个数：插入 $a_i\oplus a_1$。

## 4.23

### [P4839](https://www.luogu.com.cn/problem/P4839)

猫树分治，维护 $[l,mid]$ 的前缀线性基和 $(mid+1,r]$ 的后缀线性基。在 $[ql,qr]$ 跨越 $mid$ 时合并。复杂度 $O(nlog^2n)$。

### [P5607](https://www.luogu.com.cn/problem/P5607)

维护差分数组。区间 $a_{l,\dotsb,r}$ 的线性基等价于 $a_l$ 和 $b_{l+1,\dotsb,r}$ 的线性基。

### [P10282](https://www.luogu.com.cn/problem/P10282)

$dp_{i,j}\to dp_{k,l}$。对 $i,j$ 往后的转移按平均值从小到大，一边前缀和一边双指针。

## 4.25

### [P6134](https://www.luogu.com.cn/problem/P6134)

如果删去边 $(u,v)$ 后 $u$ 到 $v$ 的路径依然存在，那就删去。bitset 维护可达性。

### [P3733](https://www.luogu.com.cn/problem/3733)

先找出最小生成树，线段树分治其他的边，套上线性基维护每个环的最大异或值，见 [[WC2011] 最大XOR和路径](https://www.luogu.com.cn/problem/P4151)。

### [CF938G](https://www.luogu.com.cn/problem/CF938G)

[P3733](https://www.luogu.com.cn/problem/P3733) 加强。不一定存在一直存在的生成树。线段树分治。记录每个点的父亲和到父亲的边权。对边 $(u,v)$，如果 $u,v$ 在同一个联通块，加入线性基；否则 $fd(u)$ 和 $fd(v)$ 连 $w\oplus dis(u,fd(u))\oplus dis(v,fd(v))$。

## 4.26

### [CF875F](https://www.luogu.com.cn/problem/CF875F)

连二选一的两个点，最多允许存在基环树，求最大生成基环树。

### [CF1666K](https://www.luogu.com.cn/problem/CF1666K)

每个点拆为 $a_i,b_i$ ，最小割，$s\to a_i$ 表示 $i\in A$，否则 $i\notin A$；$s\to b_i$ 表示 $i\in B$，否则 $i\notin B$。00 或 11 表示 $i\in C$。

### [P10371](https://www.luogu.com.cn/problem/P10371)

每个数维护 $l_{i,0/1} ,r_{i,0/1}$ 表示左右第一个、第二个大于 $a_i$ 的位置。分类讨论 $p=l,r$ 或 $l<p<r$。

## 4.28

### [P7497](https://www.luogu.com.cn/problem/P7497)

线段树维护区间未封个数，未封之和，封了的和，封的次数。封过的区间不参与上传下放，解封时从下面上传。

## 4.30

### [agc033d](https://www.luogu.com.cn/problem/AT_agc033_d)

$dp_{i,j,k,l}$ 的答案，复杂度 $O(n^5)$。

注意到答案小于 $\log nm$。交换维度。$dp_{ans,i,j,l}$ 表示答案为 $ans$，$(i,j)$ 到 $(dp_{ans,i,j,l},l)$ 最大。

$$dp_{ans,i,j,l}=\max(dp_{ans−1,i,j,l} ,dp_{ans−1,dp_{ans−1,i,j,l} +1,j,l},\max(\min(dp_{ans−1,i,j,k} ,dp_{ans−1,i,k+1,l})))$$

$k$ 维有单调性，双指针。

### [P7864](https://www.luogu.com.cn/problem/P7864)

结论：一个点存在两个叶子则必胜。

### [CF1091H](https://www.luogu.com.cn/problem/CF1091H)

只与和中间点的距离有关，$2n$ 个 sg 值亦或起来。

发现 sg 值不大，记 $nxt_{j,i}$ 为 $i$ 的后继有 sg 值为 $j$ 的。预处理素数，bitset 转移。