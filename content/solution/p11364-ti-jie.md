---
title: 'P11364 题解'
date: 2024-12-01 20:05:35
tags: [题解,数据结构]
published: true
hideInList: false
feature: 
isTop: false
---
[P11364](https://www.luogu.com.cn/problem/P11364)

### 思路

考虑一个节点 $u$，和 $u$ 的叶子 $v$ 合并，贡献是若干个连续段对 $[l1,r1]$ 到 $[r1+1,r2]$ 的答案为 $dep_u$。由于 $[l1,r1]$ 内任选两点一定在 $u$ 子树中的某个点被贡献过，所以可以当成 $[l1,r2]$ 有 $dep_u$ 的贡献。对每个 $u$ 维护子树内连续段，启发式合并。因为每个贡献区间都是两个连续段合并起来，所以只有 $n-1$ 个长度 $>1$ 的区间和 $n$ 个单点。 ^ab7edb

单点可以用 st 表维护区间最大值，对 $k=1$ 的询问贡献。对于有贡献的区间和询问区间，分三类考虑。有贡献的区间左端点小于询问区间左端点，按 $l$ 从小到大扫描线，贡献加在 $r$ 上，查询 $l\le ql,r\in [ql+qk-1,qr]$ 的答案。有贡献的区间右端点大于询问区间右端点同理。否则 $ql\le l\le r\le qr$，按 $r-l+1$ 从大到小扫描线，贡献加在 $l$ 上，查询 $k\ge qk,l\in [ql,qr-qk+1]$ 的答案。 ^17f94f

复杂度 $O(n\log^2n)$，跑的飞快。

```cpp
int n,q;
int head[maxn],tot;
struct nd{
	int nxt,to;
}e[maxn<<1];
void add(int u,int v){e[++tot]={head[u],v};head[u]=tot;}
int ll[maxn],rr[maxn],kk[maxn],ans[maxn];
int dep[maxn];
set<pii> s[maxn];
struct node{
	int l,r,x;
}upd[maxn];
void ins(int u,pii p){
	auto it=s[u].lower_bound(p);
	pii del1,del2;
	if(it!=s[u].end()){
		pii pp=(*it);
		if(p.se+1==pp.fi){
			upd[p.se]={p.fi,pp.se,dep[u]};
			del1=pp;p.se=pp.se;
		}
	}
	if(it!=s[u].begin()){
		it--;pii pp=(*it);
		if(pp.se+1==p.fi){
			upd[pp.se]={pp.fi,p.se,dep[u]};
			del2=pp;p.fi=pp.fi;
		}
	}
	if(del1.fi)s[u].erase(del1);
	if(del2.fi)s[u].erase(del2);
	s[u].insert(p);
}
void dfs(int u,int fa){
	dep[u]=dep[fa]+1;
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;if(v==fa)continue;
		dfs(v,u);
	}
	ins(u,{u,u});
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;if(v==fa)continue;
		if(s[u].size()<s[v].size())swap(s[u],s[v]);
		for(pii p:s[v])ins(u,p);
	}
}
#define mid (l+r>>1)
#define ls lc[nd]
#define rs rc[nd]
int rt[maxn],idx;
int lc[maxn*100],rc[maxn*100],tree[maxn*100];
void modif(int &nd,int l,int r,int p,int w){
	int lst=nd;nd=++idx;tree[nd]=max(tree[lst],w),ls=lc[lst],rs=rc[lst];
	if(l==r)return ;
	if(p<=mid)modif(ls,l,mid,p,w);
	else modif(rs,mid+1,r,p,w);
}
int query(int nd,int l,int r,int ql,int qr){
	if(!nd||ql>qr)return 0;
	if(l>=ql&&r<=qr)return tree[nd];
	if(qr<=mid)return query(ls,l,mid,ql,qr);
	if(ql>mid)return query(rs,mid+1,r,ql,qr);
	return max(query(ls,l,mid,ql,qr),query(rs,mid+1,r,ql,qr));
}
vector<int> id[maxn];
int mx[20][maxn];
int quemx(int l,int r){
	int k=__lg(r-l+1);
	return max(mx[k][l],mx[k][r-(1<<k)+1]);
}
void work(){
	n=read();
	for(int i=1;i<n;i++){
		int u=read(),v=read();
		add(u,v),add(v,u);
	}
	q=read();
	for(int i=1;i<=q;i++)ll[i]=read(),rr[i]=read(),kk[i]=read();
	dfs(1,0);
	for(int i=1;i<=n;i++)mx[0][i]=dep[i];
	for(int j=1;j<20;j++){
		for(int i=1;i+(1<<j)-1<=n;i++)mx[j][i]=max(mx[j-1][i],mx[j-1][i+(1<<j-1)]);
	}
	for(int i=1;i<=q;i++)if(kk[i]==1)ans[i]=quemx(ll[i],rr[i]);
	for(int i=1;i<n;i++)id[upd[i].l].pb(i);
	for(int i=1;i<=n;i++){
		rt[i]=rt[i-1];
		for(int j:id[i])modif(rt[i],1,n,upd[j].r,upd[j].x);
	}
	for(int i=1;i<=q;i++){
		int l=ll[i],r=rr[i],k=kk[i];
		ans[i]=max(ans[i],query(rt[l],1,n,l+k-1,n));
	}
	while(idx)tree[idx]=lc[idx]=rc[idx]=0,idx--;
	for(int i=1;i<=n;i++)rt[i]=0;
	for(int i=1;i<=n;i++)id[i].clear();
	for(int i=1;i<n;i++)id[upd[i].r].pb(i);
	for(int i=n;i;i--){
		rt[i]=rt[i+1];
		for(int j:id[i])modif(rt[i],1,n,upd[j].l,upd[j].x);
	}
	for(int i=1;i<=q;i++){
		int l=ll[i],r=rr[i],k=kk[i];
		ans[i]=max(ans[i],query(rt[r],1,n,1,r-k+1));
	}
	while(idx)tree[idx]=lc[idx]=rc[idx]=0,idx--;
	for(int i=1;i<=n;i++)rt[i]=0;
	for(int i=1;i<=n;i++)id[i].clear();
	for(int i=1;i<n;i++)id[upd[i].r-upd[i].l+1].pb(i);
	for(int i=n;i;i--){
		rt[i]=rt[i+1];
		for(int j:id[i])modif(rt[i],1,n,upd[j].l,upd[j].x);
	}
	for(int i=1;i<=q;i++){
		int l=ll[i],r=rr[i],k=kk[i];
		ans[i]=max(ans[i],query(rt[k],1,n,l,r-k+1));
	}
	for(int i=1;i<=q;i++)printf("%lld\n",ans[i]);
}
```