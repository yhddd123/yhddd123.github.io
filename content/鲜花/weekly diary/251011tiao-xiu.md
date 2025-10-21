---
title: '251011：调休'
date: 2025-10-11 21:39:38
tags: [嘴巴]
published: true
hideInList: false
feature: 
isTop: false
---
[[a-week|引言]]。

---

周三晚上回学校。

有一个造题任务，要造数据。我对着自己的做法卡，把且仅把自己给 hack 出时限了。发现几乎所有的通过做法都在随机数据下表现最劣，而我在随机数据下表现最好。最后我的数据总共 hack 掉了包括自己在内的 $10$ 份通过。

我阅读了别人的题解，只是自己的实现无法通过数据。想必大家阅读了我复读的别人的题解，不会有什么问题吧？话语的传递，在什么地方会出问题？

---

周四开始上学，到周六早上已经处于什么都不想干，坐等 ucup 完放学的状态了。此时，你突然告诉我，干脆周日也别回家了。

![[x2n63zki.webp]]

还是台风有实力，中间放了两天。

---

> Due to China's holiday adjustment system ("Tiaoxiu"), we added more time windows on Sunday. The last window of this stage will be ended 24 hours later than usual.

这周是 [[the-4th-universal-cup-zuo-ti-ji-lu-1#^416df2|The 4th Universal Cup. Stage 2: Grand Prix of Paris]]。

下午场。开场 1h 速通 $6$ 题，时间巨大优势，然后开始倒闭了。hla 从开始到 2.5h 才做出 L，龟在 D 又破防到 3.5h 才不知道怎么搞过去了。此时我大概已经会 I 了，但没看到题目中对线段删掉端点处 $10^{-5}$ 的部分，一直到 4:20 才过。hla 迅速声称会 J，也在 4:20 左右通过。

最后看 E，我马上猜出 $n^2$ 状态 $O(n)$ 的转移，龟去写 $n^2\log n$ 的决策单调性，最后没写出来。最后 1min 我决定交取前 $100$ 个转移的 $O(n^3)$，WA 了。结束后发现爆 inf 了，改了可以过。

---

今天研究了很久 [P14170](https://www.luogu.com.cn/problem/P14170)，充分证明了，我完全没有在状压图计数中独立做出任何一步的能力，哪怕是几乎已经把做法拍在脸上的最后一步。

> 给定 $n$ 个点 $m$ 条边的二分图，有 $p_{i,j}$ 的概率左部点 $i$ 和右部点 $j$ 有边，求二分图最大匹配的期望。
>
> $n,m\le 8$。

[[p14170-ti-jie|题解]]。