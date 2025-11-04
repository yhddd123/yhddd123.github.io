---
title: '集训队作业 2026'
date: 2025-11-04 22:20:12
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---
[https://qoj.ac/category/585](https://qoj.ac/category/585)

#### 1.[Q833. Cells Blocking](https://qoj.ac/contest/2550/problem/833)

#### 2.[Q837. Giant Penguin](https://qoj.ac/contest/2550/problem/837)

点分治，对于分治中心，最多 $k$ 对点跨子树。对于起终点在不同子树的对的距离，可以枚举 $2k+1$ 个关键点作为中转。

#### 4.[Q856. Cactus](https://qoj.ac/contest/2550/problem/856)

仙人掌可以直接找环，对于不同的环长有一个系数。

或者直接广义串并联方法。

#### 6.[Q862. Social Justice](https://qoj.ac/contest/2550/problem/862)

好像随便做。

#### 10.[Q964. Excluded Min](https://qoj.ac/contest/2550/problem/964)

形如后缀加，求下标最大的 $a_x\ge 0$ 的位置。

直接莫队，要平衡一手 $n\sqrt q$ 的修改和 $q$ 的询问。直接按 $2^{2B}$ 分块，再按 $2^B$ 分块，块内维护最大前缀和。修改 $O(2\times 2^B)$，查询 $O(\frac{n}{2^{2B}})$。$B=3$。