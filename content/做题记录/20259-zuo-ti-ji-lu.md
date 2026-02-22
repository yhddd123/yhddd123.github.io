---
title: '2025.9 做题记录'
date: 2025-09-08 22:16:22
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---
### [CF2134F](https://www.luogu.com.cn/problem/CF2134F)

$0/2$ 和 $1/3$ 的极长连续段分别考虑，段内代价为 $0/2$，段间为 $1$。

对 $0/2$ 再考虑 $0$ 和 $2$ 的极长连续段，段间代价为 $2$。枚举分别有 $i,j(i=j\pm 1)$ 段，段间切 $p\le i+j-1$ 下，段内切 $q$ 下，就得到 $0/1$ 形成 $p+q+1$ 个极长连续段的方案数。

### [P4298](https://www.luogu.com.cn/problem/P4298)

> 给定一个 DAG，构造最长反链。

$O(\frac{n^3}{w})$ 传递闭包求出偏序关系。最长反链等于最小链覆盖。

求最小链覆盖，网络流，拆点，如果存在 $u\to v$，连边 $(u_{out},v_{in},1)$，求二分图最大匹配。

从 $t$ 出发走 $w=0$ 的边 dfs。左部点能去到的加右部点不能去到的是最小点覆盖。补集，即左部点不能去到的加右部点能去到的是最大独立集。

$x_{out}$ 和 $x_{in}$ 同时属于最大独立集的 $x$ 是 DAG 的最长反链。

#### [CF590E](https://www.luogu.com.cn/problem/CF590E)

ACAM 上，路径压缩跳 fail 树祖先中最近的终止节点，再传递闭包求出两两串的子串关系。

是偏序集，求最长反链。

### 0910

#### [Q5020](https://qoj.ac/contest/1033/problem/5020)

树剖，把答案拆为子树内/轻子树内距离 $\le k$ 的点的数量。

离线后二位数点。$O(n\log^2n)$。

#### [P5470](https://www.luogu.com.cn/problem/P5470)

由于模型的特殊，于 $S/T$ 相连的边不会退流。

建图后能说明本质不同的有意义的增广路只有 $5$ 类。堆维护。

#### [abc363g](https://www.luogu.com.cn/problem/AT_abc363_g)

可以以一个任意的顺序加入 $(d_i,p_i)$，维护流量变化，线段树分治回答修改。

可能的情况是负环或 $S\to T$ 的负权路径。

需要一个线段树维护流量，一个线段树维护可能被退流的最小值。

#### [AT_nikkei2019_final_h](https://www.luogu.com.cn/problem/AT_nikkei2019_final_h)

不会有负环。增广路不会经过重复的点。直接求增广路，有很多个可以用线段树 pushup 维护的限制。

#### [Q5175](https://qoj.ac/contest/1059/problem/5175)

到关键点的最短路形成外向树。类似斯坦纳树，设 $dp_{s,i,u}$ 表示覆盖 $s$ 的关键点，升级 $i$ 条边，当前树根为 $u$。

转移为同层的最短路和枚举子集合并。枚举子集时 $i$ 有单调性。

### 0916

### 0917

#### [P13275](https://www.luogu.com.cn/problem/P13275)

[[p13275-ti-jie|题解]]。

#### [P10547](https://www.luogu.com.cn/problem/P10547)

最后代价为 $\frac{\sum|i-p_i|}{2}$。由势能 $\sum|i-p_i|$ 代价至少这么多，一定存在 $p_j\le i<j\le p_i$ 代价至多这么多。

数 $\sum|i-p_i|$ 即 [abc134f](https://www.luogu.com.cn/problem/AT_abc134_f)，考虑跨过 $(i,i+1)$ 时计算贡献，且最多 $\sqrt m$ 个跨过贡献，复杂度 $O(n\sqrt m m)$。

合法的新排列要求置换环为偶数：从 $n$ 个置换环出发，每交换 $i,j$ 置换环奇偶性变化。

对应到置换环上，设 $f_{i,j,k,0/1}$，前 $i$ 个点 $j$ 个 $<i$ 的 $p_i$ 未决定，代价为 $k$，$0/1$ 个置换环。可以：新开链/环，拓展链，封闭链，合并链。

### 0926

#### [CF1942G](https://www.luogu.com.cn/problem/CF1942G)

抽到 $0$ 牌减 $1$，$1$ 牌无用，$2$ 牌加 $1$。目标牌当做 $0$ 牌。

初始 $5$ 张 $2$ 牌，从 $(0,5)$ 出发，除了最后一次以外不碰 $y=0$，的方案数。

枚举最后用了 $x+5$ 张 $0$ 牌，反射容斥求出恰好抽掉这些牌的合法方案数，再 $\binom{x+5}5$ 选出目标牌，后面乱选。

#### [CF1942H](https://www.luogu.com.cn/problem/CF1942H)

$a$ 和 $b,c$ 做二分图匹配，要求每个 $b,c$ 都能被 $a$ 匹配到。$b$ 能匹配儿子和祖先的 $a$，$c$ 能匹配子树和祖先的 $a$。

hall 定理，要求 $\sum_{u\in N(Sb\cup Sc)} a_u-\sum_{u\in Sb}b_u-\sum_{u\in Sc}c_u\ge 0$。设 $f_{u,0/1}$ 表示考虑 $u$ 子树，$a_uu$ 出在 $N(S)$ 中，$u$ 子树有没有全被选入 $N(S)$。

- 同时不选 $b_u,c_u$，$f_{u,0}$ 可以选择一些子树转移，$f_{u,0}=\sum \min(0,f_{v,0})+a_u$。

- 选 $b_u$ 不选 $c_u$，$f_{u,0}$ 必须从全部儿子转移，$f_{u,0}=\sum_{f_{v,0}}+a_u-b_u$。

- 不选 $b_u$ 选 $c_u$，$b$ 的覆盖范围被 $c$ 偏序，多选上 $b$ 有 $-b_u$ 的贡献。

- 同时选 $b_u,c_u$ ，此时 $u$ 子树全被选入 $N(S)$，$f_{u,0}=f_{u,1}=\sum f_{v,1}+a_u-b_u-c_u$.

修改形如单点修改 $a_u,c_u$，ddp 维护 $\begin{pmatrix}f_{u,0}\\f_{u,1}\\0\end{pmatrix}$。

#### [CF2096G](https://www.luogu.com.cn/problem/CF2096G)

维护 $n$ 个三进制数，使得每位都有 两个值 出现次数相同，且任意两个数至少有两位不同。

前 $\lceil \log_3 n\rceil$ 位均分着填，最后一位按之前的位的和模 $3$。

#### [CF2097F](https://www.luogu.com.cn/problem/CF2097F)

[[cf2097f-ti-jie|题解]]。

#### [CF2115E](https://www.luogu.com.cn/problem/CF2115E)

[[cf2115E-ti-jie|题解]]。

#### [CF2122F](https://www.luogu.com.cn/problem/CF2122F)

一个矩形，上边界 $a+2$ 个点，下边界 $b+2$ 个点，可以凑出组合数 $\binom{a+1+b+1}{a+1}$。

多个矩形可以用一个狭窄的部分连起来，要保证连接部分剖分唯一。

![[Pasted image 20250927093012.png]]

分治乘控制点数。

#### [CF2138E2](https://www.luogu.com.cn/problem/CF2138E2)

[[zhi-hui-gou-zao#^6002ee|here]]。