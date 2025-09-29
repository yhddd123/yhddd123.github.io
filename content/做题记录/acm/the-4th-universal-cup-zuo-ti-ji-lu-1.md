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

[Stage 0: Trial Contest](https://qoj.ac/contest/2041)：CDEFGHIJM

### [The 4th Universal Cup. Stage 0: Trial Contest](https://qoj.ac/contest/2041)

场上过了 ABDEFGHIJKLM。

不是我写的有一些就懒得补了。

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

#### [H. Ornaments on a Tree](https://qoj.ac/contest/2041/problem/11363)

从下往上贪，尽量让根节点的值小。先让无限制递归子树，再找无限制的儿子减。

#### [J. Popping Balloons](https://qoj.ac/contest/2041/problem/11365)

过程中，每个出现的不合法的串对答案贡献其出现的概率。

即对每个长度数有多少种合法的串。记 $f_{i,j,0/1/2}$，分治 $f_{l,r,0/1/2,j}$ 卷即可。

#### [M. This Is Sparta!](https://qoj.ac/contest/2041/problem/11368)

按 $2^k$ 分层，每次一层中至少一半会掉下去。可以快速缩小到 $\log V$ 个数。

又因为想让他不发生相对顺序变化，大概要 $1,x,x^2,\dotsb$。这部分大概只用做 $\sqrt[n]{nV}$ 次。可以快速缩小到 $3$ 个数。

对于 $[a,b,c]$ 做 $k$ 次后是 $[a,b-ka,c-(k+1)b+\frac{k(k+1)}{2}a]$。可以二分 $k$。一旦发生相对大小变化，就相当于辗转相除。