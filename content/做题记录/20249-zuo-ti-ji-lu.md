---
title: '2024.9 做题记录'
date: 2024-10-01 22:17:48
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---
## 9.1

### [arc108e](https://www.luogu.com.cn/problem/AT_arc108_e)

当已经选了 $a_l,a_r$ 时，$(l,r)$ 与外面无关。区间 dp，$dp_{l,r}=\frac{\sum_{k=l,a_l<a_k<a_r}^r dp_{l,k}+dp_{k,r}}{num_{l,r}}+1$。维护 $num_{l,r},\sum dp_{l,k},\sum dp_{k,r}$ 转移。

## 9.2

### [P5188](https://www.luogu.com.cn/problem/P5188)

模拟赛 T2。

容斥强行不选 $s$ 这些材料，矩阵快速幂。

### [CF1949H](https://www.luogu.com.cn/problem/CF1949H)

模拟赛 T3。

按对角线向后推，计算经过次数。不能经过 $3$ 次。经过次数形如 $0,\dotsb,0,1,2,\dotsb,2,1,0,\dotsb,0$ 或 $0,\dotsb,0,2,2,0,\dotsb,0$。维护两个 $1$ 的位置 $l,r$ 或是不是状态 2。如果 $0,\dotsb,0,1,2,1,0,\dotsb,0$ 的 $2$ 被禁止，去到状态 2，否则如果有 $2$ 的位置被禁止则无解。如果 $l,r$ 有被禁止，每次 $2$ 的区间 $(l,r)$ 会增加 $1$，否则 $(l,r)$ 会缩短 $1$，$2\times n$ 个对角线后结束。

### [P10998](https://www.luogu.com.cn/problem/P10998)

按 $d_u<d_v<d_w$ 排序，对于每个 $u$ 对 $(v,w)$ 进行三元组计数。

$m$ 条边的三元组计数 $O(m^{1.5})$。如果 $d_u\le m^{\frac{2}{3}}$，有 $\sum d_u=m$，复杂度 $O(m^{\frac{1}{3}}(m^{\frac{2}{3}})^{1.5})=O(m^{\frac{4}{3}})$。否则 $u,v,w$ 至多 $m^{\frac{1}{3}}$ 个，复杂度 $O(m^{\frac{1}{3}}((m^{\frac{1}{3}})^2)^{1.5})=O(m^{\frac{4}{3}})$。

### [P4843](https://www.luogu.com.cn/problem/P4843)

有源汇上下界最小流，建超级源汇点补齐流量，跑最大流，从汇点向源点连容量 $+\infty$，再跑最大流。答案为汇点到源点的流量。

### [P4043](https://www.luogu.com.cn/problem/P4043)

最小费用可行流，建超级源汇点补齐流量，费用加上下界流量乘代价，从汇点向源点连容量 $+\infty$ 代价 $0$ 的边。费用加上超级源汇点的最小费用最大流。

### [CF1288F](https://www.luogu.com.cn/problem/CF1288F)

将边 $(u,v)$ 拆为 $(u,v,1,r)$ 和 $(v,u,1,b)$，分别表示红边或蓝边，都不流就不染色。左边的红点的右边的蓝点流出大于流入，连 $(s,i,1,+\infty,0)$，反之连 $(i,t,1,+\infty,0)$。最小费用可行流。如果超级源点出边满流则合法。

## 9.3

### [P9338](https://www.luogu.com.cn/problem/P9338)

要求前缀和时刻大于零。设 $c_i$ 为第 $i$ 个 A 前有多少个 B，$w(l,r)=\sum_{i=l}^r max(c_i-l+1,0)$，外层 wqs 二分。拆开 max，预处理 $*p_i$ 为最小的位置使得 $c_{p_i}−i>0$，内层 $dp_i=\min dp_j+sum_j-sum_{p_j-1}-j\times(i-p_j+1)$，斜率优化。

