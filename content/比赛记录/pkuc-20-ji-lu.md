---
title: 'PKU?C 20?? 记录'
date: 2025-10-23 22:30:28
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---
### [PKUSC 2022 Day 1](https://qoj.ac/contest/2092)

#### [A. Rating](https://qoj.ac/contest/2092/problem/12013)

设 $g_{i,j}$ 表示较大值为 $i$，另一个为 $i-j$ 的概率。枚举第一步 $k$，另设 $f_{i,j}$ 表示当前在 $i$，第一次 $>i$ 到达 $i+j$ 的概率。

$f_{i,j}$ 同样枚举第一步 $k$，然后调用 $f_{i+k,j1},f_{i+k+j1,j2}\dotsb$，直到跳到 $j$。这部分是单调的，可以预先 $m^2$ 处理出来。最后要解一个方程。

#### [C. 撸猫](https://qoj.ac/contest/2092/problem/12015)

带实数权的 hall 定理。高位前缀和一下。

精度问题非常唐诗。