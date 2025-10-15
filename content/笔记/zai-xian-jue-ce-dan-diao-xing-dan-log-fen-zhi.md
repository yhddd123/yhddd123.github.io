---
title: '在线决策单调性单 log 分治'
date: 2025-09-04 16:35:07
tags: [笔记,dp]
published: true
hideInList: false
feature: 
isTop: false
---
### 已完成今日 [簡易版 LARSCH Algorithm](https://noshi91.hatenablog.com/entry/2023/02/18/005856) 大学习

满足决策单调性的 dp 的优化。

离线：$f_i=\min_{j<i}g_j+w(j,i)$。

在线：$f_i=\min_{j<i}f_j+w(j,i)$。

#### 可能的做法：

分治 $(l,r,ql,qr)$，离线，$O(n\log n)$，下标访问连续，支持类莫队计算贡献。

二分队列，在线，$O(n\log n)$。

SMAWK，离线，$O(n)$。

以多一个 $\log n$ 的代价 cdq 分治，将分治或 SMAWK 转为处理在线问题。

### 简易版 LARSCH 算法

基于魔改的分治，可以在线， $O(n\log n)$，支持类莫队计算贡献，常数小，码量小。

分治 $sovle(l,r)$，要求：

- 进入时已经算完 $[0,l]$，已经得到 $f_r$ 只考虑 $[0,l]$ 的决策点。
- 离开时算完 $[l+1,r]$。

设 $p_i$ 表示当前已知信息下的决策点。

- 用 $j\in[p_l,p_r]$ 更新 $f_{mid}$，因为 $p_l\le p_{mid}\le p_r$，此时 $p_{mid}$ 和 $p_r$ 都表示只考虑 $[0,l]$ 的决策点。
- 递归 $sovle(l,mid)$，进入递归时符合要求。
- 用 $j\in [l+1,mid]$ 更新 $f_r$，此时 $p_r$ 表示只考虑 $[0,mid]$ 的决策点。
- 递归 $sovle(mid,r)$，进入递归时符合要求。

在递归到 $sovle(p-1,p)$ 时结束，此时 $f_r$ 已经考虑了 $[1,r-1]$ 的更新。

莫队的指针移动，两种移动分别做的话，每层 $O(n)$。

整个代码写起来和普通基本一样。

### code

```c++
struct ds{
    int l,r,ans;
    ds(){l=1,r=0;}
    ll que(int ql,int qr){
        while(r<qr)r++;
        while(l>ql)l--;
        while(r>qr)r--;
        while(l<ql)l++;
        return ans;
    }
}a[2];
void upd(int j,int i,int op){
	int nw=dp[j-1]+a[op].que(j,i)+w;
	if(nw<dp[i])dp[i]=nw,p[i]=j;
}
void sovle(int l,int r){
	if(l==r)return ;
	int mid=l+r>>1;
	for(int i=p[l];i<=p[r];i++)upd(i,mid,0);
	sovle(l,mid);
	for(int i=l;i<=mid;i++)upd(i,r,1);
	sovle(mid+1,r);
}
```



