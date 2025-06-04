---
title: '2024.1 做题记录'
date: 2024-02-01 22:20:51
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---
## 1.08

[[sam-zuo-ti-ji-lu|SAM 学习笔记]]。

### [CF235C](https://www.luogu.com.cn/problem/CF235C)

求每个询问串的所有循环同构在主串中出现的次数总和。

向后遍历可做，现在需要删掉开头。删除开头 $l$ 减 $1$，如果 $l=len_{lnk_p}$，那 $p$ 就不能再在这个节点，$p=lnk_p$。

## 1.09

### [P4094](https://www.luogu.com.cn/problem/P4094)

子串 $s[a...b]$ 的所有子串和 $s[c...d]$ 的最长公共前缀的长度的最大值。

二分答案 $mid$，询问 $s[c...c+mid-1]$ 是否在 $s[a...b]$ 中出现。设节点 $p$ 表示 $s[c,c+mid-1]$，问 $p$ 的 endpos 是否在 $[a+mid-1,b]$ 中有元素。

记录 $p$ 表示 $s[1...i]$，倍增 parent tree 跳到 $len_p\leq mid$。动态开点线段树合并 endpos 集合。

## 1.10


### [CF1237H](https://www.luogu.com.cn/problem/CF1237H)

因为是对偶数位操作，将每两位和为一位。令 $00$ 为 $0$， $01$ 为 $1$， $10$ 为 $2$， $11$ 为 $3$。如果有解，则 $suma0=sumb0,suma3=sumb3,suma1+suma2=sumb1+sumb2$。

考虑从一个大问题转换为小问题。要找到一种方法使得在不改变其他结构的同时移动 $a_i$。操作 $2\times i-2$ 和 $2\times i$ 可以实现两步将 $a_i$ 换到 $a_1$，$a_{1...{i-1}}$ 不改变结构的移到 $a_{2...i}$。

所以从后向前，设当前维护到 $a_i$，此时 $a_{1...{i-1}}$ 分别等于 $b_{{n-i+2}...n}$。找到 $a_j=b_{n-i+1}$ 且 $i\leq j$，执行上面操作即可。共 $N$ 次操作。

现在问题是，$suma1\neq sumb1$ ，我们要反转一次使 $suma1=sumb1$。

我们可以找到 $a$ 中某个前缀，使得 $suma1-suma1_i+suma2_i=sumb1$，翻转这个前缀。否则一定有 $b$ 的某个前缀，使得 $sumb1-sumb1_i+sumb2_i=suma1$。这时翻转 $b$ 的这个前缀得到 $b'$，把 $a$ 做成 $b'$ 再翻转这个前缀。

### [CF1329D](https://www.luogu.com.cn/problem/CF1329D)

转换题意。对于 $s_i=s_{i+1}$ 的 $i$，加入 $a$，$a$ 长为 $m$。

发现可行的 $s$ 上操作对应 $a$ 上：

- $a$ 上删 $a_i,a_{i+1}$，其中 $a_i\neq a_{i+1}$，$s$ 上删 $s[a_i+1,a_{i+1}]$，形如 b...[bca]...a。

- $a$ 上删 $a_i$，其中 $a_i\neq a_{i+1}$，$s$ 上删 $a[1,a_i]$，形如 [bca]...a。

显然优先操作一，答案与 $a$ 中出现次数最大的 $p$ 有关，设为 $t_p$。

- $t_p\times2>m$。所有非 $p$ 都与 $p$ 操作一，用栈模拟，知道无法操作为止。

- 其他情况。能配就配，直到成为上面的情况。用栈模拟，动态维护 $t$ 和 $p$。

从左到右操作，可以不用线段树，记录已删除量 $del$。处理细节。

结束后栈不空，用操作二一个一个做。可能忽略 $s[a_m+1,n]$，再用一次操作全部做完。

### [CF1396E](https://www.luogu.com.cn/problem/CF1396E)

先求出可行的最大最小答案。

一条边将树分为 $sizA$ 和 $sizB$，能贡献最大为 $min(sizA,sizB)$，最小为 $sizA\bmod 2$。最大时，$A,B$间两两连边，最小时，$A,B$ 内部互相连，多出 $sizA \bmod 2$。

拆开 $min(sizA,sizB)$，可以取重心为根，最大贡献为向下的 $siz$。最大时所有路径跨过根。因为重心子树大小最大小于 $\frac{n}{2}$，构造取 dfn 序，$dfn_i$ 与 $dfn_{i+\frac{n}{2}}$ 连边即可。

