---
title: 'Ptz Winter 2022. Day 6.'
date: 2025-11-05 21:46:11
tags: [acm]
published: true
hideInList: false
feature: 
isTop: false
---
[Petrozavodsk Winter 2022. Day 6. ICPC Camp Day 1](https://qoj.ac/contest/824)

#### [A. Soccer Match](https://qoj.ac/contest/824/problem/2605)

直接随机染色，直到异色边数量 $> \frac{m}{2}$。此时不断扔掉 $deg_u\le k$ 的点就能得到合法解。

关于复杂度，不懂。

#### [B. Gachapon](https://qoj.ac/contest/824/problem/2606)

厉害吧。

首先 $f_{i,j}$ 表示前 $i$ 轮最大为 $j$，$f_{i,j}=(\sum_{k\le j}f_{i-1,k})^{t_i}-(\sum_{k<j}f_{i-1,k})^{t_i}$。

枚举卡 $x$，求 $(\sum p_i)^{\prod t_i}$ 种随机方案，合法且随出 $x$ 的期望。等价于 合法且第 $i$ 步随出 $x$ 的概率之和，等价于 合法且第 $1$ 步随出 $x$ 的概率乘 $\prod t_i$。设 $g_{i,j}$ 表示第一次随出 $x$ 的，前 $i$ 轮合法且最大卡 $j$  的概率，从一个 $g_{i-1}$ 和 $t_i-1$ 个 $f_{i-1}$ 转移。

转置一下。

#### [C. Survey](https://qoj.ac/contest/824/problem/2607)

对于一个人 $i$，如果有 $j$ 个可选，有 $\frac{j}{n}$ 的贡献。

每个权值都有一个贡献。$f_{i,j}$，加入新权值 $k$ 可以要求不超过 $\frac{j}{i}$。

#### [G. Trans](https://qoj.ac/contest/824/problem/2611)

是 FWT 求的东西。

#### [H. Blind Box](https://qoj.ac/contest/824/problem/2612)

求 $\sum_{t1+\ldots+t_m=n}1$ 和 $\sum_{t1+\ldots+t_m=n}\prod i^{t_i}$。

是 $\binom{n+m-1}{m-1}$ 和 第二类斯特林数 $S(n+m,m)$。

第二个大概有一个组合意义解释。对于 $n+m$ 个两两不同的球分给 $m$ 个盒子的分法 $a_i$，如果 $a_i$ 是前缀最大值，就是 $m$ 个特殊球，剩下的 $n$ 个在 $1\sim premx$ 中任选对应乘 $i$。

#### [I. EIP1559](https://qoj.ac/contest/824/problem/2613)

以 $a-b$ 维护 $\max a$ 和 $\max b$。

#### [K. Surround the Cat](https://qoj.ac/contest/824/problem/2615)

这种题见过一次就会了，只是还是要写半天挂若干发。

大概是，每两个 ban 一个。当猫跑到离边界差 $1$ 或者一些离边界差 $2$ 的危险位置的时候，才开始 ban 没 ban 的那个。