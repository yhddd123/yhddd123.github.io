---
title: '单点修改区间取 max 的根号平衡'
date: 2025-11-17 07:51:33
tags: [tricks,数据结构]
published: true
hideInList: false
feature: 
isTop: false
---

已完成今日 [$O(\sqrt n)$ 单点修改 $O(1)$ 区间 max](https://www.luogu.com/article/l9cbsbjf) 大学习。

未完成今日 [$O(1)$ 单点修改 $O(n^{O(1)})$ 区间 max](https://www.luogu.com.cn/article/vrswo5j1) 大学习。

---

建 ST 表直接改，第 $i$ 层改 $2^i$ 个，共 $O(n)$ 个。

分块，块内和块间分别维护 ST 表，各改 $O(\sqrt n)$ 个位置。

---

？？？