### [CF2006E](https://codeforces.com/problemset/problem/2006/E)

等价于度数 $\le 2$ 的点到其余点的距离最大值。动态维护直径，每次中心偏移 $1$，dfn 序上子树加，全局 min。度数 $=3$ 就不贡献，度数 $>3$ 无解。

### [Q9123](https://qoj.ac/problem/9123) 

升序排序，二分答案 $x$。对于每个 $i$ 可以 $O(n)$ 计算 $(i,j,k)$ 的答案。设阈值 $B$，前 $B$ 个的贡献 $O(nB)$ 计算。如果没超过 $k$，$B$ 的 $(B,j,k)$ 贡献 $\le \frac{k}{B}$。后边只需要前 $\frac{k}{B}$ 小的 $(j,k)$ 对，$O(\frac{k}{B}\log n)$ 预处理加 $O(n+\frac{k}{B})$ 计算。$B$ 取 $\sqrt{\frac{k}{B}}$。

### [Q5095](https://qoj.ac/problem/5095)

模拟赛 T3。

最优策略决策为从下往上每个人删掉存在的最劣的数。$O(n^3)$ 模拟，开始点下移时每个人的决策点单调，复杂度 $O(n^2)$。

## 9.4

### [模拟赛 T4](http://goj.wiki/d/Union2024/p/P1071)

按值从小往大 dp，枚举笛卡尔树子树内哪个位置不被确定。保证数据随机，笛卡尔树深度 $O(n\log n)$，只用以 $2$ 为底的幂，$O(\sqrt(V))$ 预处理 $O(1)$ 查询。

### [P9850](https://www.luogu.com.cn/problem/P9850)

容斥，设 $f_i$ 为至少 $i$ 条红边的方案，蓝色四元完全子图的数量为 $f_0-f_1+f_2−f_3+f_4−f_5+f_6$，红色四元完全子图的数量为$f_6$。分类讨论，三/四元环计数。

### [P7386](https://www.luogu.com.cn/problem/P7386)

将一个 $1$ 和 $0$ 捆绑起来。设有 $n$ 个 $01$ 和 $m$ 个 $0$。最后一层 $1$ 的贡献为 $\binom{n+m-1}{n-1}$。对于一个 $0$，枚举上面有 $i$ 个 $10$ 和 $j$ 个 $0$，有 $\binom{i+j}{i}$ 种可能，即有 $\binom{i+j}{i}$ 个这样的 $0$。$10$ 同理，算作一个大小为 $2$ 的点。要求形如 $\sum_{i=0}^n\sum_{j=0}^m \binom{i+j}{i}$。有 $\sum_{i=0}^n\binom{i}{m}=\binom{n+1}{m+1}$。所以 $\sum_{i=0}^n\sum_{j=0}^m \binom{i+j}{i}=\binom{n+m+2}{n+1}-1$。lucas 定理计算。

## 9.5

### [gym102428J](https://codeforces.com/gym/102428/problem/J)

模拟赛 T3

初始在 $x$，先向左走，令 $vl=\max_{i=1}^{x-1}a_i,vr=\max_{i=x+1}^n a_i$，若 $vl<v$，答案为 $[x+1,n]$ 中第一个 $>vl$ 的位置；否则为 $[1,x-1]$ 中最后一个 $>\max(a_i,vr)$ 的位置。线段树上二分。

### [Q7899](https://qoj.ac/problem/7899)

模拟赛 T4。

分治。记 $vl_i=\max_{j=i}^{mid}a_j,vr_i=\max_{j=mid+1}^i a_j$，$[i,j]$ 合法等价于 $\max(vl_i,vr_j)\le j-i+1$，即 $j\ge i+vl_i+1,i\le j-r_j+1$，按 $i+vl_i-1$ 排序，树状数组维护 $j$。正反做一遍得到划分 $[1,i]$ 的答案 $f_i$ 和划分 $[i,n]$ 的答案 $g_i$。

