---
title: joisc 记录
date: 2025-12-16 18:28:05
tags:
  - 做题记录
published: true
hideInList: false
feature:
isTop: false
---
交互通信一边去。

### [joisc 2024](https://qoj.ac/category/334)

#### [Day 1 A. Fish 3](https://qoj.ac/contest/1633/problem/8640)

用 A 操作把序列变为不降，然后用 B。扫右端点，合并维护一些段会一起做 A 操作，区间加一次函数。

#### [Day 2 A. Board Game](https://qoj.ac/contest/1634/problem/8643)

对于 $2\sim k$，分别最小化代价。可以走到最近黑点然后每步代价为 $2$，也可以走到一对相邻黑点然后每步代价 $1$。对于第二种，走到一对相邻的需要 $x$ 步，经过了 $t$ 个黑点，在之后一个时间 $t'$，代价为 $t'-t+x$，对于 $t'<t$ 不优。于是对 $x-t$ 01 bfs 可以求出代价，差分维护一下可得 $a_1$ 走 $k$ 步时剩下的代价 $f_k$。

然后可以按 $k$ 根号分治。一个是最多走 $\frac{n}k$ 轮，一个是 $f(x)$ 是只有 $k$ 段的凸包。

但是可以直接 记 $(u,k,d)$ 然后 spfa。注意到对于每个 $u$，$(k,d)$ 的凸包两维都是 $O(n)$ 的，只有 $O(n^{\frac{2}{3}})$ 个整点。

#### [Day 2 C. Growing Vegetables is Fun 5](https://qoj.ac/contest/1634/problem/8645)

二分答案。若 $a_i$ 能匹配 $b[l_i,r_i]$ 中的元素，枚举一个半圆起点 $x$，要求对于 $\forall i\in [x,x+n)$，$[x,x+n)$ 中小于 $i$ 的元素个数在 $[l_i-1,r_i-1]$ 之间。对相同的 $a_i$ 安排顺序。

对于一个 $i$，合法的 $x$ 是 $O(1)$ 个区间，差分给该区间加 $1$。

#### [Day 3 A. Card Collection](https://qoj.ac/contest/1635/problem/8646)

^df6867

你说的对。

但是，可以 [[you-xian-zhuang-tai-zi-dong-ji|建自动机]]，字符集只有 $\{-1/0/1,-1/0/1\}$ $|\sum|=9$，发现 $|A|\le 24$。

然后可以直接做吗，分块。每块只有 $(2B+1)^2$ 种本质不同的 $(x,y)$，等价类分治，$O(B^2|A|)$ 预处理一个块每个状态进来出去是什么？每次查询 $O(\frac{n}{B})$。没太懂。

继续观察 DFA。是 DAG。最长路 $<8$。

那就做 $8$ 次，每次找到非自环走出去。找到某种状态离当前最近的一个，离线，对 $a_i$ 扫描线，线段树下标 $i$，维护 $b_i$，线段树二分。

#### [Day 4 A.Escape Route 2](https://qoj.ac/contest/1636/problem/8649)

确定一个航班即可确定下一个选哪个。

根号分治。一个是枚举第一个航班，剩下的倍增。一个是枚举航班数多余 $B$ 的天，直接递推。

#### [Day 4 C. Table Tennis](https://qoj.ac/contest/1636/problem/8641)

[[p10441-ti-jie|here]]。

### [joisc 2025](https://qoj.ac/category/420)

#### [Day 1 A. Exhibition 3](https://qoj.ac/contest/2061/problem/11401)

^912b96

按画价值排序，依次贪心。设有 $c$ 个价值为 $v$，按 $1\sim m$ 的顺序决策选一个集合的区间，使得可以由 $c$ 个点覆盖集合内所有区间，然后把选出来的删掉。用 选出元素个数 相关复杂度解决每个 $c$。

先计算选了的最长前缀多长，倍增，每次 $O(n\log n)$ check，复杂度 $O(n\log^2n)$。

现在已经有一些区间，限制住了 $c$ 个点可以落在哪里 $[pl_i,pr_i]$。再从目前没有选过的且与 $[pl,pr]$ 有交的 $[l,r]$ 中招编号最小的加进去。如果 $[l,r]$ 包含 $[pl,pr]$，可以直接加入。如果 $[l,r]$ 与 $[pl,pr]$ 无交，则不能加入。否则若 $[l,r]$ 只与一个 $[pl,pr]$ 有交，那么 $[pl,pr]$ 会对 $[l,r]$ 取交。否则 $[l,r]$ 与相邻的 $[pl,pr]$ 有交，当之后其中一个的范围有变化时，可能使另一个的边界缩小。

线段树+set 维护所有与一个区间有交的区间。对每个 $[pl,pr]$ 取出这样最小的 $[l,r]$，加入一个优先队列依次决策。决策一个后面的区间可能会缩小某个 $[pl,pr]$，进而影响之前的 $[l,r]$ 对相邻 $[pl,pr]$ 的限制。优先队列，dfs。

#### [Day 1 C. Bitaro's Travel 2](https://qoj.ac/contest/2061/problem/11403)

出了最后一步，每个点会往能去到的最高的点跳。每个点能去到一个连通块，形成重构树。

按高度从小往大加点，并查集维护。

#### [Day 2 A. Ambulance](https://qoj.ac/contest/2062/problem/11404)

一定有两个分界线，前缀去左上，后缀去右下之类。

枚举第一条分界线，对两边分别做第二条分界线的决策，再合并起来。复杂度 $O(n^2T)$。

#### [Day 2 B. Collecting Stamps 4](https://qoj.ac/contest/2062/problem/11405)

每个 AABB 对不合法，每次交换必然能消除一对。

二位数点。

#### [Day 3 A. Bitaro the Brave 3](https://qoj.ac/contest/2063/problem/11407)

费用流。

模拟费用流，优先流权值大的，不会退流。

按权值分层，对于一层流量全部相同的，变为二分图最大匹配，hall 定理，$ans=|L|-\max_S |S|-|N(S)|$。这样相当于选一个后缀，关于 $l$ 形成凸包。

$n$ 层每层 $n$ 条边的凸包，建出来后差分合并。

#### [Day 4 B. Migration Plan](https://qoj.ac/contest/2064/problem/11411)

按 dep 建线段树，dfn 为下标。线段树合并，区间查询。

#### [Day 4 C. Uiro](https://qoj.ac/contest/2064/problem/11412)

对于一个选的 $x$ 后面的 $\le x$ 的都要选。每个值选的位置都是后缀且递减。

从小到大对每个值贪，st 表维护最小值然后二分。