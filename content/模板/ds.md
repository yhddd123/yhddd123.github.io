---
title: 'ds'
date: 2024-11-29 21:50:55
tags: []
published: true
hideInList: false
feature: 
isTop: false
---
## #数据结构

### 李超线段树

```cpp
struct line{
	db k,b;
}p[maxn];
db calc(int u,int x){return 1.0*(x*p[u].k+p[u].b);}
int tree[maxn<<1];
#define ls nd<<1
#define rs nd<<1|1
#define mid (l+r>>1)
void upd(int nd,int l,int r,int id){
	if(l==r){
		if(calc(id,l)-calc(tree[nd],l)>eps)tree[nd]=id;
		return ;
	}
	if(calc(id,mid)-calc(tree[nd],mid)>eps)swap(tree[nd],id);
	if(calc(id,l)-calc(tree[nd],l)>eps)upd(ls,l,mid,id);
	else upd(rs,mid+1,r,id);
}
void updata(int nd,int l,int r,int ql,int qr,int id){
	if(l>=ql&&r<=qr){
		upd(nd,l,r,id);
		return ;
	}
	if(ql<=mid)updata(ls,l,mid,ql,qr,id);
	if(qr>mid)updata(rs,mid+1,r,ql,qr,id);
}
int query(int nd,int l,int r,int p){
	if(l==r)return tree[nd];
	int res;
	if(p<=mid)res=query(ls,l,mid,p);
	else res=query(rs,mid+1,r,p);
	if(calc(tree[nd],p)-calc(res,p)>eps)return tree[nd];
	if(calc(tree[nd],p)-calc(res,p)<-eps)return res;
	return min(tree[nd],res);
}
```

### fhq treap

```cpp
struct fhq{
	int w[maxn],ls[maxn],rs[maxn],idx,rt;
	int siz[maxn],sz[maxn];
	void up(int u){
		siz[u]=siz[ls[u]]+siz[rs[u]]+sz[u];
	}
	int merge(int u,int v){
		if(!u||!v)return u|v;
		if(w[u]<w[v]){
			rs[u]=merge(rs[u],v);
			up(u);
			return u;
		}
		else{
			ls[v]=merge(u,ls[v]);
			up(v);
			return v;
		}
	}
	pii split(int u,int k){
		if(!u)return {0,0};
		if(siz[ls[u]]+sz[u]>k){
			pii t=split(ls[u],k);
			ls[u]=t.se;
			up(u);
			return {t.fi,u};
		}
		else{
			pii t=split(rs[u],k-siz[ls[u]]-sz[u]);
			rs[u]=t.fi;
			up(u);
			return {u,t.se};
		}
	}
	int newnode(int s,int v){
		w[++idx]=rnd();siz[idx]=sz[idx]=s,val[idx]=num[idx]=v;
		return idx;
	}
}t;
```

### 线段树分裂

```cpp
int rt[maxn],cnt;
#define mid (l+r>>1)
#define ls lc[nd]
#define rs rc[nd]
ll tree[maxn<<5];
int lc[maxn<<5],rc[maxn<<5],idx;
int st[maxn<<5],tp;
int newnode(){
	if(tp)return st[tp--];
	return ++idx;
}
void clr(int nd){
	tree[nd]=0,ls=rs=0;
	st[++tp]=nd;
}
void updata(int &nd,int l,int r,int p,int w){
	if(!nd)nd=newnode();
	tree[nd]+=w;
	if(l==r)return ;
	if(p<=mid)updata(ls,l,mid,p,w);
	else updata(rs,mid+1,r,p,w);
	tree[nd]=tree[ls]+tree[rs];
}
ll query(int nd,int l,int r,int ql,int qr){
	if(!nd||ql>qr)return 0;
	if(l>=ql&&r<=qr)return tree[nd];
	if(qr<=mid)return query(ls,l,mid,ql,qr);
	if(ql>mid)return query(rs,mid+1,r,ql,qr);
	return query(ls,l,mid,ql,qr)+query(rs,mid+1,r,ql,qr);
}
int fdkth(int nd,int l,int r,ll k){
	if(tree[nd]<k)return -1;
	if(l==r)return l;
	if(tree[ls]>=k)return fdkth(ls,l,mid,k);
	return fdkth(rs,mid+1,r,k-tree[ls]);
}
int merge(int u,int v,int l,int r){
	if(!u||!v)return u|v;
	if(l==r){tree[u]+=tree[v];clr(v);return u;}
	lc[u]=merge(lc[u],lc[v],l,mid);
	rc[u]=merge(rc[u],rc[v],mid+1,r);
	tree[u]=tree[lc[u]]+tree[rc[u]];clr(v);
	return u;
}
int split(int nd,int l,int r,ll k){
	if(!nd)return 0;
	int u=newnode();
	if(k>tree[ls])rc[u]=split(rs,mid+1,r,k-tree[ls]);
	else rc[u]=rs,rs=0;
	if(k<tree[ls])lc[u]=split(ls,l,mid,k);
	tree[nd]=tree[ls]+tree[rs],tree[u]=tree[lc[u]]+tree[rc[u]];
	return u;
}
```

### 手写 bitset

```cpp
#define ull unsigned long long
ull pw[65];
struct bs{
	vector<ull> a;
	int len,n;
	void init(int _n){
		n=_n,len=(n+63)/64;a.resize(len+1,0);
	}
	void set0(int x){a[x>>6]&=~pw[x&63];}
	void set1(int x){a[x>>6]|=pw[x&63];}
	bool operator[](int x){return (a[x>>6]>>(x&63))&1;}
	bs operator|(const bs&b)const{
		bs c;c.init(max(n,b.n));
		for(int i=0;i<c.len;i++)c.a[i]=a[i]|b.a[i];
		return c;
	}
	bs operator&(const bs&b)const{
		bs c;c.init(min(n,b.n));
		for(int i=0;i<c.len;i++)c.a[i]=a[i]&b.a[i];
		return c;
	}
	void operator|=(const bs&b){
		for(int i=0;i<max(len,b.len);i++)a[i]|=b.a[i];
	}
	void operator&=(const bs&b){
		for(int i=0;i<min(len,b.len);i++)a[i]&=b.a[i];
	}
	bs operator<<(int x)const{
		bs res;res.init(n);
		int y=x>>6,z=x&63;
		ull lst=0;
		for(int i=0;i+y<res.len;i++){
			res.a[i+y]=lst|(a[i]<<z);
			if(z)lst=a[i]>>(64ll-z);
		}
		return res;
	}
}
```

### 哈希表

```cpp
struct hsh_table{
	int head[maxn],tot;
	struct nd{
		int nxt;
		ull key;
		int val;
	}e[maxn];
	int hsh(ull u){return u%maxn;}
	bool find(ull key){
		int u=hsh(key);
		for(int i=head[u];i;i=e[i].nxt){
			if(e[i].key==key)return 1;
		}
		return 0;
	}
	int &operator[](ull key){
		int u=hsh(key);
		for(int i=head[u];i;i=e[i].nxt){
			if(e[i].key==key)return e[i].val;
		}
		e[++tot]={head[u],key,0};head[u]=tot;
		return e[tot].val;
	}
	void clear(){
		tot=0;
		for(int i=0;i<maxn;i++)head[i]=0;
	}
}mp;
```
