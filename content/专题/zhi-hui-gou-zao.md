---
title: 智慧构造
date: 2025-02-09 22:38:11
tags:
  - 做题记录
  - 构造
published: true
hideInList: false
feature: 
isTop: false
---
### [P10644](https://www.luogu.com.cn/problem/P10644)

[Public NOIP Round #8 D. 矩阵](https://pjudge.ac/contest/1847/problem/21864)

[[p10644-ti-jie|sol]]。

令 $f_i=\sum_{j=1}^m a_{i,j}$，$g_j=\sum_{i=1}^n a_{i,j}$。如果能构造出合法的 $\sum f_i=\sum g_j$，就 [arc135d](https://www.luogu.com.cn/problem/AT_arc135_d) 的方法。

分类讨论是否存在一个不全相同的行、一个不全相同的列。

### [arc189e](https://www.luogu.com.cn/problem/AT_arc189_e)

[[arc189e-ti-jie|sol]]。

特判 $n\le 5$。

归纳证明 $mx=2$ 不合法。对于 $n>5$ 时 $mx=3$ 合法。将 $n$ 分为 $4$ 个集合 $X1,X2,X3,X4$。集合内权值为 $3$，集合间权值为 $n=4$ 的权值。可能不合法的方案要求其中一个集合至少大于等于为另外两个集合之和。令 $|X1|\ge |X2|\ge |X3|\ge |X4|\ge |X1|-1$。

### [CF1097E](https://www.luogu.com.cn/problem/CF1097E)

记 $c_n$ 为最大的 $k$ 使得 $\frac{k(k+1)}{2}\le n$。可以构造 $((1),(3,2),(6,5,4),\dotsb)$ 使得 $f_n\ge c_n$。

在 $c_n$ 内划分任意一个排列。设最长上升子序列长为 $len$。如果 $len>k$，取出，$\frac{(k-1)k}{2}\le n-len$。否则由 Dilworth，存在 $len$ 个下降子序列可以拼出原序列，贪心构造。

### [P9731](https://www.luogu.com.cn/problem/P9731)

对于 $m=2$，一定有解。连边 $(u,v)$，把奇数度的点连向一个虚点，跑欧拉回路。可以保证原来奇数度的点入度出度差为 $1$。

对于更大的 $m$，当作 $n\times \frac{m}{2}$ 对 $2$ 个的处理，使得左右两边差值 $\le 1$。分治左右两边。

### [P11066](https://www.luogu.com.cn/problem/P11066)

分为要向左的点和要向右的点。从后往前做，要向左的点先向右一步，要向右的点直接去要去的位置。再从前往后，要向左的点去要去的位置。问题是，对于只要向右走一步的点，会在这时挡到路。

先做一步调整。调整会把空位从最右移到最左，所以上面部分反过来。每次从后往前考虑 $i$ 和 $i+1$，如果 $m$ 为奇数就不考虑最后一个点。如果 $i$ 和 $i+1$ 在右移一格后需要调整，就交换 ```i+2,i+2,0,i+1```，否则直接 ```i+2,i+1```，把空位向左移。

理论上 $5n$，常数较小。

### [CF538G](https://www.luogu.com.cn/problem/CF538G)

将坐标轴转 45 度，两维独立。将坐标替换为 $\frac{x+t}{2}$，每次加一或不动。

设一个循环节加 $k$。对于 $\bmod l$ 相邻的位置，$x_i-x_j-(t_i\bmod l-t_j\bmod l)\le k(\frac{t_i}{l}-\frac{t_j}{l})\le x_i-x_j$，解不等式。

### [P7320](https://www.luogu.com.cn/problem/P7320)

生成树。要么叶子，要么叶子两两匹配形成路径。dfn 序上有交的叶子对连成的路径有交。

### [agc037d](https://www.luogu.com.cn/problem/AT_agc037_d)

正反出发各做一次重排行，相当于把 $[(k-1)\times m+1,k\times m]$ 看做一种颜色的通配符。希望重拍列之后每行变成相同的。

左部点 $n$ 行，右部点 $n$ 种颜色，连边为原来这一行有几种这个颜色，每个点 $m$ 条入（出）边。求 $m$ 组完美匹配，第 $t$ 组若 $(i,j)$ 则 $b_{i,t}$ 颜色为 $j$。

是 $m$ - 正则二分图，由霍尔定理一定存在完美匹配，删掉一组完美匹配后是 $m-1$ - 正则二分图。所以一定存在 $m$ 组完美匹配。

可以由 [loj180](https://loj.ac/p/180) 做到 $O(nm\log n)$。