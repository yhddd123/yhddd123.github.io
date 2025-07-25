---
title: 'dp 记录-凸优化'
date: 2025-07-24 21:49:03
tags: [做题记录,dp]
published: true
hideInList: false
feature: 
isTop: false
---

### [CF2084G](https://www.luogu.com.cn/problem/CF2084G2)

归纳证明答案只与两边的最大或最小有关。$m=2$ 显然，若先手操作两边则答案与先手要求相反。

$$ans=\sum_{i\le j}([i\bmod 2=j\bmod 2]\max(p_i,p_j)+[i\bmod 2\neq j\bmod 2]\min(p_i,p_j))$$

$$ans=\sum i^2-\sum_{i<j}[i\bmod 2\neq j\bmod 2]|p_i-p_j|$$

等价于放在数轴上，奇数位置有 $\lceil\frac{n}{2}\rceil$ 个，最小化奇偶位置距离之和。设前 $i$ 个有 $j$ 个奇数位置的最小代价 $f_{i,j}$。在 $i$ 和 $i+1$ 的间隔加上两边跨过的贡献，为下凸的二次函数。

差分数组单调，维护全局加一次函数，向右平移，插入 $0$。fhq treap 维护 $(g_j,j,1)$ 乘矩阵维护。

### [abc406g](https://www.luogu.com.cn/problem/AT_abc406_g)

$f_{i,j}$ 下凸。维护斜率拐点斜率的变化量和最左边直线的 $y=kx+b$。

操作 $1$ 为将斜率绝对值大于 $c$ 的部分推平为正负 $c$。操作 $2$ 为 $p$ 处斜率加 $2\times d$。
