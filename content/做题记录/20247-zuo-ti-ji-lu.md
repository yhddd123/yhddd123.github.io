---
title: '2024.7 做题记录'
date: 2024-08-01 22:24:05
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---
## 7.7

### [P6891](https://www.luogu.com.cn/problem/P6891)

设 $dp_{i,j,0/1}$ 为前 $i$ 个选了 $j$ 个 A 中的数，结尾是 A/B。交换维度，改为 pair $dp_{i,0/1}$ 表示前 $i$ 个，结尾是 A/B，合法的 $j$ 的范围。

### [CF1919F2](https://www.luogu.com.cn/problem/CF1919F2)

网络流建图，$(s,i,a_i),(i,i+1,c_i),(i,t,b_i)$。转为最小割，线段树维护区间左右两端割 $s$ 还是 $t$。如果 $mid$ 割 $t$ 且 $mid+1$ 割 $s$，还要额外割 $(i,i+1)$。

### [abc310g](https://www.luogu.com.cn/problem/AT_abc310_g)

期望转为总和除以 $k$。贡献分环和树做前缀和。

### [P4370](https://www.luogu.com.cn/problem/P4370)

有 $\binom n m>\binom{n-1}m$，加入优先队列。数存不下，取对数比较。

$$\log \binom n m=\log n!-\log m!-\log (n-m)!=\sum^n \log i-\sum^m \log i-\sum^{n-m} \log i$$

## 7.8

### [CF1830D](https://www.luogu.com.cn/problem/CF1830D)

MEX 值为 $0/1/2$，先令值都为 $2$ 计算损耗。同时连通块之间有损耗。$dp_{u,0/1,i}$ 表示当前包含 $u$ 的同色连通块颜色和大小时的最小损耗。大小一维不超过 $O(\sqrt n)$，计算完儿子就释放空间。

### [Q1281](https://qoj.ac/problem/1281)

枚举前后 $i$ 个 $1$，$j$ 个 $3$。$\max i+j+\min(sa_{ra_j-1}-sa_{la_i},sb_{rb_j-1}-sb_{lb_i})$。

拆 $min$，从后向前遍历 $i$，权值线段树。

### [CF1656H](https://www.luogu.com.cn/problem/CF1656H)

等价于 $x\in SA,\gcd_{y\in SB} \frac{x}{\gcd(x,y)}=1$。建 $n+m$ 个线段树，单点删除。

### [CF1270H](https://www.luogu.com.cn/problem/CF1270H)

连通块一定是序列上的一段连续的区间。等价于计算分段点，多少 $p$ 使得 $\min_{i\le p} a_i>\max_{i>p} a_i$。对于每个 $v$ 将序列改写为 01 序列，维护有几个 $10$ 和 $v$ 是否出现。

### [Q1163](https://qoj.ac/problem/1163)

树剖，讨论 $v$ 是否是 $u$ 的祖先。$\sum_v dis(u,v)a_v$ 等价于以 $u$ 为根，每条边下的子树的 $a$ 和。维护区间加一次函数，加子树大小。

### [CF1548E](https://www.luogu.com.cn/problem/CF1548E)

给每个连通块定一个代表，按 $a_i+b_j,a_i,i$ 比较。预处理 $i$ 左右比 $a_i$ 大的 $la_i,ra_i$ 和 $ma_i=\min (\max_{la_i\le j\le i} a_j,\max_{i\le j\le ra_i} a_j)$。$(i,j)$ 能向更小的走一定能去到 $(la_i/ra_i,j)/(i,lb_j/rb_j)$ 。所以满足条件的 $(i,j)$ 满足 $a_i+b_j\le x,a_i+mb_j>x,ma_i+b_j>x$。扫描线。

### [Q1838](https://qoj.ac/problem/1838)

记 $v1$ 为两个相交且第三个都无交，$v2$ 为一个和两个都有交且另两个无交，$v3$ 为三个两两有交。扫描线算出与 $i$ 相交的数量 $d_i$。$\sum \binom {d_i}2=v2+3v3,\sum d_i(n-2)=2v1+4v2+6v3$。只要求 $v3$。

扫描线，在 $l_i$ 最大的矩形上计数，再容斥为 $\binom {d_i}2$ 减两个无交。$l_i<r_a<l_b<r_i$。线段树维护区间有几个左右端点，有多少对先右后左的端点对。

### [Q3029](https://qoj.ac/problem/3029)

求出每条边的断裂时间，用重构树回答询问。考虑树的情况，在 $u$ 记录当前 $v$ 对 $u$ 高低的上下界要求。对于 $u$ 变化，判断在不在上下界内，再更新 $fa$ 的上下界。到平面图，给边定向，希望 $u\to fa$ 这样的出边尽可能少。每次找到度最小的点全部定为出边，出度小于 $5$。

