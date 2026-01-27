---
title: 'CF1386C 题解'
date: 2023-12-31 17:22:47
tags: [题解,数据结构,图论]
published: true
hideInList: false
feature: 
isTop: false
---
[CF1386C](https://www.luogu.com.cn/problem/CF1386C)

[P6684](https://www.luogu.com.cn/problem/P6684)

cf 上时限 $1$ 秒，洛谷 $2$ 秒。

### 思路

维护是否有奇环可用拓展域并查集。暴力复杂度 $O(mq)$。发现插入容易删除困难，用不删除的莫队，可撤销并查集，复杂度 $O((n+q)\sqrt m\log n)$。大概要 $5$ 秒左右，只能过洛谷上的前 $5$ 个子任务。

等价对于每个 $r$ 求最小的 $l$ 使得 $[1,l]$ 和 $[r,m]$ 的边能组成奇环。将边复制一遍接在后面，即对于每个 $i$ 求最小的 $p$ 使得 $[i,p]$ 间的边组成奇环。这里 $p$ 有单调性。依次求每个 $i$，每次右移 $p$，加入的这条边 $p$ 会在求 $[i,p]$ 时都有贡献。插入容易删除困难，用线段树分治。初始没有边，分治到 $i$ 时会对之后一个区间加入若干条边，一共加边 $m$ 次。总复杂度 $O(m\log^2 m)$。

不开 long long 就能过 cf。

### code

```cpp
int n,m,q;
pii g[maxn];
#define mid (l+r>>1)
#define ls nd<<1
#define rs nd<<1|1
vector<int> tree[maxn<<2];
void updata(int nd,int l,int r,int ql,int qr,int id){
	if(ql>qr)return ;
	if(l>=ql&&r<=qr){
		tree[nd].pb(id);
		return ;
	}
	if(ql<=mid)updata(ls,l,mid,ql,qr,id);
	if(qr>mid)updata(rs,mid+1,r,ql,qr,id);
}
int f[maxn],siz[maxn];
int fd(int x){
	if(f[x]==x)return x;
	return fd(f[x]);
}
int st[maxn<<5],tp,fl;
void merge(int x,int y){
	int u=fd(x),v=fd(y),uu=fd(x+n),vv=fd(y+n);
	if(u==v){
		fl=1;
		return ;
	}
	if(u!=vv){
		if(siz[u]<siz[vv])swap(u,vv);
		st[++tp]=vv;f[vv]=u,siz[u]+=siz[vv];
		if(siz[v]<siz[uu])swap(v,uu);
		st[++tp]=uu;f[uu]=v,siz[v]+=siz[uu];
	}
}
void del(){
	int u=st[tp];siz[f[u]]-=siz[u],f[u]=u;
	tp--;
}
int ans[maxn];
int p=1;
void dfs(int nd,int l,int r){
	int lst=tp,flag=fl;
	for(int i:tree[nd])merge(g[i].fi,g[i].se);
	if(l==r){
		while(p<=2*m&&!fl){
			merge(g[p].fi,g[p].se);
			updata(1,1,m+1,l+1,min(p,m+1),p);
			p++;
		}
		if(!fl)ans[l]=p;
		else ans[l]=p-1;
	}
	else dfs(ls,l,mid),dfs(rs,mid+1,r);
	while(tp>lst)del();
	fl=flag;
}
void work(){
	n=read();m=read();q=read();
	for(int i=1;i<=m;i++)g[i]={read(),read()},g[i+m]=g[i];
	for(int i=1;i<=2*n;i++)f[i]=i,siz[i]=1;
	dfs(1,1,m+1);
	while(q--){
		int l=read(),r=read();
		if(ans[r+1]<=m+l-1)puts("YES");
		else puts("NO");
	}
}
```