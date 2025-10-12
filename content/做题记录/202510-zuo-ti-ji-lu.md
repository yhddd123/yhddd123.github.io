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

### 10.7

#### [Q12120](https://qoj.ac/contest/2126/problem/12120)

每个点在根在 dfn 序上变化的时候子树大小只有 $\deg u$ 段。现在有 $O\sum deg1u\times deg2_u$ 个矩形的值。

通过把儿子按 $siz_v$ 排序再求 dfn 序，特殊处理掉父亲，再双指针，可以减少为 $O(\sum deg_u$ 个矩形。扫描线。

#### [Q8109](https://qoj.ac/contest/247/problem/8109)

求一棵生成树出来。断 $k$ 条边将其在 dfn 序上分为 $O(k)$ 段，每段连续且内部连通。段间的边数可以预处理二维前缀和与实际比较。缩点后判断。

### 10.9

#### [dmy3349](http://oj.daimayuan.top/contest/402/problem/3349)

> 给出三个整数 $n,k,d$，在 $n$ 个节点有标号无根树中随机选择一棵树，并把 $1∼n−k$ 号点及其边删除，在满足剩下的连通块大小都不超过 $d$ 的情况下，求剩下的连通块的期望个数。
>
> $n\le 10^9,k\le 5\times 10^3$。

[[tu-ji-shu#^4e748e|结论]]。

设 $f_{i,j}$ 表示 $i$ 个连通块用了 $j$ 个，枚举当前最小点加一块：$f_{i,j}=\sum_{l=1}^{\min(j,d)}f_{i-1,j-l}l^{l-2}l\binom{j-1}{l-1}(n-k)$。

又因为只需要知道 $\sum if_{i,k}$，维护 $f'_{k}=\sum f_{i,k}$，$g'_k=\sum if_{i,k}$，每拼上一个连通块就让 $g'_k=g'_k+f'_k$。

#### [AT_diverta2019_f](https://www.luogu.com.cn/problem/AT_diverta2019_f)

正着 dp 容易，$O(2^nn^3)$。

倒着做，在放一个树边之前必须放一些非树边。枚举当前放了哪些树边，同时维护当前的方案数和位置和 $(c,s)$。

加树边必须加在最前，对于当前所有树边，位置向后移 $1$，变为 $(c,s+(num+1)c)$。

加非树边加在任意位置，对于当前所有树边，有其位置种方式加一，变为 $((n+1)c,(n+2)s)$。批量加入一堆非树边，形如阶乘。


#### 10.10

#### [Q8713](https://qoj.ac/contest/1668/problem/8713)

设 $f_{u,s}$ 表示 AC 自动机节点 $u$，已经出现过状态 $s$ 的串，先手的价值，转移是图。

按 s 从大到小分层考虑。如果后继状态 $v$ 能去到上一层，更新 $u$。如果 $u$ 的所有后继状态都确定，确定 $u$。否则取出当前最大的 $u$，如果 $f_{s,u}\ge 0$，确定 $u$；否则此时剩下的状态都是求和。

#### [Q4888](https://qoj.ac/contest/1016/problem/4888)

$65535=3\times 5\times 17\times 257$。要求 $\sum_a \sum_i(256)^i a_i$。

对于 $p=3,5,17$，$256$ 取模后为 $1$。即求 $(\sum a_i)^{n!}$，$n!$ 对 $\phi(p)$ 取模，只用算 $p$ 次。

对于 $p=257$，即求 $|S|=\frac{n}{2}$，$(\sum_S(\sum_{i\notin S}a_i-\sum_{i\in S} a_i))^{\frac{n}{2}!\frac{n+1}{2}!}$。当 $n\le 11$ 时暴力。否则指数模 $\phi(257)=0$，只需要关注是否存在 $S$ 使得 $\sum a_i-2\sum_{S\in S}a_i=0$。取 $a_i$ 最大的 $i$ 作为基准，如果其他的 $\sum a_i-\max a_i$ 太大（$\ge 2p$），一定能做出 $0$。否则 bitset。

#### [Q4811](https://qoj.ac/contest/1460/problem/4811)

有 $2^{\max d_v}$ 的做法。对于每个儿子，检查 $0\sim d_b$ 是否出现过。

有 $2^{d_u}$ 的做法。枚举 $mex=0\sim d_u$，记录有多少个值有叶子选了，当前已经选了哪些儿子。

根号分治，对于 $d_u> B$ 的 $\frac{n}{B}$ 个，和 $d_u\le B$ 的 $\max d_v\le B$，再拼起来。

