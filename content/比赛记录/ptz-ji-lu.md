---
title: 'ptz 记录'
date: 2026-01-04 22:06:52
tags: [做题记录,acm]
published: true
hideInList: false
feature: 
isTop: false
---
[Category: Petrozavodsk Programming Camp](https://qoj.ac/category/5)

---

### [Petrozavodsk Winter 2018. Day 3. AtCoder Contest](https://qoj.ac/contest/1800)

^e294b4

#### [A. Vacant Seat](https://qoj.ac/contest/1800/problem/11621)

问 $0$ 和 $\frac{n}{2}$ 然后知道在那一边，然后二分。

#### [D. Knapsack and Queries](https://qoj.ac/contest/1800/problem/11624)

还可以做到更强。

维护 [[deque-shi-xian|deque]]。复杂度 $O(nm\log n)$。

#### [E. XorTree](https://qoj.ac/contest/1800/problem/11625)

记 $b_u=\oplus a_i$，等价于 $b_u$ 和 $b_v$ 异或 $x$。连边，连通块内 $\oplus b_i$ 不变，等价于最大化划分为异或和为 $0$ 的连通块个数。 相同的可以直接两两一组。剩下的 $O(3^{15})$ 计算。

#### [F. Antennas On Tree](https://qoj.ac/contest/1800/problem/11626)

等价于任意一个 $d_u=k\ge 3$ 的点，至少有 $k-1$ 个儿子的子树有值。以一个 $d_u\ge 3$ 的点为根，可以保证子树外至少有一个。

#### [G. Rectangles](https://qoj.ac/contest/1800/problem/11627)



#### [H. Generalized Insertion Sort](https://qoj.ac/contest/1800/problem/11628)

^080eae

Q4805 的构造部分对任意图的通解。

对于根节点挂多条链，在每条链的链底维护排好序的一部分，把根节点的值插入排序。如果根节点就是自己，就随便扔到一个链最后，当重新回到根的时候必然做完了这条链，多 $n$ 次。

从下往上扔叶子，在最下面的分叉之前，每条链独立。最多做 $\log n$ 次。

#### [I. ADD, DIV, MAX](https://qoj.ac/contest/1800/problem/11629)

segment tree beats

#### [J. Simple APSP Problem](https://qoj.ac/contest/1800/problem/11630)

两个相邻整行都没有障碍，则一定有上边点数乘下面点数的贡献，然后缩起来。剩下 $O(n^2)$ 个点，bfs。

#### [K. Forest Task](https://qoj.ac/contest/1800/problem/11631)

从小往大贪，每个连通块有度数限制。

### [Petrozavodsk Summer 2019. Day 9. MEX Foundation Contest](https://qoj.ac/contest/1392)

### [A. The One Polynomial Man](https://qoj.ac/contest/1392/problem/7596)

$\frac{(2a+3b)^2+5a^2}{(3a+b)^2}+\frac{(2a+5b)^2+3b^2}{(3a+2b)^2}$ 这种东西没理由能维护。但是若 $(a,b)$ 成立，$(ka,kb)$ 也成立。

把 $0$ 判掉。若 $(i,1)$ 可行，则累加 $\frac{a}{b}=i$ 的数量。求原根，转为离散对数，差卷积。

### [B. Alexey the Sage of The Six Paths](https://qoj.ac/contest/1392/problem/7597)

最大匹配等于最小点覆盖。

同时钦定

### [Petrozavodsk Summer 2020. Day 6. Korean Contest](https://qoj.ac/contest/506)

^eaed40

#### [A. Mango](https://qoj.ac/contest/506/problem/1350)

判掉只有一个 $\text{\$}$，然后判掉 $\text{\$}$ 前的部分，$k$ 可以和 $60$ 取 min。处理出每层走到第 $i$ 个点时长多少，每层二分一下。

#### [B. Koosaga's Problem](https://qoj.ac/contest/506/problem/1351)

随机异或哈希。找一棵生成树，非树边和对应的树边异或相同的权值。此时偶环异或和为 $0$，奇环要删一个。

#### [D. Non-Decreasing Subarray Game](https://qoj.ac/contest/506/problem/1353)

后手要最大化，会选 $l/r$ 中最大的。在 $[l,r]$ 中一个前缀选 $r$，后缀选 $l$，先手选交界左右最小化。可以二分出来。

#### [E. Observer Game](https://qoj.ac/contest/506/problem/1354)

判掉直接赢。如果图中存在两个不同的 $k\times k$，那会交替填完 $nm-2k^2$ 个格子。

#### [F. Rhythm Game](https://qoj.ac/contest/506/problem/1355)

满足四边形不等式。

注意应当是 有 $j$ 个没选，选到 $i$，对 $i$ 有决策单调性。

其他的几种都不对，感觉纯乱猜。

#### [G. Solo Tree Game](https://qoj.ac/contest/506/problem/1356)

等价于 $a_i-2$ 个石子。后退的话对方可以跟进。

#### [K. Determinant](https://qoj.ac/contest/506/problem/1360)

特征多项式板子。

### [Petrozavodsk Summer 2021. Day 4. Shanghai ICPC Camp 2021 Onsite Day 1 by PKU](https://qoj.ac/contest/694)

^173cbb

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

### [Petrozavodsk Winter 2022. Day 6. ICPC Camp Day 1](https://qoj.ac/contest/824)

^3ce89f

#### [A. Soccer Match](https://qoj.ac/contest/824/problem/2605)

直接随机染色，直到异色边数量 $> \frac{m}{2}$。此时不断扔掉 $deg_u\le k$ 的点就能得到合法解。

关于复杂度，不懂。

#### [B. Gachapon](https://qoj.ac/contest/824/problem/2606)

厉害吧。

首先 $f_{i,j}$ 表示前 $i$ 轮最大为 $j$，$f_{i,j}=(\sum_{k\le j}f_{i-1,k})^{t_i}-(\sum_{k<j}f_{i-1,k})^{t_i}$。

枚举卡 $x$，求 $(\sum p_i)^{\prod t_i}$ 种随机方案，合法且随出 $x$ 的期望。等价于 合法且第 $i$ 步随出 $x$ 的概率之和，等价于 合法且第 $1$ 步随出 $x$ 的概率乘 $\prod t_i$。设 $g_{i,j}$ 表示第一次随出 $x$ 的，前 $i$ 轮合法且最大卡 $j$  的概率，从一个 $g_{i-1}$ 和 $t_i-1$ 个 $f_{i-1}$ 转移。

转置一下。

#### [C. Survey](https://qoj.ac/contest/824/problem/2607)

对于一个人 $i$，如果有 $j$ 个可选，有 $\frac{j}{n}$ 的贡献。

每个权值都有一个贡献。$f_{i,j}$，加入新权值 $k$ 可以要求不超过 $\frac{j}{i}$。

#### [G. Trans](https://qoj.ac/contest/824/problem/2611)

是 FWT 求的东西。

#### [H. Blind Box](https://qoj.ac/contest/824/problem/2612)

求 $\sum_{t1+\ldots+t_m=n}1$ 和 $\sum_{t1+\ldots+t_m=n}\prod i^{t_i}$。

是 $\binom{n+m-1}{m-1}$ 和 第二类斯特林数 $S(n+m,m)$。

第二个大概有一个组合意义解释。对于 $n+m$ 个两两不同的球分给 $m$ 个盒子的分法 $a_i$，如果 $a_i$ 是前缀最大值，就是 $m$ 个特殊球，剩下的 $n$ 个在 $1\sim premx$ 中任选对应乘 $i$。

#### [I. EIP1559](https://qoj.ac/contest/824/problem/2613)

以 $a-b$ 维护 $\max a$ 和 $\max b$。

#### [K. Surround the Cat](https://qoj.ac/contest/824/problem/2615)

这种题见过一次就会了，只是还是要写半天挂若干发。

大概是，每两个 ban 一个。当猫跑到离边界差 $1$ 或者一些离边界差 $2$ 的危险位置的时候，才开始 ban 没 ban 的那个。

### [Petrozavodsk Winter 2023. Day 7: Gennady Korotkevich Contest 7](https://qoj.ac/contest/1223)

^5a17dd

#### [A. Classical A+B Problem](https://qoj.ac/contest/1223/problem/6407)

不妨 $a\ge b$，则 $a$ 至少有 $n$ 的位数减 $1$ 位，共 $20$ 种。python。

#### [B. Classical Counting Problem](https://qoj.ac/contest/1223/problem/6408)

按 $a_i$ 降序。设 $x$ 为最小的 $i\notin S$，$y$ 为最大的 $i\in S$，要求 $a_y+m\ge a_x$。固定 $x,y$ 后要 $S$ 合法，设 $l_i$ 和 $r_i$ 表示要 $S$ 合法 $i$ 最少/最多能加几次，要求 $\sum l_i\le mv\le \sum r_i$。以 $r_i$ 为例，$r_1\sim r_{x-1}$ 和 $r_y\sim r_n$ 都等于 $m$，对于 $i\in[x,y)$，若 $i\in S$，$r_i=m$，否则 $r_i=m+a_y-a_i$。

计数时容斥为 $\sum r_i\le mv$ 减去 $\sum l_i>mv$。$r_i$ 只与 $a_y$ 有关，$l_i$ 只与 $a_x$ 有关，分别固定左右端点 dp。复杂度 $O(n^4)$。

#### [C. Classical Data Structure Problem](https://qoj.ac/contest/1223/problem/6409)

被击杀了。

不允许动态开点线段树，那就动态开点平衡树呗。

不知道为什么直接维护分裂区间，树高爆炸了。

改为维护差分数组 $f_i$ 和 $if_i$。

#### [D. Classical DP Problem](https://qoj.ac/contest/1223/problem/6410)

最少车 $k$ 为最大的可以放入图中的正方形大小，也即按 $a_i$ 降序后 $a_k\ge k>a_{k+1}$ 的位置。

要算前 $k$ 行每行都有车且前 $a_{k+1}$ 列每列都有车，加上转置 $a_i$ 后，再容斥掉 $k\times k$ 的 $k!$ 种填法。设 $f_{i,j}$ 表示填了 $i$ 行，前 $a_{k+1}$ 列填了 $j$ 个。

#### [E. Classical FFT Problem](https://qoj.ac/contest/1223/problem/6411)

加速 $O(n^2)$ dp。容斥 $i$ 列没选，其余列任意，要求 $\prod_{i=1}^k (a_i-x)$ 的 $0,\ldots,a_{k+1}$ 的值。分治 fft 求出系数后多点求值。

#### [H. Classical Maximization Problem](https://qoj.ac/contest/1223/problem/6414)

连边后生成树上从下往上匹配，最多剩一条。

#### [I. Classical Minimization Problem](https://qoj.ac/contest/1223/problem/6415)

没写。

设一条线上最多有 $k$ 个点。若 $k\le n$，则 $ans=0$，否则 $ans=k-n$ ?

构造就是维护 X 和 Y 两维最多点的线。

#### [J. Classical Scheduling Problem](https://qoj.ac/contest/1223/problem/6416)

按 $b_i$ 排序。二分选 $x$ 个。枚举 $p_x=i$，$[1,i-1]$ 选 $x-1$ 个，$[i+1,n]$ 选 $\max(0,b_i-x)$ 个，优先队列维护。

#### [K. Classical Summation Problem](https://qoj.ac/contest/1223/problem/6417)

对于 $k$ 奇数，答案 $\frac{n+1}{2}n^k$。

对于 $k$ 偶数，答案要减去 $p_{\frac{k}{2}+1}-p_{\frac{k}{2}}$ 的期望除以 $2$。在 $[i,i+1)$ 处统计左右各 $\frac{k}{2}$ 的方案数。