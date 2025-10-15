---
title: '2024.8 做题记录'
date: 2024-09-01 22:24:32
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---
## 8.1

### [P6222](https://www.luogu.com.cn/problem/P6222)

$$ans=\sum_{T=1}^n T^kS(\frac{n}{k})\sum_{d\mid T}d\mu^2(d)\mu(\frac{T}{d})$$
令 $f(T)=\sum_{d\mid T}d\mu^2(d)\mu(\frac{T}{d})$，为积性函数，讨论 $f(p^k)$ 的取值。

### [P10636](https://www.luogu.com.cn/problem/P10636)

枚举第一个点和第三个点的横纵坐标之差 $i,j$，第二个点有 $gcd(i,j)-1$ 种选择。
$$ans=\sum_{i=1}^n\sum_{j=1}^m (n-i)(m-j)(gcd(i,j)-1)$$
莫比乌斯反演。

## 8.3

### [P3598](https://www.luogu.com.cn/problem/P3598)

对每个指数 min-max 容斥，乘起来得到 gcd-lcm 容斥。
$$lcm(T)=\prod_{S\subseteq T} gcd(S)^{(-1)^{|S|+1}}$$
$f(n)=\frac{x^{n+1}-1}{x-1}$。提出 $x-1$。因为 $gcd(x^a-1,x^b-1)=x^{gcd(a,b)}-1$，用 map 储存指数。

## 8.6

### [arc069d](https://www.luogu.com.cn/problem/AT_arc069_d)

二分答案，线段树优化建图跑 2-sat。要保证 $i$ 不会连到 $i'$，向排序后一个编号区间连边，中间挖空。

### [P10833](https://www.luogu.com.cn/problem/P10833)

枚举每个 $a_i=1$ 将序列划分开，枚举左/右端点，钦定最大值在左/右边，可以确定一段区间。随机异或哈希比较 $\oplus_{i=l}^r f_{a_i}=\oplus_{i=1}^{r-l+1} f_i$。

## 8.7

### [arc072d](https://www.luogu.com.cn/problem/AT_arc072_d)

模拟赛 T2。

设 $f_{i,j}$ 为前 $i$ 天体积为 $j$ 的最大质量，图像上凸。$f_{i-1}$ 到 $f_i$ 即删去 $[v_i,L]$，在最开始加上 $(v_i,v_it_i)$，在将前面取 max 为上凸。双端队列维护。

### [arc070c](https://www.luogu.com.cn/problem/AT_arc070_c)

模拟赛 T3。

设 $f_{i,j}$ 表示前 $i$ 条线段，第 $i$ 条左端点为 $j$ 的最小代价。$f_{i,j}=\min_{k=j-len_{i-1}}^{j+len_i} f_{i-1,j}+\mid j-l_i\mid$。

取 min 和加绝对值函数，下凸，slope trick 维护。

### [模拟赛 T4](http://goj.wiki/d/Union2024/p/P1008)

从小到大放入特殊点，当前在点 $i$，已选的比赛集合为 $s$，有 $j$ 个点在 $[1,a_i]$ 中没被选。每个和 $1$ 比赛的特殊点都是子树中最大的。dp 套 dp 维护上升子序列长度，做前缀最大值后差分后状压得 $t$，$t$ 是 $s$ 的子集。枚举没选过的比赛 $l$，$dp_{i,upd(s,t,l)，j+a_i-a_{i-1}-2^l}=dp_{i-1,s,t,j}\times \binom{j+a_i-a_{i-1}-1}{2^l-1}\times (2^l)!$。

### [P3343](https://www.luogu.com.cn/problem/P3343)

$n$ 个 $[0,1]$ 之间的随机变量第 $k$ 小的为 $\frac{k}{n+1}$。引入第 $n+1$ 个随机变量 $x$，第 $k$ 小的数值等于 $x$ 比第 $k$ 小小的概率 $\frac{kn!}{(n+1)!}$。

$dp_{s,i}$ 表示选点集 $s$，连了 $i$ 条边，不连通的方案数，$d_s$ 为 $s$ 内部的边，连通的方案数为 $\binom{b_s}i -dp_{s,i}$。枚举 $s$ 的子集 $t$，$dp_{s,i}=(\binom{b_t}{j}-dp_{t,j})\times \binom {b_{s\oplus t}} {i-j}$。枚举答案为第 $i$ 条边，$ans=\sum \frac{i}{m+1}\times(\frac{dp_{U,k-1}}{\binom{m}{k-1}}-\frac{dp_{U,k}}{\binom{m}{k}})$。

## 8.8

### [P9047](https://www.luogu.com.cn/problem/P9047)

模拟赛 T3。

