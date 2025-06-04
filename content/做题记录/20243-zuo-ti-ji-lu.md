---
title: '2024.3 做题记录'
date: 2024-04-01 22:20:01
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---
二月没写

## 3.05

###  [CF671D](https://www.luogu.com.cn/problem/CF671D)

设 $dp_{u,i}$ 表示覆盖完 $u$ 子树，向上覆盖到深度 $i$ 的最小代价。要求区间取 min，区间加，线段树合并。

### [CF1175G](https://www.luogu.com.cn/problem/CF1175G)

$$dp_i=\min(f_j+(i-j)\times \max a_k)$$

cdq 分治。记 $mx_i$ 表示 $(i,mid]$ 或 $[mid+1,i]$ 的 $a_k$ 最大值。

$$dp_i=\min(f_j+(i-j)\times \max(mx_i,mx_j))$$

分类讨论 $mx_j\le mx_i$：$dp_i=\min(j\times (-mx_i)+f_j)+i\times mx_i$。枚举 $i$，不断加入 $j$，单调栈维护一次函数 $y=jx+f_j$，斜率递减，查询的横坐标不增。反之同理。

## 3.06

### [CF1530H](https://www.luogu.com.cn/problem/CF1530H)

时间倒流，第一次到达一个点写下数字。每次会往当前形成的段前后加数，需要花费时间跨越整个段。所以除了 $a_n$ 可能不是 lis 以外，所有向左右拓展的数都是 lis 的一部分。设 $f_{l,i}$ 表示当前有长为 $l$ 的连续段，从后往前遍历到 $i$ 且 $a_i$ 填入最左时最右的最小值。$g_{l,i}$ 相反。

$$f_{l,i}=\max(\max_{j>i\lor a_j>a_i} f_{l-1,j},\max_{j>i\lor g_{l-1,j}>a_i} a_j)$$

分类讨论 $a_n$，树状数组维护前缀 max 和后缀 min。

随机排列的 lis 期望长度为 $O(\sqrt n)$，复杂度 $O(n\sqrt n\log n)$。

## 3.07

### [P5044](https://www.luogu.com.cn/problem/P5044)

设 $dp_{l,r}$ 表示 $[l,r]$ 的答案。取 $mid$ 为 $[l,r]$ 中最大 $a_i$ 的位置。

$$dp_{l,r}=\min (dp_{l,mid}+(r-mid)\times a_{mid}+dp_{mid+1,r}+(mid-l+1)\times a_{mid})$$

区间最大值有关的 dp，建出笛卡尔树。递归左右子树得到 $dp_{l,i},l\le i\le mid$ 和 $dp_{mid+1,i},mid+1\le i\le r$，只考虑以树上节点对应的区间的 $l$ 为左端点的 dp 值。将询问拆成 $[l,mid-1]$ 和 $[mid+1,r]$，挂在 $l=ql,r=mid$ 的节点，另一半反过来再做。

对于左端点在 $l$ 且跨过 $mid$ 的答案，min 左边增幅为 $a_{mid}$，右边小于等于 $a_{mid}$，单调。线段树维护，支持区间加一次函数，线段树上二分。

## 3.08

### [P3246](https://www.luogu.com.cn/problem/P3246)

莫队。当向右拓展时，加上 $[l, r+1],\dotsb ,[r+1,r+1]$ 的贡献。设区间最小值位置为 $p$，$p$ 以左加上 $a_p$。设 $f_{l,r}$ 为以 $r$ 为右端点，左端点在 $[l,r]$ 的贡献。$pre_i$ 为 $i$ 左边第一个比 $a_i$ 小的位置。

$f_{l,r}=f_{l,pre_r}+a_r\times (r-pre_r)$。与 $l$ 无关，变成前缀和。

### [P5283](https://www.luogu.com.cn/problem/P5283)

做前缀和。转换为选 $2*k$ 个有序对的和最大值除以 $2$。将 $a_0\dotsb a_n$ 插入 trie，对每个 $i$ 求出第 $num$ 大的 $a_i xor a_j$，扔进优先队列，取出时加入 $num+1$ 大。

