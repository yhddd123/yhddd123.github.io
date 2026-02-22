---
title: 异或卷积
date: 2026-01-21 22:17:28
tags:
  - 专题
  - 数学
published: true
hideInList: false
feature:
isTop: false
---
$$x^S\times x^T=x^{S\oplus T}$$ 

$$FWT_S(F(x))=\sum_T (-1)^{|S\&T|}F_T(x)$$

$$IFWT_S(F(x))=\frac{1}{2^k}\sum_T (-1)^{|S\&T|}F_T(x)$$

对吗？

---

要优化就是展开 FWT，对吗？

#### [P5326](https://www.luogu.com.cn/problem/P5326)

直接高消：$f_S=\sum_i f_{S\oplus 2^i}p_i+1$。$f_S=\sum f_{S\oplus T}g_T+1$。$F(x)=F(x)G(x)+I(x)+C(x)$。

其中 $g_{2^i}=p_i$，$I_S=1$，$C_0=c$，用于调整使 $f_{\empty}=0$。

$$FWT(F(x))(1-FWT(g(x)))=FWT(I(x))+FWT(C(x))$$

在 $S=\empty$ 时，$FWT_\empty(G(x))=1$，$FWT_\empty(I(x))=2^n$，所以 $c=-2^n$。

在 $S=\empty$ 的时候，$f_\empty=IFWT_{\empty}(FWT(F(x)))=0$，所以 $FWT_{\empty}(F(x))=-\sum_{S\neq 0}FWT_S(F(x))$。

否则一个 $FWT_S(F(x))=\frac{-2^n}{1-FWT_S(G(x))}$，一个 $IFWT_S(F(x))=\frac{1}{2^n}(\sum_T (-1)^{|S\&T|}\frac{-2^n}{2\sum_{j\in T}p_j}+\frac{2^n}{2\sum_{j\in T}p_j})$。

最后 $f_s=\sum_T\frac{[|S\&T|\bmod 2=1]}{\sum_{j\in T}p_j}$，dp 前 $i$ 个，$\sum p_j$，与 $S$ 的交集奇偶性。复杂度 $O(n\sum p)$。

---

异或求和二元卷积

以下涉及两种元的乘法，$x^i\times x^j=x^{i\oplus j}$，$y^i\times y^j=y^{i+j}$。

#### [CF1906K](https://www.luogu.com.cn/problem/CF1906K)

求 $[x^0]\prod(1+2x^{a_i})$。

对每个 $S$ 求出 $[x^S]FWT(\prod (1+2x^{a_i}))$ 再 IFWT 回去。

这个等于 $\prod_i [x^S]FWT(1+2x^{a_i})$，即 $\prod_i (1+2(-1)^{|S\&a_i|})$。

在这里不是 $-1$ 就是 $3$，即 $(-1)^{n-t_S}3^{t_S}$，这个 $t_S$ 可以通过对 $a_i$ 的出现次数 FWT 得到。

#### [abc367g](https://www.luogu.com.cn/problem/AT_abc367_g)

求 $[x^Sy^0]\prod (1+x^{a_i}y)$，这里 $y^i\times y^j=y^{(i+j)\mod m}$。

$[x^S]=[y^0]\prod(1+y(-1)^{|S\&a_i|})$，预处理 $(\prod (1\pm y))^k$，复杂度 $O(nm+V\log V)$。

#### [Q7856](https://qoj.ac/contest/1434/problem/7856)

求 $[x^Sy^B]\prod(1+x^{a_i}(y^2+2y+1))$。

FWT 之后对每个 $0\le t\le n$ 求 $[y^B](1-(y^2+2y+1))^{n-t}(1+(y^2+2^+1))^t$。

展开式子然后 ntt 即可。

#### [P13497](https://www.luogu.com.cn/problem/P13497)

先数不可重集 $h_i,(i\le |S|)$ 的方案数，即 $\sum_{a\in T}[x^ay^i]\prod_{b\in S}(1+x^by)$。

先 FWT，点乘，$f_s=[x^s]\prod_{b\in S}(1+y(-1)^{|s\&b|})$。

再展开一层，把所有 $f_s$ IFWT 回去，$h_i=\sum_{a\in T}g_a=\sum_{a\in T}\frac{1}{2^v}\sum_s f_s(-1)^{|S\& a|}$。

$$h_i=[y^i]\frac{1}{2^v}\sum_s \sum_{a\in T}(-1)^{|s\&a|}(1+y)^{ts_s}(1-y)^{|S|-ts_s}=\frac{1}{2^v}[y^i](|T|-tt_s)(1+y)^{ts_s}(1-y)^{|S|-ts_s}$$

$O(|S|)$ 二项式定理即可。

至于对 $2^{28}$ 的东西求 $ts_s=\sum_{a\in S}[|a\&s|\bmod 2=0]$，bitset，每次加一翻转一个后缀，预处理此时对每个 $a\in S$ 的影响。

---

怎么上面写的都是求 $|a\&S|\bmod 2$ 状物。

原来标题写的是异或，那其他 FWT 咋办。

一个 or 卷积的[[favourite-problem-set-1#^501544|好题]]。