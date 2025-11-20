---
title: '最小树形图'
date: 2025-11-19 22:20:18
tags: [笔记,图论]
published: true
hideInList: false
feature: 
isTop: false
---
已完成今日 [最小树形图](https://www.cnblogs.com/lsq147/p/17029129.html) 大学习。

> 给定有向图，求以 $rt$ 为根的内/外向树的最小边权和

---

[【模板】最小树形图](https://www.luogu.com.cn/problem/P4716)

在图中添加边 $(i,i\bmod n+1,inf)$，选到 $inf$ 则无解。

每条边优先指向边权最小的出边。如果成环，就会在之后反悔一条环边改为指向环外。

依次对所有点执行：找到最小出边。如果加上不是环，就加上。否则将整个环缩为一个新点，把所有环上点的出边减去该点环上的边，在合并起来作为新点的出边。