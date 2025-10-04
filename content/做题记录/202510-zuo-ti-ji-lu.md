---
title: '2025.10 做题记录'
date: 2025-10-02 22:09:23
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---
### 10.1

#### [P12550](https://www.luogu.com.cn/problem/P12550)

交换后无法换回来。等于把序列分成若干段，每段的价值为 ```AB``` 的逆序对数。

一段里不会有 $3$ 种字符，不会有一个划分两边相同，不会有一个划分两边字符集相同。

只有两个转移点，是当前包含两个字符的最远连续段的两端。

#### [P8493](https://www.luogu.com.cn/problem/P8493)

$c_u$ 的方案数是儿子为 $1$ 的数量，组合意义是选一个儿子让他为 $1$，即选一条链。

每个叶子的贡献为根到它以外的点乱选的 $\prod d_u$，区间 flip，线段树维护。

### 10.2

#### [Q913](https://qoj.ac/contest/1814/problem/913)

令 $k=l+r-n\le 11$，$bell(k)$ 枚举中间哪些连通，要求出左右两个图在已经有一些点连通后的 MST。

只考虑图中的点，求 MST，扔掉没用的边，边数 $O(n)$。将中间所有点连通，求 MST，将连起来的点缩起来，点数 $O(k)$。

复杂度 $O(bell(k)k)$。

#### [P9055](https://www.luogu.com.cn/problem/P9055)

对于 $f(m)$，把 $0,\dotsb,m-1$ 排成 $x$ 段，其中出现 $x+1$ 次的排在前面，最后按相同的顺序在结尾加上第 $x+1$ 次的数。这样每个$len\ge m$ 的区间都合法。

对于 $f(i)$，$0,\dotsb,i-1$ 一样排成 $\min_{j<i} a_j$ 段，剩下要在段间插入一些数。假设当前在这个间隔已经有 $cnt$ 个数，在开头结尾加会有 $(i-1)+cnt+1$，中间会有 $2(i-1)+cnt+1$ 的不合法段。

现在开头结尾各补 $i-1$，再平均插在每个间隔中最优。

### 10.3

#### [P6775](https://www.luogu.com.cn/problem/P6775)

$m\ge n-1$ 一定存在 $a_n\ge k$ 或 $a_1+a_n\ge k$，进入子问题。

$m=n-2$，要选出一个子集，使得 $\sum_{x\in S}a_x=(|S|-1)k$。bitset。

#### [Q14129](https://qoj.ac/problem/14129)

$i\bmod n$ 向 $n+i\bmod m$ 连边等价于 $i\bmod (n+m)$ 向 $(i+n)\bmod (n+m)$ 连边。

设 $a=n+m,b=n$。当做了 $a-b$ 步后，所有 $\bmod b$ 同余的点连通。接下来将进入 $i\bmod b$ 向 $(i+(a\bmod b))\bmod b$ 连边的子问题。

对 $a-b$ 步进行二分，检查的时候如果点数还 $>k+1$ 一定不连通，否则 $O(k)$ 检查。

#### [CF1017G](https://www.luogu.com.cn/problem/CF1017G)

一个点为黑色，要求到根路径上一个后缀操作次数大于等于路径长度。初始赋为 $-1$，单点加，后缀和 max。

让 $u$ 的子树为白色，先清空子树内的操作次数，再在 $u$ 抵消掉到根的最大后缀和，即把最大后缀和重新减成 $-1$。

#### [CF2068B](https://www.luogu.com.cn/problem/CF2068B)

#### [P7560](https://www.luogu.com.cn/problem/P7560)

换维扫描线。

找到后缀 min 的点，只用考虑其后面的操作。