分治维护修改的变化量。当某个 $a_i$ 改为 $1$ 时，对于分治区间 $[l,r],l\le i\le mid$ ，当 $vl_i>vl_{i+1}$ 是，区间 $[ll,i]$ 的 $vl$ 值发生变化，合法的 $j$ 发生变化，重新计算 $\sum g'_{j+1}$，和原先应当贡献的 $\sum g_{j+1}$ 做差。·

## 9.6

### [arc165f](https://www.luogu.com.cn/problem/AT_arc165_f)

模拟赛 T4。

如果 $l_x<l_y,r_x<r_y$ 则 $x$ 在 $y$ 前，跑字典序最小的拓扑序。主席树优化建图，优先拓扑主席树点，优先队列拓扑。

## 9.9

### [P7230](https://www.luogu.com.cn/problem/P7230)

模拟赛 T4。

对每个左端点维护右端点 $res_i$。操作形如删去一个数再加入一个数。如果删掉 $p$ 上的 $a_p$，找到左右最近的 $l,r$ 使得 $a_l=a_r=a_p$。那么 $res_{l+1},\dotsb,res_p$ 对 $r$ 取 max。实际上要维护 $\max res_i-i+1$，因为 $res_i$ 单调，所以相当于线段树上二分找到最左的小于 $r$ 的位置然后区间覆盖。

删除好做，加入难做，考虑线段树分治。先把所有的时刻的 $a_i$ 都当作存在，右移右端点维护出所有 $res_i$。 multiset 维护每个值出现的位置来求 $l,r$。进入一个区间后进行删除操作。撤销操作记录下所有修改和下传的位置和值。

### [P4617](https://www.luogu.com.cn/problem/P4617)

$u$ 先手胜当且仅当 $u$ 一定在最大匹配上。找出一个最大流， $u$ 一定在最大匹配上当且仅当 $u$ 被选且残量网络缩点后 $u$ 和 $s$ 不在同一强连通分量。

## 9.10

### [模拟赛 T2](http://goj.wiki/d/Union2024/p/P1086)

去掉头尾相等的。枚举回文中心 $i$，取最长回文串 $s[l,r]$，求最大 $j$ 使得 $s[1,j]=s'[r+1,r+j]$。等价于反串和自己匹配，kmp。翻转再做一遍。

### [CF1149D](https://www.luogu.com.cn/problem/CF1149D)

模拟赛 T3。

令 $a<b$，$a$ 边构成若干连通块，合法 $b$ 边跨过两个连通块。不能走 $b$ 边离开一个连通块再走 $b$ 边返回，$3a>2b$，只有 $siz>3$ 的连通块有用，状压，最短路， $2^{\frac{n}{4}}m\log {2^{\frac{n}{4}}m}$。

## 9.11

### [P6684](https://www.luogu.com.cn/problem/P6684)

模拟赛 T4。

等价对于每个 $r$ 求最小的 $l$ 使得 $[1,l]$ 和 $[r,m]$ 的边能组成奇环。将边复制一遍接在后面，即对于每个 $i$ 求最小的 $p$ 使得 $[i,p]$ 间的边组成奇环。$p$ 有单调性。依次求每个 $i$，每次右移 $p$，加入的这条边 $p$ 会在求 $[i,p]$ 时都有贡献。插入容易删除困难，用线段树分治。初始没有边，分治到 $i$ 时会对之后一个区间加入若干条边，一共加边 $m$ 次。

### [P7307](https://www.luogu.com.cn/problem/P7307)

答案为最大度数。允许误差，每次将边集一分为二。希望将每个点度数除以 $2$ 上取整，在左右部点各建一个虚点，将度数补齐为全是偶数，存在欧拉回路，将相邻的边分开得到两个边集，分别递归。$\log \max d_i$ 轮后 $\max d_i=1$，将此时边集中的点染成一种颜色。

