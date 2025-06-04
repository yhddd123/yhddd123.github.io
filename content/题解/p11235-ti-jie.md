---
title: 'P11235 题解'
date: 2025-04-07 18:39:11
tags: [题解,数据结构]
published: true
hideInList: false
feature: 
isTop: false
---
[P11235](https://www.luogu.com.cn/problem/P11235)

### 思路

对于封闭区间 $[l,r]$，设 $[l+1,r-1]$ 中最小值为 $mn$，位置为 $p_1,\dotsb,p_k$，则 $[l,p_1],[p_1,p_2],\dotsb,[p_k,r]$ 也是封闭区间。从 $[0,n+1]$ 开始，st 表维护区间最小值的位置往下递归，可以得到树形结构，能得到所有的 $O(n)$ 个封闭区间，且所有的区间挖去端点后要么包含要么相交。询问也是问封闭区间，可以直接预处理所有封闭区间的答案。

特判掉 $r-l+1=2$ 的区间。设 $f_{u,i}$ 表示编号 $u$ 对应的区间 $[l,r]$，$[l+1,r-1]$ 部分保留 $i$ 个数的最大和。$[l+1,r-1]$ 要么保留 $0$ 个，要么中间的 $p_1,\dotsb ,p_k$ 都要保留，递归为儿子的 $(max,+)$ 卷积。

把 $(i,f_{u,i})$ 当成点，则对于 $u$ 的 dp 值，只有上凸包有用。感性理解就是一个不在上凸包的点，一定不如凸包中前后两个中的一个。合并上凸包，维护每段的向量，用优先队列启发式合并即可。合并完儿子的凸包后，凸包所有值加上向量 $(k,a_p\times k)$，再把前面一段不凸的部分合并掉。

递归树形结构要上传的凸包是挖掉端点后的，但是查询的凸包是加上端点的。即要求凸包所有值加上向量 $(2,a_l+a_r)$ 并把前面一段不凸的部分合并掉后的第一段向量。优先队列应该是做不了的？改为平衡树就支持二分了。

### code

```cpp
#include<bits/stdc++.h>
using namespace std;
void initialize(std::vector<long long> A);
std::array<long long, 2> maximum_average(long long i, long long j);

const int maxn=300010;
#define pii pair<long long,long long>
#define fi first
#define se second
#define pb push_back
int n;long long a[maxn];
pii ans[maxn];
int st[19][maxn];
int mmin(long long u,long long v){return (a[u]<a[v]||(a[u]==a[v]&&u<v))?u:v;}
int que(long long l,long long r){
	if(l>r)return 0;
	long long k=__lg(r-l+1);
	return mmin(st[k][l],st[k][r-(1<<k)+1]);
}
vector<int> e[maxn];
map<pii,int> mp;int idx;
struct node{
	long long x,y;
	bool operator<(const node&tmp)const{return y*tmp.x<x*tmp.y;}
	node operator+(const node&tmp)const{return {x+tmp.x,y+tmp.y};}
};
mt19937 rnd(1141541);
struct fhq{
	node val[maxn],sum[maxn];
	int lc[maxn],rc[maxn],siz[maxn],w[maxn];
	int del[maxn],tp,num;
	void up(int u){
		sum[u]=val[u]+sum[lc[u]]+sum[rc[u]];
		siz[u]=siz[lc[u]]+siz[rc[u]]+1;
	}
	int get(node w){
		int p=tp?del[tp--]:++num;
		lc[p]=rc[p]=0,siz[p]=1,fhq::w[p]=rnd();
		val[p]=sum[p]=w;
		return p;
	}
	int merge(int u,int v){
		if(!u||!v)return u|v;
		if(w[u]<w[v]){
			rc[u]=merge(rc[u],v);
			up(u);
			return u;
		}
		else{
			lc[v]=merge(u,lc[v]);
			up(v);
			return v;
		}
	}
	pii split(int u,int k){
		if(!u)return {0,0};
		if(siz[lc[u]]+1>k){
			pii t=split(lc[u],k);
			lc[u]=t.se;up(u);
			return {t.fi,u};
		}
		else{
			pii t=split(rc[u],k-siz[lc[u]]-1);
			rc[u]=t.fi;up(u);
			return {u,t.se};
		}
	}
	int kth(int u,node w){
		if(!u)return 0;
		if(val[u]<w)return siz[lc[u]]+1+kth(rc[u],w);
		else return kth(lc[u],w);
	}
	void insert(int &u,node w){
		int k=kth(u,w);
		pii t=split(u,k);
		u=merge(merge(t.fi,get(w)),t.se);
	}
	node getmx(int u){
		if(!u)return {0,0};
		if(rc[u])return getmx(rc[u]);
		else return val[u];
	}
	void popmx(int &u){
		pii t=split(u,siz[u]-1);
		u=t.fi;del[++tp]=t.se;
	}
	node find(int u,node w){
		if(!u)return w;
		node ww=w+sum[rc[u]];
		if(ww<val[u])return find(lc[u],ww+val[u]);
		else return find(rc[u],w);
	}
}t;
struct pq{
	int rt;
	int size(){return t.siz[rt];}
	void push(node w){t.insert(rt,w);}
	void pop(){t.popmx(rt);}
	node top(){return t.getmx(rt);}
	node find(node w){return t.find(rt,w);}
}q[maxn];
void dfs(int l,int r){
	mp[{l,r}]=++idx;
	node w={0,0};
	int p=que(l+1,r-1),mn=a[p],lst=l,u=idx;
	while(mn==a[p]){
		w.x++,w.y+=a[p];
		if(lst+1<p){
			dfs(lst,p);
			e[u].pb(mp[{lst,p}]);
		}
		lst=p,p=que(p+1,r-1);
	}
	if(lst+1<r){
		dfs(lst,r);
		e[u].pb(mp[{lst,r}]);
	}
	for(int v:e[u]){
		if(q[v].size()>q[u].size())swap(q[u],q[v]);
		while(q[v].size())q[u].push(q[v].top()),q[v].pop();
	}
	while(q[u].size()&&w<q[u].top())w=w+q[u].top(),q[u].pop();
	q[u].push(w);
	node res=q[u].find({2,a[l]+a[r]});
	ans[u]={res.y,res.x};
}
void initialize(std::vector<int> A){
    n = (int)(A.size());
    for(int i=1;i<=n;i++)a[i]=A[i-1];
    for(int i=1;i<=n;i++)st[0][i]=i;
	for(int j=1;j<=18;j++){
		for(int i=1;i+(1<<j)-1<=n;i++)st[j][i]=mmin(st[j-1][i],st[j-1][i+(1<<j-1)]);
	}
	dfs(0,n+1);
}
std::array<long long, 2> maximum_average(int i, int j){
	i++,j++;
	auto [p,q]=i+1<j?ans[mp[{i,j}]]:make_pair(a[i]+a[j],2ll);
	long long g=__gcd(p,q);
	p/=g,q/=g;
	return {p,q};
}

// void my_assert(bool x) {
    // if (!x) {
        // puts("Wrong input");
        // exit(0);
    // }
// }
// int main(){
	// int N, Q;
    // my_assert(scanf("%d", &N) == 1);
    // std::vector<int> A(N);
    // for(int i = 0; i < N; i++){
        // my_assert(scanf("%d",&A[i]) == 1);
    // }
    // initialize(A);
    // my_assert(scanf("%d", &Q) == 1);
    // while(Q--){
        // int i, j;
        // my_assert(scanf("%d%d",&i,&j) == 2);
        // auto t = maximum_average(i, j);
        // printf("%lld %lld\n", t[0], t[1]);
    // }
// }
```

