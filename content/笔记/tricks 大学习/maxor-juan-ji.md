---
title: '(max,or) 卷积'
date: 2025-11-17 07:48:50
tags: [tricks,数学]
published: true
hideInList: false
feature: 
isTop: false
---
已完成今日 [max + or 卷积](https://www.luogu.me/article/5l2ultk8) 大学习。

> 求 $c_i=\max_{j|k=i}a_j+b_k$。

---

分治乘。

$$c0=a0b0,c1=\max(a0b1,a1\max(b0,b1))$$

$$T(n)=3T(\frac{n}{2})+O(n)=3^{\log_2 n}$$