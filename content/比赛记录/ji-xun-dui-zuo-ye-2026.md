---
title: '集训队作业 2026'
date: 2025-11-04 22:20:12
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---
[https://qoj.ac/category/585](https://qoj.ac/category/585)

#### 1.[Q833. Cells Blocking](https://qoj.ac/contest/2550/problem/833)

#### 2.[Q837. Giant Penguin](https://qoj.ac/contest/2550/problem/837)

点分治，对于分治中心，最多 $k$ 对点跨子树。对于起终点在不同子树的对的距离，可以枚举 $2k+1$ 个关键点作为中转。

#### 3.[Q850. Edit Distance Yet Again](https://qoj.ac/contest/2550/problem/850)

$f_{i,j}$ 表示 $s,t$ 分别匹配到 $i$ 和 $j$。$|i-j|\le k$。$f_{*,j}$ 不降，$g_{i,j}$ 表示最大的 $f_{p,j}=i$。

需要二分哈希跳过相同部分。$O(k^2\log n)$。

#### 4.[Q856. Cactus](https://qoj.ac/contest/2550/problem/856)

仙人掌可以直接找环，对于不同的环长有一个系数。

或者直接广义串并联方法。

#### 5.[Q857. Social Distancing](https://qoj.ac/contest/2550/problem/857)

给每个点按深度从大到小重标号，一个互相可达的等价类的代表元要求字典序最小。

考虑一个点 $u$ 能不能放，之前的点不会有影响。如果最后是 $x\to u$，则 $x$ 到 $u$ 路径为空，只用调整邻域，即尽量把每个点都往子树扔一步。

每个点 $2n$ 次，次数不超过 $4n^2$。

#### 6.[Q862. Social Justice](https://qoj.ac/contest/2550/problem/862)

好像随便做。

#### 8.[Q888. Travel around China](https://qoj.ac/contest/2550/problem/888)

提前预处理 $(1,i)$ 到 $(3,i)$ 的最短路。

分治，已经可以保证路径只在分治范围内。处理出点到 $(1/2/3,mid)$ 的最短路，二维偏序算哪个是最小的。

#### 9.[Q962. Thanks to MikeMirzayanov](https://qoj.ac/contest/2550/problem/962)

转化为全局 reverse，再对每个区间 reverse，最后调整奇偶性。

分治，$\le mid$ 为 $0$，对 $01$ 序列排序，缩连续段。可以形如操作 $(1),(2,3),(4),(5),(6,7)\ldots$，每次可以使 $01$ 对减半。次数 $O(\log^2n)$。

#### 10.[Q964. Excluded Min](https://qoj.ac/contest/2550/problem/964)

形如后缀加，求下标最大的 $a_x\ge 0$ 的位置。

直接莫队，要平衡一手 $n\sqrt q$ 的修改和 $q$ 的询问。直接按 $2^{2B}$ 分块，再按 $2^B$ 分块，块内维护最大前缀和。修改 $O(2\times 2^B)$，查询 $O(\frac{n}{2^{2B}})$。$B=3$。

#### 11.[Q970. Best Subsequence](https://qoj.ac/contest/2550/problem/970)

[P14231](https://www.luogu.com.cn/problem/P14231)

二分，先取出所有 $\le \frac{mid}{2}$ 的，然后对每个间隔考虑能不能多选一个。

整体二分。

从小到大扫值域，把贡献差分为，当 $mid\ge x$，$ql\le l\le r\le qr$ 的时候有 $w$ 的贡献。对于一个 $mid$，所有有值的 $(l,r,w)$ 不交。只把贡献放在 $l$，再额外减去跨过 $r$ 的。

在外面对询问和修改按下标排序，单 log。

#### 12.[Q971. Binary Search Tree](https://qoj.ac/contest/2550/problem/971)

#### 19.[Q1351. Koosaga's Problem](https://qoj.ac/contest/2550/problem/1351) & 20.[Q1355. Rhythm Game](https://qoj.ac/contest/506/problem/1355)

[[ptz-ji-lu#^eaed40|Petrozavodsk Summer 2020. Day 6. Korean Contest]]。

#### 27.[Q1817. AND Permutation](https://qoj.ac/contest/2550/problem/1817)

递归做。

先处理 $d$ 位为 $0$。

对于每个 $x$ 使得 $d$ 位为 $1$，$x-2^d$ 也在集合内。把 $x$ 的答案改为 $x-2^d$ 的答案，并把 $x-2^d$ 集合继续递归。

#### 33.[Q1844. Cactus](https://qoj.ac/contest/2550/problem/1844)

能删就删，最后剩下一些全是偶度数的仙人掌，此时不存在只有两个点的点双，使用操作二。

建圆方树，对于一个环，保留连向父亲的一对点不动，其余绕环黑白染色，删光黑点，能删掉除了这对点以外的整个环。从叶子开始删即可，最后一定能删光。

#### 46.[Q2570. Maximal Subsequence](https://qoj.ac/contest/2550/problem/2570)

求出 $f_i$，$m=\max f_i$。

最少删几个点。可以转为最小割，即连边 $i\to i+n$，对于 $f_j+1=f_i$ 连边 $j+n\to i$。最小割等于最大流，即选 $ans$ 条不相交 lis 为 $m$ 的子序列。

可以直接选最靠左的合法的子序列。

#### 48.[Q2605. Soccer Match](https://qoj.ac/contest/2550/problem/2605) & 49.[Q2606. Gachapon](https://qoj.ac/contest/2550/problem/2606)

[[ptz-ji-lu#^3ce89f|Petrozavodsk Winter 2022. Day 6. ICPC Camp Day 1]]

#### 59.[Q4805. Grammy Sorting](https://qoj.ac/contest/2550/problem/4805)

若 $a_u<a_v$ 给图定向 $u\to v$ 使得满足：对于每个 $x$，都有 $s\to x\to t$，等价于 $s$ 是唯一 $0$ 入度点，$t$ 是唯一 $0$ 出度点，等价于 $s\to t$ 的双极定向。

倒序考虑双击定向的染色过程，后缀已经经过调整满足，加入点 $x$。此时一定存在 $s\to x$ 的路径，$x$ 可以走到一个后缀，在后缀中乱走直到 $a_p<a_s<a_{p_{out}}$。换这条路径可以使 $x$ 加入后缀且符合条件。 

对于任意图，求一棵生成树，存在通用的 $O(n\log n)$ 做法，见 [[ptz-ji-lu#^080eae|Q11628]]。

#### 60.[Q4808. Great Party](https://qoj.ac/contest/2550/problem/4808)

条件为： $n$ 为奇数或 $\oplus(a_i-1)=0$。

归纳，偶数时不能进入奇数，每堆剩一个不能动；奇数时先手操作扔掉一个 $a_i$ 可以使得剩下的为 $0$。

#### 74.[Q7412. Counting Cactus](https://qoj.ac/contest/2550/problem/7412)

[Q13329](https://qoj.ac/problem/13329)。

$2^n$ 比 $3^n$ 好想多了吧。

[[zi-tu-ji-shu#^959686|here]]。

#### 84.[Q8184. Different Summands Counting](https://qoj.ac/contest/2550/problem/8184)

枚举 $x$，容斥至少出现了 $i$ 次。

$$\sum_x\sum_{i=1}^m(-1)^i\binom{m}{i}\binom{n-ix-1}{m-i-1}$$

对于每个 $i$，不超过 $m-i-1$ 次多项式，求 $m-i+1$ 个前缀和插值。

#### 95.[Q10091](https://qoj.ac/contest/2550/problem/10091)

预处理小的，搜大的。

#### 110.[Q11627. Rectangles](https://qoj.ac/contest/2550/problem/11627) & 111.[Q11630. Simple APSP Problem](https://qoj.ac/contest/2550/problem/11630)

[[ptz-winter-2018-day-3|Petrozavodsk Winter 2018. Day 3. AtCoder Contest]]。

#### 114.[Q12212](https://qoj.ac/contest/2550/problem/12212)

怎么能在一个题单里出现两次。

可以 $q$ 组询问单 log。

#### 115.[Q12213. Cool pairs](https://qoj.ac/contest/2078/problem/12213)

直接做。