$dp_{u,0/1/2/3}$ 表示 $u$ 子树并向上传长为 $0/1/2/3$ 的链的最大贡献。转移时背包 $f_{i,0/1}$ 记录上传长度 $1$ 的儿子比上传长度 $3$ 的多多少，以及上传长度 $2$ 儿子的奇偶性。随机排列儿子，期望前缀和最大值是 $O(\sqrt n)$ 级别的。

### [agc061c](https://www.luogu.com.cn/problem/AT_agc061_c)

选 $a_i$ 或 $(a_i,b_i)$ 有被选过选 $b_i$。容斥，取最大的 $b_l<a_i$ 和 $a_r<b_i$，$(l,r]$ 间选法固定，$-dp_l\to dp_r$。

## 8.9

### [CF925E](https://www.luogu.com.cn/problem/CF925E)

链加，树剖 dfn 区间加，分块维护。先减去 $t_i$，维护 $>0$ 的白点数量。

### [Q4815](https://qoj.ac/problem/4815)

点分治，树上依赖性背包，$dp_{i,j}=\max(dp_{i+1,j-1}+a_{rnk_u},dp_{i+siz_{rnk_i},j})$。如果一定要选 $rt,u$，就 $O(k)$ 合并在前序遍历 dfn 序在 $[dfn_u,n]$ 中的背包和后序遍历 dfn 序在 $[1,dfn_u-siz_u]$ 的背包选出 $k-dep_u$ 个数。当分治的区域小于 $k$ 时停止，复杂度 $O(nk\log\frac{n}{k})$。

### [abc269h](https://www.luogu.com.cn/problem/AT_abc269_h)

树形背包写成生成函数形式，$f_u(x)=\prod_v f_v(x)+x$。分为重儿子和轻儿子贡献。分治 ntt 维护 $g_u(x)=\prod_{v\in son(u),v\neq s_u} f_v(x)$，所有轻儿子子树大小之和为 $O(n\log n)$。重链上 $f_u(x)=g_uf_{s_u}(x)+x$。只需要知道链顶的值，$f_{a_1}(x)=g_{a_1}(g_{a_2}(\dotsb(g_{a_k}+x)\dotsb)+x)+x=(\sum_{i=1}^{n-1}x\prod_{j=1}^i g_{a_j})+x$。分治 ntt 维护前缀乘积之和和乘积。复杂度 $O(n\log^3 n)$。

### [hdu7503](https://acm.hdu.edu.cn/showproblem.php?pid=7503)

树形背包写成生成函数形式，$f_u(x)=\prod_v f_v(x)+1$。特别的，需要求出重链上所有 $f_u(x)$ 每项的系数和，即 $g_u(x)$ 的区间乘积之和。分治 ntt 维护前缀乘积之和、后缀乘积之和、乘积和区间乘积之和。

## 8.10

cf rmj 暴毙！

### [CF1733E](https://www.luogu.com.cn/problem/CF1733E)

模拟赛 T3。

$t$ 时刻可能在 $(x,y)$ 的是 $t-x-y$ 出发的人。设 $dp_{t,i,j}$ 表示前 $t$ 个人会经过 $(i,j)$ 几次，$dp_{i,j}=\lceil \frac{dp_{i,j-1}}{2}\rceil+\frac{dp_{i-1,j}}{2}$。差分看 $dp_{t,x,y}-dp_{t-1,x,y}$ 是否为 $1$。

### [Q6815](https://qoj.ac/problem/6815)

模拟赛 T4。

线段树维护 $\max a_i,\sum a_i,\sum\max_{j=l}^i a_j,\sum a_i\times \max_{j=l}^i a_j$。$O(\log n)$ 线段树上二分的 pushup。区间加和区间覆盖。线段树上二分。

## 8.11

### [arc182c](https://www.luogu.com.cn/problem/AT_arc182_c)

### 思路

有 $6$ 个小于 $14$ 的质数，设这 $6$ 个质数的指数分别为 $x_1,\dotsb,x_6$。$ans=\sum (\prod_{i=1}^d (x_i+1))$。状压这 $6$ 个数，维护 $val_s=\prod_{i=1}^6 (x_i\times [s二进制第 i位为1]+[s二进制第 i位为0])$。当加入一个数时，某些 $x_i$ 会加 $d$，$s$ 二进制第 $i$ 位为 $1$ 的 $val_s$ 会从 $s$ 的子集且一些二进制第 $i$ 位为 $0$ 的 $t$ 的 $val_t$ 转移来。

## 8.12

### [模拟赛 T3](http://goj.wiki/d/Union2024/p/P1023)

设 $f_i$ 表示当前有 $i$ 种状态的期望次数。$f_i=i+\frac{f_{ik\mod n}}{k}$。转移有环，设 $f_i=a_i f_{m+1}+b_i$，递推 $a_i,b_i$，找到 $a_p=a_{m+1}$ 可以计算 $f_p$ 真正的值，$f_1=a_1\times f_p+b_1$。

