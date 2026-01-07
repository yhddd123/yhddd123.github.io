---
title: 'P11252 题解'
date: 2026-01-07 20:11:26
tags: [题解,构造]
published: true
hideInList: false
feature: 
isTop: false
---
[P11252](https://www.luogu.com.cn/problem/P11252)

加一个点就有 $n+1$ 个点 $n+n-3+3$ 条边，理论上已经可以造了。

有一个简单的多的做法吧。

找到 $p,p+1,p+2$ 两两右边，在它们中间放第 $n$ 个点。存在一种方法把这 $4$ 个点 $6$ 条边分为两组，使得 $p$ 和 $p+2$ 在两个树中都联通。

处理一下编号问题，递归解决：在当 $[l,r]$ 内的边已经确定、只有 $l$ 和 $r$ 有向外的边、两个生成树都使得 $l$ 和 $r$ 联通时处理剩下的部分。把 $r$ 所有出边划为一组，和这些出边组成三角剖分的剩下的边为另一组，就可以对以 $r$ 为端点的这些三角形递归到 $r$ 的对边。

![[Pasted image 20260107202742.png]]

```cpp
int n;
vector<int> e[maxn];
vector<array<int, 2>> t1,t2;
bool in(int u,int l,int r){return (l<=u&&u<=r)||(l<=u+n&&u+n<=r);}
void sovle(int l,int r){
	if(l+1==r)return ;
	rotate(e[r%n].begin(),upper_bound(e[r%n].begin(),e[r%n].end(),l%n),e[r%n].end());
	int lst=l;
	for(int x:e[r%n])if(in(x,l+1,r)){
		t1.pb({r%n,x});
		t2.pb({lst%n,x});
		sovle(lst,x+(x<l)*n);
		lst=x+(x<l)*n;
	}
}
void construct_two_trees(int N,vector<int> U,vector<int> V){
	n=N;
	for(int i=0;i<n;i++)e[i].pb((i+1)%n),e[(i+1)%n].pb(i);
	int p=0;
	for(int i=0;i<n-3;i++){
		int u=U[i],v=V[i];
		e[u].pb(v),e[v].pb(u);
		if(u>v)swap(u,v);
		if(u+2==v)p=u;
	}
	add_vertex(p,p+1,p+2);
	for(int i=0;i<n;i++)sort(e[i].begin(),e[i].end());
	t1.pb({p+1,n}),t1.pb({p,n}),t1.pb({p,p+2});
	t2.pb({p,p+1}),t2.pb({p+1,p+2}),t2.pb({p+2,n});
	sovle(p+2,p+n);
	report(t1);report(t2);
}
```