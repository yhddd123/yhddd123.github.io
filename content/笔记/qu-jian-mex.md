---
title: '区间 mex'
date: 2025-09-16 21:56:52
tags: [笔记,数据结构]
published: true
hideInList: false
feature: 
isTop: false
---

### 区间 mex 在平面上的矩形个数 $O(n)$。

$r$ 从 $n$ 到 $1$，set 维护 $mex(l,r)$ 的连续段，单调递减。删去 $a_r$ 即 $mex$ 对 $a_r$ 取 min，即区间推平。

### 极小 mex 区间 $2n$ 个

只考虑 $a_l>a_r$ 的极小 mex 区间。设 $[l,r]$ 是，则 $mex(l,r)\ge a_l>a_r$。若存在 $r'>r$ 且 $[l,r']$ 也是，$mex(l,r)\ge a_l>a_{r'}$，$[l,r]$ 中有 $a_{r'}$，可以删去 $r'$，矛盾。

从小到大维护出 $mex(l,r)=i$ 的极小 mex 区间。对于一个 $mex(l,r)=i-1$，找到 $a_{pl}=a_{pr}=i$，拓展为 $(pl,r)$ 和 $(l,pr)$ 作为对应的 mex 的候选区间。对于 $mex=i$ 的候选区间，删掉不优的即可。

主席树维护在线询问。

在求出最小 mex 区间后，可以再类似区间推平得到极大 mex 区间。

这样等价于求出矩形 $l\in[l1,r1],r\in[l2,r2],mex=v$ 后的 $[r1,l2]$ 和 $[l1,r2]$，点数更小些。

### code

```cpp
int n,a[maxn];
struct node{
	int l,r,v,t;
	bool operator<(const node&tmp)const{return r<tmp.l;}
};
set<node> s;
bool vis[maxn];
int pos[maxn],pre[maxn];
vector<tuple<int,int,int,int,int>> b;
void work(){
	n=read();
	for(int i=1;i<=n;i++)a[i]=read();
	for(int i=n,mex=1;i;i--){
		vis[a[i]]=1;while(vis[mex])mex++;
		s.insert({i,i,mex,n});
	}
	for(int i=1;i<=n;i++)pre[i]=pos[a[i]],pos[a[i]]=i;
	for(int i=n;i;i--){
		{
		auto it=s.find({i,i,0,0});
		auto[l,r,v,t]=*it;s.erase(it);
		if(l<i)s.insert({l,i-1,v,t});
		b.pb({v,i,i,i,t});
		}
		if(pre[i]+1==i)continue;
		{
			auto it=s.find({pre[i]+1,pre[i]+1,0,0});
			auto[l,r,v,t]=*it;
			if(l<=pre[i]){
				s.erase(it);
				s.insert({l,pre[i],v,t});
				s.insert({pre[i]+1,r,v,t});
			}
		}
		auto it=s.find({pre[i]+1,pre[i]+1,0,0});
		int p=pre[i];
		while(it!=s.end()&&(*it).v>a[i]){
			auto[l,r,v,t]=(*it);it=s.erase(it);
			b.pb({v,l,r,i,t});p=r;
		}
		if(pre[i]+1<=p)s.insert({pre[i]+1,p,a[i],i-1});
	}
	for(auto[v,l1,r1,l2,r2]:b){
        
	}
}
```

[P13780](https://www.luogu.com.cn/problem/P13780)