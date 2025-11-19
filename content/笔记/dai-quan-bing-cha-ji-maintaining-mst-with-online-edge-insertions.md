---
title: '带权并查集：Maintaining mst with online edge insertions'
date: 2025-11-18 22:37:11
tags: [tricks,图论,数据结构]
published: true
hideInList: false
feature: 
isTop: false
---
已完成今日 [Maintaining mst with online edge insertions — no LCT needed](https://codeforces.com/blog/entry/130107) 大学习。

> 在线，只加边，维护最小生成树，小常数 $O(\log n)$。

还有一个严格证明复杂度的[论文](https://arxiv.org/pdf/2504.04619)，会快一点，但难写一点。

---

如果按边权升序加入，可以维护按秩合并的并查集，$O(\log n)$ 跳 lca。

尝试在随意加边的过程中维护上述结构。

加入边 $(u,v,w)$ 时，从 $u$ 和 $v$ 开始跳父亲，找到 $w$ 时刻 $u$ 和 $v$ 的根，连起来。此时会破坏本来 $u$ 继续往上的部分，递归添加 $u$ 和 $u$ 原来的父亲。

此时并查集中边权可能不是递增的：在跳父亲的时候折叠起所有边权更小的边。

此时无法按秩合并：按随机权值合并。

此时可能需要替换原 $(u,v)$ 路径的最大边：可以直接删掉。

深度依然是 $O(\log n)$。

如果边权相同，可以加个 pair 让他们不同。

此时的连通块大小也可以维护。

---

问号？？？

为啥对？？？

---

code：

```cpp
mt19937 rnd(time(0));
struct weightdsu{
	int fa[maxn],rd[maxn];pii val[maxn];
	int siz[maxn];
	weightdsu(int n){
		for(int i=1;i<=n;i++)fa[i]=i,rd[i]=rnd(),val[i]={inf,inf};
	}
	int fd(int u,pii w={inf-1,inf}){
		while(val[u]<=w){
			while(val[fa[u]]<=val[u]){
				// siz[fa[u]]-=siz[u];
				fa[u]=fa[fa[u]];
			}
			u=fa[u];
		}
		return u;
	}
	void del(int u){
		// if(fa[u]==u)return ;
		// del(fa[u]);siz[fa[u]]-=siz[u];
	}
	int ins(int u,pii w={inf-1,inf}){
		while(val[u]<=w){
			// siz[fa[u]]+=siz[u];
			u=fa[u];
		}
		return u;
	}
	void merge(int u,int v,pii w){
		del(u),del(v);
		while(u!=v){
			u=ins(u,w),v=ins(v,w);
			if(rd[u]<rd[v])swap(u,v);
			swap(fa[u],v),swap(val[u],w);
		}
		ins(u);
	}
	pii max_path(int u,int v){
		int uu=fd(u),vv=fd(v);
		if(uu!=vv)return {inf,-1};
		if(val[u]>val[v])swap(u,v);
		while(fa[u]!=v){
			u=fa[u];
			if(val[u]>val[v])swap(u,v);
		}
		return val[u];
	}
	pii del_path(int u,int v){
		int uu=fd(u),vv=fd(v);
		if(uu!=vv)return {inf,-1};
		if(val[u]>val[v])swap(u,v);
		while(fa[u]!=v){
			u=fa[u];
			if(val[u]>val[v])swap(u,v);
		}
		v=u;
		while(fa[v]!=v){
			// siz[fa[v]]-=siz[v];
			v=fa[v];
		}
		fa[u]=u;
		pii res={inf,inf};swap(res,val[u]);
		return res;
	}
	pii add_edge(int u,int v,pii w){
		pii res=del_path(u,v);
		if(res<=w)swap(res,w);
		merge(u,v,w);
		return res;
	}
};
```

