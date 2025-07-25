---
title: 'Petrozavodsk Summer 2019. Day 9. MEX Foundation Contest'
date: 2025-07-24 22:10:42
tags: [acm]
published: true
hideInList: false
feature: 
isTop: false
---
[https://qoj.ac/contest/1392](Petrozavodsk Summer 2019. Day 9. MEX Foundation Contest)

### [A. The One Polynomial Man](https://qoj.ac/contest/1392/problem/7596)

$\frac{(2a+3b)^2+5a^2}{(3a+b)^2}+\frac{(2a+5b)^2+3b^2}{(3a+2b)^2}$ 这种东西没理由能维护。但是若 $(a,b)$ 成立，$(ka,kb)$ 也成立。

把 $0$ 判掉。若 $(i,1)$ 可行，则累加 $\frac{a}{b}=i$ 的数量。求原根，转为离散对数，差卷积。

### [B. Alexey the Sage of The Six Paths
](https://qoj.ac/contest/1392/problem/7597)

最大匹配等于最小点覆盖。

同时钦定