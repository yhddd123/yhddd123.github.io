---
title: '多项式小计'
date: 2025-07-16 21:59:20
tags: [笔记,数学]
published: true
hideInList: false
feature: 
isTop: false
---
还是得学点的。

### 卷积

多项式乘法卷积：和卷积/差卷积。

分治 ntt：$f_i=\sum_{j=0}^{i-1} f_jg_{i-j}$。cdq 分治，每次将 $f[l,mid]$ 和 $g[0,r-l]$ 卷，转移给 $f[mid+1,r]$。

### 泰勒展开

$f(x)=f_{x_0}+\sum\limits_{n=1}^{+\infty}\frac{f^{(n)}(x_{0})(x - x_{0})^n}{n!}$。所以有 $e^x=\sum_{i=0} \frac{x^i}{i!}$ 和 $ln(1-x)=-\sum_{i=1} \frac{x^i}{i}$。

### ln/exp

设 $g=ln(f)$。有 $f_0=1,g_0=0$。

求导，$g'(x)=\frac{f'(x)}{f(x)}$。

对于第 $i$ 项，$\sum_{j=0}^i (j+1)g_{j+1}f_{i-j}=(i+1)f_{i+1}$。

令 $i=i+1,j=j+1$，$ig_i+\sum_{j=1}^{i-1}jg_jf_{i-j}=if_i$。

设 $g=exp(f)$。有 $f_0=0,g_0=1$。

求导，$g'(x)=g(x)f'(x)$。

对于第 $i$ 项，$(i+1)g_{i+1}=\sum_{j=0}^i g_{j}(i-j+1)f_{i-j+1}$。

令 $i=i+1$，$ig_i=\sum_{j=0}^{i-1}g_j(i-j)f_{i-j}$。

两个都可以分治 ntt，一次 $n=10^5$ 小于 $500ms$。

exp 和 单 $\log$ 速度相当，ln 多一倍常数。

### OGF

给对于位置的系数加上 $x^i$ 进行区分。$F(x)=\sum_{i=0}f_ix^i$。

$$\sum_{i=0}c^ix^{ik}=\frac{1}{1-cx^k}$$

### EGF

$F(x)=\sum_{i=0}\frac{f_i}{i!}x^i$。

卷积：$(f*g)_k=\sum_{i+j=k}\binom{k}{i}f_ig_j$。一般 除以 $i!$ 后当 OGF 算。

$exp(f(x))$ 展开后  $\sum\frac{f(x)^i}{i!}$，等于多次卷积再消去元素间的顺序，组合意义为有标号集合计数。

### 组合数公式

$\binom{n}{m}$ ，$n$ 个选 $m$ 个。