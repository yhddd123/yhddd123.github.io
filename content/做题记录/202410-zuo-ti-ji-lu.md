---
title: '2024.10 做题记录'
date: 2024-10-18 22:11:46
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---
## 10.1

### [gym104922I](https://codeforces.com/gym/104922/problem/I)

wqs 二分，维护 dp 值和取到 dp 值的 $k$ 的区间。倒序记录方案，要满足能落到合法区间中。

## 10.2

### [AT_s8pc_5_h](https://www.luogu.com.cn/problem/AT_s8pc_5_h)

模拟赛 T3。

建子序列自动机，DAG 上 dp 并按字典序出边贪心记录方案。DAG 链剖分。$u$ 向 $2f_v\ge f_u$ 的 $v$ 连边，形成内向树。重边倍增，轻边跳一次 $f_u$ 减半。

## 10.3

### [模拟赛 T2](http://goj.wiki/d/Union2024/p/P1146)

拆贡献为跨过 $i$ 时的答案，枚举有 $j$ 个 $\le i$。

## 10.5

### [Q9449](https://qoj.ac/contest/1804/problem/9449)

从后往前加，维护拓展域并查集。每次合并后，需要能凑出和为 $n$。拓展域限制 $siz_i,siz_j$ 只能选一个，维护 $a_i-b_j$。bitset 二进制分组，本质不同数 $O(\sqrt n)$ 级别。复杂度 $O(\frac{\sqrt nn^2}{w})$。

## 10.8

### [模拟赛 T3](http://goj.wiki/d/Union2024/p/P1151)

$u\to v$ 等价与 a 中的出现顺序 $u\to u+1$ 先于 $u+1\to u+2$。设 $dp_{i,j}$ 表示前 $i$ 个，第 $i$ 个排名为 $j$，前缀和维护。

### [模拟赛 T4](http://goj.wiki/d/Union2024/p/P1152)

$l$ 最远的合法 $r$ 满足前缀 ```(``` 加 ```?``` 减 ```)``` 大于 $0$。限制为 $g_r\le l\le r\le f_l$，维护奇偶的区间历史和单点修改线段树扫描线。

## 10.10

### [模拟赛 T4](http://goj.wiki/d/Union2024/p/P1160)

计算已知当前可能为 $s$ 的答案，每次分裂，只用算 $k$ 次。将每个起点的状态压为一个数，复杂度 $O(nmk)$。

## 10.11

### [模拟赛 T4](http://goj.wiki/d/Union2024/p/P1164)

建生成树的等效链，线段树 $t_{0/1,0/1}$维护区间 $l$ 和 $r$ 是否与 $0$ 联通。

### [HDU6757 Hunting Monsters](http://goj.wiki/d/Union2024/p/P1163)

模拟赛 T3。

$a_i\le b_i$ 的在 $a_i>b_i$ 前，$a_i\le b_i$ 按 $a_i$ 升序i，$a_i>b_i$ 按 $b_i$ 降序。$a_i\le b_i$ 排序后取前 $k$ 个，$a_i>b_i$ 部分设 $dp_{i,j}$ 表示考虑 $[i,n]$ 取 $j$ 个的最小初始值，有决策单调性，分治合并。

优化后半部分 dp，$dp_{i,j}=min(a_i+max(f_{i-1,j-1}-b_i,0),f_{i-1,j})$。对于 $f_{i-1,j0}\ge b_i$，$f_{i-1}$ 下凸，优先队列维护斜率，小于 $b_i$ 的部分不会在更新，大于 $b_i$ 的部分等价于加入一段斜率为 $a_i$ 的线段。 

### [arc104e](https://www.luogu.com.cn/problem/AT_arc104_e)

$n^n$ 枚举排名，转换为长为 $m$ 的单调递增序列，每个数有上界的方案数。离散化后设 $dp_{i,j}$ 表示第 $i$ 个数在第 $j$ 段，枚举之前最近的不在同一段的是第 $k$ 个数在第 $l$ 段。

## 10.12

### [【5校day5】木棍](http://goj.wiki/d/Union2024/p/TNOI0012)

差分约束，把线段缩为单点，要求两点间距离大于 $k$。将关键点离散化。数据结构模拟 SPFA $n$ 轮。

$s_p\le s_q+\lceil\frac{p-q}{k}\rceil$，维护模 $k$ 为下标的 $\min dis_q+\frac{q}{k}$。$s_{y_i}\le s_{x_i-1}+c_i$。$s_{a_i-1}\le s_{b_i}+f(a_i,b_i)$，从后往前扫 $l$，$r$ 处线段树维护 $dis_r-f(l,r)$。