### [CF1253F](https://www.luogu.com.cn/problem/CF1253F)

求出每个点到最近的关键的的距离 $dis_u$。能从 $u$ 走到 $v$ 则有 $dis_u+dis_v+e_{u,v}\le c$。建最小生成树，倍增求路径最大值。

## 3.09

### [CF1286E](https://www.luogu.com.cn/problem/CF1286E)

维护当前 border 集合。从 $i-1$ 的合法集合过来，如果 $s_{x+1}\ne s_i$ 则删去，如果 $s_i=s_1$ 则加入 $[i,i]$。一共只有 $O(n)$ 个 border。

考虑删除那些。对于每个节点每种颜色找出在 nxt 上，$s_{x+1}=s_{i+1}$ 的最近祖先，把除了颜色 $s_i$ 的一路跳上去删掉。末尾添数维护 st 表最小值计算删除的代价。每个删一次，复杂度 $O(n\log n)$。

对于合法的那些，权值对 $a_i$ 取 min。用 map 维护每个权值的个数，将大于 $a_i$ 的数量加进 $a_i$，每个权值操作一次，复杂度 $O(n\log n)$。

### [CF1202E](https://www.luogu.com.cn/problem/CF1202E)

枚举分界点 $p$，以 $p$ 结尾匹配 $s_i$，以 $p+1$ 开始匹配 $s_j$ 的方案数之积。建 ACAM，当前节点 fail 树到根的路径上的终止状态数为比配数，反转再做另一边。

### [CF1854D](https://www.luogu.com.cn/problem/CF1854D)

可以 $\log n=9$ 次二分出一个点走 $k$ 步到哪里。有两种用法：求出走 $n+1$ 步得到环上的某个点和走 $1$ 步得到该点下一个点。

先找出一个点在 $1$ 联通块的环上，在向下走 $124$ 步找到环上连续的 $125$ 个点。对剩下 $375$ 个点找出 $125$ 步到这 $125$ 个点之一的点。这时至少已知环上连续的 $250$ 个点，有一半的环已知，其他的点走 $n+1$ 步或 $n+1+250$ 步如果在联通块内则一定能到这一半的环。总步数 $9\times 125+375+2\times 250=2000$。

这么做的关键是环上连续点长度可以倍增，如果将 $125$ 调小步数更少。

## 3.11

### [CF1916F](https://www.luogu.com.cn/problem/CF1916F)

加强构造条件，改为：构造一个逐步染黑序列，使得每一时刻黑白导出子图都连通。每次选一个与黑色点有连边且不是白导出子图的割点的白点染黑。

证明一定有这样的点。找到白导出子图中只与一个割点相邻的块，如果黑导出子图与这个块没有连边，改割点是全图割点，但是原图是点双，矛盾。所有一定存在可以染的点。每次求割点，复杂度 $O(nm)$。

### [CF1218G](https://www.luogu.com.cn/problem/CF1218G)

先猜测最后每个点权值 $mod 3$为集合编号。边权为 $3$ 相当于删掉这条边。找出一颗生成树，从下往上定边权可以满足除根以外的所有点。再调整根。

如果存在一个奇环，将每条边权交替加 $1$ 或 $2$，可以只改一个点，将根设在环上。否则二分图，左部为 $1$，右部 为 $2$，左部点为根，选出与根相连的两条边加一，$w_{rt}=1,w_u=w_v=0$。

## 3.12

### [[省选联考 2024] D1T2 魔法手杖](https://www.luogu.com.cn/problem/P10218)

将 $a_i$ 插入 01 trie，从高位到低位考虑。在第 $dep$ 位，以前选的数 $x$，当前 $S$ 集合中最小值 $y$，当前答案 $z$。记录 trie 节点 $a$ 最小值和 $b$ 的和。

如果填 $x=0$，左边小于右边。如果左边可以全部进入 $S$：如果左边进入后的 $y$ 无论如何都没右边大，更新答案；否则更新 $y$ 进入左边。否则：如果 $y$ 无论如何都没有右边大，更新答案；否则右边最小，进入右边。