### [[the-3rd-universal-cup-zuo-ti-ji-lu-1|ucup 记录]]

## 9.12

### [joisc2017e](https://www.luogu.com.cn/problem/AT_joisc2017_e)

将 $x$ 三进制拆分，$0\to 01,1\to 10,2\to 11$，如果 $i$ 或 $i+1$ 被影响就不选。两边用同个随机排列来遍历数组，并尽量利用坏段。

### [Q9237](https://qoj.ac/problem/9237)

先补一个 $0$，在一直补 $1$ 至 $1024$。还原时把最后一个 $0$ 以后扔掉。有 $16\times 66=1056$ 个有效位，要用 $1056-1024=32$ 位说明哪些位置被控制。令 $c_i=0$ 后最近的 $c_j=0$，前 $j-i-1$ 条信息第 $i$ 位为 $0$，第 $j-i$ 条信息第 $i$ 位为 $0$。还原时可以建图，找 $31$ 个点的内向基环树的长为 $16$ 的环，是唯一的。

### [agc034e](https://www.luogu.com.cn/problem/AT_agc034_e)

记 $sum=\sum_{c_i=1} dis_{i,x}$，每步 $sum$ 减小 $2$ 最优。维护 $mn_u,mx_u$ 表示最多最少能将 $u$ 子树内 $\sum_{v=subtree(u),c_v=1}dis(u,v)$ 变为多少。讨论最大的子树是否大于一半。

### [arc110e](https://www.luogu.com.cn/problem/AT_arc110_e)

用异或表示。令 $a\to 1,b\to 2,c\to 3$，$f(s)=\oplus s_i$ 不变。设 $dp_i$ 为划分 $s[1,i]$ 的方案，枚举最后一个字符是什么。

### [P6790](https://www.luogu.com.cn/problem/P6790)

广义串并联图。删 $1$ 度点，缩 $2$ 度点，叠合重边。记 $f_i$ 为第 $i$ 条边在生成树上的方案数，$g_i$ 为不在的方案数。删一度点，$f_i$ 乘进答案；缩 $2$ 度点，$f_i=f_uf_v,g_i=f_ug_v+f_vg_u$；叠合重边，$f_i=f_ug_v+f_vg_u,g_i=g_ug_v$。

## 9.13

### [模拟赛 T4](http://goj.wiki/d/Union2024/p/P1096)

建 trie 树。先假设全选 $A$，计算答案与 $\sum d_iAc_i$ 的差值。按 dfn 序转移，设 $dp_i$ 为上一个单词在 $i$ 的答案，$dp_x=\max dp_i+(B-dep_{lca-1}A)c_x$。李超线段树维护转移。

## 9.14

### [abc308h](https://www.luogu.com.cn/problem/AT_abc308_h)

枚举连向环外的点 $u$。在挖掉 $u$ 的子图中求全源最短路，答案为 $\min dis_{x,y}+e_{u,x}+e_{u,y}+\min_{i\ne x,i\ne y}e_{u,i}$。线段树分治，加入点时进行松弛操作。复杂度 $O(n^3\log n)$。

## 9.15

### [模拟赛 T4](http://goj.wiki/d/Union2024/p/P1100)

Boruvka 算法。每次对于每个连通块找到最小的到连通块外的边，全部连起来。每次连通块数量减半。将矩阵加对对角线翻转，扫描线找到每个 $i$ 的最小边。线段树分别维护最小值和连通块不同的次小值。

## 9.16

### [CF901D](https://www.luogu.com.cn/problem/CF901D)

模拟赛 T3。

找出一颗生成树，满足除了根以外的所有点。调整根，只有奇环有用。只要有一个奇环，$a_1$ 就可以减去 $2\times val$。因为保证 $a_1$ 和 $d_1$ 奇偶性相同，找一颗 bfs 的生成树即可。

## 9.18

### [Q8948](https://qoj.ac/problem/8948)

模拟赛 T3。

