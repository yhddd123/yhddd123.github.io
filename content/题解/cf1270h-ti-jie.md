---
title: 'CF1270H 题解'
date: 2024-11-05 12:32:03
tags: [题解,数据结构]
published: true
hideInList: false
feature: 
isTop: false
---
[CF1270H](https://www.luogu.com.cn/problem/CF1270H)

暑假讲完，今天再考，一点印象都没有！完全没有任何观察，自己搞了 $O(n\log^2 n)$ 做法。

### 思路

找每个连通块的第一个数，显然是前缀最小值，那就维护前缀最小值的一部分然后楼房重建就好了。

具体来说，记录左儿子区间最后一个连通块开头位置 $p$，在右儿子区间二分出最大的 $pr$ 使得 $\min_{i=p}^{pr-1} a_i\le a_{pr}$，$[mid+1,pr]$ 的连通块开头位置都不要了。再在左儿子区间二分最小的 $pl$ 使得 $a_{pl}<\max_{i=p}^{pr}a_i$，$[pl,p-1]$ 的连通块开头位置都不要了。pushup 的复杂度 $O(\log n)$。

### code

```cpp
int n,q,a[maxn];
#define mid (l+r>>1)
#define ls nd<<1
#define rs nd<<1|1
int val[maxn<<2],mn[maxn<<2],mx[maxn<<2],pos[maxn<<2];
pii fdr(int nd,int l,int r,int w){
	if(mx[nd]<w)return {val[nd],l-1};
	if(l==r){
		return {0,l};
	}
	if(mx[rs]>w)return fdr(rs,mid+1,r,min(w,mn[ls]));
	pii res=fdr(ls,l,mid,w);
	return {val[nd]-val[ls]+res.fi,res.se};
}
int fdl(int nd,int l,int r,int w){
	if(mn[nd]>w)return val[nd];
	if(l==r)return 0;
	if(mn[ls]<=w)return fdl(ls,l,mid,max(w,mx[rs]));
	return val[nd]-val[rs]+fdl(rs,mid+1,r,w);
}
int quemx(int nd,int l,int r,int ql,int qr){
	if(l>=ql&&r<=qr)return mx[nd];
	if(qr<=mid)return quemx(ls,l,mid,ql,qr);
	if(ql>mid)return quemx(rs,mid+1,r,ql,qr);
	return max(quemx(ls,l,mid,ql,qr),quemx(rs,mid+1,r,ql,qr));
}
int quemn(int nd,int l,int r,int ql,int qr){
	if(l>=ql&&r<=qr)return mn[nd];
	if(qr<=mid)return quemn(ls,l,mid,ql,qr);
	if(ql>mid)return quemn(rs,mid+1,r,ql,qr);
	return min(quemn(ls,l,mid,ql,qr),quemn(rs,mid+1,r,ql,qr));
}
void up(int nd,int l,int r){
	mn[nd]=min(mn[ls],mn[rs]),mx[nd]=max(mx[ls],mx[rs]);
	pii res=fdr(rs,mid+1,r,quemn(ls,l,mid,pos[ls],mid));
	int p=res.se;val[nd]=res.fi+1;
	pos[nd]=(p==r?pos[ls]:pos[rs]);
	int num=fdl(ls,l,mid,quemx(nd,l,r,pos[ls],p));
	val[nd]+=num;
}
void build(int nd,int l,int r){
	if(l==r){
		val[nd]=1,mn[nd]=mx[nd]=a[l],pos[nd]=l;
		return ;
	}
	build(ls,l,mid),build(rs,mid+1,r);
	up(nd,l,r);
}
void updata(int nd,int l,int r,int p){
	if(l==r){
		val[nd]=1,mn[nd]=mx[nd]=a[l],pos[nd]=l;
		return ;
	}
	if(p<=mid)updata(ls,l,mid,p);
	else updata(rs,mid+1,r,p);
	up(nd,l,r);
}
void work(){
	n=read();q=read();
	for(int i=1;i<=n;i++)a[i]=read();
	build(1,1,n);
	while(q--){
		int u=read();a[u]=read();
		updata(1,1,n,u);
		write(val[1]),puts("");
	}
}
```