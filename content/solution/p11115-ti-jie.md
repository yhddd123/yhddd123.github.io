---
title: 'P11115 题解'
date: 2025-11-28 14:53:39
tags: [题解,数据结构]
published: true
hideInList: false
feature: 
isTop: false
---
[P11115](https://www.luogu.com.cn/problem/P11115)

一坨。

询问是跟 X 轴相关的信息，扫描线 X 轴。数据结构维护 Y 轴信息，在 $i$ 处计算所有 $x2$ 为 $i$ 的 $(x1,x2)$ 对。

修改在矩形 X 轴边界进行。对 Y 轴维护当前被覆盖了几次，以及当前连续段最左在什么地方。即维护两个序列，每次对 $a$ 区间加/减 $1$，当 $a_i$ 从 $0\to 1$ 时，将 $b_i$ 赋值为 $c$。对区间维护最小值，和最小值对应的 $b_i$ 相关信息。类似历史极值的维护标记方式，维护加法标记 $tag$，加法过程中的最小值标记 $tmn$，最小值对应的赋值标记 $cov$。如果当前区间的最小值加上 $tmn$ 等于 $0$，就把最小值的 $b_i$ 赋值为 $cov$。

查询是在右边界删除一个矩形前，找到 $a[l,r]$ 中为 $1$ 的位置，统计左端点为 $b_i$ 的对。直接做复杂度会在类似 "井" 字形的时候爆炸。但是如果一直递归到 $a$ 的最小值对应的 $b_i$ 的最大最小值都相同的时候就直接加上 最小值个数 并返回，复杂度是对的。分析就是一共 $O(n)$ 个矩形，那就 $O(n)$ 个对，所有同一个右端点的对在 Y 轴形成 $O(n)$ 个连续段。

现在已经能找到所有的对和出现次数，对在 Y 轴的连续出现次数也是类似的。首先对每个区间维护 $len,num,pre,suf,ans$，即 $a$ 取到最小值的位置的连续段信息。在递归到 $a$ 最小值对应的 $b$ 全相同时，$ans$ 即为区间内最长连续段。然后考虑跨过线段树区间。把删除矩形按 Y 轴右端点排序，这样依次删除在 Y 轴上也是连续的。记录一下每个左端点的最后一个删除的位置和后缀的长度，再对每个区间记录一个取到最小值的左右端点 $pl,pr$ 和后缀 $lens$，合并一下即可。注意这个 $lens$ 不等于 $suf$，你有可能多次递归到同一个线段树区间就返回，但是你删除的是 $[pl,pr] $ 中取到最小值的位置，并且 $[pl,pr]$ 递增。

```cpp
int n;
struct nd{
	int l1,r1,l2,r2;
}a[maxn];
int lshx[maxn],lenx,lshy[maxn],leny;
vector<pii> add[maxn],del[maxn];
#define mid ((l+r)>>1)
#define ls nd<<1
#define rs nd<<1|1
struct node{
	int mn,num,vmn,vmx;
	int len,pre,suf,ans,pl,pr,lens;
}tree[maxn<<2];
node operator+(node u,node v){
	node res;res.mn=min(u.mn,v.mn);
	res.num=(u.mn==res.mn?u.num:0)+(v.mn==res.mn?v.num:0);
	res.vmn=min(u.mn==res.mn?u.vmn:inf,v.mn==res.mn?v.vmn:inf);
	res.vmx=max(u.mn==res.mn?u.vmx:0,v.mn==res.mn?v.vmx:0);
	res.len=u.len+v.len;
	if(u.mn<v.mn)res.pre=u.pre,res.suf=0,res.ans=u.ans,res.pl=u.pl,res.pr=u.pr,res.lens=u.lens;
	else if(v.mn<u.mn)res.pre=0,res.suf=v.suf,res.ans=v.ans,res.pl=v.pl,res.pr=v.pr,res.lens=v.lens;
	else{
		res.pre=(u.num==u.len?u.num+v.pre:u.pre),res.suf=(v.num==v.len?v.num+u.suf:v.suf);
		res.ans=max({u.ans,v.ans,u.suf+v.pre});
		res.pl=u.pl,res.pr=v.pr;res.lens=((v.lens==v.num&&v.lens==v.pre)?v.lens+u.suf:v.lens);
	}
	return res;
}
int tag[maxn<<2],tmn[maxn<<2],cov[maxn<<2];
void build(int nd,int l,int r){
	tree[nd]={0,lshy[r+1]-lshy[l],0,0,lshy[r+1]-lshy[l],lshy[r+1]-lshy[l],lshy[r+1]-lshy[l],lshy[r+1]-lshy[l],lshy[l],lshy[r+1]-1,lshy[r+1]-lshy[l]};tag[nd]=tmn[nd]=cov[nd]=0;
	if(l==r)return ;
	build(ls,l,mid),build(rs,mid+1,r);
}
void updt(int nd,int w,int mn,int c){
	if(tree[nd].mn==-mn)tree[nd].vmn=tree[nd].vmx=c,cov[nd]=c;
	tmn[nd]=min(tmn[nd],tag[nd]+mn);
	tree[nd].mn+=w;tag[nd]+=w;}
void down(int nd){
	updt(ls,tag[nd],tmn[nd],cov[nd]),updt(rs,tag[nd],tmn[nd],cov[nd]),tag[nd]=tmn[nd]=cov[nd]=0;
}
void updata(int nd,int l,int r,int ql,int qr,int w,int c){
	if(l>=ql&&r<=qr)return updt(nd,w,min(w,0),c);
	down(nd);
	if(ql<=mid)updata(ls,l,mid,ql,qr,w,c);
	if(qr>mid)updata(rs,mid+1,r,ql,qr,w,c);
	tree[nd]=tree[ls]+tree[rs];
}
int tim[maxn],suf[maxn],ed[maxn],mx[maxn];
bool vis[maxn];
int st[maxn],tp;
void query(int nd,int l,int r,int ql,int qr){
	if(tree[nd].mn>1)return ;
	if(l>=ql&&r<=qr){
		if(tree[nd].vmn==tree[nd].vmx){
			int c=tree[nd].vmn;
			if(!vis[c])st[++tp]=c,vis[c]=1;
			tim[c]+=tree[nd].num;
			int res=tree[nd].ans;
			if(ed[c]+1==tree[nd].pl)res=max(res,suf[c]+tree[nd].pre);
			else suf[c]=0;
			mx[c]=max(mx[c],res);
			if(tree[nd].lens){
				suf[c]=tree[nd].lens+((tree[nd].lens==tree[nd].num&&tree[nd].lens==tree[nd].pre)?suf[c]:0);
				ed[c]=tree[nd].pr;
			}
			return ;
		}
	}
	down(nd);
	if(ql<=mid)query(ls,l,mid,ql,qr);
	if(qr>mid)query(rs,mid+1,r,ql,qr);
}
vector<tuple<int,int,int,int>> ans;
int TT;
void work(){
	n=read();ans.clear();
	lenx=leny=0;for(int i=1;i<=n;i++){
		int l1=read(),l2=read(),r1=read(),r2=read();
		lshx[++lenx]=l1,lshx[++lenx]=r1+1;lshy[++leny]=l2,lshy[++leny]=r2+1;
		a[i]={l1,r1,l2,r2};
	}
	sort(lshx+1,lshx+lenx+1),lenx=unique(lshx+1,lshx+lenx+1)-lshx-1;
	sort(lshy+1,lshy+leny+1),leny=unique(lshy+1,lshy+leny+1)-lshy-1;
	for(int i=1;i<=lenx;i++)add[i].clear(),del[i].clear();
	for(int i=1;i<=n;i++){
		auto[l1,r1,l2,r2]=a[i];
		l1=lower_bound(lshx+1,lshx+lenx+1,l1)-lshx,r1=lower_bound(lshx+1,lshx+lenx+1,r1+1)-lshx-1;
		l2=lower_bound(lshy+1,lshy+leny+1,l2)-lshy,r2=lower_bound(lshy+1,lshy+leny+1,r2+1)-lshy-1;
		add[l1].pb({l2,r2}),del[r1+1].pb({l2,r2});
	}
	build(1,1,leny-1);
	for(int i=1;i<=lenx;i++){
		for(auto[l,r]:add[i])updata(1,1,leny-1,l,r,1,i);
		sort(del[i].begin(),del[i].end(),[&](pii u,pii v){return u.se<v.se;});
		for(auto[l,r]:del[i]){
			query(1,1,leny-1,l,r);
			updata(1,1,leny-1,l,r,-1,0);
		}
		for(int j=1;j<=tp;j++){
			int p=st[j];
			ans.pb({lshx[p],lshx[i]-1,tim[p],mx[p]});
			tim[p]=mx[p]=suf[p]=ed[p]=vis[p]=0;
		}tp=0;
	}
	// sort(ans.begin(),ans.end());
	write(ans.size());puts("");
	for(auto[l,r,t,k]:ans)write(l),putchar(' '),write(r),putchar(' '),write(t),putchar(' '),write(k),puts("");
}
```