## 7.10

### [CF1844E](https://www.luogu.com.cn/problem/CF1844E)

确定了第一行第一列就可以确定整个矩阵，每行每列差分值相同，取值只有 $1,2$。限制转换为差分值相等或相反，二分图染色。

### [CF1693F](https://www.luogu.com.cn/problem/CF1693F)

希望每次操作 $cnt0=cnt1$ 使贡献为 $1$。若整个序列 $0$ 少于 $1$，就翻转并取反序列。每次找到最长的 $cnt0=cnt1$ 前缀并删去 $cnt0$ 个 $0$，直到 $cnt0<cnt1$ 就补满 $0$ 一次做完。

### [CF1656G](https://www.luogu.com.cn/problem/CF1656G)

相当于从 $(1,n)$ 到 $(\frac{n}{2},\frac{n}{2}+1)$ 一对对填数，维护若干条链。除了最后一步，无论如何都能找到一对 $(i,j)$ 入度为 $0$ 且 $a_i=a_j$ 且不会形成环。如果 $n$ 为奇数，找到一个 $v$ 使得 $v\neq \frac{n+1}{2}$ 且 $t_{a_v}$ 为奇数，可能无解。

### [Q5416](https://qoj.ac/problem/5416)

时间逆流，覆盖等于将区域设为通配符。每次保证至少增加一个通配符即可。

### [Q5504](https://qoj.ac/problem/5504)

线段树优化建图跑 2-sat。要在 DAG 上找到大小之和在 $[n,2n]$ 中的后缀。如果不存在某个点大小大于 $n$，取拓扑序的一段前缀。否则判断一个大小大于 $n$ 的点的前缀后缀是否符合条件。

### [CF1209G2](https://www.luogu.com.cn/problem/CF1209G2)

对于每个颜色的 $[l,r)$ 加 $1$，每个极长非零连续段答案独立，选区间出现次数最多的颜色。按最小值分割，线段树维护。

## 7.11

### [uoj698](https://uoj.ac/problem/698)

前缀线性基求交，二分。

线性基 A,B 的交：对于每个 $b_i$，如果能被 $a\cup {b_1\dotsb b_{i-1}}$ 子集异或出来，就把方案中属于 a 的异或和加入交中。

### [P2260](https://www.luogu.com.cn/problem/P2260)

整除分块，$\lfloor\frac{n}{i}\rfloor$ 只有 $\sqrt n$  种取值。

### [P3455](https://www.luogu.com.cn/problem/P3455)

$$\sum_{i=1}^n\sum_{j=1}^m [gcd(i,j)=k]$$

$$=\sum_{i=1}^{\frac{n}{k}}\sum_{j=1}^{\frac{m}{k}} [gcd(i,j)=1]$$

$$=\sum_{i=1}^{\frac{n}{k}}\sum_{j=1}^{\frac{m}{k}}\sum_{d\mid gcd(i,j)}\mu (d)$$$$=\sum_{d=1}^n \mu(d)\frac{n}{kd}\frac{m}{kd}$$

预处理 $\mu(d)$ 前缀和，整除分块。

## 7.13

### [loj3627](https://loj.ac/p/3627)

$\sum [a_i=c_{i,j}]+[b_j=c_{i,j}]-[a_i=b_j]\le n^2$，且当且仅当 a,b 合法时取等。

枚举 $x=\sum a_i$ 和 $y=\sum b_j$，$\sum [a_i=b_j]$ 为定值，贪心最大化 $\sum [a_i=c_{i,j}]+[b_j=c_{i,j}]$ 检查。

### [P8340](https://www.luogu.com.cn/problem/P8340)

从小到大加数，要保证 $a_i\le sum_{i-1}$。容斥，$dp_i$ 表示当前能表示出 $[1,i]$ 。且总和为 $i$。等价于 $i$ 的互异拆分数减去之前的 $dp_j$ 乘上 $[j+2,i]$ 中的数和为 $i-j$ 的方案数。

求互异拆分数，数字个数 $O(\sqrt n)$ 个，等于从 $\sqrt n$ 到 $1$ 完全背包加入 $i$，表示有多少个数大于 $i$。

$dp_j$ 贡献给 $dp_i$ 也形如求互异拆分数，有 $i\ge 2\times j$。类似半在线卷积，前一半贡献给后一半。

## 7.14

### [P10778](https://www.luogu.com.cn/problem/P10778)

找出一棵生成树，给非树边赋随机值，随机异或哈希，树边等于跨过该边的非树边的权值异或和。图不连通等价于若干条边的权值中存在子集异或和为 $0$，线性基。

