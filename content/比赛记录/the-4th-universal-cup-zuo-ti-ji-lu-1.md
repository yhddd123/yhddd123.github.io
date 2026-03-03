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

[Stage 1: Korolyov](https://qoj.ac/contest/2539)：BEGJ

[Stage 2: Paris](https://qoj.ac/contest/2551)：DEJ

[Stage 3: Polar](https://qoj.ac/contest/2559)：BEFGIJ

[Stage 4: Chengdu](https://qoj.ac/contest/2567)：HKM

[Extra Stage 1: Xi'an](https://qoj.ac/contest/2562)：ACK

[Stage 5: Nanjing](https://qoj.ac/contest/2581)：BEFGLM

[Extra Stage 2: Wuhan](https://qoj.ac/contest/2609)：BL

[Stage 6: Shenyang](https://qoj.ac/contest/2641)：ADFK

[Stage 7: Zhengzhou](https://qoj.ac/contest/2661)：C

[[the-4th-universal-cup-zuo-ti-ji-lu-2|做题记录 2：Stage 10 - Stage 19]]

---

不是我写的有一些就懒得补了。

是我写的有一些就懒得写做法了。

剩下一些没写但大概直到做法的就随便提一句。

### [The 4th Universal Cup. Stage 0: Trial Contest](https://qoj.ac/contest/2041)

场上过了 ABDEFGHIJKLM。

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

^058c85

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

#### [J. Yet Another Constructive Problem](https://qoj.ac/contest/2539/problem/14435)

~~杨表是什么？~~

固定 $k$，调整 $m$。

直接对反链流，原始对偶，复杂度 $O(n^2\log^2 n)$。

[[primal-dual-yuan-shi-dui-ou-suan-fa#^1e95bb|优化]]：最短路用桶 $O(m+dis)$。建图用 cdq 分治，还要偏移一下 $mid$ 效果最好（注意点/边数最小做 spfa 不一定优，要避免大度数点）。只有 sqfa 带两个 $\log$。

### [The 4th Universal Cup. Stage 2: Grand Prix of Paris](https://qoj.ac/contest/2551)

^416df2

场上过了 ABDFGHIJKL。E 能过的假解爆 inf 了。

[D](https://qoj.ac/contest/2551/problem/14133) 一个比较有道理的做法是，注意到这数位和和数值应该没什么关系，随机调整就 $O(k)$。 ^10f0fc

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

^92a17a

求 $\le k$ 的答案再差分。

考虑后缀和，每次可以 $s+1\to s'$ 或 $\max(s-1,0)\to s'$。要求 $s\le k$。

构造双射路径：第奇数次 $s=0$ 时 $-1$ 向下走，并反转之后的路径，直到第偶数次 $s=0$ 时 $-1$ 向上走。这样双射从 $(0,0)$ 到 $(n,i)$，一步右上或右下，不经过 $k+1$ 和 $-k-2$ 的路径。

[[ge-lu-ji-shu#^85b7de|反射容斥]]，预处理上指标为 $n$ 的前缀和。单次复杂度 $O(\frac{n}{k})$。

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

### [The 4th Universal Cup. Stage 4: Grand Prix of Chengdu](https://qoj.ac/contest/2567)

^2ff9e4

场上过了 ABCDGJKLM。全是签到。

#### [H. Heuristic Knapsack](https://qoj.ac/contest/2567/problem/14713)

贪心会不了一点。

按 $w$ 排序后 A 取一个前缀，枚举是哪个前缀，然后 check。

把 $w_i$ 确定的按 $w_i$ 排序，剩下的按 $v_i$ 排序。枚举 $w_i$ 确定的一个要选前缀，前缀的未确定 $v_i=inf$，后缀的未确定 $v_i=1$，然后把 $w_i$ 确定按 $v_i$ 排序。

从前往后 $w_i$ 未确定的 $w_i$。考虑要不要选未确定的 $w_i$ 中 $v_i$ 最大的，考虑该位置 $w_i$ 的上界。首先不能超过当前背包剩的空间，也不能超过枚举过不选的最小 $w_i$，如果此时 $w_i>0$，那就选上以尽快填满剩下的背包空间。

#### [K. K-Coverage](https://qoj.ac/contest/2567/problem/14716)

按照新位置与原位置的关系分讨，拆贡献。

#### [M. Meeting for Meals](https://qoj.ac/contest/2567/problem/14718)

对 $a_i$ 和 $a_j$ 要求所有满足 $dis(1,p)+\max(dis(a_i,p),dis(a_j,p))\le T$ 最小的 $T-\frac{dis(a_i,p)+dis(a_j,p)}{2}$。

感受一下，对于 $p$，如果确定 $a_i$，那么 $a_j$ 应当选离 $p$ 最近的那个。所以一对 $(a_i,a_j)$ 有贡献的 $p$ 应该是在他们最短路的交界处。从 $k$ 个点出发跑多元最短路，在两端是不同出发点的边合并。

### [The 4th Universal Cup. Extra Stage 1: Xi'an](https://qoj.ac/contest/2562)

^c57a1b

场上过了 ABCFGIJKLM。

[C](https://qoj.ac/contest/2562/problem/14683) 是一条长链挂一堆叶子才合法。

#### [A. Azalea Garden](https://qoj.ac/contest/2562/problem/14681)

$b_i>\max a_i$ 的永远死不掉，只需要知道 $max a_i$ 的 $i$ 能不能死掉。等价于区间 $[b_i,a_i]$ 能覆盖 $[\min_{b_i>\max a_i} a_i,\max a_i]$ 之类。

但是我比较蠢，直接楼房重建。调大半场。

#### [K. Killing Bits](https://qoj.ac/contest/2562/problem/14691)

判掉简单情况。等价于存在一个排列 $p_i$ 使得 $p_i\text{\&}b_i=b_i$。

高维前缀和优化建图跑流。

### [The 4th Universal Cup. Stage 5: Grand Prix of Nanjing](https://qoj.ac/contest/2581)

^1385b2

场上过了 BCEFGHIJKLM。

[B](https://qoj.ac/contest/2581/problem/14802) 是看作向量在过原点的一条直线同侧的可以一起选。

#### [E. Cyan White Tree](https://qoj.ac/contest/2581/problem/14805)

启发式合并。线段树维护 $depa_i-depb_u$ 之类。

#### [F. Bitwise And Path](https://qoj.ac/contest/2581/problem/14806)

$V$ 个并查集维护边权为超集的边的连通性。

每一次成功的加边最多有 $\log V$ 的代价，一共只有 $O(nV)$ 次加边。查询可以从高位开始贪心。

#### [G. Bucket Bonanza](https://qoj.ac/contest/2581/problem/14807)

枚举是 $k$ 个最后有水的水桶，分别是前 $k$ 大的容量和前 $k$ 小的漏水。凸包，决策点单调。

#### [L. Regional Champion](https://qoj.ac/contest/2581/problem/14812)

欧拉公式。假设所有交点都能不相同。

对于直线，在最外面建一个虚点。$V-E+F=1+[k\neq 0]$。

$$V=n(n-1)+6nm+2nk+3m(m-1)+2mk+\frac{k(k-1)}{2}+3m$$

$$E=n(2(n-1)+6m+2k)+m(6n+6(m-1)+2k+3)+k(2n+2m+k)$$

构造可以在一些端点间连续的取：

![[3.png]]

一个更方便的做法是，把直线当作三角形的一条边。

#### [M. Many Convex Polygons](https://qoj.ac/contest/2581/problem/14813)

凸多边形面积是 $\frac{1}{2}|\sum x_iy_{i+1}-x_{i+1}y_i|$ 之类。一条边 $(i,i+d)$ 的出现次数是 $\binom{n-1-d}{k-2}$。

循环卷积，差卷积。

### [The 4th Universal Cup. Extra Stage 2: Wuhan](https://qoj.ac/contest/2609)

^3rj239

场上过了 ABCEFGHJKLM。

#### [B. 77G Network](https://qoj.ac/contest/2609/problem/14720)

bfs 序，线段树优化建图跑 2-sat。

#### [L. ICPC](https://qoj.ac/contest/2609/problem/14730)

[[ge-lu-ji-shu#^103a08|here]]。

### [The 4th Universal Cup. Stage 6: Grand Prix of Shenyang](https://qoj.ac/contest/2641)

^39fj2r

场上过了 BDFGIJM。A 复制样例少一个 $0$，调不出来，硬是没交上去。三个人凑不出一个会 K 的。

#### [A. Square Kingdom](https://qoj.ac/contest/2641/problem/14940)

$i,j$ 的距离为 $(j+\frac{b}{a})^2-(i+\frac{b}{a})^2=(j-i)(i+j+\frac{2b}{a})$。

二分答案 $\frac{mid}{a}$，上界为 $5\times 10^{18}$。枚举 $j-i=d$，$i\le \min(n-i,\frac{1}{2}(\frac{mid}{ad}-\frac{2b}{a}-d))$。合法区间的子区间也合法，$d$ 不会超过 $2\sqrt k$。

#### [D. LED Display Renovation](https://qoj.ac/contest/2641/problem/14943)

前 $i$ 位用了 $j$ 次，前面是否可以全部消失。维护状态的最大值和方案数。

特别的，当某一位无论如何都凑不出任何一个数时，可以不只从最大值转移，而是从之前所有满足状态的方案转移。

#### [F. The Bond Beyond Time](https://qoj.ac/contest/2641/problem/14945)

等于找一个环，使得环上的点没有额外的边链接。

dfs 生成树，找到第一个有返祖边的点，从次浅的返祖边直接走到 $u$ 再走回最浅的返祖边。

#### [K. Relay Jump](https://qoj.ac/contest/2641/problem/14950)

$a$ 跳过 $b$ 变为 $2b-a$，$\sum v$ 的变化量为 $2(b-a)$。接着跳 $b,c,\ldots$。变化量为 $2(t-s)$。

### [The 4th Universal Cup. Stage 7: Grand Prix of Zhengzhou](https://qoj.ac/contest/2661)

#### [C. Basic Counting Practice Problems](https://qoj.ac/contest/2661/problem/15303)

[[favourite-problem-set-1#^1215b2|here]]