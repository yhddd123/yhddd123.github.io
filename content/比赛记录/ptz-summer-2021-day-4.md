---
title: 'Ptz Summer 2021. Day 4.'
date: 2025-10-28 21:55:32
tags: [acm]
published: true
hideInList: false
feature: 
isTop: false
---
[Petrozavodsk Summer 2021. Day 4. Shanghai ICPC Camp 2021 Onsite Day 1 by PKU](https://qoj.ac/contest/694)

#### [A. Counting Pairs](https://qoj.ac/contest/694/problem/1843)

卷一下 $d_u+d_v$ 的 $(u,v)$ 对，再特判有边的 $(u,v)$ 对。

#### [B. Cactus](https://qoj.ac/contest/694/problem/1844)

能删就删，最后剩下一些全是偶度数的仙人掌，此时不存在只有两个点的点双，使用操作二。

建圆方树，对于一个环，保留连向父亲的一对点不动，其余绕环黑白染色，删光黑点，能删掉除了这对点以外的整个环。从叶子开始删即可，最后一定能删光。

#### [C. Permute](https://qoj.ac/contest/694/problem/1845)

这不是 [[the-4th-universal-cup-zuo-ti-ji-lu-1#^10f0fc|4th ucup stage 2 D]] 吗！要是早几周 vp 也不至于场上破防那么久了。

注意到 $10^k$ 模 $7$ 的循环节为 $6$。

感受一下，随机排列 $\bmod 7$ 的概率均等，就随便划分成 $3$ 段，再随便给一个顺序即可。

但是要特判掉有一个位置是 $1$，一个位置极大的情况，此时不一定随的出来。其余情况基本都有解。

#### [E. Elephants](https://qoj.ac/contest/694/problem/1847)

树形关系，随便调整。

#### [F. Interval Shuffle](https://qoj.ac/contest/694/problem/1848)

维护 $ans_i$。操作形如：求出区间 $[l,r]$ 的 $mx$，将 $i\in [l,r],a_i=mx$ 加 $1$，其余赋值为 $mx$。

beats 即可。

#### [I. Directed Acyclic Graph](https://qoj.ac/contest/694/problem/1851)

赛时：

![[Pasted image 20251028223447.png]]

在瓶颈循环处应当把数组的值缓存到局部变量！

按 $B=64$ 对询问分块。ull 压操作 $i$ 会不会影响到 $u$，拓扑排序。

当计算每个点在这一块收到的贡献时，先找最后一位赋值操作，与一下找到赋值操作后的所有取 min 操作。给取 min 重编号再压，直接位运算找最大的。