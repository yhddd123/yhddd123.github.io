---
title: 'P11754 题解'
date: 2025-02-19 18:43:47
tags: [题解,数据结构]
published: true
hideInList: false
feature: 
isTop: false
---
[P11754](https://www.luogu.com.cn/problem/P11754)

人都傻了。

### 思路

重标号 $>0$ 的元素，所以操作可以认为直接从左到右。对于每个 $a_i=0$ 的点可以选择：赋值 $-1$，不操作，赋值为 $x$（但是编号不区分）。所以答案等价于 $3^{cnt0}$。

离散化后线段树维护每个区间 $0$ 的个数。

### code

```cpp
int n,q;
inline int ksm(int a,int b=mod-2){
	int ans=1;
	while(b){
		if(b&1)ans=ans*a%mod;
		a=a*a%mod;
		b>>=1;
	}
	return ans;
}
int lsh[maxn],len;
pii que[maxn];
#define mid (l+r>>1)
#define ls nd<<1
#define rs nd<<1|1
int tree[maxn<<2][2],rev[maxn<<2];
void build(int nd,int l,int r){
	tree[nd][0]=lsh[r+1]-lsh[l];
	if(l==r)return ;
	build(ls,l,mid),build(rs,mid+1,r);
}
void upd(int nd){swap(tree[nd][0],tree[nd][1]),rev[nd]^=1;}
void down(int nd){upd(ls),upd(rs),rev[nd]=0;}
void updata(int nd,int l,int r,int ql,int qr){
	if(l>=ql&&r<=qr)return upd(nd);
	if(rev[nd])down(nd);
	if(ql<=mid)updata(ls,l,mid,ql,qr);
	if(qr>mid)updata(rs,mid+1,r,ql,qr);
	tree[nd][0]=tree[ls][0]+tree[rs][0];
	tree[nd][1]=tree[ls][1]+tree[rs][1];
}
void work(){
	n=read();q=read();
	for(int i=1;i<=q;i++){
		int u=read(),v=read();
		que[i]={u,v};
		lsh[++len]=u,lsh[++len]=v+1;
	}
	lsh[++len]=1;lsh[++len]=n+1;
	sort(lsh+1,lsh+len+1);len=unique(lsh+1,lsh+len+1)-lsh-1;
	len--;build(1,1,len);
	for(int i=1;i<=q;i++){
		auto[l,r]=que[i];
		l=lower_bound(lsh+1,lsh+len+2,l)-lsh;
		r=lower_bound(lsh+1,lsh+len+2,r+1)-lsh-1;
		updata(1,1,len,l,r);
		printf("%lld\n",ksm(3,tree[1][0]));
	}
}
```

