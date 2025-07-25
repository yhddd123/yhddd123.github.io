---
title: '典题乱做 1'
date: 2025-06-12 22:21:06
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---
1

### [P5547](https://www.luogu.com.cn/problem/P5547)

强制重心为根，减去重心为边的情况。

设 $f_{i,0/1/2}$ 表示 大小为 $i$ 且根的颜色 $0/1/2$，根有一条边连出去。再设 $g_{i,0/1/2,0/1}$ 辅助转移，表示 大小为 $i$，$0/1/2$ 个子树，有没有黄色。

### [P4321](https://www.luogu.com.cn/problem/P4321)

设 $dp_{S,u}$ 表示 在 $u$ 且要走完 $S$。

列出 $2^nn$ 个方程，对于 $dp_{S,*}$ 只会在同层或 $S'<S$ 层转移，按 $S$ 从小到大消元。

### [P9262](https://www.luogu.com.cn/problem/P9262)

相对的方向做多次只用保留最后一次。同一种操作两两之间如果没有反向的操作，则后面一次无用。

去掉开头结尾 $O(1)$ 次操作后，四种操作以一个合法的顺序重复多次。开头处理若干步后所有的滑块都在某个角落。此时转一圈只改变每个滑块的位置，不改变整体的形状，是一个置换。

求出置换后，找出置换环后 $cyc_i\to cyc_{(i+k)\bmod siz}$。复杂度 $O(nm)$。

### [P10559](https://www.luogu.com.cn/problem/P10559)

$O(1)$ 修改 $O(deg)$ 查询，或 $O(1)$ 查询 $O(deg)$ 修改。

拓扑排序，给图定向，使得每个点 $\le 10$ 个出度。修改和查询都只关心出边的贡献。

### [P10560](https://www.luogu.com.cn/problem/P10560)

### [arc200e](https://www.luogu.com.cn/problem/AT_arc200_e)

令 $a_1=0$，$|a_i|\le 2$。若第 $i,j$ 位为 $1$，没有则为 $m+1$ 位，连边 $(i,j)$。

容斥数：没有边、一条、菊花、三元环。

### [CF1349D](https://www.luogu.com.cn/problem/CF1349D)

鞅与停时定理。

$$(\sum f_{a_i})-1=\sum(\frac{a_i}{m}f_{a_i-1}+\frac{(m-a_i)(n-2)}{m(n-1)}f_{a_i}+\frac{(m-a_i)}{m(n-1)}f_{a_i+1})$$

$$f_x-\frac{x}{m}=\frac{x}{m}f_{x-1}+\frac{(m-x)(n-2)}{m(n-1)}f_{x}+\frac{(m-x)}{m(n-1)}f_{x+1}$$

不妨设 $f_0=0$。令 $x=0$，$f_0=f_1=0$。递推即可。$ans=\sum f_{a_i}-(n-1)f_0-f_m$。

### [250713 模拟赛 T3](http://goj.wiki/d/Union2024/p/P1523)

快排：随机一个元素，数小于/等于的有几个，和 $k$ 比较，向两边递归。期望 $O(\log n)$。

对每个左端点维护当前递归内的右端点范围。有 $(l,r)<(l,r-1)$，双指针。数据结构维护增删元素和固定区间比较。