---
title: '典题乱做 2'
date: 2025-07-12 22:18:34
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---
2

### [arc200e](https://www.luogu.com.cn/problem/AT_arc200_e)

令 $a_1=0$，$|a_i|\le 2$。若第 $i,j$ 位为 $1$，没有则为 $m+1$ 位，连边 $(i,j)$。

容斥数：没有边、一条、菊花、三元环。

### [CF2084G](https://www.luogu.com.cn/problem/CF2084G2)

归纳证明答案只与两边的最大或最小有关。$m=2$ 显然，若先手操作两边则答案与先手要求相反。

$$ans=\sum_{i\le j}([i\bmod 2=j\bmod 2]\max(p_i,p_j)+[i\bmod 2\neq j\bmod 2]\min(p_i,p_j))$$

$$ans=\sum i^2-\sum_{i<j}[i\bmod 2\neq j\bmod 2]|p_i-p_j|$$

等价于放在数轴上，奇数位置有 $\lceil\frac{n}{2}\rceil$ 个，最小化奇偶位置距离之和。设前 $i$ 个有 $j$ 个奇数位置的最小代价 $f_{i,j}$。在 $i$ 和 $i+1$ 的间隔加上两边跨过的贡献，为下凸的二次函数。

差分数组单调，维护全局加一次函数，向右平移，插入 $0$。fhq treap 维护 $(g_j,j,1)$。

### [arc199c](https://www.luogu.com.cn/problem/AT_arc199_c)

把 $P^1$ 弄成 $1,\dotsb,n$，$P^i_1$ 弄成 $1$。

一个子树在所有排列中都是区间。区间 dp 设 $f_{l,r}$ 表示 $[l,r]$ 形成子树，$g_{l,r}$ 表示 $[l,r]$ 形成森林。

### [arc199d](https://www.luogu.com.cn/problem/AT_arc199_d)

设 $f_{i,j}$ 和 $g_{i,j}$ 表示长为 $i$ 宽为 $j$ 的矩阵的数量和权值和。考虑最后一行，设 $a_i=p-1$，有 $k$ 个 $jj>p$ 的位置 $b_{jj}=i$。挖去 $i$ 行和这 $k$ 列进入子问题。枚举 $k$，第 $i$ 行的方案数 $val=[j=0] (k+1)+[j!=0]\binom{j}{k+1}$。

$$f_{i,j}=f_{i-1,j-k}\times val$$

$$g_{i,j}=g_{i-1,j-k}\times val+f_{i-1,j-k}\times (val\times j\times k+\sum_p (p-1)\binom{j-p}{k})$$

### [abc406g](https://www.luogu.com.cn/problem/AT_abc406_g)

$f_{i,j}$ 下凸。维护斜率拐点斜率的变化量和最左边直线的 $y=kx+b$。

操作 $1$ 为将斜率绝对值大于 $c$ 的部分推平为正负 $c$。操作 $2$ 为 $p$ 处斜率加 $2\times d$。

### [arc196_c](https://www.luogu.com.cn/problem/AT_arc196_c)

容斥。钦定有 $k$ 个分解线，$k+1$ 段中后面的不能连向前面的，每段中可能还有更小的段，系数为 $(-1)^k$。

规定一个段以白点结尾。可以合法的前缀中每个黑点都要被前缀中的白点匹配。把所有白点单独拉出来，设它们在原序列中下标为 $p_i$，在这个长为 $n$ 的新序列上 dp。

设 $f_i$ 表示最后一段结尾为 $i$ 的带系数的方案数。$f_i=\binom{i}{p_i-i}(p_i-i)!-\sum_{j=1}^{i-1}\binom{i-(p_j-j)}{p_i-i-(p_j-j)}(p_i-i-(p_j-j))!f_j$

半在线卷积。可以看作 $p_j-j$ 和 $i-(p_j-j)$ 卷积，一整层的长度之和保证为 $O(n)$。

### [CF1349D](https://www.luogu.com.cn/problem/CF1349D)

鞅与停时定理。

$$(\sum f_{a_i})-1=\sum(\frac{a_i}{m}f_{a_i-1}+\frac{(m-a_i)(n-2)}{m(n-1)}f_{a_i}+\frac{(m-a_i)}{m(n-1)}f_{a_i+1})$$

$$f_x-\frac{x}{m}=\frac{x}{m}f_{x-1}+\frac{(m-x)(n-2)}{m(n-1)}f_{x}+\frac{(m-x)}{m(n-1)}f_{x+1}$$

不妨设 $f_0=0$。令 $x=0$，$f_0=f_1=0$。递推即可。$ans=\sum f_{a_i}-(n-1)f_0-f_m$。

### [250713 模拟赛 T3](http://goj.wiki/d/Union2024/p/P1523)

快排：随机一个元素，数小于/等于的有几个，和 $k$ 比较，向两边递归。期望 $O(\log n)$。

对每个左端点维护当前递归内的右端点范围。有 $(l,r)<(l,r-1)$，双指针。数据结构维护增删元素和固定区间比较。

### [CF1163F](https://www.luogu.com.cn/problem/CF1163F)

删边最短路。

把 $1\to n$ 的最短路扔到序列上。求出每个点 $1\to u$ 和 $1\to n$ 分叉的位置 $pre_u$，和 $suf_u$。

对每条边 $(u,v,w)$，把 $[pre_u,suf_u)$ 更新为 $dis(1,u)+w+dis(v,n)$。

每条新最短路对应唯一 $(u,v)$。

### [P9140](https://www.luogu.com.cn/problem/P9140)

同余最短路。

取基准物品 $(m,w)$。对剩下的物品求 $mod m$ 的最长路。连边 $(i,(i+v)\bmod m,c_i-(\lfloor\frac{v}{m}\rfloor+[i+v\ge m])\times w)$。

要保证没有正权环，基准物品取性价比 $\frac{c}{v}$ 最大的即可。因为 $V>m^2$，所以保证足够。

更新时，一个点不会更新回自己，在 $gcd$ 个环上转圈两次即可。

### [CF1515G](https://www.luogu.com.cn/problem/CF1515G)

有向图环的基。

求出强连通分量。对于每个边双，求出生成树。回路走 $mod$ 次可以抵消。一定存在可以同时过 $u,v$ 的回路。$(u,v,w)$ 等价于 $(v,u,-w)$，走 $mod-1$ 加半圈即可。

求出生成树，非树边 $(u,v,w)$ 可以形成 $dep_u-dep_v+w$ 的环。求出所有环的 $gcd$。

裴蜀定理，$gx+ty=t-s$。

