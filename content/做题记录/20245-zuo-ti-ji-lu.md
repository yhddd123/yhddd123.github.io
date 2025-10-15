---
title: '2024.5 做题记录'
date: 2024-06-01 22:21:52
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---
## 5.09

### [CF575A](https://www.luogu.com.cn/problem/CF575A)

维护转移矩阵，线段树维护一段区间的矩阵乘法。

### [CF1575H](https://www.luogu.com.cn/problem/CF1575H)

建 KMP 自动机，$dp_{i,j,k}$ 表示前 $i$ 位，当前自动机上走到 $j$，已经匹配了 $k$ 次的最小代价。当转移到终止节点时匹配次数加 $1$。

### [AT_codefestival_2016_final_h](https://www.luogu.com.cn/problem/AT_codefestival_2016_final_h)

$f_{i,0/1}$ 表示从后往前走到 $i$，谁先手。发现 $f_{i,0}=-f_{i,1}$，改为一维。$f_i=\min -f_j+sum_{j-1}-sum_{i-1}$。只与 $(i,n]$ 的 $\min -f_j+sum_{j-1}$ 有关。$mn=\min(mn,2\times sum_{i-1}-mn)$。

因为 $a_i\le 10^6$，改变 $a_n$ 时 $mn$ 的初值也只有 $10^6$ 种，而中间 $sum_{i-1}$ 不变。连边 dfs 记录每个 $mn$ 初值会变成什么。

## 5.10

### [CF1517F](https://www.luogu.com.cn/problem/CF1517F)

容斥求出半径小于 $r$ 的方案数。$dp_{u,x,y}$ 表示 $u$ 的子树内，最深的未染色点的距离和最浅的染色点的距离。发现 $x,y$ 只有一个有用。前后缀和优化，状态数 $O(dep)<O(siz)$。

### [CF1951G](https://www.luogu.com.cn/problem/CF1951G)

用相邻两个球之间的距离来描述一个状态，鞅与停时定理。

$$1=\frac{1}{n}\sum f(a_i)+f(a_{i\mod n+1})-f(a_i-1)-f(a_{i\mod n+1}-1)$$

差分 $g(x)=f(x\mod n+1)-f(x)$。

$$n\sum g(a_i-1)-g(a_i)$$

令 $g(x)-g(x-1)=\frac{n}{m}x$，$g(0)=f(0)=0$，$g(x)=-\frac{n}{m}\binom{x+1}{2},f(x)=-\frac{n}{m}\binom{x+1}{3}$。终止势能为 $f(m)$。

### [CF1007B](https://www.luogu.com.cn/problem/CF1007B)

$O(n\sqrt n)$ 预处理出每个数的所有因数，记为集合 $p_i$。显然题目要求计数 $u\mid A,v\mid B,w\mid C$。容斥，大力分讨。可以用 bitset 维护交集。如果把分解因数写成先分解质因数再 dfs 求因数，复杂度 $O(n)$，常数约为 $400$。

## 5.12

### [CF662C](https://www.luogu.com.cn/problem/CF662C)

状压每一行，记录每种状态在 $m$ 列上出现的次数和最小代价，fwt。$ans_{i\oplus j}=\sum num_i\times val_j$。

### [模板 子集卷积](https://www.luogu.com.cn/problem/P6097)

加一维记录集合元素个数，$f_{popcount(i),i}=a_i$。先将每一维 or 卷积，再 $O(n^2)$ 将外层加法卷积。复杂度 $O(n^2 2^n)$。

### [CF1034E](https://www.luogu.com.cn/problem/CF1034E)

无法子集卷积。因为对 $4$ 取模，可以将 $a_i$ 乘 $4^{popcount(i)}$，然后进行不取模 or 卷积。如果 $a_i\times b_j\to c_k$ 且 $i \wedge j\neq 0$，$popcount(i)+popcount(j)>popcount(k)$。最后 $c_i$ 除 $4^{popcount(i)}$ 再对 $4$ 取模。

