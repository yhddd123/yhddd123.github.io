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

#### [AT_wtf22_day2_d](https://atcoder.jp/contests/wtf22-day2-open/tasks/wtf22_day2_d)

先假设 $a_i$ 互相区分，再除掉 $\prod t_i$。

钦定获得 $k$ 个硬币，将所有 $a_i$ 和 $-1$ 分为 $k$ 组，然后二项式反演。

对于一组，设有 $cnt$ 个和为 $sum$ 的 $a_i$ 和 $sum$ 个 $-1$，那就是 $\prod_{i=1}^{cnt}(sum+i)$。拆 $\prod$，$sum+i=\sum a_i+\sum[j\le i]$，就是每个 $i$ 选一个 $j$，权值为 $a_j+[j\le i]$。

一组会形成若干个基环树，先数基环树个数，然后将 $j$ 个区分的基环树分入 $i$ 组，$S2(j,i)$，再给每个组顺序 $i!$。

基环树个数就钦定 $k$ 个环，剩下乱选，然后二项式反演。

一个环的权值还是拆 $\prod$，$a_j+[j\le i]=a_j+1-[j>i]$，如果连续的选 $[j>i]$ 对应一个上升段，段首权值 $a_j+1$，段中间 $-1$。那就对段数，然后把 $j$ 个区分的段分入 $i$ 个环，$S1(j,i)$。

设 $dp_{i,j}$ 表示从小到大考虑了 $i$ 个，有 $j$ 段，$dp_{i,j}=-jdp_{i-1,j}+dp_{i-1,j-1}(a_i+1)+((\sum a_k)+i)dp_{i-1,j}$。

#### [agc038e](https://atcoder.jp/contests/agc038/tasks/agc038_e)

min-max 容斥，求 $ans=\sum_{T\subseteq S,T\neq \empty}E(\min (T))$。

期望 $\frac{\sum a_i}{\sum_{i\in S}a_i}$ 步选一次 $S$ 内的数，现在只要考虑 $S$ 内要几步。$E(\min(S))$ 拆为每个途径状态的概率，即对于所有 $c_i<b_i$ 的概率，即 $\binom{\sum c_i}{c1,\ldots ,c_{|S|}}\prod \frac{a_i^{c_i}}{\sum a_i^{c_i}}$。

设 $f_{i,j,k}$ 表示前 $i$ 个，$\sum a$，$\sum c$，枚举 $c_i$，复杂度 $O(n^3)$。

#### [agc058f](https://atcoder.jp/contests/agc058/tasks/agc058_f)

考虑给一个根，每次删一个子树，最后只剩根，展开 $f(T)$，$f(T)=\frac{\prod f(t_i)}{(|t_1|+\ldots+t|k|+1)\ldots(|t_k|+1)1}$。

再考虑加一个连在根的叶子，这个 $f(T\cup \{v\})$ 与 $f(T)$ 的变化是不大的。枚举插在第 $i$ 次删子树和第 $i+1$ 次之间。$f(T\cup\{v\})=\sum_{i=0}^k\frac{\prod f(t_i)f(\{v\})}{(|t_1+\ldots |t_k|+1+1)\ldots(|t_{i+1}|+\ldots|t_k|+1+1)(|t_{i+1}|+\ldots|t_k|+1)\ldots(|t_k|+1)1}$。

对删 $\{v\}$ 的交界处裂项，$\frac{1}{a(a+b)}=\frac{1}{b}(\frac{1}{a}-\frac{1}{a+b})$。然后 $f(T\cup \{v\})=f(T)-f(T')$，$T'$ 是将 $rt$ 权值设为 $2$ 的 $T$。

拓展到带权版本，每个点有一个正权，$rt$ 权为 $a$，$v$ 权为 $b$，则 $f(\{v\})=\frac{1}{b}$，$f(T\cup \{v\})=\frac{1}{b^2}(f(T)-f(T'))$，$T'$ 是将 $rt$ 权值设为 $a+b$ 的 $T$。

然后就可以 dp 删叶子，设 $f_{u,i}$ 表示删 $u$ 子树且 $u$ 的权为 $i$。

![[agc058f.png]]

#### [agc065d](https://atcoder.jp/contests/agc065/tasks/agc065_d)

相邻的边不用管。从 $(1,n)$ 断开，边要求包含或不交。

一个判定：扫 $r$，维护当前合法的 $l$。每次加入 $r$，删掉 $(l,r)$ 的点。最后加入 $[1,n]$，合法的剩一个 $n$。也就是维护一个栈，$n-1$ 次加入，$k$ 次弹出至少一个点。构成双射。

由 Raney，对于一个长为 $n$ 的整数序列 $a_i$，$\sum a_i=1$，$n$ 个循环移位中有且只有一个所有前缀和都 $\ge 0$。

枚举 $i$ 个相邻的边，$\binom{n}{i}$；长为 $n-1+m-i+1$ 的序列，有 $\frac{1}{n+m-i}$ 的概率，在所有分配负数值和负数位置 $\binom{n-3}{m-i}\binom{n-1+m-i}{m-i}$ 中，满足条件。

#### [agc067d](https://atcoder.jp/contests/agc067/tasks/agc067_d)

$i$ 向 $[l_i,i)\cup (i,r_i]$ 连边，要求不存在环。DAG，容斥零入度点。钦定一些 $p_i$，这些 $p_i$ 的 $l/r_{p_i}$ 不能到左右的 $p_i$，间隔任意。

$$f_i=\sum_{0=p_0<p_1<\ldots <p_k<p_{k+1}=n+1}(-1)^{k+1}\prod_i (p_i-p_{i-1})(p_{i+1}-p_i)f_{p_{i+1}-p_i-1}$$

分步转移，$f_i$ 表示 $i$ 个点的答案，$g_i$ 表示钦定到第 $i$ 个点。

#### [agc070c](https://atcoder.jp/contests/agc070/tasks/agc070_c)

先算从 $(0,0)$ 到 $(n,m)$ 不碰 $y=x+1$ 且恰好 $k$ 个拐点的方案。[[ge-lu-ji-shu#^40d3b1|格路计数]]。

然后有 $n-a-b$ 个平局，$a+b-1-k$ 个同向的需要至少插一个，$\binom{n-a-b+i+1}{a+b}$。