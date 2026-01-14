---
title: 'P13758 题解'
date: 2026-01-14 21:42:02
tags: [题解,dp,数据结构]
published: true
hideInList: false
feature: 
isTop: false
---
[P13758](https://www.luogu.com.cn/problem/P13758)

厉害的。

首先只有 $E$ 中构成最小生成树的边是有用的。在做最小生成树的时候可以维护等效链，合并连通块的边等价于合并两条链的边。这样可以转化为 A 性质。

假设现在已经选了一些 $E$ 中的边，若干个连续段形成连通块。剩下的额外的边形容 $a_i+a_j+a_0$，被选入最小生成树的边的端点一定是其连通块内 $a_i$ 最小的，且一定有一个端点是全局最小 $a_i$。

这样每个连通块有 $\min_{i\in S}a_i+\min a_i+a_0$ 的代价。设 $f_{i,0/1}$ 表示前 $i$ 个数，当前段有没有钦定最小值的代价。记 $i$ 和 $i-1$ 之间的边边权为 $val_i$。

$$f_{i,0}=\min (f_{i-1,1}+\min a_i+a_0,f_{i-1,0}+val_i)$$

$$f_{i,1}=\min (f_{i-1,1}+a_i+\min a_i+a_0,f_{i-1,0}+a_i+val_i,f_{i-1,1}+val_i)$$

然后 $f_{i,0/1}$ 关于分多少段是凸的。

现在的问题是：$q$ 次单点修改 $a_i$，每次查询一个不同的 $w=\min a_i+a_0$，求上面 dp 的答案。

用 $(\min,+)$ 矩乘的方式维护在每一个 $i$ 处 $f_{i,0/1}$ 的变化。$\begin{bmatrix}f_0\\f_1\end{bmatrix}=\begin{bmatrix}val_i&w\\a_i+val_i & \min(val_i,a_i+w)\end{bmatrix}\begin{bmatrix}f'_0\\f'_1\end{bmatrix}$。

注意到 $w$ 是变量，所以我们尝试维护一个 $w$ 的凸包，具体的在矩阵的每个位置维护一个序列 $a_i$，真实的矩阵值为 $\min a_i+i\times w$。这个序列应当是与 $f_{i,0/1}$ 的定义相似的，也是凸的，可以 $O(siz)$ 合并。乘法即闵可夫斯基和，加法为按位取 $\min$。

这里每个 $i$ 的序列都只有至多一项。但是一个一个乘复杂度也爆了。按 $B$ 分块，块内线段树，每次修改 $O(\sum \frac{B}{2^i})=O(B)$；查询时枚举所有 $\frac{n}{B}$ 块，每块把矩阵的每个值都带入 $w$ 二分凸包算出来，再把真实值的矩阵一个一个乘起来。

取 $B=\sqrt{n\log n}$，复杂度 $O(q\sqrt{n\log n})$。

卡常方面，避免大量传参和复制 vector，

其实我也没卡明白，给个过不了但能看的好了。

```cpp
int n,m,q,a[maxn];
int ff[maxn],hd[maxn],ed[maxn],nxt[maxn],fr[maxn],val[maxn];
int fd(int x){
	if(ff[x]==x)return x;
	return ff[x]=fd(ff[x]);
}
int id[maxn],tmp[maxn];
const int B=800;
const int maxm=maxn/B+5;
vector<int> operator*(vector<int> &u,vector<int> &v){
	if(!u.size())return v;
	if(!v.size())return u;
	int n=u.size()-1,m=v.size()-1;
	int p=0,q=0,t=0;
	while(p<=n&&u[p]==inf)p++;
	while(q<=m&&v[q]==inf)q++;
	vector<int> res(p+q,inf);
	if(p<=n&&q<=m)res.pb(u[p]+v[q]),p++,q++;
	else return {inf};
	while(p<=n&&q<=m){
		if(u[p]-u[p-1]<v[q]-v[q-1])res.pb(res.back()+u[p]-u[p-1]),p++;
		else res.pb(res.back()+v[q]-v[q-1]),q++;
	}
	while(p<=n)res.pb(res.back()+u[p]-u[p-1]),p++;
	while(q<=m)res.pb(res.back()+v[q]-v[q-1]),q++;
	return res;
}
vector<int> operator+(vector<int> &u,vector<int> v){
	int n=u.size()-1,m=v.size()-1;
	vector<int> res(max(n,m)+1,inf);
	for(int i=0;i<=n;i++)res[i]=min(res[i],u[i]);
	for(int i=0;i<=m;i++)res[i]=min(res[i],v[i]);
	return res;
}
int pl[maxm],pr[maxm],bel[maxn],num;
#define mid ((l+r)>>1)
#define ls nd<<1
#define rs nd<<1|1
struct mat{
	vector<int> e00,e01,e10,e11;
	mat(vector<int> _e00={},vector<int> _e01={},vector<int> _e10={},vector<int> _e11={}){
		e00=_e00,e01=_e01,e10=_e10,e11=_e11;
	}
};
mat operator*(mat &u,mat &v){
	mat res;
	res.e00=u.e00*v.e00;
	res.e00=res.e00+u.e01*v.e10;
	res.e01=u.e00*v.e01;
	res.e01=res.e01+u.e01*v.e11;
	res.e10=u.e10*v.e00;
	res.e10=res.e10+u.e11*v.e10;
	res.e11=u.e10*v.e01;
	res.e11=res.e11+u.e11*v.e11;
	return res;
}
struct sgt{
	mat tree[B<<2];
	void build(int nd,int l,int r){
		if(l==r){
			tree[nd]={{val[l]},{inf,0},{min(inf,val[l]+a[l])},{val[l],a[l]}};
			return ;
		}
		build(ls,l,mid),build(rs,mid+1,r);
		tree[nd]=tree[rs]*tree[ls];
	}
	void modif(int nd,int l,int r,int p){
		if(l==r){
			tree[nd]={{val[l]},{inf,0},{min(inf,val[l]+a[l])},{val[l],a[l]}};
			return ;
		}
		if(p<=mid)modif(ls,l,mid,p);
		else modif(rs,mid+1,r,p);
		tree[nd]=tree[rs]*tree[ls];
	}
}t[maxm];
#undef mid
int calc(vector<int> &a,int x){
	if(!a.size())return inf;
	int l=0,r=a.size()-1;
	while(l<r){
		int mid=l+r>>1;
		if(a[mid]==inf||a[mid]+mid*x>=a[mid+1]+(mid+1)*x)l=mid+1;
		else r=mid;
	}
	return a[l]+l*x;
	// int res=inf;
	// for(int i=0;i<a.size();i++)res=min(res,a[i]+i*x);
	// return res;
}
int gg[2],hh[2];
void work(){
	n=read();m=read();q=read();a[0]=read();
	for(int i=1;i<=n;i++)a[i]=read();
	vector<tuple<int,int,int>> edge;
	for(int i=1;i<=m;i++){
		int u=read(),v=read(),w=read();
		edge.pb({w,u,v});
	}
	sort(edge.begin(),edge.end());
	for(int i=1;i<=n;i++)ff[i]=i,hd[i]=ed[i]=i;
	for(auto[w,u,v]:edge){
		u=fd(u),v=fd(v);
		if(u==v)continue;
		ff[u]=v;
		nxt[ed[u]]=hd[v],fr[hd[v]]=ed[u],val[hd[v]]=w;
		hd[v]=hd[u];
	}
	for(int i=1,j=0;i<=n;i++)if(!fr[i]){
		int x=i;val[i]=inf;
		while(x)id[x]=++j,x=nxt[x];
	}
	for(int i=1;i<=n;i++)tmp[id[i]]=a[i];
	for(int i=1;i<=n;i++)a[i]=tmp[i];
	for(int i=1;i<=n;i++)tmp[id[i]]=val[i];
	for(int i=1;i<=n;i++)val[i]=tmp[i];
	for(int l=1,r;l<=n;l=r+1){
		r=min(l+B-1,n);pl[++num]=l,pr[num]=r;
		for(int j=l;j<=r;j++)bel[j]=num;
		t[num].build(1,l,r);
	}
	multiset<int> s;
	for(int i=1;i<=n;i++)s.insert(a[i]);
	while(q--){
		int x=id[read()],y=read();
		if(x)s.erase(s.find(a[x]));
		a[x]=y;
		if(x)s.insert(a[x]);
		if(x)t[bel[x]].modif(1,pl[bel[x]],pr[bel[x]],x);
		int mn=*s.begin(),w=mn+a[0];
		gg[0]=gg[1]=0;
		for(int i=1;i<=num;i++){
			hh[0]=min(calc(t[i].tree[1].e00,w)+gg[0],calc(t[i].tree[1].e01,w)+gg[1]);
			hh[1]=min(calc(t[i].tree[1].e10,w)+gg[0],calc(t[i].tree[1].e11,w)+gg[1]);
			gg[0]=hh[0],gg[1]=hh[1];
		}
		write(gg[1]-mn-w);puts("");
	}
}
```