最大时点的贡献是到根的距离。取点 $u,v$ ，lca 为 $tp$。本来 $u,v$ 各自的贡献是 $dep_u+dep_v$，连 $u,v$ 后，贡献为 $dep_u+dep_v-2\times dep_{tp}$，变化量模 $2$ 为 $0$。

从 $mxans$ 变化为 $m$。每次取出最大的 $dep_{tp}$ 的 $u,v$ 改为互相连，然后删掉。要保持重心结构，所以从最大 $siz$ 中选。最后当 $dep_{tp}>mxans-m$，因为 $dep_{tp}$ 从最大往小，沿树向上一定找得到符合条件的。最后对没删掉的节点跑最大的构造。

## 1.11

### [P6240](https://www.luogu.com.cn/problem/P6240)

$q$ 次查询区间 01 背包，值域 $t$。$n\leq 4\times 10^4,q\leq 2\times 10^5,t\leq 200$。

可以 $O(t)$ 合并背包 $f$ 和 $g$ 求出单个 $dp$ 值。$dp_s=max_{i=0}^{s}f_i+g_{s-i}$。

猫树分治：选取所有询问都包含的某个位置，分别向左右预处理。对于询问的回答,只需要在左端点取信息,在右端点取信息,再合并即可。

分治 $S(l,r,ql,qr)$ 表示处理 $[l,r]$ 的物品和 $[ql,qr]$ 的询问。取 $mid=\frac{l+r}{2}$，向左右背包。遍历 $[ql,qr]$ 的询问，如果在左右就下放，否则合并算出答案。

复杂度 $O(nt\log n+qt)$。

### [P5576](https://www.luogu.com.cn/problem/P5576)

