---
title: '2025.1 做题记录'
date: 2025-01-10 13:45:00
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---
## 1.06

### [CF1975G](https://www.luogu.com.cn/problem/CF1975G)

如果两边都存在任意符，或都不存在任意符直接比较即可。判掉两端的固定字符。a 没有任意符，b 有任意符。任意符将 b 分为若干长为 $m$ 的段 ，在长为 $n$ 的 a 中做[[string#^5a3229|带通配符的字符串匹配]]，贪心取最前的一个匹配的位置。$m$ 可能很小但很多，所以一次取 a 的前 $2\times m$ 进行匹配，如果失败删去前 $m$ 个。复杂度 $O(m\log m)$。

### [P8518](https://www.luogu.com.cn/problem/P8518)

对盒子扫描线，线段树维护时间，形如后缀加减。只需要关心最后一次顶上下界，即线段树二分最后一次 $\max-\min\ge a_i$。然后分讨计算。

## 1.07

### [CF1503D](https://www.luogu.com.cn/problem/CF1503D)

一定有 $\min (a_i,b_i)\le n$，$\max(a_i,b_i)>n$。按 $\max(a_i,b_i)$ 降序排序取出两个 $\min(a_i,b_i)$ 升序的子序列。线段树维护。

### [P11519](https://www.luogu.com.cn/problem/P11519)

[[bing-cha-ji-qi-fa-shi-fen-lie|并查集启发式分裂]]。

## 1.09

### [P6822](https://www.luogu.com.cn/problem/P6822)

建超级源汇点，拆成有向边，化边为点。每条边向反向边连其权值。把每个点的出边权值排序，相邻的小的向大的连权值的差值。跑最短路。

### [P3587](https://www.luogu.com.cn/problem/P3587)

异或哈希，改同颜色最后一个点的权值使得同颜色异或为 $0$。

## 1.10

### [CF1753F](https://www.luogu.com.cn/problem/CF1753F)

枚举对角线确定正方形，同条对角线有决策单调性。每条对角线只用加入 $(min(n,m))^2$ 个点，每个点只会被枚举 $\min(n,m)$ 次。每条对角线只用查询 $\min(n,m)$ 次。只需要 插入 $O(1)$ 查询 $O(\sqrt k)$ 的分块求 mex 即可。

---

摆了。题没做几道。

[[deque-shi-xian|deque 实现]]。

[[tu-lun-lian-tong-xing-wen-ti|WC2025记录：连通性问题]]。

[[xian-duan-shu-qu-jian-ding-wei|线段树区间定位]]。