对于一个菊花，有 $n0$ 个黑色儿子，$n1$ 个白色儿子，$n0>n1$ 当做 $n0-n1+1$ 个黑；$n1>n0$ 当做 $n1-n0-1$ 个白；否则若 $n$ 为偶 Bob 要先走当做黑；否则当做白。

### [P10214](https://www.luogu.com.cn/problem/P10214)

模拟赛 T4。

设 $dp_u$ 为 $u$ 被投出时的票数，$(dp_u,u)$ 和 $(dp_v,v)$ 较大者先出。$u$ 的儿子 $v$ 影响 $dp_u$。对 $v$ 按投出先后排序，二分一个前缀在 $u$ 前被投出，即 $a_u+\sum b_v-s_{i-1}>dp_{v_i}$。平衡树维护每个点的儿子，支持插入删除二分。

此时单点修改复杂度为 $O(dep)$。重链剖分，求出 $u$ 在轻儿子中二分的结果 $ans$，若 $ans>dp_{son}$，$dp_u=ans$；否则在轻儿子中二分 $a_u+\sum b_v-b_{son}$。$dp_u$ 为关于 $dp_{son}$ 的分段常函数，段数为 $2$，可以合并。线段树维护重链信息乘积，修改时改链顶父亲的轻儿子的平衡树，查询时从链底 dp 值加上区间信息求 dp 值。

## 9.19

### [CF1647F](https://www.luogu.com.cn/problem/CF1647F)

模拟赛 T3。

假设一个最大值为左边峰顶。设 $f_i$ 表示前缀 $[1,i]$，一个序列在 $i$，另一个序列最小在哪里。$g_j$ 为后缀。从左边峰顶到 $n$ 枚举右边峰顶，设 $dp_{i,0/1}$ 表示当前左/右序列在 $i$，另一序列的最大最小值。

### [CF1494F](https://www.luogu.com.cn/problem/CF1494F)

模拟赛 T4。

最后是菊花，枚举菊花中心 $u$，删去与 $u$ 连边的奇度数点找欧拉路径。

## 9.23

### [CF1635F](https://www.luogu.com.cn/problem/CF1635F)

模拟赛 T3。

枚举可能贡献的答案对的较大值，只有左右第一个比 $i$ 小的 $j$ 才有贡献。

### [CF1784F](https://www.luogu.com.cn/problem/CF1784F)

模拟赛 T4。

被删除的连续段长度一定是偶数；不会删去 $n+k$ 以后的数；第二段关于中心对称。

枚举第一段长度 $i$，$2i<n$，枚举第二段在 $n$ 左侧长为 $j$。$\sum_{i=0}^k[2i<n]\sum_{j=0}^{\min(k-i,n-2i-1)} \binom{i}{k-i-j}$。下指标关于 $i$ 变换量为 $O(1)$，$\sum_{i=l}^r\binom{p}{i}=2\times\sum_{i=l}^r\binom{p-1}{i}-\binom{p-1}{r}+\binom{p-1}{l-1}$。否则剩余长度 $n+k-2i-1$，剩 $k-i$ 次操作，$\binom{n+k-2i-1-(k-i)}{k-i}$。

### [arc184b](https://www.luogu.com.cn/problem/AT_arc184_b)

对于不是 $2,3$ 倍数的 $i$，将 $\frac{n}{i}$ 中的 $2^a3^b$ 找出来，每次加入 $(a,b),(a+1,b),(a,b+1)$，有 $\log_3 n$ 级别宽的网格。状压 $dp_{i,j,s}$ 表示前 $i-1$ 行已经选完，第 $i$ 行选到 $j$ 列，当前面上状态为 $s$。$\frac{n}{i}$ 只有 $O(\sqrt n)$级别，可过。 

## 9.24

### [模拟赛 T4](http://goj.wiki/d/Union2024/p/P1119)

