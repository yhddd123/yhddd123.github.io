---
title: Everyday DS
date: 2024-12-01 21:37:52
tags:  
  - 做题记录
  - 数据结构
published: true
hideInList: false
feature: 
isTop: false
---
每日 #数据结构 。

### 241201

[P11364](https://www.luogu.com.cn/problem/P11364)。[[noip2024-you-ji|noip2024 T4]]。

考虑一个节点 $u$，和 $u$ 的叶子 $v$ 合并，贡献是若干个连续段对 $[l1,r1]$ 到 $[r1+1,r2]$ 的答案为 $dep_u$。由于 $[l1,r1]$ 内任选两点一定在 $u$ 子树中的某个点被贡献过，所以可以当成 $[l1,r2]$ 有 $dep_u$ 的贡献。对每个 $u$ 维护子树内连续段，启发式合并。因为每个贡献区间都是两个连续段合并起来，所以只有 $n-1$ 个长度 $>1$ 的区间和 $n$ 个单点。

单点可以用 st 表维护区间最大值，对 $k=1$ 的询问贡献。对于有贡献的区间和询问区间，分三类考虑。有贡献的区间左端点小于询问区间左端点，按 $l$ 从小到大扫描线，贡献加在 $r$ 上，查询 $l\le ql,r\in [ql+qk-1,qr]$ 的答案。有贡献的区间右端点大于询问区间右端点同理。否则 $ql\le l\le r\le qr$，按 $r-l+1$ 从大到小扫描线，贡献加在 $l$ 上，查询 $k\ge qk,l\in [ql,qr-qk+1]$ 的答案。

优化启发式合并，只要对每个 $i$ 二分在 $lca(i,i+1)$ 的子树内包含 $i$ 的极长连通块，st 表求区间 dfn 最大最小的点，$O(n\log n)-O(1)$ lca。

### 241203

[CF2041J](https://www.luogu.com.cn/problem/CF2041J)

令 $c_i=b_i-1$，枚举最大值位置 $l$，令 $a'_i=\min_{i\le j\le l} a_j$，要求 $c_i<a_i$。令 $p_i$ 为最大的 $c_{p_i}<a_i$，要求 $|\{p_i\le v\}|\le v$。维护 $v-\sum [p_i\le v]$ 的最小值和最小值个数，维护 $l$ 两侧的单调栈。合法的 $l$ 的 $\min v-\sum [cp_i\le v]\ge 0$，需要减 $1$ 的 $b_i$ 数量为 $v-\sum [bp_i\le v]=-1$ 的数量。

### 241204

[CF1500E](https://www.luogu.com.cn/problem/CF1500E)

求 $[sum_i,sum_n-sunm_{n-i}]$ 的并的长度。关于 $\frac{n}{2}$ 对称，两端无交，中间有交，二分。线段树维护区间个数，区间和，区间和的前缀和。

### 241205

[P7028](https://www.luogu.com.cn/problem/P7028)

分块，维护块内的最大前缀和。形如 $v1_ix+v2_iy$，建 $(v2_i,v1_i)$ 的凸包，二分斜率 $\frac{y}{x}$。

### 241206

[Q967](https://qoj.ac/problem/967)

每个线段树节点开 set 维护 $y$ 行的白格对列答案的影响。删掉一个未被染黑的区间时，在被询问区间完全包含的线段树节点删掉 $y$ 的标记，否则下传。线段树维护答案为左右儿子的较大值和当前节点的最小标记的 min。对每个 $y$ set 维护连续段，保证每次删的区间无交。

### 241208

[CF1178G](https://www.luogu.com.cn/problem/CF1178G)

分块，维护正负的最大最小值。块内建凸包，二分 $kb_i+a_ib_i$。

### 241211

[Q2064](https://qoj.ac/problem/2064)

点分治 $u$，预处理 $x$ 最早 $f_x$ 到 $u$，要走边 $(u,v,t)$ 最晚 $g_{u,t}$ 从 $u$ 出发。数满足 $f_s\le g_{ed,t},t\le lim$ 的不同颜色数量，扫描线。

### 241215

[thupc2025 初赛 H](https://www.luogu.com.cn/problem/P11527)。

对 $c$ 分解质因数，每个质数 $p$ 维护 $\frac{i}{gcd(i,a_i)}$ 是 $p$ 倍数的位置，一个个取出来修改，只有 $n\log n$ 次修改。类似 [弹飞绵羊](https://www.luogu.com.cn/problem/P3203)，分块，每个点维护第一次跳出块的位置。

---

开更。

### 250207

[P10061](https://www.luogu.com.cn/problem/P10061)

> $n\times n$ 的矩阵，$q$ 次询问。
>
> - 将一个正方形逆时针转 $90$ 度；
> - 矩阵加一个值。
>
> $n,q\le 3000$。

神秘。

根号重构。对询问分大小为 $B$ 的块，将矩阵划分为 $4B^2$ 个子矩阵并维护原来左上角现在的坐标和旋转的次数。每次询问遍历所有的块判断在不在操作范围内并打标记，重构时再放回去。复杂度 $O(qB^2+\frac{q}{B}n^2)$。

### 250208

[P4800](https://www.luogu.com.cn/problem/P4800)

> $n\times m$ 的矩形，$q$ 次询问 $(a,b,x,y)$，每个点加 $\max(a-b\times \max(|i-x|,|j-y|),0)$。
>
> $n\times m\le 2.5\times 10^6,q\le 2\times 10^5$。

一坨屎。

每次枚举较短一边做矩阵加可以 $O(q\sqrt{nm})$，当一维顶到两边的界时对另一维加等差数列。

矩阵不断扩大时差分的位置在对角线或边界上，维护斜线和边界位置差分数组变化值的差分。

### 250210

[P8969](https://www.luogu.com.cn/problem/P8969)

> 区间加，区间 popcount，单点查。

做完一次 ```P``` 之后只有 $O(\log V)$ 种本质不同数值。

线段树维护区间是否有 ```P``` 操作，```P``` 之前加了多少，对于第一次 ```P``` 后等于 $i$ 的数现在是什么。

### 250216

[pjudge PR #15 B](https://pjudge.ac/contest/1914/problem/21889)

> 树，每个节点上有一颗二叉搜索树。对路径上的点的 BST 插入一个 $x$，单点查询在一个 BST 上查找 $x$ 时经过的权值和。

离线。对于 $(x,t)$，贡献为比 $x$ 两侧的 $t$ 的前/后缀最小值位置上的 $y$。

线段树合并，楼房重建线段树维护前/后缀最小值位置上的和。

### 250218

[P11369](https://www.luogu.com.cn/problem/P11369)

> 有向图。将一条边打开关闭；询问 $u,v$ 是否可达。
>
> $n\le e\times 10^4,m,q\le 10^5$。

时间分块，每 $B$ 个询问一起做，$2\times B$ 个关键点。把非关键边的拿出来缩边双，求出关键点使用非关键边两两的连通性。bitset 优化 bfs。

复杂度 $O(\frac{q}{B}n\frac{B}{w}+q\frac{B^2}{w})$，感觉很错，乱冲。

### 250220

怎么两天一道了。

[P10169](https://www.luogu.com.cn/problem/P10169)

> 给定 ${a_n},k$。计数区间 $[l,r]$ 满足 $\text{mex} a_j+\min a_j+k\ge \max a_j$。

注意到 $\text{mex}$ 和 $\min$ 至少一个为 $0$。计数 $\text{mex}+k\ge \max$ 加 $\min+k\ge max$ 减去 $k\ge \max$。

$\text{mex}$ 的部分。求出 [极小和极大 $\text{mex}$ 区间](https://www.luogu.com.cn/problem/P9970)，即 $pl\le i\le l,r\le j\le pr$ 的区间 $[i,j]$ 的 $\text{mex}$ 值相等。再二分出 $nl$ 使得 $\text{mex}+k\ge \max_{nl\le j\le r}a_j$，和 $nr$ 使得 $\text{mex}+k\ge\max_{l\le j\le nr}a_j$。对于 $nl\le i\le l,r\le j\le nr$ 的 $[i,j]$ 符合 $\text{mex}$ 部分的限制。扫描线求矩阵并。

---

开更！

### 250722

[P5841](https://www.luogu.com.cn/problem/P5841)

> $n$ 个串。要求重排，最大化 $\sum lcp(s_{p_{i-1}},s_{p_i})^2$。在此基础上，依次尽量满足要求令 $x_i$ 之后为 $y_i$。

每个串后加额外字符使得不存在包含关系。最大化相当于字典树上的一个 dfs 序。

之后要求 $u$ 到 $v$ 路径上一些点是其父亲最前/最后的儿子，或是其父亲的儿子顺序相邻的。

链表维护每个元素的前驱后继，每条链的链顶链尾和长度，每个父亲的最先最后儿子。合并的时候可以 $O(\sum)$ 合并两个链表的所有信息。

缩掉只有一个儿子的点，可以保证树深 $O(\sqrt{ \sum |S_i|})$。

[P5113](https://www.luogu.com.cn/problem/P5113)

> 区间覆盖；区间求和；撤销覆盖。

分块。维护栈描述推平值和时间戳。

按每个点最后被覆盖的时间戳排序，和整块的时间戳比较。

$O(n\sqrt n)$ 再补。

[Q12012](https://qoj.ac/contest/2079/problem/12012)

找支配对。

按 $Y$ 分治，要求红蓝点必有一个是最大值。

扫描线。

[P6109](https://www.luogu.com.cn/problem/P6109)

> 矩形加；矩形最大值。
>
> $n,m\le 5\times 10^4,q\le 5\times 10^5$。

对第一维线段树分治，将询问挂在跨过中点的区间，修改拆到 $O(n\log n)$ 个区间。

扫描线处理前后缀，维护 区间历史最大值。需要处理回滚。

### 250723

> 数 边界字符全相同 的矩形。
>
> $n,m\le 2\times 10^3$。

预处理 $pl/pr/pu/pd_{i,j}$。$4$ 维。

对矩形分治。左右两边独立。$3$ 维。

枚举 $i$ 行和 $j$ 行，相当于数 $k\in [pl_{j,mid},mid],up_{j,k}\le i$ 的数量。

单次复杂度 $O(n^2+nm)$。令 $n<m$，即对长的一边分治，复杂度 $O(nm\log nm)$。