### [P6647](https://www.luogu.com.cn/problem/P6647)

每 $k$ 分一段，每一段中使用的天数相同。$dp_i=\max_{j=i-k}^{k\times \lfloor \frac{i-1}{k}\rfloor} dp_j+\max_{k=j+1}^{i}a_k$。一段段计算，预处理前一段的后缀最大值，更新当前段的前缀最大值。

### [CF1730F](https://www.luogu.com.cn/problem/CF1730F)

按 $p_{q_i}$ 从小到大填入，设当前填完前缀 $[1,i]$，$i+1$ 没填，状压 $[i+1,i+k]$ 是否填入。

### [CF1781F](https://www.luogu.com.cn/problem/CF1781F)

合法状态数除以 $\prod 2\times i-1$。$dp_{i,x}$ 表示还有 $i$ 次插入，当前前缀和为 $x$。

$$dp_{n,x}=\sum_{i=1}\sum_{j=1}^{n-1-i}\binom {n-1}{i}\times \binom {n-1-i}{j}\times(p\times dp_{i,x}\times dp_{j,x+1}\times dp_{n-1-i-j,x}+(1-p)\times dp_{i,x}\times dp_{j,x-1}\times dp_{n-1-i-j,x})$$

前缀和优化。

### [P10207](https://www.luogu.com.cn/problem/P10207)

离散化后不同位置的球数小于 $\sqrt T$。球会在最后一次经过时取到，设 $dp_{l,r,0/1}$ 表示取了 $[1,l)\cup (r,n]$ 的球。分类预处理先去 $1$ 还是 $n$ 号球。

### [CF1119F](https://www.luogu.com.cn/problem/CF1119F)

设 $dp_{u,0/1}$ 表示当前在 $u$ ，父亲边断不断。先令 $dp_{u,0}=dp_{u,1}=\sum dp_{v,0}$，再加上前 $d-x-0/1$ 小的 $dp_{v,1}+w-dp_{v,0}$。

从小到大计算 $ans_x$。如果 $d_u\le x$，就不用再考虑了，将 $w(u,v)$ 加入 $v$ 的堆中永不删除。每次要操作的点数之和为 $\sum d_i$ 是 $O(n)$ 级别。

### [Q1251](https://qoj.ac/problem/1251)

关键点在前后缀最大值。设 $dp_{i,j,k}$ 表示前 $i$ ，之前的最大位于 $j$ ，用了 $k$ 次删除操作的面积奇偶性。只有删除操作才可能改变最大值位置，$j$ 只有 $k$ 种取值。对前后缀分别做，枚举最大值位置合并。

### [arc117e](https://www.luogu.com.cn/problem/AT_arc117_e)

连续段 dp，按前缀和从大往小加数，枚举这一层放多少点。

## 7.15

### [arc063d](https://www.luogu.com.cn/problem/AT_arc063_d)

答案不小于 $2\times (n+m)$。如果答案矩形被包含于上左下右四个子矩阵中，一定不优，所以一定跨过横向中线或竖向中线。

扫描线枚举右边界，单调栈加线段树维护。

## 7.16

### [P5537](https://www.luogu.com.cn/problem/P5537)

维护走向第几个儿子，记录从根到 $u$ 的哈希值。二分，维护区间哈希值拼上根到 $u$ 的哈希值，map 查找是否存在这个点。

### [P7717](https://www.luogu.com.cn/problem/P7717)

找出生成树，对于每个连通块给根找一个数 $v$ 使得 $v\oplus dis_u\le k$ 。等价于在 trie 树上禁止进入某个子树。

### [P1117](https://www.luogu.com.cn/problem/P1117)

枚举答案长度，每个 $k$ 分为一段。二分两段的最长公共前缀和最长公共后缀，平移后相交的区间意味着可以放下长为 $k$ 的合法串。差分。

### [P3735](https://www.luogu.com.cn/problem/P3735)

等于有一个长为 $k$ 的通配符区间的方案数减去有长为 $k-1$ 的通配符的方案数。AC 自动机加入正着和反着的串。$[1,p]$ 和 $[p+k,n]$ 必须匹配，等于查询 $u$ 的子树内有多少点与 $v$ 有关，树状数组维护，在进入退出 $u$ 时查询字子树和。

## 7.17

### [P7361](https://www.luogu.com.cn/problem/P7361)

[[sam-zuo-ti-ji-lu|SAM 学习笔记]]。

用 set 启发式合并 edp 集合，一个长度的贡献为相邻的 edp 点。贡献为 $min(pl-l+1,len)$。离线，扫描线。