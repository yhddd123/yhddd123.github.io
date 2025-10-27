---
title: 'The 4th Universal Cup 做题记录 (1)'
date: 2025-09-27 22:28:43
tags: [做题记录,acm]
published: true
hideInList: false
feature: 
isTop: false
---
The 4th Universal Cup 做题记录

[[the-3rd-universal-cup-zuo-ti-ji-lu-1|The 3rd Universal Cup]]

[Stage 0: Trial Contest](https://qoj.ac/contest/2041)：CDEFGJM

[Stage 1: Korolyov](https://qoj.ac/contest/2539)：BEG

[Stage 2: Paris](https://qoj.ac/contest/2551)：EJ

[Stage 3: Polar](https://qoj.ac/contest/2559)：BEFGIJ

### [The 4th Universal Cup. Stage 0: Trial Contest](https://qoj.ac/contest/2041)

场上过了 ABDEFGHIJKLM。

不是我写的有一些就懒得补了。

是我写的有一些就懒得写做法了。

#### [C. Entrapment](https://qoj.ac/contest/2041/problem/11358)

爆搜，记状态 $(s1,s2)$ 表示 $s1$ 无障碍且不可能有人，$s2$ 无障碍且可能有人。

转移枚举问 $t\subseteq s2$，可以答 $0/1$，再决定 ban $i$，再将 $s2$ 改为新的可能的位置。

复杂度 $O(4^nn)$。

#### [D. Geometry Rush](https://qoj.ac/contest/2041/problem/11359)

求出上下界， ~~bitset~~，合法的位置是一个区间。

#### [E. Humans vs AI](https://qoj.ac/contest/2041/problem/11360)

令 $c_i=a_i-b_i$，如果 $c_i$ 为正有 $1$ 的系数，否则 $k$ 的系数，每次还可以取最大的正的 $c_i$ 改为 $-k$ 的系数。求前缀和，要求有多少个区间 $[l,r]$ 满足 $s_r-s_{l-1}-(k+1)\max_{i=l}^r c_i\ge 0$。

建笛卡尔树，枚举短的一边，主席树维护另一边。

#### [F. Mob Grinder](https://qoj.ac/contest/2041/problem/11361)

充要条件是要有 $n-1$ 个 ```U``` 和 $m-1$ 个 ```R```。

从右往左，每列从下往上放 ```L```。贴着 ```L``` 的边界放 ```U```，多的接着从右往左放。贴着地面和之前列的上边界填 ```R```，多的接着从右往左放。剩下的 ```D```。

#### [G. Most Scenic Cycle](https://qoj.ac/contest/2041/problem/11362)

注意到：同胚与 $K4$ 不合法。

广义串并联图方法。

#### [J. Popping Balloons](https://qoj.ac/contest/2041/problem/11365)

过程中，每个出现的不合法的串对答案贡献其出现的概率。

即对每个长度数有多少种合法的串。记 $f_{i,j,0/1/2}$，分治 $f_{l,r,0/1/2,j}$ 卷即可。

#### [M. This Is Sparta!](https://qoj.ac/contest/2041/problem/11368)

按 $2^k$ 分层，每次一层中至少一半会掉下去。可以快速缩小到 $\log V$ 个数。

又因为想让他不发生相对顺序变化，大概要 $1,x,x^2,\dotsb$。这部分大概只用做 $\sqrt[n]{nV}$ 次。可以快速缩小到 $3$ 个数。

对于 $[a,b,c]$ 做 $k$ 次后是 $[a,b-ka,c-(k+1)b+\frac{k(k+1)}{2}a]$。可以二分 $k$。一旦发生相对大小变化，就相当于辗转相除。

### [The 4th Universal Cup. Stage 1: Grand Prix of Korolyov](https://qoj.ac/contest/2539)

场上过了 ABCDEFHIKL。

[A](https://qoj.ac/contest/2539/problem/14426) 是观察到可以模 $3$，合法矩阵每行每列模 $3$ 余 $0$。后面不会。

#### [B. Domain Compression](https://qoj.ac/contest/2539/problem/14427)

拆贡献到树上每对距离为 $d$ 的点，能有边即中间 $d-1$ 个点都被删了。

点分治求距离为 $d$ 的点对数。

#### [E. Coffee Shops](https://qoj.ac/contest/2539/problem/14430)

上界是 $n+\frac{n-1}{2}$。

#### [G. Cyclic Topsort](https://qoj.ac/contest/2539/problem/14432)

如果先删 $u$ 能到达 $v$，则 $u$ 偏序 $v$。这种关系形成一颗树。

每次找一个 $u$ 开始暴力拓扑排序。将点打乱随机找 $u$ 开始，跳过不优的点，则每个点只会经过 $\log n$ 次。

### [The 4th Universal Cup. Stage 2: Grand Prix of Paris](https://qoj.ac/contest/2551)

^416df2

场上过了 ABDFGHIJKL。E 能过的假解爆 inf 了。

我做的题都没啥意思。

#### [E. Euclid in Manhattan](https://qoj.ac/contest/2551/problem/14134)

只能在相邻行/列转移。

假解是选前 $B$ 个转移，可以 hack。

决策点不交？

二分栈？

#### [J. JamBrains](https://qoj.ac/contest/2551/problem/14139)

合法位置有单调性。

如果存在 $u$ 行总数量大于 $r$，后面的就无法跨过，否则都可以。

### [The 4th Universal Cup. Stage 3: Polar Grand Prix](https://qoj.ac/contest/2559)

^12d5f7

场上过了 BCDEFGIJK。

#### [B. Christmas Tree](https://qoj.ac/contest/2559/problem/14416)

[P9111](https://www.luogu.com.cn/problem/P9111)。

求一个点指向多少个点，设 $f_{u,j,k}$ 表示 $u$ 子树内连向 $j$ 个，钦定 $u$ 最后一个指向 $k$ 个，提前补上 $a_u\times (k-j)$。

$$f_{u,j1,k}+f_{v,j2,j2}+a_u\times j2\to f'_{u,j1+j2,k}$$

$$f_{u,j1,k}+f_{v,j2,j2+k}\to f'_{u,j1,k}$$

#### [E. Maximum Segment Sum](https://qoj.ac/contest/2559/problem/14419)

求 $\le k$ 的答案再差分。

考虑后缀和，每次可以 $s+1\to s'$ 或 $\max(s-1,0)\to s'$。要求 $s\le k$。

刻画路径：第奇数次 $s=0$ 时 $-1$ 向下走，并反转之后的路径，直到第偶数次 $s=0$ 时 $-1$ 向上走。这样双射从 $(0,0)$ 到 $(n,i)$，一步右上或右下，不经过 $k+1$ 和 $-k-2$ 的路径。

反射容斥，预处理上指标为 $n$ 的前缀和。单次复杂度 $O(\frac{n}{k})$。

#### [F. This Time I Will Be Lucky](https://qoj.ac/contest/2559/problem/14420)

倒着做，维护正着 dp 的 dp 值对终点的贡献，太小就扔掉。

#### [G. Far Away](https://qoj.ac/contest/2559/problem/14421)

判掉 $u,v$ 所在连通块 $\le 20000$。随机选几百个点求最短路，有极大概率选到最短路上的点，检查 $\min f_{i,u}+f_{i,v}$ 即可。

#### [I. Two Permutations](https://qoj.ac/contest/2559/problem/14423)

从 $n\ldots 1$，每次往前跳跟目前最大值换。

#### [J. One Permutation](https://qoj.ac/contest/2559/problem/14424)

[ZR3343](https://zhengruioi.com/problem/3343)

凸！套一个 [P10181](https://www.luogu.com.cn/problem/P10181)，根号分治段数和 wqs 的 $c$。

把求区间贡献和加 wqs 分段的 $c$ 放在一个树状数组 dp 中。

复杂度 $O(n\sqrt n\log n)$。