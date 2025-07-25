---
title: 'dp 记录'
date: 2025-07-24 21:52:31
tags: [做题记录,dp]
published: true
hideInList: false
feature: 
isTop: false
---

### [arc199c](https://www.luogu.com.cn/problem/AT_arc199_c)

把 $P^1$ 弄成 $1,\dotsb,n$，$P^i_1$ 弄成 $1$。

一个子树在所有排列中都是区间。区间 dp 设 $f_{l,r}$ 表示 $[l,r]$ 形成子树，$g_{l,r}$ 表示 $[l,r]$ 形成森林。

### [arc199d](https://www.luogu.com.cn/problem/AT_arc199_d)

设 $f_{i,j}$ 和 $g_{i,j}$ 表示长为 $i$ 宽为 $j$ 的矩阵的数量和权值和。考虑最后一行，设 $a_i=p-1$，有 $k$ 个 $jj>p$ 的位置 $b_{jj}=i$。挖去 $i$ 行和这 $k$ 列进入子问题。枚举 $k$，第 $i$ 行的方案数 $val=[j=0] (k+1)+[j!=0]\binom{j}{k+1}$。

$$f_{i,j}=f_{i-1,j-k}\times val$$

$$g_{i,j}=g_{i-1,j-k}\times val+f_{i-1,j-k}\times (val\times j\times k+\sum_p (p-1)\binom{j-p}{k})$$