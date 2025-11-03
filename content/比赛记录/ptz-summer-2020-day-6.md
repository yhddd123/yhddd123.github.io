---
title: 'Ptz Summer 2020. Day 6.'
date: 2025-10-30 22:19:50
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---
[Petrozavodsk Summer 2020. Day 6. Korean Contest](https://qoj.ac/contest/506)

#### [A. Mango](https://qoj.ac/contest/506/problem/1350)

判掉只有一个 $\text{\$}$，然后判掉 $\text{\$}$ 前的部分，$k$ 可以和 $60$ 取 min。处理出每层走到第 $i$ 个点时长多少，每层二分一下。

#### [B. Koosaga's Problem](https://qoj.ac/contest/506/problem/1351)

随机异或哈希。找一棵生成树，非树边和对应的树边异或相同的权值。此时偶环异或和为 $0$，奇环要删一个。

#### [D. Non-Decreasing Subarray Game](https://qoj.ac/contest/506/problem/1353)

后手要最大化，会选 $l/r$ 中最大的。在 $[l,r]$ 中一个前缀选 $r$，后缀选 $l$，先手选交界左右最小化。可以二分出来。

#### [E. Observer Game](https://qoj.ac/contest/506/problem/1354)

判掉直接赢。如果图中存在两个不同的 $k\times k$，那会交替填完 $nm-2k^2$ 个格子。

#### [F. Rhythm Game](https://qoj.ac/contest/506/problem/1355)

满足四边形不等式。

注意应当是 有 $j$ 个没选，选到 $i$，对 $i$ 有决策单调性。

其他的几种都不对，感觉纯乱猜。

#### [G. Solo Tree Game](https://qoj.ac/contest/506/problem/1356)

等价于 $a_i-2$ 个石子。后退的话对方可以跟进。

#### [K. Determinant](https://qoj.ac/contest/506/problem/1360)

特征多项式板子。
