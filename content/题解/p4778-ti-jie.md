---
title: 'P4778 题解'
date: 2023-12-31 17:18:02
tags: [题解,计数]
published: true
hideInList: false
feature: 
isTop: false
---
[P4778](https://www.luogu.com.cn/problem/P4778)

240229 模拟赛 T1

### 题意

求一个排列每次交换两个位置变成 $1\dots n$ 的方案数。

### 思路

分开考虑每个环。设 $f_i$ 表示大小为 $i$ 的环的答案。每交换一次就将一个环分为两个环。枚举分成的较小的一边是什么，乘两边单独的方案数，两边独立乘一个组合数，选两个一定距离的点乘 $i$ 或 $\frac{i}{2}$。

有 $O(n^2)$ 递推式：

$$f_i=\sum_{j=1}^{\frac{i}{2}}f_j\times f_{i-j}\times \binom{i-2}{j-1}\times (\frac{i}{2}\times [j=\frac{i}{2}]+i\times [j\ne \frac{i}{2}])$$

打表发现 $f_i=i^{i-2}$。

大概是钦定 $1$ 为根，枚举 $2$ 的子树大小，乘两边独立的方案数，乘分配编号的组合数。如果 $1$ 和 $2$ 分别有 $\frac{i}{2}$ 的子树，那就取消 $1$ 和 $2$ 间的区别。所以等价于有标号无根树计数。