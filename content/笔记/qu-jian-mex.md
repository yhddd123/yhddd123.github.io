---
title: '区间 mex'
date: 2025-09-16 21:56:52
tags: [笔记,数据结构]
published: true
hideInList: false
feature: 
isTop: false
---

### 区间 mex 在平面上的矩形个数 $O(n)$。

$r$ 从 $n$ 到 $1$，set 维护 $mex(l,r)$ 的连续段，单调递减。删去 $a_r$ 即 $mex$ 对 $a_r$ 取 min，即区间推平。

### 极小 mex 区间 $2n$ 个

只考虑 $a_l>a_r$ 的极小 mex 区间。设 $[l,r]$ 是，则 $mex(l,r)\ge a_l>a_r$。若存在 $r'>r$ 且 $[l,r']$ 也是，$mex(l,r)\ge a_l>a_{r'}$，$[l,r]$ 中有 $a_{r'}$，可以删去 $r'$，矛盾。

从小到大维护出 $mex(l,r)=i$ 的极小 mex 区间。对于一个 $mex(l,r)=i-1$，找到 $a_{pl}=a_{pr}=i$，拓展为 $(pl,r)$ 和 $(l,pr)$ 作为对应的 mex 的候选区间。对于 $mex=i$ 的候选区间，删掉不优的即可。

主席树维护在线询问。