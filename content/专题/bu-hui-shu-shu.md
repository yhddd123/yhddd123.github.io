---
title: '不会数数'
date: 2026-01-30 08:58:32
tags: [做题记录,计数]
published: true
hideInList: false
feature: 
isTop: false
---
1

#### [AT_wtf22_day1_c](https://www.luogu.com.cn/problem/AT_wtf22_day1_c)

黑白染色。不妨设白点更多，删一个子树的过程形如：删若干对异色叶子直到所有叶子都是白色；从子树外获得一个黑叶子，重复以上过程。

设 $num_u$ 表示删光 $u$ 子树至少要从子树外获得这么多个叶子。则删掉子树 $t_1,\ldots,t_k$ 的充要条件是：

- $\sum w_{t_i}=\sum b_{t_i}$
- 根的颜色不全相同。
- $\forall t_i,num_{t_i}\le \sum_{i\neq j} siz_{t_j}$

枚举一共删 $s$ 个，树上背包 $i$ 个白 $j$ 个黑，是否出现黑/白的根，一个子树能不能被选为删掉是已知的，复杂度 $O(n^5)$。

#### [AT_wtf22_day2_d](https://atcoder.jp/contests/wtf22-day2-open/tasks/wtf22_day2_d)

先假设 $a_i$ 互相区分，再除掉 $\prod t_i$。

钦定获得 $k$ 个硬币，将所有 $a_i$ 和 $-1$ 分为 $k$ 组，然后二项式反演。

对于一组，设有 $cnt$ 个和为 $sum$ 的 $a_i$ 和 $sum$ 个 $-1$，那就是 $\prod_{i=1}^{cnt}(sum+i)$。拆 $\prod$，$sum+i=\sum a_i+\sum[j\le i]$，就是每个 $i$ 选一个 $j$，权值为 $a_j+[j\le i]$。

一组会形成若干个基环树，先数基环树个数，然后将 $j$ 个区分的基环树分入 $i$ 组，$S2(j,i)$，再给每个组顺序 $i!$。

基环树个数就钦定 $k$ 个环，剩下乱选，然后二项式反演。

一个环的权值还是拆 $\prod$，$a_j+[j\le i]=a_j+1-[j>i]$，如果连续的选 $[j>i]$ 对应一个上升段，段首权值 $a_j+1$，段中间 $-1$。那就对段数，然后把 $j$ 个区分的段分入 $i$ 个环，$S1(j,i)$。

设 $dp_{i,j}$ 表示从小到大考虑了 $i$ 个，有 $j$ 段，$dp_{i,j}=-jdp_{i-1,j}+dp_{i-1,j-1}(a_i+1)+((\sum a_k)+i)dp_{i-1,j}$。

#### [arc202d](https://www.luogu.com.cn/problem/AT_arc202_d)

两维独立。设 $f_i$ 表示 $[1,n]$ 从 $x$ 到 $y$ 走 $t$ 步 $-1/0/1$。容斥有 $i$ 个两维都不动，$ans=\sum (-1)^{t-i}\binom{t}{i}f_i$。

