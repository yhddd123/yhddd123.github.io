---
title: '图论记录'
date: 2025-07-24 21:59:28
tags: [做题记录,图论]
published: true
hideInList: false
feature: 
isTop: false
---

### [CF1163F](https://www.luogu.com.cn/problem/CF1163F)

删边最短路。

把 $1\to n$ 的最短路扔到序列上。求出每个点 $1\to u$ 和 $1\to n$ 分叉的位置 $pre_u$，和 $suf_u$。

对每条边 $(u,v,w)$，把 $[pre_u,suf_u)$ 更新为 $dis(1,u)+w+dis(v,n)$。

每条新最短路对应唯一 $(u,v)$。

### [9903](https://qoj.ac/contest/1875/problem/9903)

删点最短路。

线段树分治（缺一分治？？？），floyd 第一维可以按任意顺序选。

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