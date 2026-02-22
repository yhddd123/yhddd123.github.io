---
title: 'P12118 题解'
date: 2025-04-13 15:49:48
tags: [题解,图论,数据结构]
published: true
hideInList: false
feature: 
isTop: false
---
[P12118](https://www.luogu.com.cn/problem/P12118)

会了 $O(q\sqrt n\log n)$ 后以为过不了就去晚自习了！不过不同的手法还是有巨大差别的。

### 思路

强制在线。删边分裂是最大的问题，考虑根号重构。

最开始想的是按时间分块，每 $B$ 个操作一块。每进入一块之前重构整个图。重构时，并查集加入部分之前的边，但不加入之前的边中前 $B$ 大的。加入删除时，不修改并查集，这样就算删边也删不到在图中的边。询问时，加入剩下的边，查询，再撤销，需要可撤销并查集。常数有点爆炸，口胡完就下播了。

后来又想到更好的重构方式。重构时，按边从小到大排序加入。加入时，把新边加入一个 set 中，不修改并查集。删除时，要么删 set 中一个元素，要么撤销最后一次并查集加边。当 set 中元素个数 $\ge B$ 时，把边重新排序，重构，这样至多 $\frac{q}{B}$ 次。

至于处理答案，即把连通块大小排序后两两配对，在并查集操作时修改每个并查集大小的数量。一开始想用权值线段树维护区间的 $(val,num)$，被卡常了。注意到只有 $O(\sqrt n)$ 种本质不同的 $siz$，直接维护是哪些数即可。

复杂度 $O(q\log n+q(B\log n+\sqrt n\log n)+\frac{q}{B}n\log n)$。

### code

```cpp
int n,q;
int t[maxn],id[maxn],pos[maxn],idx,tmp[maxn];
void upd(int p,int w){
	t[p]+=w;
	if(t[p]==w)id[++idx]=p,pos[p]=idx;
	if(t[p]==0)pos[id[idx]]=pos[p],id[pos[p]]=id[idx],idx--;
}
void clr(){
	while(idx)t[id[idx]]=0,idx--;
}
int calc(){
	for(int i=1;i<=idx;i++)tmp[i]=id[i];
	sort(tmp+1,tmp+idx+1);
	int ans=0;
	for(int i=idx,op=0;i;i--)if(t[tmp[i]]&1)ans+=tmp[i]*(!op?1:-1),op^=1;
	return ans;
}
int f[maxn],siz[maxn];
int fd(int x){
	if(f[x]==x)return x;
	return fd(f[x]);
}
int st[maxm],tp;
void merge(int u,int v){
	u=fd(u),v=fd(v);
	if(u==v){st[++tp]=0;return ;}
	if(siz[u]<siz[v])swap(u,v);
	upd(siz[u],-1),upd(siz[v],-1);
	st[++tp]=v;f[v]=u,siz[u]+=siz[v];
	upd(siz[u],1);
}
void del(){
	int v=st[tp],u=f[st[tp]];tp--;
	if(!v)return ;
	upd(siz[u],-1);
	f[v]=v,siz[u]-=siz[v];
	upd(siz[u],1),upd(siz[v],1);
}
tuple<int,int,int> e[maxm],e1[maxm],e2[maxm];int m,m1,m2;
set<tuple<int,int,int>> s;
void init(){
	for(int i=1;i<=n;i++)f[i]=i,siz[i]=1;tp=0;
	clr();upd(1,n);
}
void rebuild(){
	m1=0;for(auto p:s)e1[++m1]=p;
	m2=0;for(int i=1;i<=m;i++)e2[++m2]=e[i];
	s.clear();
	int p=1,q=1;m=0;
	while(p<=m1&&q<=m2){
		if(e1[p]<=e2[q])e[++m]=e1[p++];
		else e[++m]=e2[q++];
	}
	while(p<=m1)e[++m]=e1[p++];
	while(q<=m2)e[++m]=e2[q++];
	init();
	for(int i=1;i<=m;i++)merge(get<1>(e[i]),get<2>(e[i]));
}
void work(){
	n=read();q=read();init();
	while(q--){
		char op=readc();
		if(op=='a'){
			int u=read(),v=read(),w=read();
			s.insert({w,u,v});
		}
		if(op=='r'){
			if(!s.size()||(*--s.end())<=e[m])del(),m--;
			else s.erase(--s.end());
		}
		if(op=='d'){
			if(s.size()>B)rebuild();
			int lst=tp;
			for(auto[w,u,v]:s)merge(u,v);
			printf("%d\n",calc());fflush(stdout);
			while(tp>lst)del();
		}
	}
}
```

