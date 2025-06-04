---
title: 'abc337g 题解'
date: 2023-12-31 07:38:37
tags: [题解,图论]
published: true
hideInList: false
feature: 
isTop: false
---
[abc337g](https://www.luogu.com.cn/problem/solution/AT_abc337_g)

### 思路

固定 $w$，将树分为子树内外两部分，分别考虑子树内到子树外，子树外到子树内，两个儿子之间的贡献。

需要支持查询 $u$ 子树内比 $u$ 大的数的个数，做子树加。后半部分可以 dfn 序上线段树区间加，前面部分没想到从小到大加入 $w$，直接用权值线段树合并。复杂度 $O(n\log n)$。

不知道为什么线段树合并 $32$ 倍空间 RE 了，挂了两发。

### code

```cpp
int n,m;
int head[maxn],tot;
struct edgend{
	int nxt,to;
}e[maxn<<1];
void add(int u,int v){e[++tot]={head[u],v};head[u]=tot;}
namespace sgt{
#define mid (l+r>>1)
#define ls nd<<1
#define rs nd<<1|1
	int tree[maxn<<2],tag[maxn<<2];
	void push(int nd,int l,int r){
		tree[ls]+=(mid-l+1)*tag[nd],tag[ls]+=tag[nd];
		tree[rs]+=(r-mid)*tag[nd],tag[rs]+=tag[nd];
		tag[nd]=0;
	}
	void updata(int nd,int l,int r,int ql,int qr,int w){
		if(ql>qr)return ;
		if(l>=ql&&r<=qr){
			tree[nd]+=(r-l+1)*w;tag[nd]+=w;
			return ;
		}
		if(tag[nd])push(nd,l,r);
		if(ql<=mid)updata(ls,l,mid,ql,qr,w);
		if(qr>mid)updata(rs,mid+1,r,ql,qr,w);
		tree[nd]=tree[ls]+tree[rs];
	}
	int query(int nd,int l,int r,int p){
		if(l==r)return tree[nd];
		if(tag[nd])push(nd,l,r);
		if(p<=mid)return query(ls,l,mid,p);
		else return query(rs,mid+1,r,p);
	}
#undef mid
#undef ls
#undef rs
}
int dfn[maxn],idx,rnk[maxn],siz[maxn];
void dfs(int u,int fa){
	rnk[dfn[u]=++idx]=u;siz[u]=1;
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;
		if(v==fa)continue;
		dfs(v,u);siz[u]+=siz[v];
	}
}
namespace tr{
#define mid (l+r>>1)
#define ls lc[nd]
#define rs rc[nd]
	int rt[maxn],idx;
	int tree[maxn<<6],lc[maxn<<6],rc[maxn<<6];
	void updata(int &nd,int l,int r,int p,int w){
		if(!nd)nd=++idx;
		if(l==r){tree[nd]+=w;return ;}
		if(p<=mid)updata(ls,l,mid,p,w);
		else updata(rs,mid+1,r,p,w);
		tree[nd]=tree[ls]+tree[rs];
	}
	int merge(int u,int v,int l,int r){
		if(!u||!v)return u|v;
		int nd=++idx;
		if(l==r){tree[nd]=tree[u]+tree[v];return nd;}
		ls=merge(lc[u],lc[v],l,mid);
		rs=merge(rc[u],rc[v],mid+1,r);
		tree[nd]=tree[ls]+tree[rs];
		return nd;
	}
	int query(int nd,int l,int r,int ql,int qr){
//		if(!nd)return 0;
		if(ql>qr)return 0;
		if(l>=ql&&r<=qr)return tree[nd];
		if(qr<=mid)return query(ls,l,mid,ql,qr);
		if(ql>mid)return query(rs,mid+1,r,ql,qr);
		return query(ls,l,mid,ql,qr)+query(rs,mid+1,r,ql,qr);
	}
}
void dfs2(int u,int fa){
	tr::updata(tr::rt[u],1,n,u,1);
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;
		if(v==fa)continue;
		dfs2(v,u);
		int num=tr::query(tr::rt[v],1,n,1,u-1);
		sgt::updata(1,1,n,dfn[u]+1,dfn[v]-1,num);sgt::updata(1,1,n,dfn[v]+siz[v],dfn[u]+siz[u]-1,num);
		tr::rt[u]=tr::merge(tr::rt[u],tr::rt[v],1,n);
	}
	int num=tr::query(tr::rt[u],1,n,1,u-1);
//	cout<<u<<" "<<num<<" ";
	sgt::updata(1,1,n,1,dfn[u],num);sgt::updata(1,1,n,dfn[u]+siz[u],n,num);
	num=u-1-tr::query(tr::rt[u],1,n,1,u-1);
//	cout<<num<<"\n";
	sgt::updata(1,1,n,dfn[u],dfn[u]+siz[u]-1,num);
	
}
int ans[maxn];
void work(){
	n=read();
	for(int i=1;i<n;i++){
		int u=read(),v=read();
		add(u,v);add(v,u);
	}
	dfs(1,0);
	dfs2(1,0);
	for(int i=1;i<=n;i++)ans[rnk[i]]=sgt::query(1,1,n,i);
	for(int i=1;i<=n;i++)printf("%lld ",ans[i]);
}
```