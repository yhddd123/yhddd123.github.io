---
title: 'P10256 题解'
date: 2026-01-29 15:27:24
tags: [题解,dp,数据结构]
published: true
hideInList: false
feature: 
isTop: false
---
[P10256](https://www.luogu.com.cn/problem)

生气了。

设 $f_i$ 表示 $i-1\to i$ 的步数，$f_i=\frac{1}{p_i}+\frac{(1-p_i)}{p_i}\sum_{j=a_i+1}^{i-1}f_j$。

前缀和，$f_i=\frac{1}{p_i}+f_{i-1}-\frac{1-p_i}{p_i}f_{a_i}$。$a_i<i$，且 $[a_i,i]$ 没有严格相交的。

这是能做的？

把下标作为 dfn 序，可能是后序的，然后是树上依赖背包。

选一个点和不选一个子树各有一个代价，ddp。

如果只到这里感觉还有点逆天。

以上可能在说假话。

回到最开始，把 $[a_i,i]$​ 按包含关系建树，一个点的贡献就变成子树乘了。

以上可能在说假话。

总之不想改了。