### [The 3rd Universal Cup. Stage 12](https://qoj.ac/contest/1807)

见 [[the-3rd-universal-cup-zuo-ti-ji-lu-2|The 3rd Universal Cup 做题记录 (2)]]。

## 10.14

### [模拟赛 T4](http://goj.wiki/d/Union2024/p/P1168)

只计算同时出现 $1,2,3$ 的序列。令 $1$ 为全局众数，在同时出现 $1,2,3$ 的子段中 $1$ 都是众数。即维护前缀和与 $\max s_{j-1}[s_j=2]$ 和 $\max s_{j-1}[s_j=2]$ 的差。

## 10.15

### [模拟赛 T3](https://qoj.ac/contest/459/problem/3040)

移动 $d$ 的代价为 $\lfloor\frac{d}{2}\rfloor(C+4)+(d \bmod 2)(C+3)+x$。 额外的代价为跨越的点。对于下标奇偶性相同的终点，对应的起点单调。设 $dp_{i,j}$ 表示前 $i$ 个起点 $j$ 个终点为奇数的最小代价 dp。

### [模拟赛 T4](http://goj.wiki/d/Union2024/p/P1172)

按 [ [JOISC2022] 洒水器](https://www.luogu.com.cn/problem/P9527) 的方式将距离为 $r$ 拆成 $u$ 子树内离 $u$ 为 $r$。其余部分正常线段树打 tag，维护 $r+1$ 个 tag，表示离区间最小深度差 $i$ 的点要加这个 tag，还有一个 tag 维护子树加，对整个区间作用。

## 10.16

### [模拟赛 T3](http://goj.wiki/d/Union2024/p/P1175)

按 $b_i$ 降序做。按 $b_i$ 升序排序，设 $dp_{i,j}$ 表示前 $i$ 人做 $j$ 个，$dp_{i,j}=max(dp_{i-1,j-1},b_i)+a_i$。下凸，维护斜率，基本同上面那道。

## 10.17

### [模拟赛 T4](http://goj.wiki/d/Union2024/p/P1180)

平面图最短路转最小割。在流了最短路的基础上，加入流量 $+\infty$ 代价为 $1$ 的边，加入超级源点向源点连流量为 $k$ 的边，跑费用流。

### [P8861](https://www.luogu.com.cn/problem/P8861)

树状数组维护左右端点的 $\sum cnt_i$ 和 $\sum cnt_i\times i$。线段拍到猫树上，优先队列和并查集维护，每次向中间合并或把一个线段推到下一层。复杂度 $O(n\log^2 n)$。

## 10.29

### [【模板】基于值域预处理的快速离散对数](https://www.luogu.com.cn/problem/P11175)

[[p11175-ti-jie|题解]]。

记使得 $g^x\equiv n\pmod{mod}$ 的最小非负 $x$ 为 $\log n$，有 $\log ab=\log a+\log b$。

令 $n=\sqrt{mod}+1$，预处理 $n$ 以内的 $\log x$。线性筛，只需要 bsgs 求出 $n$ 以内 $\frac{n}{\ln n}$ 个质数的 $\log p$，就可以 $O(n)$ 求出 $n$ 以内所有 $\log x$。哈希表，预处理时 $B$ 次插入，$\frac{n}{\ln n}$ 次 $\frac{mod}{B}$ 的查询，取 $B=\sqrt{\frac{n\times mod}{\ln n}}$。

查询 $\log a$ 时，如果 $a\le \sqrt{mod}+1$ 直接得出，否则有 $b\times a+c=mod$，$b\le \sqrt{mod}$。$\log a=\log \frac{-c}{b}=\log(c\times -1)-\log b=\log (mod-1)+\log c-\log b$。又应为有 $(b+1)\times a+c=mod+a$，$\log a=\log \frac{a-c}{b+1}=\log(a-c)-\log (b+1)$。$\log b$ 或 $\log(b+1)$ 已知，$\log (mod-1)$ 提前算，$\min(c,a-c)\le \frac{a}{2}$，选 $c$ 和 $a-c$ 较小的一边递归可以做到 $\log {mod}$ 查询。

复杂度 $O(\frac{mod^{\frac{3}{4}}}{\log^{\frac{1}{2}}mod}+q\log {mod})$。
