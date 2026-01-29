---
title: '线性规划对偶'
date: 2026-01-29 17:07:15
tags: [笔记,数学]
published: true
hideInList: false
feature: 
isTop: false
---
已完成今日 [在 OI 中更易上手的线性规划对偶 ](https://www.cnblogs.com/yyyyxh/p/17939643/LPdual) 大学习。

[**Welcome to Tokyo!**](https://www.luogu.com.cn/problem/AT_wtf22_day1_d)

不会写 latex，已倒闭。

总之就是：

写出最优化目标和约束，把约束写成 $\le 0$ 的形式。

对每个约束乘一个 $\lambda_i$，加入要最优化的式子里。

根本说不明白，就是：$\max_{x\ge 0,y\ge 0} x_i$ 等价于 $\max_{x\ge 0,y\ge 0} \min_{a\le 0,b\le 0,c\le 0}\sum y_i+\sum a_i(...)+\sum b_i(...)+\sum c_i(...)$。

理解就是你是先手，决定 $x,y$，限制 $\lambda _i$ 的符号，要 $\max$；后手决定 $\lambda _i$，要反过来。但是有一些约束使你不能随意选 $x,y$，即 $a_i$ 乘的那个约束要 $\le0$。如果你的选择不满足约束，后手令 $a_i=-\infty$ 你就爆炸了；否则当满足条件的时候，后手为了 $\min$ 只能让 $a_i=0$ ，最后的结果没有改变。

然后可以交换 $\max$ 和 $\min$，并写成原来的变量为主元。

然后就反过来，原来的变量变成新的 $\lambda'_i$，原来的 $\lambda_i$ 变为新的变量。