### [[省选联考 2024] D2T1 迷宫守卫](https://www.luogu.com.cn/problem/P10220)

设 $dp_{u,i}$ 表示节点 $u$ 且第一个是 $i$ 的最小代价，记录从什么转移而来。

$$dp_{u,\min(i,j)}=dp_{ls,i}+\min(a_u,dp_{rs,j})$$

再 dfs 一边，可以花费代价调整一些选择升级答案。特别注意可以选择将选择 $a_u$ 改为选择 $dp_{rs,j}$。

注意到合法状态 $O(n2^n)$ 个，前后缀优化，复杂度 $O(n2^n)$。

## 3.13

### [CF1852E](https://www.luogu.com.cn/problem/CF1852E)

把每个数记录为 $(l,r,x)$，如果有包含更小的把更小的扔掉，BIT 维护。先考虑 $ans_l=ans_r=x$，再把每个点改为包含他的数的最大值。但是可能有不在原数组中的数，有且只有一个。从高到低枚举 $x$，取 $nw$ 为小于 $x$ 且不存在于原数组的最大数，如果 $nw$ 的 $(l,r,nw)$ 被 $x$ 的 $(L,R,x)$ 包含，就可以将 $[L,R]$ 中非端点的数改为 $nw$，算一下答案取 $sum$ 最大的 $nw$。

### [CTT2021 D3T1 小明的树](https://www.luogu.com.cn/problem/P8990)

每一个白点子树内的节点都是白点，等价于黑点形成联通块。树上联通块数等于点数减边数。白连通块数等于异色边数。

维护 $(x,v)$ 表示连通块数 $x$，权值为 $v$，求 $x=1$ 时 $\sum v$。$x_i$ 初始值取 $n-i-(n-1)$，对于一条边 $(u,v)$，设 $u$ 比 $v$ 先遍历到，$x_{t_u}\dotsb x_{n-1}$ 加 $1$，$v_{t_u}\dotsb v_{t_v-1}$ 加 $1$。维护区间最小值大小、数量、权值和，区间加。

## 3.15

### [CF1930F](https://www.luogu.com.cn/problem/CF1930F)

$$\max(\max(a_i \mathrm{or} x)-\min( a_i \mathrm{or} x))=\max(a_i \mathrm{or} a_j-a_j)=\max(a_i-a_i \mathrm{and} a_j)$$

从高往低贪心 $\min x \mathrm{and} a_i$ 和 $\max x \mathrm{or} a_i$。维护当前 $a_i$ 的超集和子集。

### [CF1236F](https://www.luogu.com.cn/problem/CF1236F)

拆方差的期望：$E((x-E(x))^2)=E(x^2-2xE(x)+E(x)^2)=E(x^2)-E(x)^2$。

连通块数等于点数 $v$ 减边数 $e$ 加环数 $c$。

$$E(x^2)=E(a)^2+E(b)^2+E(c)^2-2E(ab)+2E(ac)-2E(bc)$$

### [CF1025G](https://www.luogu.com.cn/problem/CF1025G)

鞅与停时。对于有 $x$ 个儿子的点，设计函数 $f_x$。

$$f_x+f_y-1=\frac{1}{2}(x\times f_0+f_{y+1}+y\times f_0+f_{x+1})$$

可以 $O(n^3)$ 高斯消元。找规律令 $x=y$，

$$2\times f_x-1=x\times f_0+f_{x+1}$$

$f_x=(x+1)\times f_0-2^x+1$，且 $f_{n-1}=0$。

带回去发现符合条件。所以 $f_A=\sum f_x$。复杂度 $O(n)$。

### [CF1801E](https://www.luogu.com.cn/problem/CF1801E)