### [CF960G](https://www.luogu.com.cn/problem/CF960G)

枚举最大值的位置，左边有 $a-1$ 个最大值，右边有 $b-1$ 个。分治NTT求 $\prod (x+i)$。

## 5.13

### [CF377D](https://www.luogu.com.cn/problem/CF377D)

$\max l_i\le L\le \min v_i\le \max v_i\le R\le \min r_i$。矩形的交，扫描线。

## 5.14

### [CF1895F](https://www.luogu.com.cn/problem/CF1895F)

容斥。存在 $a_i\in [x,x+k-1]$ 的方案数等于 $\min a_i\le x+k-1$ 的方案数减 $\max a_i<x$ 的方案数。当确定了一个序列的最小值和差分数组就可以确定一个序列。前半部分方案数为 $(x+k)\times (2k+1)^{n-1}$。后半部分矩阵快速幂 $O(x^3\log n)$。

## 5.15

### [CF1886E](https://www.luogu.com.cn/problem/CF1886E)

观察发现每个项目只与程序员数量和最小值有关，所以每个项目对应能力值连续的程序员最优。状压项目数。设 $dp_{i,s}$ 为前 $i$ 个程序员匹配的项目状态为 $s$ 是否可行，无法接受。交换维度，改为 $dp_s$ 表示状态 $s$ 能与前缀 $[1,i]$ 匹配的最小 $i$。

全选不一定优。预处理 $f_{i,s}$ 表示第 $i$ 个项目从 $j$ 开始匹配程序员，最少要匹配到哪里。

## 5.17

### [CF249D](https://www.luogu.com.cn/problem/CF249D)

$j$ 贡献到 $i$ 满足 $x_j<x_i,y_i\times b-x_i\times a>y_j\times b-x_j\times a,y_i\times d-x_i\times c<y_j\times d-x_j\times c$。发现第一个限制无用，随便维护。

## 5.20

### [CF79D](https://www.luogu.com.cn/problem/CF79D)

异或差分后 $2k$ 个关键位置，状压。$u,v$ 最短路等于同时删 $u,v$ 的代价。

### [CF626F](https://www.luogu.com.cn/problem/CF626F)

$dp_{i,j,k}$ 表示分了前 $i$ 人，$j$ 组没封闭，代价为 $k$。按权值从小到大加入，每个人代价是所有没封闭的组的数量乘相邻两个权值的差。

## 5.21

### [CF1575E](https://www.luogu.com.cn/problem/CF1575E)

点分治，记录当前子树到分治中心的权值和和换车次数。将新子树的答案合并时分类讨论分治中心到子树祖先 $u\to v$ 的颜色。树状数组维护前缀和。

### [agc035d](https://www.luogu.com.cn/problem/AT_agc025_d)

向距离为 $\sqrt d$ 的点连边，为二分图。写为 $(2^ka,2^kb)$，$a\times b \mod 4=1/2$。在两个 $4n^2$ 个点的图上分别二分图染色，一定存在 $n^2$ 个在两张图上都同色的点。

### [QTREE6](https://www.luogu.com.cn/problem/SP16549)

树剖，对每个点维护当 $u$ 为 0/1 时 $u$ 子树内的最大连通块大小。还需要支持询问 $u$ 到根第一个与 $u$ 异色的点的位置，线段树上维护区间从右往左第一个 0/1 的位置。

## 5.22

### [agc014e](https://www.luogu.com.cn/problem/AT_agc014_e)

每次选择只被覆盖一次的边删掉。树剖，线段树维护覆盖次数的最小值和位置，以及用异或维护覆盖这条边的红边编号。

### [P5354](https://www.luogu.com.cn/problem/P5354)

按二进制拆位贪心，树剖维护从左右进入 0/1 出来的值。压位用位运算一起做。

### [CF603E](https://www.luogu.com.cn/problem/CF603E)

等价于只存在大小为偶数的连通块。按权值排序加边，维护奇连通块的个数。

线段树分治，每条边都有一个影响范围。从右往左分治，每次右移加边的位置。