[P5546](https://www.luogu.com.cn/problem/P5546) 做区间询问。

选 $s$ 作为文本串对其他所以 $t$ 建的 SAM 匹配。复杂度 $O(|s|n)$，$\sum |s|$ 为定值，$|s|$ 越小越好。

猫树分治 $S(l,r,ql,qr)$，选最小的 $s_k$ 处理跨过 $k$ 的询问。$s_k$ 过长复杂度退化，不能取中点分治。

取阈值 $lim$，长度小于 $lim$ 的为短串，在短串中取中心。如果没有短串，$lim=lim\times 2$。对于 $lim$，最多分治 $\log n$ 次，区间大小 $\frac{\sum len}{lim}$，匹配串 $s$ 长 $lim$。共 $\log {\sum len}$ 种 $lim$，复杂度 $O(\sum len+m)\log n\log len$。

开一个大数组，然后用指针标记位置。

### [P4001](https://www.luogu.com.cn/problem/P5576)

平面图最小割与对偶图最短路等价。

### [UVA10735](https://www.luogu.com.cn/problem/UVA10735)

有向图欧拉回路当且仅当每个点入度等于出度。给无向边定向。先随便定向，记 $d_u=\frac{out_u-in_u}{2}$。改变方向时 $d_u-1,d_v+1$，看作流量变化，连 $(u,v,1)$。$d_u>0$ 的连 $S$，$d_u<0$ 的连 $T$。跑网络流看是否满流。

### [CF1383F](https://www.luogu.com.cn/problem/CF1383F)

最大流等于最小割。$k$ 条特殊边割或不割 $2^k$ 个状态。对于一个状态，先不管特殊边边权，割掉要割的特殊边，跑最小割，在加上要割的特殊边边权，对所有状态取 min 即为答案。

当特殊边边权为 $0$，一定被割；边权为 $maxw=25$，一定不割。

从全不割到全割的转移。在旧状态的残余网络上改边权再跑即可，$dp_s=dp_{t}+flow$。记录 $2^k$ 个网络和当前状态的答案。

dinic 常数大，残余网络上用 FF，不过跟复杂度无关。

## 1.12

### [CF280D](https://www.luogu.com.cn/problem/CF280D)

长度为 $n$ 的数列，支持：单点修改，区间询问至多选 $k$ 个的不交子段和的最大值。

连 $(s,i,1,0),(i,i+1,1,a_i),(i,t,1,0)$，$s->i->j->t$ 表示选 $[i,j)$。要求至多 $k$ 流的最大费用。

参考网络流反边，相当于每次取最大子段，再反转，重复 $k$ 次。线段树维护从左、右开始最大值和位置，区间最大值和位置，以及反过来最小值。用栈记录翻过的位置，最后翻回来。

### [P5996](https://www.luogu.com.cn/problem/P5996)

网络流。同 [P2762 太空飞行计划问题](https://www.luogu.com.cn/problem/P2762) 建图方式，将物品与 $s$ 连 $(s,i,v_i)$，警察与 $t$ 连 $(j+n,t,v_j)$，警察与对应的物品连 $(i,j+n,inf)$，答案为所有物品的收益和减最小割。$n,m\leq 10^5$，显然跑不了网络流。考虑模拟最大流。

首先要描述警察 $j$ 与物品 $i$ 的关系。要满足：

$$\mid \frac{x_i-x_j}{y_i-y_j} \mid \leq \frac{w}{h}$$

$$x_j\times h-y_j\times w\leq x_i\times h-y_i\times w$$

$$x_j\times h+y_j\times w\geq x_i\times h+y_i\times w$$

令 $x=x\times h+y\times w,y=x\times h-y\times w$。得到 $x_i\leq x_j,y_i\geq y_j$ ，能很好描述。

将物品和警察放在一起从左到右，从上到下考虑，自然满足 $x_i\leq x_j$。贪心，一个警察 $j$ 的流优先从 $y_i\geq y_j$ 且 $y_i$ 最小处流过来，因为更大的 $y_i$ 能满足更多人限制。用 set 储存物品，警察处 lower_bound 查找。

### [gym102904B](https://codeforces.com/gym/102904/problem/B)

划分序列，代价为 $x$ 加区间逆序对数，求最小代价。

$dp_i=\max dp_j+calc(j+1,i)$，满足决策单调性，单层转移。问题在求区间逆序对数。考虑类似莫队，要求左右两端移动次数不能过大。分治 $sovle(l,r,ql,qr)$ 中 $l,r$ 移动 $O(n\log n)$ 次，可以接受。cdq 分治分层做 sovle，维护树状数组。复杂度 $O(n\log^3 n)$。

## 1.13

### [CF1158F](https://www.luogu.com.cn/problem/CF1158F)

一个序列的 $p$ 即每次删除一个包含 $[1,c]$ 的前缀能删的次数。

设 $g_{l,r}$ 表示 $[l,r]$ 中强制选 $a_r$ 并正好选出 $[1,c]$ 的子序列数。$g_{l,r}=\prod_{i\neq a_r}t_i-1$。设 $f_{i,j}$ 表示以 $j$ 结尾并强制选 $j$ 的答案为 $i$ 的数量。$f_{i,j}=\sum f_{i-1,k}+g_{k+1,j}$。因为答案小于 $\frac{n}{m}$，复杂度 $O(\frac{n^3}{m})$。答案为 $i$ 后乱选，设 $ans_i$ 表示答案至少为 $i$ 的数量。$ans_i=f_{i,j}\times 2^{n-j}$，差分得答案。

### [CF666E](https://www.luogu.com.cn/problem/CF666E)

求 $s[pl,pr]$ 在 $T[l,r]$ 中哪个串出现次数最多。

对 $t$ 建广义 SAM，$s$ 在上面跑匹配。如果 $s[pl,pr]$ 在 $t$ 中出现，倍增找到 $s[pl,pr]$ 对应的节点。每个节点动态开点线段树，下标为 $t$ 的编号，记录出现次数最大值和下标，线段树合并。

## 1.14

### [省选模拟1.14 T2 lis](http://www.gdfzoj.com:23380/contest/902/problem/8713)

求子序列最长长度使 lis 比原序列 lis 小。

连边 $(i,i',1)$，$(S,i,inf),f_i=1$，$(i',T,inf),f_i=mx$，$(i',j,inf),f_i+1=f_j,i<j,a_i<a_j$ 跑最小割。模拟最大流。分层，对于点 $u,v,f_u=f_v=i,u<v,a_u>a_v$。$u$ 去到 $i+1$ 层的区间 $[l_u,r_u]$ 满足 $l_u\leq l_v,r_u\leq r_v$。对于一个流，优先向 $l_u$ 去，因此不需要退流。记录 $vis_u$ 表示是否走过，$to_u$ 指向下一个 $vis_u=0$ 的点。$O(n)$ 模拟。

## 1.15

### [CF1498F](https://www.luogu.com.cn/problem/CF1498F)

树上节点 $i$ 有 $a_i$ 个石子，每次选任意个移到 $k$ 级祖先，不能动输，问以每个点为根先手胜负。

$dep_u$ 模 $k$ 相等的分别考虑 SG 值。当 $\lfloor \frac{dep_u}{k} \rfloor$ 为偶数时，$u$ 没意义。因为先手移偶数位后手可以移回奇数位。设 $dp_{u,j,0/1}$ 表示 $dep_u \bmod k=j,\lfloor \frac{dep_u}{k} \rfloor \bmod 2=0/1$ 时的 SG 值。换根 dp。

### [CF1852C](https://www.luogu.com.cn/problem/CF1852C)

初始全为 $0$，模 $k$ 意义下最少多少次区间加 $1$ 得到 $a$ 数组。

如果不模 $k$，差分得 $b$，$ans=\sum [b_i>0]b_i$。预先对 $a$ 区间加 $k$ 代替取模，$b_u+k,b_{v+1}-k$，最小化 $ans$。反悔贪心，取出最小的 $b_j<0$ 和当前 $b_i>0$ 做区间加后 $b_j>0,b_i<0$，把 $b_i$ 入队。 

### [CF1539F](https://www.luogu.com.cn/problem/CF1539F)

中位数相关，考虑 $a_j>a_i$ 的 $j$ 设为 $1$，$a_j<a_i$ 的 $j$ 设为 $-1$，做前缀和。$a_j=a_i$ 时可以任意排列。

- $a_i>a_{mid}$，$a_j=a_i$ 的 $j$ 放在 $i$ 前，设为 $-1$。$ans=\max \sum [a_j\leq a_i] -\lceil \frac{l+r}{2} \rceil=\frac{-\min (sum_r-sum_{l-1})-1}{2}$。

- 否则，$a_j=a_i$ 的 $j$ 放在 $i$ 后，设为 $1$。$ans=\max \sum [a_j\geq a_i] -\lceil \frac{l+r}{2} \rceil=\frac{\max (sum_r-sum_{l-1})}{2}$。

要动态维护 $\max (sum_r-sum_{l-1})$。可以按 $a_i$ 从小往大加入。初始时 $sum_i=i$，当 $a_i$ 改为 $-1$ 时，线段树维护区间 $[i,n]$ 减 $2$。$\max (sum_r-sum_{l-1})=\max_{j=i}^{n}sum_j-\min_{j=1}^{i}sum_{j-1}$。

### [CF1797F](https://www.luogu.com.cn/problem/CF1797F])

求恰好满足一个条件中的 $(u,v)$ 个数：$u$ 是 $u->v$ 编号最小的点；$v$ 是 $u->v$ 编号最大的点。

容斥，$ans=\mid A\mid+\mid B\mid-2\mid C\mid$。建大根、小根重构树，$\mid A\mid=\sum sizmx_u$。$C$ 为在两棵树都有祖先关系的点对。枚举一边，树状数组维护从根到当前节点在另一颗树上的 dfn 序，区间查询，单点修改。

### [P4248](https://www.luogu.com.cn/problem/P4248)

$t_i=s[i,n]$。求 $\sum_{i<j}len_{t_i}+len_{t_j}-2\times lcp(t_i,t_j)$。

$ans=\frac{n\times (n-1)\times (n+1)}{2}-2\times \sum_{i<j} lcp(t_i,t_j)$。lcp 看作公共前缀数量。记 $siz_u$ 表示节点 endpos 集合大小，对每个节点计算贡献，有 $num_u=len_u-len_{fa_u}$ 个串，每个串出现在 $siz_u$ 个后缀的前缀中，贡献 $num_u\times \frac{siz_u\times (siz_u-1)}{2}$。


### [P2178](https://www.luogu.com.cn/problem/P2178)

翻转建 SAM，lcp 转换为最长公共后缀，即 parent tree 上的 lca 的 len。记录子树内最大、次大、最小、次小。

### [P9970](https://www.luogu.com.cn/problem/P9970)

极小的 mex 区间有 $O(n)$ 个。枚举 $i$ 维护所有极小 $[l,r],mex_{l,r}=i$，不断向左右一边拓展至最近的 $a_i$，得到 $mex_{l',r'}=calc(l',r')>i$ 的一个区间，所有这些区间包含所有极小区间，每次转移前删去非极小区间。计算区间 mex：可持久化线段树，$[1,n]$ 为版本，维护每个值最后出现的位置，二分。已知有极小区间 $[l,r],mex_{l,r}=x$，找到左右的 $L,R,a_{L-1}=a_{R+1}=x$，则 $mex_{l',r'}=x,L\leq l'\leq l,r\leq r'\leq R$。所有 $r-l+1,R-L+1$ 中的 $len$ 存在 $mex=x$，记录加入和删除位置，用 set 扫一遍。

## 1.16

### [arc162f](https://www.luogu.com.cn/problem/AT_arc162_f)

观察发现，第 $i$ 行 $a_{i,j_1}=\ldots =a_{i,j_{num}}=1,(j_1<\ldots <j_{num})$，则第 $ii,(ii>i)$ 行能取 $1$ 的位置是 $[1,j_1-1]$ 和 $j$ 的一个前缀。

但可以空一些行和列，考虑将所有有 $1$ 的行和列压起来。设 $dp_{i,j,k}$ 表示前 $i$ 行，有 $j$ 个列有过 $1$，上一行有 $k$ 个 $1$，强制连续选。首先可以取一个前缀，$dp'_{i,j,k}=\sum_{l=k}^j dp_{i-1,j,l}$，后缀和维护。其次可以向前任意取，但强制连续选，枚举选 $l$ 个，$dp_{i,j,k}=\sum_{l=0}^k dp'_{i,j-l,k-l}$，维护一个斜线的前缀和。$ans=\sum \binom{n}{i}\times \binom{m}{j}\times dp_{i,j,k}$。再加上全取 $0$ 的情况。

注意取模优化和枚举时 $\frac{1}{2}$ 的常数！

## 1.18

### [CF814E](https://www.luogu.com.cn/problem/CF814E)

分层，只有层间和向下层的边。设当前层 $m$ 个点，$x$ 个二度，$y$ 个三度，层间连 $z$ 条。

- 向下层：$(x+2y-z)!$

- 层间：$\frac{(x+2y)!}{(x+2y-2z)!\times 2^z\times z!}$，将二度点当两个点，再出去对的相对顺序。

- 容斥掉 $p$ 个重边、$q$ 个自环，设 $s=2p+q$：$\frac{(-1)^{p+q}\times y!}{(y-s)!\times p!\times q!}\times\frac{(x+2y-2s)!}{(x+2y-2z)!\times 2^{x-s}\times (z-s)!}$ 

### [CF1142E](https://www.luogu.com.cn/problem/CF1142E)

维护一个可行答案集合，取出两个询问，将不可行的扔掉。要保证每次询问不能问到粉边，要求每个粉连通块只有一个点在集合中。强行当成 DAG，如果不行再将联通块其他点加入。

### [CF1240F](https://www.luogu.com.cn/problem/CF1240F)

构造。将边拆为 $u$ 和 $v+n$，二分图，如果能使每个点极差不超过 $1$，合并后不超过 $2$。设点 $u$ 度数为 $ak+b$，拆为 $a+1$ 个点。边染色使所有出边颜色不同。同 [CF600F](https://www.luogu.com.cn/problem/CF600F)。

## 1.19

### [arc134e](https://www.luogu.com.cn/problem/AT_arc134_e)

- $\emptyset$ 必胜。$\{1\},\{2\}$ 必败。

- 否则 $\exists x\bmod 2=1$ 模 $2$ 必胜。

- 否则 $\exists x\bmod 4=2$ 模 $4$ 必胜。

- 否则模 $3$ 后如果 $S=\{1\}$ 或 $\{2\}$ 必胜。

- 否则 $S=\{4,8\}$ 必败，否则模 $12$ 得 $\{4,8\}$ 必胜。

如果 $\forall 12\mid x$，难以分类讨论。有 $\lfloor \frac{200}{12} \rfloor=16$，状压计算出现次数和胜负。

### [CF487E](https://www.luogu.com.cn/problem/CF487E)

圆方树。求出点双，对每个点双建方点，原图点是圆点，方点与对应的圆点连边。

当进入一个点双，一定能到点双中权值最小的点。方点权值为最小的圆点权值，multiset 维护删除，树剖维护路径最小值。

## 1.20

### [agc010e](https://www.luogu.com.cn/problem/AT_agc010_e)

对于不互质的数，后手操作后先后顺序不变。对所有不互质的连边。要求定向后最大拓扑序最小。按权值从小到大 dfs 儿子连边，拓扑时用优先队列。

## 1.21

### [P5292](https://www.luogu.com.cn/problem/P5292)

从长为 $1$ 和 $2$ 的回文串开始枚举左右出边 bfs，复杂度 $O(m^2)$。减少无用的边。将 $00,11$ 和 $01,10$ 分开，形成若干连通块。如果连通块为二分图，两点间奇偶性相同，可以反复横跳，取生成树即可。不是二分图，连自环即可。边数将为 $O(n)$。

## 1.22

### [CF1609F](https://www.luogu.com.cn/problem/CF1609F)

枚举每个颜色 $c$，枚举右端，线段树区间维护左端 min 和 max 是否符合条件。

### [CF1280D](https://www.luogu.com.cn/problem/CF1280D)

树形 dp。设 $dp_{u,i}$ 表示 $u$ 子树内分 $j$ 段的最大数量。难以记录 $u$ 所在连通块状态。设 $f_{u,i}$ 表示最大数量下 $w_i-b_i$ 的值。背包 $O(n^2)$。

## 1.23

### [CF1218A](https://www.luogu.com.cn/problem/CF1218A)

是基环树。先考虑树。如果从一个点开始，定为根，$ans=\sum siz_u$。换根 dp 即可。

把环找出来，考虑在环上点 $u$ 的子树中开始染色的答案。染色的方式是大致是从子树的叶子开始向上。对 $u$ 的每个非环上儿子做树的 dp。记 $g_u$ 表示从环上进入子树向下染色的答案，$dp_u$ 表示换根的、从子树内任意节点开始染色的方案。从环上 $u$ 的非环上儿子 $v$ 的子树开始的答案是 $dp_v+\sum_{v'\neq v} g_{v'}$，$ans_u=\sum g_v+\max (dp_v-g_v)$。染完环上 $u$ 的子树后，绕环染环上点。再从除 $u$ 外的环上点向下染其他环上点的子树，答案为 $\sum g_v$。

发现前后贡献固定，变动的是染环的顺序。染环是染一个区间，每次向左右拓展。每次染一个点，答案加上当前连通块大小，当前连通块大小减 $siz_u$。贪心向小的染是错的，因为有后效性。记录 $siz$ 的前缀和，区间 dp，$O(1)$ 向左右转移，滚动即可。

## 1.24

### [CF288E](https://www.luogu.com.cn/problem/CF288E)

$$ans=\sum(X\times 10^i+47\dots7)(X\times10^i+74\dots4)$$

维护 $X$ 的数量、和、平方和。

### [省选模拟1.24 T2 lottop](http://www.gdfzoj.com:23380/contest/910/problem/8737)

对于平面图，$V-E+F=2$，顶点数、边数、平面数。每个面至少围 $3$ 条边，每条边对应两个面，$2E\geq3F$，$E\leq3V-6$。平面图存在点度数小于等于 $5$，对偶图也是平面图存在点度数小于等于 $5$，平面图存在环小于等于 $5$。判三、四元环。

根号分治，按度数、大小定向为 DAG。复杂度 $O(m\sqrt m)$。

### [P7372](https://www.luogu.com.cn/problem/P7372)

连成若干个环，$k=lcm a_i$。要 $\sum a_i\leq n\times m$，取 $a_i=p_i^{c_i}$。构造交换相邻的方案。

## 1.28

### [P7482](https://www.luogu.com.cn/problem/P7482)

cdq 分治拆成 $[l,mid]$ 到 $(mid,r]$ 的贡献。

对于一个区间计算答案可以用 dp 完成。以 $mid$ 为交界合并左右的 dp 值。设 $f_{i,0/1}$ 表示区间 $[i,mid]$ 或区间 $(mid,i]$，是否选 $mid$ 或 $mid+1$ 的答案。记跨过 $mid$ 的贡献为 $w$。

$$w=\sum_{i=l}^{mid}\sum_{j=mid+1}^{r} ans(i,j)$$

记 $g_i=f_{i,1}-f_{i,0}$。

$$w=\sum_{i=l}^{mid}\sum_{j=mid+1}^{r} \max(g_i+f_{i,0}+f_{j,0},g_j+f_{i,0}+f_{j,0})$$

$$w=\sum_{i=l}^{mid}\sum_{j=mid+1}^{r} \max(g_i,g_j)+\sum_{i=l}^{mid}f_{i,0}\times (r-mid)+\sum_{j=mid+1}^r f_{j,0}\times (mid-l+1)$$

后面两个直接做，前面的对于每个 $i$ 拆开 max 计算。

$$\sum_{j=mid+1}^{r} \max(g_i,g_j)=\sum_{j=mid+1}^{r}[g_i\geq g_j]\times g_i+[g_i<g_j]\times g_j$$


对 $(mid,r]$ 的 $g_j$ 排序，二分 $g_i$ 的位置，记录 $g_j$ 的后缀和即可。递归 $[l,mid]$ 和 $(mid,r]$ 解决。