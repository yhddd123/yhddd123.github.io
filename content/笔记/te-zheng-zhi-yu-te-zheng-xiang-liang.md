---
title: '特征值与特征向量'
date: 2025-07-27 20:41:15
tags: [笔记,数学]
published: true
hideInList: false
feature: 
isTop: false
---

### 定义

$A$ 是 $n$ 阶方阵，若对于数 $x$，存在向量 $\alpha$，$A\alpha=x\alpha$，则 $x$ 为 $A$ 的特征值，$\alpha$ 为特征向量。

即 $(x I-A)\alpha=0$，即 $det(x I-A)=0$。

$x I-A$ 即 $A$ 取反并在对角线加上 $x$，称为特征矩阵。$det(x I-A)$ 为关于 $x$ 的至多 $n$ 次多项式，称为特征多项式。

### 几何解释

考虑二维中的线性变换，左乘矩阵 $\begin{bmatrix}a&c\\b&d\end{bmatrix}$ 认为是原来 $\hat{i}$ 去到 $(a,b)$，$\hat{j}$ 去到 $(c,d)$。

对于一些直线向量，在变换后可能不会离开原来的直线。称这些直线为特征向量，这些向量放缩的比例为特征值（可以为负）。

### 矩阵对角化

基变换。原来的基为 $((1,0,\dotsb,0),\dotsb,(0,\dotsb,0,1))$，设新的基表示为 $n$ 个 $n$ 维向量，分别写在一个 $n\times n$ 的矩阵 $P$ 的每一列。左乘 $P$ 为新向量变换为原向量，左乘 $P^{-1}$ 为原向量变换为新向量。

如果 $A$ 存在 $n$ 个线性无关的特征向量，让这些特征向量作为新向量。令 $P$ 为 $n$ 个特征向量作为列的矩阵。一次原来的基的 $A$ 变换在新的基中表示为：先左乘 $P$ 变为原坐标，再左乘 $A$ 进行变换，再左乘 $P^{-1}$ 变为旧坐标。而新的基中表示的变换 $B$，由定义，只是放缩 $x_k$ 倍，即 $P^{-1}AP=B=\begin{bmatrix}x_1&&\\&\ddots&\\&&x_n\end{bmatrix}$。

所以 $A$ 能矩阵对角化等价于 $A$ 有 $n$ 个线性无关的特征向量。

#### 费马小定理

$A^n$ 在模 $p$ 意义下没有 费马小定理 的结论。但是对角矩阵 $B^n=B^{n\bmod \phi(p)}$ 有。

[P1397](https://www.luogu.com.cn/problem/P1397)。

而如果 $A$ 能对角化。$PB^nP^{-1}=P(P^{-1}AP)^nP^{-1}=PP^{-1}A^nPP^{-1}=A^n$。

#### 化简矩阵乘法

[CF923E](https://www.luogu.com.cn/problem/CF923E)

0-index，求 $A^m$，$a_{i,j}=\frac{1}{j}[j\ge i]$，$n\le 10^5$。

手解矩阵对角化。

特征多项式：$f(x)=\prod (x-a_{i,i})$，特征值 $x=1,\dotsb,\frac{1}{n+1}$。

带入特征值解特征向量，形如 $(x-\frac{1}{i+1})\alpha_i-x\alpha_{i+1}=0$。解得 $x=\frac{1}{i+1}$ 对应的特征向量第 $j$ 维为 $(-1)^{j-i}\binom{j}{i}$。

令矩阵 $p_{i,j}=(-1)^{j-i}\binom{j}{i}$，则 $P^{-1}AP=B=\begin{bmatrix}\frac{1}{1}&&\\&\ddots&\\&&\frac{1}{n+1}\end{bmatrix}$。则 $A^n=PB^nP^{-1}$。

$P$ 实际上为 $f_i=\sum_{j\ge i}(-1)^{j-i}\binom{j}{i}g_j$，由二项式定理，$g_i=\sum_{j\ge i}\binom{j}{i}f_i$，则 $p^{-1}_{i,j}=\binom{j}{i}$。这些左乘矩阵都可以 $O(n\log n)$ 卷积计算。

### [特征多项式](https://www.luogu.com.cn/problem/P7776)

代入 $0,\dotsb,n$ 插值，复杂度 $O(n^4)$。

对于初等可逆矩阵 $P$，$det(xI-PAP^{-1})=det(PxIP^{-1}-PAP^{-1})=det(P(xI-A)P^{-1})=det(xI-A)$。称 $B=PAP^{-1}$ 为相似矩阵，相似矩阵特征多项式相同。

尝试仿高斯消元。左乘初等矩阵为行变换，右乘初等矩阵为列变换，初等矩阵的逆表示逆操作。但是对行和列同时变换导致无法消为上三角矩阵。称 上海森堡矩阵 为 所有 $i>\bm{j+1}$ 的 $a_{i,j}$ 都为 $0$ 的矩阵。对位置 $(i+1,i)$ 消元可以得到 上海森堡矩阵。

递推。设 $f_i(x)$ 为前 $i$ 行 $i$ 列的特征多项式。展开 $i$ 行 $i$ 列，剩下的部分可以递归左上角且右下角主对角线下为 $0$。

$$f_i(x)=(x-a_{i,i})f_{i-1}(x)-\sum_{j=1}^{i-1}((a_{j,i}\prod_{k=j+1}^i a_{k,k-1})f_{j-1}(x))$$

复杂度 $O(n^3)$。