并查集将相同的连在一起。总共有 $n-1$ 个有效状态，只要没有重复做就可以。倍增 $u$ 向上 $2_i$ 个祖先的状态，分别考虑从下往上和从上往下。将两条路径拆为 $3$ 段，每段倍增 $O(\log n)$ 次合并。每次合并向下一层递归合并，如果已经是一个连通块的及时退出。复杂度 $O(n\log^2 n)$。

## 3.17

### [CF983D](https://www.luogu.com.cn/problem/CF983D)

离散化。对 X 轴扫描线，线段树维护 Y 轴区间。记录区间已选最小和未选最大，set 维护区间里所有的值。每次如果有未选最大大于已选最小，打标记，再做一次。复杂度 $O(n\log^2 n)$。

## 3.18

### [CF850F](https://www.luogu.com.cn/problem/CF850F)

设 $f_i$ 为已有 $i$ 个球为钦定颜色。

$$f_i=f_{i-1}\times \frac{i\times (sum-i)}{sum\times(sum-1)}+f_{i+1}\times \frac{(sum-i)\times i}{sum\times(sum-1)}+f_i\times(1-\frac{i\times (sum-i)}{sum\times(sum-1)})+v$$

其中 $v$ 为当前局面钦定颜色成为最后颜色的概率，见 [P5155](https://www.luogu.com.cn/problem/P5155)。移项得 $O(n)$ 递推式。答案为 $\sum f_{a_i}$。

### [CF1037G](https://www.luogu.com.cn/problem/CF1037G)

对于每个区间算 SG 值，枚举删 $c$，转换为若干个子区间的 SG 异或，前缀和维护，复杂度 $O(\mid \sum\mid)$。考虑有用的区间，是两个相同字符间的一段以及前后缀。共 $O(n\sum)$ 个区间，从小到大计算，复杂度 $O(n\mid\sum\mid^2)$。

## 3.19

### [CF319E](https://www.luogu.com.cn/problem/CF319E)

并查集维护强连通分量以及最左和最右。线段树 vector 维护节点对应的线段，每次加入一条线段，把之前线段经过当前左右端点的并入连通块，再把当前线段拆成 $\log n$ 段扔进线段树节点。

### [CF547E](https://www.luogu.com.cn/problem/CF547E)

拆为对 $s_{1\dotsb i}$ 询问 $s_k$。建 AC 自动机，把 $s_i$ 每个前缀对应的状态加 $1$，求 fail 树上的子树和，dfn 序加树状数组。

### [CF587F](https://www.luogu.com.cn/problem/CF587F)

反过来，答案为将 $s_k$ 每个前缀加 $1$ 求 $s_{l\dotsb r}$ 终止节点的 fail 子树和。

根号分治。对于大于 $B$ 的串，先将 $s_k$ 每个前缀对应位置加 $1$，此时每个 $s_i$ 终止节点的子树和就是 $s_i$ 的贡献，前缀和。复杂度 $O(\frac{\mid S\mid^2}{B})$。否则从 $1$ 到 $n$，区间加单点查，dfn 序加树状数组，复杂度 $O(qB\log {\mid S\mid})$。

### [CF618F](https://www.luogu.com.cn/problem/CF618F)

加强构造条件，任意排序 A 和 B 一定有两个子段相等。即两对 $a_i=b_j$。

令 $a_n<b_n$。对于每个 $i$ 找到最小的 $b_j\ge a_i$，有 $b_j-a_i\in [0,n)$。$n+1$ 个数，值域为 $n$，一定存在相等。

## 3.20

### [CF924F](https://www.luogu.com.cn/problem/CF924F)

对于一个数字做背包，$f_i$ 表示当前位能不能凑出 $i$。$f_i->f_{\mid i-v\mid}$，$f_i->f_{i+v}$。答案一定在 $[0,9]$ 中，发现大于 $72$ 的背包不优。

当做 $18$ 位时，这个背包状态有 $12880$ 种，$12880$ 也是全部状态数。可以用数位 dp 套这个背包。宽搜所有转移。

设 $f_{dep,u,k}$ 为当前剩下后 $dep$ 位随便选，当前在内层自动机的位置为 $u$，最最小值小于 $k$ 的答案。$T$ 组询问，差分询问 $x$，按 $x$ 从高位到低位在自动机上走，如果没有限制就加上对应的 f 值。

记录状态一个 $73$ 位 01 串方面，卡哈希，可以考虑用一个 ```pair``` 记两个 ```long long``` 表示前一半后一半的值。

## 3.21

### [CF1685C](https://www.luogu.com.cn/problem/CF1685C)

前缀和。反转 $[l,r]$ 后 $b_i=a_{l-1}+a_r-a_{i'}$。取最大的 $a_x$，操作 $[1,x]$ 和 $(x,2\times n]$。$b_i=a_x-a_{i'}\ge 0$。

特判不用做，考虑做一次。找到第一个小于 $0$ 和最后一个大于 $0$ 的区间 $[l,r]$，翻转 $[ll,rr]$ 且 $ll\le l,rr>r$。$\max_{i=l}^{r} a_i\ne a_{ll-1}+a_{rr}$，找到最大的 $a_{ll-1}$ 和 $a_{rr}$ 判断。

### [P8376](https://www.luogu.com.cn/problem/P8376)

递增子序列以 $2^x$ 增加，将 $k$ 二进制拆分。设 $tp$ 是 $k$ 二进制最高位，先造长为 $tp$ 的连续单调上升。加入 $2^i$ 时，不断下降放在最开始的单调上升的后 $i$ 个之前。共 $60\times 2>90$。考虑将后面部分两步改为一步。如果有连续的 $i$ 和 $i-1$ 需要操作，直接在 $i-1$ 前放大于后面放的最小值和次小值的数。

### [P9520](https://www.luogu.com.cn/problem/P9520)

因为是一棵树，最短路径唯一，所以每次都让一个人走到底。当走 $s->t$，$s->t$ 中此时没有点，意味着起点这条路径上的人一定先于这个人走，终点在这条路径上的人一定后于这个人走。连边跑拓扑排序看有没有环。复杂度 $O(n^2)$。倍增优化 $O(n\log n)$。

## 3.22

### [P7561](https://www.luogu.com.cn/problem/P7561)

曼哈顿转切比雪夫，二分答案，扫描 X 轴，set 维护 Y 轴，二分 $y_i-mid$，枚举到 $y_i+mid$，找到大于 $k$ 个就返回。复杂度 $O(n\log^2n)$。

### [P9734](https://www.luogu.com.cn/problem/P9734)

如果多天走完。第一天，时间倒流，$n$ 次最短路以 $s$ 为终点，从 $i$ 出发的最晚时间。最后一天，$n$ 次最短路以 $s$ 为起点，到 $i$ 的最早时间。中间部分，把最后一天算出来的一天能走到的 $u,v$ 连边权为 $S$ 的边做弗洛伊德。复杂度 $O(n^3)$。对于每个询问，枚举第一天去哪里，最后一天开始时在那里，复杂度 $O(qn^2)$。对于已知的第一天终点和全程终点，$O(n^3)$ 预处理最后一天终点，复杂度 $O(n^3+qn)$。

如果一天走完，答案只可能有 $m$ 次变大。算出每条边断开前 $u->v$ 的最晚出发时间和答案，去掉被包含的部分，二分查询的时间属于那一段。复杂度 $O(n^4\log n+q\log n)$。

## 3.25

### [CF396C](https://www.luogu.com.cn/problem/CF396C)

对于一个点维护 $b_i=a_i-a_{fa_i}$。对于操作一，等价于 $b_u$ 加 $x$，$u$ 的子树不含 $u$ 减 $k$。对于操作二，等价于从根到 $u$ 路径上的 $b_x$ 的和。子树加，路径查，树剖加线段树。

## 3.26

### [P10272](https://www.luogu.com.cn/problem/P10272)

分类讨论。如果 $S$ 存在一个周期，设最小周期长为 $len$。那么第 $i$ 次操作是在 $i-1$长度上加 $(n-len)\times 2^i$。用字符串哈希判断是否存在长为 $i$ 的周期，只需要判断 $s[1,n-i]=s[i+1,n]$ 。

如果 $S$ 不存在一个周期，找到真 border $T$，再找到 $T$ 的最小周期 $TT$，发现此时答案只取决于 $S$ 开头存在 $num$ 个连续的 $TT$。记 $cnt=\frac{\mid T\mid}{\mid TT\mid}$，发现每次操作答案增加 $\min(cnt\times 2^i,num)$ 个 $TT$。模拟前 $\log n$ 次操作后每次操作答案增加为定值，计算等差数列。

### [NOI模拟3.26 T1 礼物(gift)](http://www.gdfzoj.com:23380/contest/941/problem/8789)

求最大的 $\sum[v_i\times t+a_i\equiv 0(\mod 2^l)]\times w_i$。

$tv\equiv a(\mod 2^l)$。不一定有逆元。设 $t=\frac{q}{2^p}$，得到 $t\equiv (\frac{v}{2^p2^c})^{-1}\frac{a}{2^c}(\mod 2^{l-c})$。当 $v$ 中恰好有 $p+c$ 个 $2$ 且 $a$ 中至少有 $c$ 个 $2$ 是有解。每次枚举 $p$，从低到高建 trie 树，把贡献加在 $q$ 对应的位置上，相当于整个子树都有加 $w$ 的贡献。答案为最大的链和。

### [NOI模拟3.26 T2 逆序对(inv)](http://www.gdfzoj.com:23380/contest/941/problem/8790)

[P5853](https://www.luogu.com.cn/problem/P5853)。求所有长为 $n$ 的逆序对数为 $k$ 的排列中 $i$ 在小根笛卡尔树上的深度之和。

先 dp 满足逆序对数的排列个数。加入第 $i$ 个数产生 $[0,i-1]$ 对逆序对。将深度转为祖先个数。$v>u$ 是 $u$ 的祖先，即 $v$ 处逆序对数贡献为 $0$，撤销背包即可。翻过来再做一遍。

## 3.27

### [NOI模拟3.26 T3 字符串(word)](http://www.gdfzoj.com:23380/contest/941/problem/8791)

[Q6842](https://qoj.ac/problem/6842)。$w(l,r)=s_l\dotsb s_r$，其中 $s_i=popcount(i)\mod 2$。$S$ 为 $n$ 个 $w(l_i,r_i)$ 顺次拼接，$q$ 次询问 $p$在 $S$ 中出现次数。

对 $p_i$ 建 AC 自动机，答案为在自动机上走 $S$，走到的每个节点加 $1$，$p_i$ 终止节点的 fail 树子树和。

倍增拆开 $S$。记 $a(n,i=0/1)$ 为 $w(0+i2^n,i2^n+2^n-1)$，有 $a(n,i)=a(n-1,i)+a(n-1,i\oplus 1)$。对于 $i=k2^n$，也有 $w(i,i+2^m-1)=a(n,popcount(i)\mod 2)$。所以可以将 $[l,r]$ 拆为 $O(\log n)$ 个区间。

记 $to_{i,u,0/1}$ 表示自动机上 $u$ 节点走 $a(i,0/1)$ 到的点，$cnt_{i,u,0/1}$ 为自动机上 $u$ 节点走 $a(i,0/1)$ 的次数。分别从下一层和上一层得到。

## 3.28

### [P3502](https://www.luogu.com.cn/problem/P3502)

设 $dp_{i,j}$ 表示选了 $i$ 个，以第 $j$ 个串结尾的长度。$O(n^3)$ 哈希处理转移，矩阵快速幂。

### [P6190](https://www.luogu.com.cn/problem/P6190)

弗洛伊德算一次魔法从 $i$ 到 $j$ 的代价。矩阵快速幂。

### [P7215](https://www.luogu.com.cn/problem/P7215)

对于颜色 $i$ 的两个点 $u,v$，选颜色 $i$ 就路径 $u\to v$ 上的所有颜色都要选。倍增优化建图，每个节点连向对应颜色，$i$ 连向所有颜色为 $i$ 的节点的 lca 到颜色为 $i$ 的节点的链连边。缩点，入度为 $0$ 的 scc 中有效的点的数量。

### [CF549F](https://www.luogu.com.cn/problem/CF549F)

以区间最大值区间为中点，枚举短的一边，二分另一半。复杂度 $O(n\log^2 n)$。

## 3.29

### [P4948](https://www.luogu.com.cn/problem/P4948)

- $a\neq 1$：

$$s_k=\sum i^ka^i=\sum (i+1)^ka^(i+1)-(n+1)^ka^{n+1}+a$$

$$s_k=\sum_{i=1}^n\sum_{j=0}^k\binom{k}{j} i^ja^{i+1}-(n+1)^ka^{n+1}+a$$

$$s_k=a\sum_{j=0}^k\binom{k}{j}s_j-(n+1)^ka^{n+1}+a$$

- $a=1$

$$s_k=\sum i^k=\sum (i+1)^k-(n+1)^k+1$$

$$s_k=\sum_{i=1}^n\sum_{j=0}^k\binom{k}{j} i^j-(n+1)^k+1$$

$$0=\sum_{j=0}^{k-1}\binom{k}{j}s_j-(n+1)^k+1$$

$$\binom{k+1}{k}s_k=(n+1)^{k+1}-\sum_{j=0}^{k-1}\binom{k+1}{j}s_j-1$$

### [AT_yahoo_procon2019_qual_e](https://www.luogu.com.cn/problem/AT_yahoo_procon2019_qual_e)

选一些行异或，如果不是全零的话答案为 $2^{m-1}$。只需要求若干行异或后全零的方案数，将一行看作大小为 $m$ 的数，bitset 维护做线性基。

### [CF1368G](https://www.luogu.com.cn/problem/CF1368G)

移动骨牌相当于移动空格，按黑白分开，可以移动的连有向边，可以证明这是两组森林。去掉一个骨牌两个空格可以移动到两个子树任意位置，但有重复。用 dfn 序记录一段区间，扫描线算矩阵面积并。

### [abc291g](https://www.luogu.com.cn/problem/AT_abc291_g)

$a+b-a and b=a or b$。转换为最小 and 和。每一位单独贡献。01 序列的 and 相当于乘法。对每个循环位移长度 $i$ 记 $ans_i$。

把 b 复制一遍。$ans_j=\sum_k \sum_i a_{i,k}\times b_{i+j,k}$。差卷积。

## 3.30

### [noip模拟3.31 T2 柳绿更带朝烟(farmland)](http://www.gdfzoj.com:23380/contest/944/problem/8793)

 [P3006](https://www.luogu.com.cn/problem/P3006)。以 $1$ 为根的有根树，每个节点有一定数量的奶牛，每单位时间每条边限制流量，奶牛单位时间内可以移动多步，多组询问一定时间内能到达根的最多的奶牛个数。

计算每个点人数减少速度。当一个点送完人后，再有人从下方送来直接往上转，所以可以在并查集上将 $u$ 与 $fa_u$ 合并。从小到大处理，知道询问属于哪个段即可。

### [noip模拟3.31 T3 花落家童未扫(petal)](http://www.gdfzoj.com:23380/contest/944/problem/8794)

若 $\min_{i=l}^r a_i\leq r-l+1\leq \max_{i=l}^r a_r$，则 $[l,r]$ 符合条件。求有多少种合法划分方案数。

$f_{i+1}=\sum f_j\times [[j,i] 合法]$。容斥，等于所有减不满足 min 减不满足 max 加两个都不满足。考虑合法区间的矩形面积并，对于每个 $i$，满足 min 的区间形如一个矩形减一个平行于 $y=x$ 的三角形。三角形无法扫面线，但是可以看成以区间最小值分治然后枚举短的一边。所以把 $O(n)$ 个矩形减三角形拆成 $O(n\log n)$ 个矩形。维护区间最小值和最小值对应的 f 值，扫描线更新 f。