---
title: '组合数学'
date: 2025-10-11 09:13:58
tags: [笔记,数学]
published: true
hideInList: false
feature: 
isTop: false
---
1

### 第二类斯特林数

$\begin{Bmatrix}n \\ m\end{Bmatrix}$：$n$ 个元素放入 $m$ 个不区分非空盒子。

$$\begin{Bmatrix}n \\ m\end{Bmatrix}=\begin{Bmatrix}n-1 \\ m-1\end{Bmatrix}+m\begin{Bmatrix}n-1 \\ m\end{Bmatrix}$$

$$m^n=\sum_{i=0}^n\binom{n}{i}\begin{Bmatrix}n \\ i\end{Bmatrix}i!$$

$$\begin{Bmatrix}n \\ m\end{Bmatrix}=\frac{1}{m!}\sum_{i=0}^m(-1)^{m-i}\binom{m}{i}i^n$$

### 欧拉数

$\left\langle\begin{matrix}n \\ k\end{matrix}\right\rangle$：长为 $n$ 的排列且恰好 $k$ 个升高。

$$\left\langle\begin{matrix}n \\ k\end{matrix}\right\rangle=(k+1)\left\langle\begin{matrix}n-1 \\ k\end{matrix}\right\rangle+(n-k)\left\langle\begin{matrix}n-1 \\ k-1\end{matrix}\right\rangle$$

$$\left\langle\begin{matrix}n \\ m\end{matrix}\right\rangle=\sum_{i=0}^m(-1)^i\binom{n+1}{i}(m-i+1)^n$$

也可以钦定至少 $k$ 个上升，将 $n$ 个数分到 $n-k$ 个非空集合，容斥 $i$ 个空的。卷积两次。