### [P8996](https://www.luogu.com.cn/problem/P8996)

让前缀最大值 $a_l$ 代表整个区间，可以看做合并是将两个序列的前缀最大值排序。每次合并相当于在 $\frac{n}{2}$ 处断开跨过序列中点的区间 $[l,r]$，然后再重新按区间左端点的值排序。最多操作 $n$ 次，最多 $n$ 种区间。将询问离线，维护每次合并后的区间信息。建权值线段树表示前缀最大值 $l$ 代表的区间长度之和。

### [P8997](https://www.luogu.com.cn/problem/P8997)

按题意模拟，用栈建出二叉树，叶子节点是要填的值，非叶子是运算符。

判断一个叶子能贡献能填哪些数并最终成为答案，设 $dp_{u,0/1,0/1}$ 表示 $u$ 子树内，$u$ 处的值 $\le ans$ 或 $>ans$，$num0$ 或 $num1$ 最少为多少。根据 $u$ 处的运算符分类讨论转移。对于每个叶子算限制，只与从根到 $u$ 的 dp 值有关。可以发现放在一个叶子的答案是一个区间 $[num0+1,n-num1]$，差分维护区间加，最后计算大于 $0$ 的位置数。

## 8.13

### [模拟赛 T3](http://goj.wiki/d/Union2024/p/P1027)

合并连续段写为二元组 $(a_i,t_i)$。每次找到区间最小值合并，如果 $c_i$ 为奇数，一定不可能被跨过，写为 $(a_i+1,\frac{t_i}{2}),(inf,1),(a_i+1,\frac{t_i}{2})$。线段树维护。

## 8.14

### [arc080d](https://www.luogu.com.cn/problem/AT_arc080_d)

模拟赛 T4。

将 $a$ 数组差分，得到 $2$ 倍连续段个数个 $1$，一次操作形如 $a_i$ 和 $a_{i+prime}$ 同时异或 $1$。$i$ 向 $i+prime$ 连边，即为 $0\to |u-v|$ 的最短路。由哥德巴赫猜想，$10^7$ 内 $>4$ 的偶数可以写成两个质数之和，$2=0+5-3$，$4=0+7-3$，所以所以 $0$ 到偶数 $i$ 的最短路为 $2$。如果 $i$ 为奇质数，最短路为 $1$；否则 $i+3$ 为偶数，最短路为 $3$。

现在要将 $2\times num$ 个数两两分组，代价为 $1/2/3$，最小化代价和。当选完若干个代价为 $1$ 的组时，奇偶性相同组的代价为 $2$，尽量匹配，代价为 $3$ 的至多只有一组。所以最大化代价为 $1$ 的组数。代价为 $1$ 时 $u,v$ 奇偶性不同，等于二分图最大匹配，网络流即可。复杂度 $O(n^2\sqrt n+x_i)$。

### [abc216h](https://www.luogu.com.cn/problem/AT_abc216_h)

概率转为方案数除以 $2^{nm}$。由 LGV 引理，$ans=\sum_p(-1)^{\sigma (p)}\prod e(i,p_i)$。$e(i,j)$ 为 $m$ 步选 $j-x_i$ 步向前走。设 $dp_{s,i}$ 表示选了 $s$ 里的终止点，终止点 $\le i$ 的方案数。

### [agc034d](https://www.luogu.com.cn/problem/AT_agc034_d)

最大化曼哈顿距离，拆绝对值变成 $4$ 个 $x_i,y_i$ 独立的式子。只要匹配的点对选的同一种式子即可。最小费用最大流。

## 8.15

### [【模板】矩阵求逆](https://www.luogu.com.cn/problem/P4783)

将矩阵和单位矩阵放在一起高斯消元，把左边的矩阵消为单位矩阵时右边的单位矩阵变成逆矩阵。

### [模拟赛 T3](http://goj.wiki/d/Union2024/p/P1031)

求 $x$ 使得 $n\times n$ 的矩阵 $A^x=C$。

$det(A)det(B)=det(AB)$。对 $det(A)^x\equiv det(C)\pmod{10^9+7}$ 做 BSGS。对于 $1$ 个可能的 $x$ ，判断 $x,x+mod-1,x+2\times(mod-1),\dotsb$。只有 $\frac{10^{10}}{mod}$ 个 $x$，复杂度 $O(\sqrt{mod}+\frac{10^{10}}{mod} n^3)$。

## 8.17

### [模拟赛 T2](http://goj.wiki/d/Union2024/p/P1034)

$$ans\times n^m=\sum_{i=1}^n (n-1)^ai^b(n-i+1)^c\times val(s_k,i)\times n^{m-k}$$

