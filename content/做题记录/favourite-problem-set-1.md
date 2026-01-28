---
title: 'favourite problem set 1'
date: 2025-12-19 18:04:50
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---

[Q15303](https://qoj.ac/contest/2661/problem/15303)

设 $f_{u,j,k}$ 表示考虑 $u$ 子树，经过点权前 $j$ 小能到 $k$ 个。复杂度 $O(n^4)$。

在合并子树的时候 $j$ 维是树上背包，$k$ 维是纯卷积。维护多项式 $g_{u,j}(x)=\sum f_{u,j,k}x^k$ 在 $1\sim n$ 的点值，复杂度 $O(n^3)$。加入 $u$ 一个单点的部分也可以通过维护相关信息做到。

统计答案部分，直接插值系数还是 $O(n^4)$。还原多项式系数可以是点值的一个线性变换，最后求的 $\sum_k f_{u,j,k}a_k$ 也是线性变换。预处理矩阵的逆直接得出由 $g_{u,j,k}$ 表示答案的系数即可。

只是加速卷积的话，还可以选择点乘 dft 后的

[Q11401](https://qoj.ac/contest/2061/problem/11401)

[[joisc-ji-lu#^912b96|here]]。

[P13758](https://www.luogu.com.cn/problem/P13758)

[[p13758-ti-jie|here]]。