扫描线维护编号较小的最大编号为 $i$，点边容斥强行选 $i$，主席树维护矩阵。交换 $a_x,a_{x+1}$ 时重新做第 $x,x+1$ 棵主席树即可。

## 9.25

### [【5校day1】构造题](http://goj.wiki/d/Union2024/p/TNOI0002)

从右上往左下确定每个点的颜色。对于点 $u$ 最多有 $4$ 个入边。如果不包含所以颜色，就赋没有出现的颜色。否则如果 $v1,v3$ 通过 $col_{v1},col_{v3}$ 的连通块联通，那么 $v2,v4$ 一定不通过 $col_{v2},col_{v4}$ 的连通块联通。

### [【5校day2】祖先](http://goj.wiki/d/Union2024/p/TNOI0006)

设 $s_u$ 为 $\sum_{v\in subtree(u)}a_v$，答案为 $\frac{s_u^2-a_u^2-\sum_{v\in son(u)}s_v^2}{2}$。单点加为链加。类似动态 dp 维护轻儿子处的 $\sum s_v^2$。区间加单点查。子树加，先加上 $u$ 到根的贡献，再打上子树 tag，维护 $0/1/2$ 次方和。树剖时先进入重儿子，再去到每个儿子，再进入轻儿子子树。

## 9.26

### [joisc2020q](https://www.luogu.com.cn/problem/AT_joisc2020_q)

模拟赛 T4。

对 $\lvert t_i-t_j\rvert\le r_i-l_j+1$ 连 $i\to j$ 求 $1\to n$ 的最短路。边权赋在点上，一个点只入队一次。按 $t_i$ 建线段树，取出合法的 $v$ 并删除。

### [【5校day5】签到题](http://goj.wiki/d/Union2024/p/TNOI0010)

先二分出 $cnt_a,cnt_b,cnt_c$，令 $cnt_a\le cnt_b\le cnt_c$。先将序列放 $cnt_a$ 个 $a$，每次加一个 $b$，每次加一个 $c$。次数为 $2cnt_a+2cntb_cntc\le \frac{5}{3}n$。

## 9.27

### [模拟赛 T3](http://goj.wiki/d/Union2024/p/P1127)

dij 状求答案，与除去 $(u,v)$ 的 $u\to t$ 最短路相关。找出最短路树，非树边进行路径取 min。

### [模拟赛 T4](http://goj.wiki/d/Union2024/p/P1127)

有决策单调性，二分栈，主席树维护前 $k$ 大的和。统计答案，只有不交区间有贡献，区间对区间 $k$ 大取 min，如果一个点最后的值小于自己的值就可以选。

## 9.29

### [模拟赛 T4](http://goj.wiki/d/Union2024/p/P1132)

每个位置对答案的贡献为向下递归的层数。设 $\le i$ 的数最后出现在 $p_i$，$(i,i+1)$ 被断开的层为 $p_i-i$。$i$ 的贡献为 $\max (p_{i-1}-(i-1),p_i-i)$。取到后面的为 $a_{p_i}=i$。

$$ans=\sum_i(n-i)!(\sum_j\binom{j-1}{i-1}(i-1)!(j-i)+\binom{j}{i}(i!-(i-1)!)(j-i+1))$$

上指标求和，最后只与 $i$ 有关的式子。

## 9.30

### [CF1648F](https://www.luogu.com.cn/problem/CF1648F)

模拟赛 T4。

建出 dfs 树，非树边赋随机权值，随机异或哈希。如果割两条树边，只能是 $hsh_u=hsh_v$。相同的 $hsh_i$ 都在到根的链上，且有决策单调性，对于每个相同权值放在序列上分治。两边 $(u,fa_u),(v,fa_v)$ 的答案为：跨过 $u$ 的点对减跨过 $v$ 的点对加两倍没有跨过 $u$ 但跨过 $v$ 的点对。后面的贡献在 dfs 序上维护主席树，在两点处 $+2$，lca 处 $-4$。

