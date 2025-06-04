---
title: 'A story of The Small P 题解'
date: 2023-12-31 22:25:54
tags: [题解,生成函数]
published: true
hideInList: false
feature: 
isTop: false
---
「2020-2021 集训队作业」A story of The Small P

### 题意

给定 $N, m, k$ ,求有多少个正整数序列 h 满足：

- h 的长度 $n$ 满足 $1\leq n\leq N$。
- $1\leq h_i\leq m$。
- 正好存在 $k$ 个 $i$ 满足 $h_i<h_{i+1}$。

答案模 $998244353$。

$2\leq N, m, k\leq 2^{19},(N-k+1)\times m\leq 2^{20}$。

### 思路

先想 dp 。求的可以看成有 $n−1−k$ 个位置不满足的序列个数。

因为 $(N − k + 1)\times m\leq 2^{20}$，设 $dp_{i,j,k}$ 表示前 $i$ 个值，有 $j$ 个不满足,结尾为 $k$。

$dp_{i,j,k}$ 的值转移到 $dp_{i+1,j,l},k\leq l$ 和 $dp_{i+1,j+1,l},j<m$。

令 $s=j\times m+k$，则 $dp_{i,s}$ 可以转移到 $dp_{i+1,s1},s+1\leq s1\leq s+m$。

---

写成生成函数。$dp_i=(x+...+x
^m)^i$。$dp_{i,s}$ 即为 $dp_i$ 在 $x^s$ 处的系数。

对于一个长度小于 $N$ 的序列，在后面补上 $N−n$ 个不满足。

可以写成：

$$\sum_{i=1}^N{((x+...+x^m)^i\times (x^m)^{N-i})}$$

$$=\frac{(x+...+x^m-x^m)\times \sum_{i=1}^N{((x+...+x^m)^i\times (x^m)^{N-i}})}{x+...+x^{m-1}}$$

$$=\frac{\sum_{i=1}^N{((x+...+x^m)^{i+1}\times (x^m)^{N-i}}-(x+...+x^m)^i\times (x^m)^{N-i+1})}{x+...+x^{m-1}}$$

$$=\frac{(x+...+x^m)^{N+1}-(x+...+x^m)\times (x^m)^{N+1}}{x+...+x^{m-1}}$$

$$=\frac{(x+...+x^m)^{N+1}-(x^m)^{N+1}}{x+...+x^{m-1}}-(x^m)^N$$

$$=x^N\times \frac{(1+...+x^{m-1})^{N+1}-(x^{m-1})^{N+1}}{1+...+x^{m-2}}-(x^m)^N$$

而答案即为 $x^{(N−1−k)∗m+1}...x^{(N−k)∗m}$ 项的系数之和。

---

设 $G(x)=1+...+x^{m-1},F(x)=G(x)^{N+1}=\sum{(f_i\times x^i)}$。

$$F'(x)=(N+1)G'(x)G(x)^N$$

$$F'(x)G(x)=(N+1)G'(x)F(x)$$

$$F'(x)=\sum i\times f_i\times x^{i-1}$$

$$G'(x)=\sum_{i=0}^{m-2}{(i+1)\times x^i}$$

对于 $x^n$ 对比系数：

$$\sum_{i=0}^{m-1}{(n-i+1)\times f_{n-i+1}}=\sum_{i=0}^{m-2}{(i+1)\times f_{n-i}}$$

$$(n+1)f_{n+1}=\sum_{i=1}^{m-1}{((N+2)\times i-n-1)f_{n-i+1}}$$

$$f_i=((n+2)\times ((i\times \sum_{j=1}^{m-1}{f_{i-j})}-\sum_{j=1}^{m-1}{((n-j+1)\times f_{n-j+1}}))-i\times \sum_{j=1}^{m-1}{f_{n-j+1}})\times inv_i$$

前缀和转移。

到这里可以算出 $(1+...+x^{m-1})^{N+1}-(x^{m-1})^{N+1}$ 的系数。

---

处理除法。

设 $g(x)=\frac{1}{1+...+x^{m-1}}=\sum (g_i\times x^i)$。

$$g_0=1$$

对于 $x^n$ 对比系数：

$$\sum_{i=0}^{m-1}{g_{n-i}}=0$$

$$g_i=\sum_{i=1}^{m-2}{g_{i-j}}$$


答案即为 $F(x)\times g(x)$ 的 $x^{(N−1−k)∗m+1-N}...x^{(N−k)∗m-N}$ 项系数和。

对于每个 $f_i$ 计算贡献：

$$ans=\sum_i {((\sum_{j=(N-k)\times m+1-i-N}^{(N-k)\times m+m-i-N}{g_j})\times f_i)}$$

end.