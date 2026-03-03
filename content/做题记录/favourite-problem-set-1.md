---
title: 'favourite problem set 1'
date: 2025-12-19 18:04:50
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---
#### [Q15303](https://qoj.ac/contest/2661/problem/15303)

^1215b2

设 $f_{u,j,k}$ 表示考虑 $u$ 子树，经过点权前 $j$ 小能到 $k$ 个。复杂度 $O(n^4)$。

在合并子树的时候 $j$ 维是树上背包，$k$ 维是纯卷积。维护多项式 $g_{u,j}(x)=\sum f_{u,j,k}x^k$ 在 $1\sim n$ 的点值，复杂度 $O(n^3)$。加入 $u$ 一个单点的部分也可以通过维护相关信息做到。

统计答案部分，直接插值系数还是 $O(n^4)$。还原多项式系数可以是点值的一个线性变换，最后求的 $\sum_k f_{u,j,k}a_k$ 也是线性变换。预处理矩阵的逆直接得出由 $g_{u,j,k}$ 表示答案的系数即可。

只是加速卷积的话，还可以选择点乘 dft 后的东西，然后有 [Q6349](https://qoj.ac/contest/1212/problem/6349)。但是 dft 后的东西是不是没那么好算答案。

#### [Q11401](https://qoj.ac/contest/2061/problem/11401)

[[joisc-ji-lu#^912b96|here]]。

#### [P13758](https://www.luogu.com.cn/problem/P13758)

[[p13758-ti-jie|here]]。

#### [ Q10514](https://qoj.ac/contest/1986/problem/10514)

^501544

判定一个二分图完美匹配的代数方法：记 $a_{i,j}=e_{i,j}x^{i,j}$，然后 $det(A)\neq 0$。给 $x_{i,j}$ 随机赋权检查 det 即可。

加颜色就是多一维 $y^S$，y 维做 or。就是先不考虑每个颜色都要出现，然后在逆高位前缀和一下。

再加改颜色就是多一维 $z$，在 $\bmod z^2$ 意义下算 det。对一个多项式的矩阵求 det，消元的时候需要以最低次项次数最小的元素为主元，每次提取掉为 $0$ 的低位。

复杂度 $O(2^kn^3lim^2)$。

[submission](https://qoj.ac/submission/1991618).