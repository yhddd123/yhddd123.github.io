---
title: 'P11621 题解'
date: 2025-03-25 22:28:04
tags: [题解,数据结构]
published: true
hideInList: false
feature: 
isTop: false
---
[P11621 ](https://www.luogu.com.cn/problem/P11621)

### 思路

考虑每个修改对每个询问的贡献。

直接做询问矩形与修改三角形的交比较复杂。将一次修改差分为两个没有左边界的等腰三角形和两个没有左/下边界矩形，将询问差分为四个没有右/上边界的矩形。这样询问和修改的交都只是等腰三角形。

![[1742912986642.png]]

对于修改 ```1 x y w d```，差分成 $A(x+d-1,y)$ 和 $B(x-1,y+d)$ 为右下角的等腰三角形，和 $C(x-1,y+d-1)$ 和 $D(x-1,y-1)$ 为右上角的矩形。

考虑把修改/查询放在端点上，如果满足时间维、两个空间维的偏序关系就会有贡献，贡献可以拆为至多 $4$ 项。cdq 分治即可。

### code

```cpp
int q,id=1;
struct node{
	int x,y,w,t,op;
}upd1[maxn<<1],upd2[maxn<<1],a[maxn*6],b[maxn*6];
int lsh[maxn<<2],len,tot1,tot2,n;
int ans[maxn];
struct bit{
	int tree[maxn<<2];
	#define lb(x) (x&(-x))
	void upd(int x,int w){
		while(x<=len)tree[x]+=w,x+=lb(x);
	}
	int que(int x){
		int res=0;
		while(x)res+=tree[x],x-=lb(x);
		return res;
	}
	int que(int l,int r){return que(r)-que(l-1);}
}t0,t1,t2,t3;
void cdq1(int l,int r){
	if(l==r)return ;
	int mid=l+r>>1;
	cdq1(l,mid),cdq1(mid+1,r);
	auto cmp=[&](node u,node v){return u.x>v.x||(u.x==v.x&&u.y>v.y)||(u.x==v.x&&u.y==v.y&&u.op<v.op);};
	auto upd=[&](int x,int y,int w){
		t0.upd(y,w);
		t1.upd(y,x*w);
		t2.upd(y,x*x*w);
	};
	for(int i=mid+1,j=l;i<=r;i++){
		while(j<=mid&&cmp(a[j],a[i])){
			if(!a[j].op)upd(a[j].x,a[j].y,a[j].w);
			j++;
		}
		if(a[i].op){
			ans[a[i].t]+=a[i].w*(t2.que(a[i].y,len)-(a[i].x*2-3)*t1.que(a[i].y,len)+(a[i].x-1)*(a[i].x-2)*t0.que(a[i].y,len));
		}
		if(i==r){
			for(int k=l;k<j;k++)if(!a[k].op)upd(a[k].x,a[k].y,-a[k].w);
		}
	}
	for(int i=l,j=mid+1,p=l;i<=mid&&j<=r;){
		if(cmp(a[i],a[j]))b[p++]=a[i++];
		else b[p++]=a[j++];
		if(i==mid+1){
			while(j<=r)b[p++]=a[j++];
		}
		if(j==r+1){
			while(i<=mid)b[p++]=a[i++];
		}
	}
	for(int i=l;i<=r;i++)a[i]=b[i];
}
void cdq2(int l,int r){
	if(l==r)return ;
	int mid=l+r>>1;
	cdq2(l,mid),cdq2(mid+1,r);
	auto cmp=[&](node u,node v){return u.x>v.x||(u.x==v.x&&u.y<v.y);};
	auto upd=[&](int x,int y,int w){
		t0.upd(y,w);
		t1.upd(y,x*w);
		t2.upd(y,x*x*w);
	};
	for(int i=mid+1,j=l;i<=r;i++){
		while(j<=mid&&cmp(a[j],a[i])){
			if(!a[j].op)upd(a[j].x,a[j].y,a[j].w);
			j++;
		}
		if(a[i].op){
			ans[a[i].t]+=a[i].w*(t2.que(1,a[i].y-1)-(a[i].x*2-3)*t1.que(1,a[i].y-1)+(a[i].x-1)*(a[i].x-2)*t0.que(1,a[i].y-1));
		}
		if(i==r){
			for(int k=l;k<j;k++)if(!a[k].op)upd(a[k].x,a[k].y,-a[k].w);
		}
	}
	for(int i=l,j=mid+1,p=l;i<=mid&&j<=r;){
		if(cmp(a[i],a[j]))b[p++]=a[i++];
		else b[p++]=a[j++];
		if(i==mid+1){
			while(j<=r)b[p++]=a[j++];
		}
		if(j==r+1){
			while(i<=mid)b[p++]=a[i++];
		}
	}
	for(int i=l;i<=r;i++)a[i]=b[i];
}
void cdq3(int l,int r){
	if(l==r)return ;
	int mid=l+r>>1;
	cdq3(l,mid),cdq3(mid+1,r);
	auto cmp=[&](node u,node v){return u.x>v.x||(u.x==v.x&&u.y>v.y)||(u.x==v.x&&u.y==v.y&&u.op<v.op);};
	auto upd=[&](int x,int y,int w){
		t0.upd(y,w);
		t1.upd(y,x*w);
		t2.upd(y,lsh[y]*w);
		t3.upd(y,x*lsh[y]*w);
	};
	for(int i=mid+1,j=l;i<=r;i++){
		while(j<=mid&&cmp(a[j],a[i])){
			if(!a[j].op)upd(a[j].x,a[j].y,a[j].w);
			j++;
		}
		if(a[i].op){
			ans[a[i].t]+=2*a[i].w*(t3.que(a[i].y,len)-(a[i].x-1)*t2.que(a[i].y,len)-(lsh[a[i].y]-1)*t1.que(a[i].y,len)+(a[i].x-1)*(lsh[a[i].y]-1)*t0.que(a[i].y,len));
		}
		if(i==r){
			for(int k=l;k<j;k++)if(!a[k].op)upd(a[k].x,a[k].y,-a[k].w);
		}
	}
	for(int i=l,j=mid+1,p=l;i<=mid&&j<=r;){
		if(cmp(a[i],a[j]))b[p++]=a[i++];
		else b[p++]=a[j++];
		if(i==mid+1){
			while(j<=r)b[p++]=a[j++];
		}
		if(j==r+1){
			while(i<=mid)b[p++]=a[i++];
		}
	}
	for(int i=l;i<=r;i++)a[i]=b[i];
}
void work(){
	q=read();
	while(q--){
		int op=read();
		if(op==1){
			int x=read(),y=read(),d=read(),w=read();
			upd1[++tot1]={x+d-1,y,w,id,0},upd1[++tot1]={x-1,y+d,-w,id,0};
			upd2[++tot2]={x-1,y+d-1,-w,id,0},upd2[++tot2]={x-1,y-1,w,id,0};
			lsh[++len]=y,lsh[++len]=y+d,lsh[++len]=y+d-1,lsh[++len]=y-1;
		}
		else{
			int x=read(),u=read(),y=read(),v=read();
			a[++n]={x,y,1,id,1},a[++n]={u+1,v+1,1,id,1};
			a[++n]={x,v+1,(int)-1,id,1},a[++n]={u+1,y,(int)-1,id,1};
			lsh[++len]=y,lsh[++len]=v+1;
			++id;
		}
	}
	sort(lsh+1,lsh+len+1),len=unique(lsh+1,lsh+len+1)-lsh-1;
	for(int i=1;i<=tot1;i++)upd1[i].y=lower_bound(lsh+1,lsh+len+1,upd1[i].y)-lsh;
	for(int i=1;i<=tot2;i++)upd2[i].y=lower_bound(lsh+1,lsh+len+1,upd2[i].y)-lsh;
	for(int i=1;i<=n;i++)a[i].y=lower_bound(lsh+1,lsh+len+1,a[i].y)-lsh;
	for(int i=1;i<=tot1;i++)a[++n]=upd1[i];
	auto cmp=[&](node u,node v){
		return u.t<v.t||(u.t==v.t&&u.op<v.op)||(u.t==v.t&&u.op==v.op&&u.x>v.x)||(u.t==v.t&&u.op==v.op&&u.x==v.x&&u.y>v.y);
	};
	auto cmp1=[&](node u,node v){
		return u.t<v.t||(u.t==v.t&&u.op<v.op)||(u.t==v.t&&u.op==v.op&&u.x>v.x)||(u.t==v.t&&u.op==v.op&&u.x==v.x&&u.y<v.y);
	};
	sort(a+1,a+n+1,cmp);
	cdq1(1,n);
	for(int i=1;i<=n;i++)a[i].x=a[i].x+lsh[a[i].y];
	sort(a+1,a+n+1,cmp1);
	cdq2(1,n);
	for(int i=1;i<=n;i++)a[i].x=a[i].x-lsh[a[i].y];
	sort(a+1,a+n+1,[&](node u,node v){return u.op<v.op;});
	for(int i=1;i<=tot2;i++)a[i]=upd2[i];
	sort(a+1,a+n+1,cmp);
	cdq3(1,n);
	for(int i=1;i<id;i++)write((ans[i]<<1)>>2),puts("");
}
```



