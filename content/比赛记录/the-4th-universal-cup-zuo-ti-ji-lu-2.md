---
title: 'The 4th Universal Cup 做题记录 (2)'
date: 2026-01-11 22:26:57
tags: [做题记录,acm]
published: true
hideInList: false
feature: 
isTop: false
---
The 4th Universal Cup 做题记录

[[the-4th-universal-cup-zuo-ti-ji-lu-1|做题记录 1：Stage 0 - Stage 9]]

[Stage 12: Shanghai](https://qoj.ac/contest/2908)：BIKLM

[Stage 14: Hong Kong](https://qoj.ac/contest/3169)：AF

### [The 4th Universal Cup. Stage 12: Grand Prix of Shanghai](https://qoj.ac/contest/2908)

单挑。场上过了 ABDGHIJK。主要是调不出题，调试傻逼错误至少被硬控了 2h。

[B](https://qoj.ac/contest/2908/problem/15315) 是找一棵生成树直接做，做完就剩根不对，再找一个奇环调。注意次数。

[I](https://qoj.ac/contest/2908/problem/15322) 是 $f_i=\min f_j+(i-j-1)C+(a_i\oplus a_j)$，高低位分治。

[K](https://qoj.ac/contest/2908/problem/15324) 直接 $O(n\sqrt{n\log n})$ 容易。注意单侧递归套单侧递归可以 $O(n\log^3n)$ 做 $mn_i\times mx_i$。

#### [L. Yet another permutation problem](https://qoj.ac/contest/2908/problem/15325)

判定一个序列能否变为另一个：从左到右能分段就分段，不能分段再考虑交换最大最小值并重新分段。

即，对 $[l,r]$，之前的操作会导致：没变化、原来最小值的位置是来自外面的最大值、最大值位置是最小值。还有一些位置被 ban 掉不能分段：全部不能、全部能、最小值右边不能、最大值右边不能。

直接枚举分段的位置转移即可。

[submission](https://qoj.ac/submission/1908622)

#### [M. Yet another 01 problem](https://qoj.ac/contest/2908/problem/15326)

一个节点的两个叶子儿子必须不同。一个确定的树的权值为 $2$ 的（有两个非叶子儿子的节点数）次方，也即 $2$ 的（有两个叶子儿子的节点数 $-1$ ）次方。

钦定一些相邻且不交的对数，一对如果不等权值为 $-1$，剩下的乱选即 $Cat(n-k-1)$。

设 $f_{i,j,0/1}$ 为前 $i$ 个选 $j$ 个最后一个选/不选。分治 ntt，$f(l,r,0/1,0/1)$.

### [The 4th Universal Cup. Stage 14: Grand Prix of Hong Kong](https://qoj.ac/contest/3169)

场上过了 ABGHIJK。F 写粪了，没调出来。C 分讨不出来。

#### [A. Bipartite Graph Matching Problem](https://qoj.ac/contest/3169/problem/15432)

一开场就被过穿了是吧，怎么还有用匈牙利的时候。

扫 $r$，维护合法的解，每次找一条增广路，踢掉最左边的匹配点。复杂度 $O(nm)$。

哦，关于这个证明，二分图最大匹配等于矩阵 $A_{i,j}=e_{i,j}x_{i,j}$ 的 rank，随机赋一组值进去算。扫 $r$ 的时候做一个线性基状物，可以把一行的代表元换成靠后的，这也等价于调整一条增广路。

#### [F. Find the Circuit](https://qoj.ac/contest/3169/problem/15437)

大概就是，第一次给无向图定向的时候，断环，每个点的出边要么是序列上之前的点，要么是下一个点。

第二次就是每次找到一个 $d_u=1$ 的位置，确定其下一个点，缩起来。