求 $f_i$。若 $n\le \sqrt t$，直接 dp；否则[[ge-lu-ji-shu#^85b7de|反射容斥]] $O(\frac{t}{n})$ 求一项，再卷上选 $j$ 个不动 $\binom{i}{j}$。

#### [agc019e](https://www.luogu.com.cn/problem/AT_agc019_e)

随机并乘 $(k!)^2$ 等价于给 $a_i,b_j$ 匹配，并决定顺序。

对交换连边，合法的交换等价于从 $A_i=1,B_i=0$ 经过 $A_i=B_i=1$ 到 $A_i=0,B_i=1$ 的链，或 $A_i=B_i=1$ 的环。

现在有 $a$ 个 $A_i=1,B_i=0$ 和 $b$ 个 $A_i=B_i=1$。先给每个链头选一个链尾，再乘 $a!$。一条链上有 $i$ 个 $A_i=B_i=1$ 的话，有 $i!$ 种排法，有 $\frac{1}{(i+1)!}$ 的概率合法。从 $b$ 个选 $i$ 个放到链里，EGF，剩下的 $(b-i)!$。

即 $ans=k!a!\sum_{i=0}^b \binom{b}{i}(b-i)![\frac{x^i}{i!}](\sum \frac{1}{(i+1)!}x^i)^m$。多项式快速幂。

#### [agc021e](https://www.luogu.com.cn/problem/AT_agc021_e)

枚举最后的 $(a,b)$。若 $a<b$ 无解。若 $a\ge b+n$ 一定有解。

否则会有 $a-b$ 个红色多 $1$ 和 $n-a+b$ 个两个颜色相等且蓝色是最后一个。两个颜色相等可以只选成 ```RB```，即序列至少能选出 $n-a+b$ 对，即不能匹配的，每个前缀 $cntb-cnta\le b-(n-a+b)=a-n$。

所以从 $(0,0)$ 到 $(a,b)$ 不超过 $y=x+a-n$。特别的，若 $a=b$，则到 $(a,b-1)$。 

#### [agc033e](https://www.luogu.com.cn/problem/AT_agc033_e)

令 $s_1=1$。设 $s$ 中 $1$ 的极长连续段分别为 $l_1,\ldots,l_k$。

圆上不能存在相邻的 $0$。每个连续段长为奇数，否则存在起点离两端同奇偶。初始放在连续段端点加减 $1$ 要能从另一边离开，每个连续段长度 $\le c_1+1$。对于 $c_i\bmod 2=0$，反复横跳，否则每个连续段长度 $\le c_i$。

前缀和优化。

#### [agc038e](https://atcoder.jp/contests/agc038/tasks/agc038_e)

min-max 容斥，求 $ans=\sum_{T\subseteq S,T\neq \empty}E(\min (T))$。

期望 $\frac{\sum a_i}{\sum_{i\in S}a_i}$ 步选一次 $S$ 内的数，现在只要考虑 $S$ 内要几步。$E(\min(S))$ 拆为每个途径状态的概率，即对于所有 $c_i<b_i$ 的概率，即 $\binom{\sum c_i}{c1,\ldots ,c_{|S|}}\prod \frac{a_i^{c_i}}{\sum a_i^{c_i}}$。

设 $f_{i,j,k}$ 表示前 $i$ 个，$\sum a$，$\sum c$，枚举 $c_i$，复杂度 $O(n^3)$。

#### [agc041f](https://www.luogu.com.cn/problem/AT_agc041_f)

钦定有 $k$ 个格子不被覆盖，$(-1)^k$。枚举至少有一个被钦定列 $S$，对于一个长为 $n$ 的行连续段，有 $p$ 列属于 $S$：若没有被钦定的格子，则 $2^{len-p}$；否则枚举钦定了 $i$ 个，$\sum \binom{p}{i}(-1)
^i=-[p>0]$。

钦定 $T$ 为 $S$ 中实际没有被钦定格子的列，$(-1)^{|T|}$。行连续段若有 $q$ 个属于 $T$，则系数 $\sum_{i=0}^{p-q}\binom{p-q}{i}(-1)^i=-[p>q]$。

建笛卡尔树，树形背包节点 $u$，$p$，是否有 $p=q$。

#### [agc045d](https://www.luogu.com.cn/problem/AT_agc045_d)

策略是沿着置换环问，只要不是自环就可以点亮整个环。那这样有等价于直接从 $1$ 问到 $n$，在第一个自环之前能不能做完。即，设 $i$ 为 $[1,m]$ 第一个 $p_i=i$ 的位置，要求 $\forall j<i,p_j\neq j$ 和 $[m+1,n]$ 的每个置换环都包含 $<i$ 的点。

容斥 $[1,i-1]$ 有 $j$ 个 $p_j=j$，剩下有 $i-j-1$ 个没有限制，有 $n-m$ 个要加在之前的 $x\to y$ 之间变成 $x\to i\to y$，有 $\max(m-i,0)$ 个没有限制。

$$ans=\sum_{i=1}^{m+1}\sum_{j=0}^{i-1}\binom{i-1}{j}(a+b+c)!\prod_{k=a+1}^{a+b}\frac{k-1}{k}=\sum_{i=1}^{m+1}\sum_{j=0}^{i-1}\binom{i-1}{j}(n-j-[i\le m])!\frac{i-j-1}{n-m+i-j-1}$$

#### [agc049e](https://www.luogu.com.cn/problem/AT_agc049_e)

内层 dp $f_{i,j}=|a_i-j|+\min f_{i-1,k}+c\times\max(j-k,0)$。

转 01，$nm$ 层，把 $f_{i,0/1}$ 压到状态里。状态只用记 $f_{i,0}-f_{i,1}$，直接把 $f_{i,0}$ 放到权值里。复杂度 $O(n^4)$。

#### [agc055d](https://www.luogu.com.cn/problem/AT_agc055_d)

加强：[P12472](https://www.luogu.com.cn/problem/P12472)。

记 $A=\max s_{a,i}-s_{c,i}$，则要求 $A+B+C\le n$ 且存在 $x$ 个 ```ABC``` 当且仅当 $x\ge A$。

枚举最后的 $A,B$，对 $C$ 有一个限制，同时要求 $A,B$ 要顶到上界。复杂度 $O(n^5)$。

#### [agc058f](https://atcoder.jp/contests/agc058/tasks/agc058_f)

考虑给一个根，每次删一个子树，最后只剩根，展开 $f(T)$，$f(T)=\frac{\prod f(t_i)}{(|t_1|+\ldots+t|k|+1)\ldots(|t_k|+1)1}$。

再考虑加一个连在根的叶子，这个 $f(T\cup \{v\})$ 与 $f(T)$ 的变化是不大的。枚举插在第 $i$ 次删子树和第 $i+1$ 次之间。$f(T\cup\{v\})=\sum_{i=0}^k\frac{\prod f(t_i)f(\{v\})}{(|t_1+\ldots |t_k|+1+1)\ldots(|t_{i+1}|+\ldots|t_k|+1+1)(|t_{i+1}|+\ldots|t_k|+1)\ldots(|t_k|+1)1}$。

对删 $\{v\}$ 的交界处裂项，$\frac{1}{a(a+b)}=\frac{1}{b}(\frac{1}{a}-\frac{1}{a+b})$。然后 $f(T\cup \{v\})=f(T)-f(T')$，$T'$ 是将 $rt$ 权值设为 $2$ 的 $T$。

拓展到带权版本，每个点有一个正权，$rt$ 权为 $a$，$v$ 权为 $b$，则 $f(\{v\})=\frac{1}{b}$，$f(T\cup \{v\})=\frac{1}{b^2}(f(T)-f(T'))$，$T'$ 是将 $rt$ 权值设为 $a+b$ 的 $T$。

然后就可以 dp 删叶子，设 $f_{u,i}$ 表示删 $u$ 子树且 $u$ 的权为 $i$。

![[agc058f.png]]

#### [agc060d](https://www.luogu.com.cn/problem/AT_agc060_d)

设 $f_S$ 表示恰好 $S$ 处是 $<$；$g_S$ 表示 $S$ 无限制，$S$ 以外都是 $>$。$f_S=\sum_{T\subseteq S}g_T$。

$$ans=\sum_S f^2_S=\sum_{T1,T2}(-1)^{|T1|+|T2|}g_{T1}g_{T2}2^{n-1-|T1|-|T2|+|T1\cap T2|}$$

改成枚举 $S=T1\cap T2$。$ans=2^{n+1}\sum_S (\sum_{S\subseteq T}(\frac{-1}{2}^{|T|+1}g_T)^2$。

$g_S$ 即从 $n$ 个数分给一堆下降序列，即 $\binom{n}{p1,p2-p1,\ldots,n-p_k}$。

即 $g_i=\sum \frac{g_j}{-2(i-j)!}$，$f_i=\sum f_ig^2_{i-j}$。

#### [agc065d](https://atcoder.jp/contests/agc065/tasks/agc065_d)

相邻的边不用管。从 $(1,n)$ 断开，边要求包含或不交。

一个判定：扫 $r$，维护当前合法的 $l$。每次加入 $r$，删掉 $(l,r)$ 的点。最后加入 $[1,n]$，合法的剩一个 $n$。也就是维护一个栈，$n-1$ 次加入，$k$ 次弹出至少一个点。构成双射。

由 Raney，对于一个长为 $n$ 的整数序列 $a_i$，$\sum a_i=1$，$n$ 个循环移位中有且只有一个所有前缀和都 $\ge 0$。

枚举 $i$ 个相邻的边，$\binom{n}{i}$；长为 $n-1+m-i+1$ 的序列，有 $\frac{1}{n+m-i}$ 的概率，在所有分配负数值和负数位置 $\binom{n-3}{m-i}\binom{n-1+m-i}{m-i}$ 中，满足条件。

#### [agc065f](https://www.luogu.com.cn/problem/AT_agc065_f)

^e18fb2

每个点双独立。记集合 $S_u$ 表示 $u$ 为根除了点双以外其他的子树。如果 $|S_u|$ 为偶数，则 $u$ 与点双内的点匹配，否则与外面的匹配。对于一个点双 $|S_u|$ 奇偶性相同。

若都和外面的匹配，则该点双没有要求；否则点双必须是偶环或一条边。

即一个合法的图的生成方式为：从一堆偶环出发，每次选一些连通块，每个连通块出一个点，组成点双，直到连通。

设 $f_{n,m}$ 为 $n$ 个点 $m$ 个点双，$g_n$ 为连通图。$f_{n,1}=g_n-\sum_{i>1} f_{n,i}$。

求 $f_{n,m}$，钦定一个根，圆方树，有 $m$ 个方点，每个代表一个大小 $a_i+1$ 的点双，有 $a_i$ 个儿子。外面 prufer 为 $n^{m-1}\prod a_i$，每个连通块连父亲的不区分，即 $n^{m-1}$。即 $f_{n,m}=\frac{n^{m-1}}{m!}(\sum_{\sum a_i=n-1} \binom{n}{a_1,\ldots,a_m}\prod f_{a_i+1,1})$。

最后算答案，设 $dp_{i,j}$ 表示初始 $i$ 个点 $j$ 个连通块的系数和 $\prod sz_i$。答案为 $\frac{n^{y-1}}{y!}\prod sz_i\sum_{\sum a_i=y-1}\binom{x-1}{a1,\ldots,a_y}\prod f_{a_i+1,1}$。

#### [agc067d](https://atcoder.jp/contests/agc067/tasks/agc067_d)

$i$ 向 $[l_i,i)\cup (i,r_i]$ 连边，要求不存在环。DAG，容斥零入度点。钦定一些 $p_i$，这些 $p_i$ 的 $l/r_{p_i}$ 不能到左右的 $p_i$，间隔任意。

$$f_i=\sum_{0=p_0<p_1<\ldots <p_k<p_{k+1}=n+1}(-1)^{k+1}\prod_i (p_i-p_{i-1})(p_{i+1}-p_i)f_{p_{i+1}-p_i-1}$$

分步转移，$f_i$ 表示 $i$ 个点的答案，$g_i$ 表示钦定到第 $i$ 个点。

#### [agc070c](https://atcoder.jp/contests/agc070/tasks/agc070_c)

先算从 $(0,0)$ 到 $(n,m)$ 不碰 $y=x+1$ 且恰好 $k$ 个拐点的方案。[[ge-lu-ji-shu#^40d3b1|格路计数]]。

然后有 $n-a-b$ 个平局，$a+b-1-k$ 个同向的需要至少插一个，$\binom{n-a-b+i+1}{a+b}$。