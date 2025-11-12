---
title: 'Ptz Winter 2018. Day 3.'
date: 2025-11-12 22:18:18
tags: [acm]
published: true
hideInList: false
feature: 
isTop: false
---
[Petrozavodsk Winter 2018. Day 3. AtCoder Contest](https://qoj.ac/contest/1800)

#### [A. Vacant Seat](https://qoj.ac/contest/1800/problem/11621)

问 $0$ 和 $\frac{n}{2}$ 然后知道在那一边，然后二分。

#### [D. Knapsack and Queries](https://qoj.ac/contest/1800/problem/11624)

还可以做到更强。

维护 [[deque-shi-xian|deque]]。复杂度 $O(nm\log n)$。

#### [E. XorTree](https://qoj.ac/contest/1800/problem/11625)

记 $b_u=\oplus a_i$，等价于 $b_u$ 和 $b_v$ 异或 $x$。连边，连通块内 $\oplus b_i$ 不变，等价于最大化划分为异或和为 $0$ 的连通块个数。 相同的可以直接两两一组。剩下的 $O(3^{15})$ 计算。

#### [F. Antennas On Tree](https://qoj.ac/contest/1800/problem/11626)

等价于任意一个 $d_u=k\ge 3$ 的点，至少有 $k-1$ 个儿子的子树有值。以一个 $d_u\ge 3$ 的点为根，可以保证子树外至少有一个。

#### [G. Rectangles](https://qoj.ac/contest/1800/problem/11627)



#### [H. Generalized Insertion Sort](https://qoj.ac/contest/1800/problem/11628)

[[ji-xun-dui-zuo-ye-2026#^25dae2|Q4805 的构造部分对任意图的通解]]。

对于根节点挂多条链，在每条链的链底维护排好序的一部分，把根节点的值插入排序。如果根节点就是自己，就随便扔到一个链最后，当重新回到根的时候必然做完了这条链，多 $n$ 次。

从下往上扔叶子，在最下面的分叉之前，每条链独立。最多做 $\log n$ 次。

#### [I. ADD, DIV, MAX](https://qoj.ac/contest/1800/problem/11629)

segment tree beats

#### [J. Simple APSP Problem](https://qoj.ac/contest/1800/problem/11630)

两个相邻整行都没有障碍，则一定有上边点数乘下面点数的贡献，然后缩起来。剩下 $O(n^2)$ 个点，bfs。

#### [K. Forest Task](https://qoj.ac/contest/1800/problem/11631)

从小往大贪，每个连通块有度数限制。