是关于 $i$ 的 $m+1$ 次多项式，维护 $m+2$ 个点值插值。

### [模拟赛 T3](http://goj.wiki/d/Union2024/p/P1035)

对于每个连通块，二分图染色分为 $a_i$ 和 $b_i$ 个点。每次要么选 $a_i$ 要么选 $b_i$，要最小化 $sum$ 和 $n-sum$ 的差。bitset 维护背包，只有 $O(\sqrt n)$ 个本质不同物品，相同的物品二进制优化。复杂度 $O(\frac{n\sqrt n}{w})$。

### [模拟赛 T4](http://goj.wiki/d/Union2024/p/P1036)

找出最小生成树。从小到大加入边，维护边双，一定能去到一个边双的最小权值的边。并查集维护每个点属于哪个边双，维护边双最浅的点，维护 $1\to u$ 的最小边权 $mn$ 和最小答案 $ans$。

对于 $(u,v)$，如果 $u,v$ 已经属于同个边双，不会贡献。如果 $(u,v)$ 是最小生成树中的边，如果 $1$ 能新到一些点，bfs 拓展，赋值答案。否则将 $u\to v$ 路径上的边双合并，设新边双最浅点为 $p$，将 $p$ 子树的所有点的 $mn$ 和 $ans$ 更新。如果更新到了非法的点，一定是没有被拓展到的，会在被拓展到时被覆盖。

## 8.19

### [CF622F](https://www.luogu.com.cn/problem/CF622F)

是 $k+1$ 次多项式，算 $k+2$ 个点值插值。维护阶乘，$\prod n-i$，$\prod (n-k-2+i)$。如果 $n-i$ 是奇数取负号。

### [arc165e](https://www.luogu.com.cn/problem/AT_arc165_e)

等价于每种情况出现的概率之和。概率为连通块相邻的点被选都在连通块被选之前，即 $\frac{i!j!}{(i+j)!}$。设 $dp_{u,i,j}$ 表示根为 $u$，子树内选 $i$ 个点，有 $j$ 个相邻的点的连通块的概率，$O(n^4)$ 转移。

### [abc249g](https://www.luogu.com.cn/problem/AT_abc249_g)

模拟赛 T3。

枚举 $\oplus x_i$ 和 $k$ 的最高相同的位 $i$，$i$ 位以下不用管。按位贪心确定 $\oplus y_i$，将 $2^i\frac{a}{2^i}$ 和 $2^i\frac{b}{2^i}$ 拼在一起放入线性基中。复杂度 $O(n\log^3V)$。

减少有用的 $(a_i,b_i)$。如果 $a_i$ 能被 $a_1,\dotsb ,a_{i-1}$ 表示出，那 $b_i$ 消去对应的 $b_j$，变成 $(0,b_i')$ 不会造成影响。只有 $O(\log V)$ 个 $(a_i,b_i)$。复杂度 $O(n\log V+\log^3 V)$。

## 8.20

### [模拟赛 T3](http://goj.wiki/d/Union2024/p/P1043)

从深度大往小维护线段树，启发式合并。$u$ 和 $v$ 处 $[l,r]$ 差分维护加 $1$，lca 对应 $u,v$ 的儿子处删除。每次修改后，线段树上二分极长非零连续段的左右端点，回答能回答的询问并删除询问。将询问挂在 $r$ 上，线段树维护区间 $l$ 的最大值，每次取出并删除。

### [CF1174E](https://www.luogu.com.cn/problem/CF1174E)

$a_1$ 一定是 $2^x3^y$，且 $y=0/1$。每次 $x$ 或 $y$ 减一或不变，dp 即可。

## 8.21

### [CF1264D2](https://www.luogu.com.cn/problem/CF1264D2)

模拟赛 T2。

等于在唯一一个 $pre_i=suf_{i+1}$ 的地方计算答案。枚举分界点，设左边有 $x$ 个 ```(```，$l$ 个 ```?```，右边有 $y$ 个 ```)```，$r$ 个 ```?```，答案为 $\sum_{i=0}^l \binom l i\times \binom r{x+i-y}\times (x+i)=x\times \sum_{i=0}^l\binom l i\times \binom r{r-x+y-i}+l\times\sum_{i=0}^l \binom{l-1}{i-1}\times \binom{r}{r-x+y-i}=x\binom{l+r}{r+y-x}+l\binom{l+r-x}{r-x+y-1}$。

### [CF1616H](https://www.luogu.com.cn/problem/CF1616H)

模拟赛 T4。

建 trie dp，设 $f_u$ 表示 $u$ 子树内选点两两异或小于等于 $x$ 的方案数，$g_{u1,u2}$ 表示 $u1,u2$ 子树内选点两两异或小于等于 $x$ 的方案数。分讨向下递归，每个点只经过一次。