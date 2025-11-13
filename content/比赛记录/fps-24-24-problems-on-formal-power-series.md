---
title: 'FPS 24: 24 Problems on Formal Power Series'
date: 2025-11-13 22:07:19
tags: [做题记录,数学]
published: true
hideInList: false
feature: 
isTop: false
---
[FPS 24: 24 Problems on Formal Power Series](https://atcoder.jp/contests/fps-24/tasks)

#### [A - Snack](https://atcoder.jp/contests/fps-24/tasks/fps_24_a)

$$[x^n](x+x^3+x^4+x^6)^d$$

#### [B - Tuple of Integers](https://atcoder.jp/contests/fps-24/tasks/fps_24_b)

组合意义等价于 $x+y=n$ 的方案数，$n+1$。

#### [C - Sequence](https://atcoder.jp/contests/fps-24/tasks/fps_24_c)

$$[x^s](1+\ldots+x^m)^n$$

#### [D - Sequence 2](https://atcoder.jp/contests/fps-24/tasks/fps_24_d)

枚举中间间隔长度。

$$\sum_i(m-n-i+1) [x^i](1+x^2+\ldots)^{n-1}$$

#### [E - Sequence 3](https://atcoder.jp/contests/fps-24/tasks/fps_24_e)

直接背包。

#### [F - Colored Paper](https://atcoder.jp/contests/fps-24/tasks/fps_24_f)

直接矩阵快速幂。

#### [G - Coin](https://atcoder.jp/contests/fps-24/tasks/fps_24_g)

直接背包、退背包。

#### [H - Jump](https://atcoder.jp/contests/fps-24/tasks/fps_24_h)

枚举有 $i$ 个额外的 $(0,b)$，且 $n$ 次 $(1,b)$ 共向上 $j$。

$$\sum \binom{n+i}{n}\binom{j+n-1}{n-1}\binom{m-j-1}{i-1}$$

#### [I - Score](https://atcoder.jp/contests/fps-24/tasks/fps_24_i)

$$[x^k]\prod (1+a_ix)$$

#### [J - Sugoroku](https://atcoder.jp/contests/fps-24/tasks/fps_24_j)

$$f_i=\sum f_ja_{i-j}$$

#### [K - Permutation](https://atcoder.jp/contests/fps-24/tasks/fps_24_k)

容斥 $k$ 个爆掉，$(-1)^k$。每拼上一段乘 $(-1)len!$。

$$f_i=\sum -f_j(i-j)!$$

#### [L - Permutation 2](https://atcoder.jp/contests/fps-24/tasks/fps_24_l)

长为 $l$ 的置换环方案数 $(l-1)!$，exp 起来。

$$n![x^n]exp(\sum \frac{(i-1)!x^i}{i!})$$

#### [M - Connected Graph](https://atcoder.jp/contests/fps-24/tasks/fps_24_m)

[[tu-ji-shu#^ef77b7|here]]

$$f_i=2^\frac{i(i-1)}{2}\sum \binom{i-1}{j-1}f_j2^\frac{(i-j)(i-j-1)}{2}$$

#### [N - Coin 2](https://atcoder.jp/contests/fps-24/tasks/fps_24_n)

$$[x^n]\prod \frac{1-x^{i(a_i+1)}}{1-x^i}$$

先 ln 再 exp。$ln(1-x)=\sum_{i\le 1}-\frac{x^i}{i}$。

#### [O - Rooted Tree](https://atcoder.jp/contests/fps-24/tasks/fps_24_o)

方案数是 $\frac{(n-2)!}{\prod (d_i-1)!}$。特判根节点度数。

$$(n-2)![x^{2n-2}](\sum_p \frac{1}{(p-1)!}x^p)(x+\sum_p \frac{1}{p!}x^{p+1})^{n-1}$$

