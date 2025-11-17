---
title: '01 背包：subset sum through balancing'
date: 2025-11-17 07:49:43
tags: [tricks,dp]
published: true
hideInList: false
feature: 
isTop: false
---
### 已完成今日 [你真的会 01 背包吗？(https://blog.moeebius.top/index.php/archives/15/)](https://blog.moeebius.top/index.php/archives/15/) 大学习。

> 给定 $n$ 个整数 $a_i$，问是否存在一个子集 $S$ 使得 $\sum_{i\in S}a_i=V$。

---

直接做 $O(na_i^2)$，可以除 $w$。

找到一个最长前缀 $p$ 使得 $\sum_{i=1}^p a_i\le V$，先把这个前缀全部选上，和为 $sum$。然后每次操作可以从 $[1,p]$ 中删一个数，或加入 $[p+1,n]$ 中一个数，使得目前集合的 $sum\in[V-\max a_i,V+\max a_i]$。

记 $f_{i,j,k}$ 表示还没考虑 $[1,i]$ 和 $[j,n]$，目前的和为 $k$ 是否可行。交换状态值域，记 $g_{j,k}$ 表示右端点决定到 $j$，和为 $k$，左端点最大多少。

转移可以是：$j$ 右移一位，选/不选这个物品；$i$ 左移到 $[g_{j-1,k},g_{j,k})$  之间并删掉 $a_i$。

复杂度 $O(na_i)$。