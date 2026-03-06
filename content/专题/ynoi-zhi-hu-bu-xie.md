---
title: 'Ynoi 只胡不写'
date: 2026-01-24 16:15:38
tags: [做题记录,数据结构]
published: true
hideInList: false
feature: 
isTop: false
---
发现我的 [Ynoi](https://qoj.ac/category/269) 还没做过几道，根本不想写。

[Ynoi 1998 Problems](https://qoj.ac/contest/2055)

[Frühlingsbeginn](https://qoj.ac/contest/2055/problem/11283)

> 有区间 $[l,r,tl,tr]$，询问 $[ql,qr,qt]$，求 $qt$ 时刻是否能选出区间并为 $[ql,qr]$。

序列分治。

对于跨过 $mid$ 的区间，求最多能覆盖 $mid$ 两边多远，扫时间维，线段树下标 $[l,mid]$，维护右端点的最小值，线段树二分。

检查在两边的区间能不能补上剩下的。扫 $i=l\to mid$，线段树下标时间维，维护右端点最远能覆盖到哪里，区间取 max，弹出 min $<i$ 的询问。

复杂度 $O(n\log^2 n)$。

[Marchen](https://qoj.ac/contest/2055/problem/11284)

> 询问 $[l,r]$ 求 $l\le i<j<k\le k$ 且 $a_i<a_j<a_k$ 的 $(i,j,k)$ 数。

[ZYPRESSEN](https://qoj.ac/contest/2055/problem/11285)

> 询问 $[l,r]$ 求 $l\le i<j<k\le k$ 且 $(a_i,a_j,a_k)$ 是能组成三角形的 $\min a_i+a_j+a_k$。

[Ynoi 2000 Problems](https://qoj.ac/contest/2053)

[rspcn](https://qoj.ac/contest/2053/problem/11272)

> 对 $[l,r]$ 升或降序排序；询问一个前缀有多少个不同值。
>
> 强制在线。

仿照颜色段均摊，维护若干个升或降序段。

权值线段树维护每个值出现次数和是否第一次出现，线段树分裂合并。

复杂度 $O(n\log n)$。

[pmpkmp](https://qoj.ac/contest/2053/problem/8630/statement/zh_cn_ynoi)

> 树，树边上有一个字符。
>
> 将 $x\to y$ 的路径替换为给定的字符串，保证长为 $k$；查询 $x\to y$ 路径的字符串与给定字符串的匹配次数。

树剖，枚举轻边直接查询，重链上一共 $O(qk)$ 次修改 $q$ 次询问，离线，维护哈希值。

复杂度 $O(qk\log n)$。

[Ynoi 2009 Problems](https://qoj.ac/contest/1393)

[rpdq](https://qoj.ac/contest/1393/problem/7459)

range pair distance query.

莫队二次离线一下，$O(n\sqrt n)$ 次路径加，$O(n)$ 次路径和。

树分块平衡一下。Top Cluster 树分块，将树分为 $O(\frac{n}{B})$ 个 $O(B)$ 的簇，每个簇只有两个界点，至于另外两个簇通过上下界点相连，上界点可能有多个簇，每个边一个簇。一个替代方法是，对 $dep_i\bmod B=0$ 且子树内 $mxd_i\ge B$ 的点撒点，然后建虚树，同样效果。