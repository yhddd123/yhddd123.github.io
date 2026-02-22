---
title: 'P10144 题解'
date: 2023-12-31 21:57:21
tags: [题解,数据结构]
published: true
hideInList: false
feature: 
isTop: false
---
[P10144](https://www.luogu.com.cn/problem/P10144)

考场上瞪了两个小时什么没想到，最后半小时想到一个不太一样的做法，写出来了但挂了。寄。

### 思路

记 $l=2\times L$。令 $i$ 取 $a_i$ 记为 $0$，取 $l-a_i$ 记为 $1$，写为 01 序列。

考虑取 $0/1$ 对 $l$ 的上下界的影响。分类讨论转移，以 $a_i<a_{i+1}$ 为例。

- $i$ 取 $0$，$i+1$ 取 $0$：没影响；

- $i$ 取 $0$，$i+1$ 取 $1$：$l>a_i+a_{i+1}$；

- $i$ 取 $1$，$i+1$ 取 $0$：$l<a_i+a_{i+1}$；

- $i$ 取 $1$，$i+1$ 取 $1$：不合法；

这样可能存在一个状态有两个转移，不知道哪边更优。

瞪了两个小时观察发现在一段连续上升或下降的区间，肯定会连着取 $a_i$ 或 $l-a_i$，即连续的 $00$ 或 $11$。而转角处向前向后其中一个间隔才可能存在 01 或 10。

然后发现并不存在一个状态得到两个交集非空且互不包含的转移，直接取两个的并即可。然后就可以用线段树维护区间左右两边的状态分别是什么。

考试的时候发现来不急了，写了二分右端点再线段树查询判断 $O(n\log^2 n)$，但 $a_i=a_{i+1}$ 注意到了但特判错了，寄。

考虑到右端点有单调性，从上一个答案向后判断即可，复杂度 $O(n\log n)$。

### code

```cpp
#define pii pair<int,int>

int n,a[maxn],ans;
struct nd{
	pii f[2][2];
}tree[maxn<<2];
void init(pii &u){
	if(u.first>=u.second)u=make_pair(inf,0);
}
void clr(nd &u){
	for(int i=0;i<2;i++){
		for(int j=0;j<2;j++)init(u.f[i][j]);
	}
}
pii mymin(pii u,pii v){
	init(u),init(v);
	return {max(u.first,v.first),min(u.second,v.second)};
}
pii mymax(pii u,pii v){
	init(u),init(v);
	return {min(u.first,v.first),max(u.second,v.second)};
}
nd merge(nd u,nd v){
	nd res;
	for(int i=0;i<2;i++){
		for(int j=0;j<2;j++){
			res.f[i][j]=mymax(mymin(u.f[i][0],v.f[0][j]),mymin(u.f[i][1],v.f[1][j]));
			init(res.f[i][j]);
		}
	}
	return res;
}
#define mid (l+r>>1)
#define ls o<<1
#define rs o<<1|1
void build(int o,int l,int r){
	if(l==r){
		tree[o].f[0][0]=tree[o].f[1][1]={inf,0};
		tree[o].f[0][1]={a[l]+a[l+1],inf};
		tree[o].f[1][0]={0,a[l]+a[l+1]};
		if(a[l]<a[l+1])tree[o].f[0][0]={0,inf};
		if(a[l]>a[l+1])tree[o].f[1][1]={0,inf};
		return ;
	}
	build(ls,l,mid),build(rs,mid+1,r);
	tree[o]=merge(tree[ls],tree[rs]);
	clr(tree[o]);
}
nd query(int o,int l,int r,int ql,int qr){
	if(l>=ql&&r<=qr)return tree[o];
	if(qr<=mid)return query(ls,l,mid,ql,qr);
	if(ql>mid)return query(rs,mid+1,r,ql,qr);
	nd res=merge(query(ls,l,mid,ql,qr),query(rs,mid+1,r,ql,qr));
	clr(res);
	return res;
}
bool check(int l,int r){
	nd res=query(1,1,n-1,l,r-1);
	for(int i=0;i<2;i++){
		for(int j=0;j<2;j++){
			if(res.f[i][j].first<res.f[i][j].second)return true;
		}
	}
	return false;
}
#undef mid

signed main(){
	n=read();
	for(int i=1;i<=n;i++)a[i]=read();
	build(1,1,n-1);
	for(int i=1,r=0;i<=n;i++){
		if(r<i)r=i;
		while(r<n&&check(i,r+1))r++;
		ans+=r-i;
		// cout<<i<<" "<<r<<"\n";
	}
	printf("%lld\n",ans);
}
```