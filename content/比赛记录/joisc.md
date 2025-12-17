---
title: 'joisc'
date: 2025-12-16 18:28:05
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---
交互通信一边去。

### [joisc 2025](https://qoj.ac/category/420)

#### [Day 1 A. Exhibition 3](https://qoj.ac/contest/2061/problem/11401)

按画价值排序，依次贪心。设有 $c$ 个价值为 $v$，按 $1\sim m$ 的顺序决策选一个集合的区间，使得可以由 $c$ 个点覆盖集合内所有区间，然后把选出来的删掉。用 选出元素个数 相关复杂度解决每个 $c$。

先计算选了的最长前缀多长，倍增，每次 $O(n\log n)$ check，复杂度 $O(n\log^2n)$。

现在已经有一些区间，限制住了 $c$ 个点可以落在哪里 $[pl_i,pr_i]$。再从目前没有选过的且与 $[pl,pr]$ 有交的 $[l,r]$ 中招编号最小的加进去。如果 $[l,r]$ 包含 $[pl,pr]$，可以直接加入。如果 $[l,r]$ 与 $[pl,pr]$ 无交，则不能加入。否则若 $[l,r]$ 只与一个 $[pl,pr]$ 有交，那么 $[pl,pr]$ 会对 $[l,r]$ 取交。否则 $[l,r]$ 与相邻的 $[pl,pr]$ 有交，当之后其中一个的范围有变化时，可能使另一个的边界缩小。

线段树+set 维护所有与一个区间有交的区间。对每个 $[pl,pr]$ 取出这样最小的 $[l,r]$，加入一个优先队列依次决策。决策一个后面的区间可能会缩小某个 $[pl,pr]$，进而影响之前的 $[l,r]$ 对相邻 $[pl,pr]$ 的限制。优先队列，dfs。

```cpp
int n,m,t[maxn],lst;
pii a[maxn];
int ans[maxn];
#define mid ((l+r)>>1)
#define ls nd<<1
#define rs nd<<1|1
struct heap{
	priority_queue<int,vector<int>,greater<int>> q1,q2;
	void ins(int id){q1.push(id);}
	void del(int id){q2.push(id);}
	int top(){
		while(q2.size()&&q1.top()==q2.top())q1.pop(),q2.pop();
		return !q1.size()?inf:q1.top();
	}
}tree[maxn<<2];
int mn[maxn<<2];
void build(int nd,int l,int r){
	mn[nd]=inf;
	if(l==r)return ;
	build(ls,l,mid),build(rs,mid+1,r);
}
void updata(int nd,int l,int r,int ql,int qr,int w){
	if(l>=ql&&r<=qr){
		if(w>0)tree[nd].ins(w);
		else tree[nd].del(-w);
		mn[nd]=l==r?tree[nd].top():min({mn[ls],mn[rs],tree[nd].top()});
		return ;
	}
	if(ql<=mid)updata(ls,l,mid,ql,qr,w);
	if(qr>mid)updata(rs,mid+1,r,ql,qr,w);
	mn[nd]=min({mn[ls],mn[rs],tree[nd].top()});
}
int query(int nd,int l,int r,int ql,int qr){
	if(l>=ql&&r<=qr)return mn[nd];
	int res=tree[nd].top();
	if(ql<=mid)res=min(res,query(ls,l,mid,ql,qr));
	if(qr>mid)res=min(res,query(rs,mid+1,r,ql,qr));
	return res;
}
int ff[maxn];
int fd(int x){
	if(ff[x]==x)return x;
	return ff[x]=fd(ff[x]);
}
int id[maxn];
int chk(int k){
	if(k>lst)return inf;
	for(int i=1,p=fd(1);i<=k;i++,p=fd(p+1))id[i]=p;
	sort(id+1,id+k+1,[&](int u,int v){return a[u].se<a[v].se;});
	int num=0;for(int i=1,p=0;i<=k;i++)if(p<a[id[i]].fi)++num,p=a[id[i]].se;
	return num;
}
int pl[maxn],pr[maxn],num;
priority_queue<pii> ql[maxn],qr[maxn];
void rebuild(int p){
	if(p>1){
		int lst=pl[p-1];
		while(!ql[p-1].empty()&&-(ql[p-1].top()).fi<pl[p])pl[p-1]=max(pl[p-1],(ql[p-1].top()).se),ql[p-1].pop();
		if(lst!=pl[p-1])rebuild(p-1);
	}
	if(p+1<=num){
		int lst=pr[p+1];
		while(!qr[p+1].empty()&&(qr[p+1].top()).fi>pr[p])pr[p+1]=min(pr[p+1],(qr[p+1].top()).se),qr[p+1].pop();
		if(lst!=pr[p+1])rebuild(p+1);
	}
}
void del(int id,int w){
	int ll=lower_bound(pr+1,pr+num+1,a[id].fi)-pr,rr=upper_bound(pl+1,pl+num+1,a[id].se)-pl-1;
	if(ll>rr){
		updata(1,1,n,a[id].fi,a[id].se,id);
		return ;
	}
	ff[id]=fd(id+1),ans[id]=w;lst--;
	if(ll==rr){
		pl[ll]=max(pl[ll],a[id].fi),pr[rr]=min(pr[rr],a[id].se);
		rebuild(ll);
	}
	else{
		ql[ll].push({-a[id].se,a[id].fi});
		qr[rr].push({a[id].fi,a[id].se});
	}
}
priority_queue<pii,vector<pii>,greater<pii>> q;
void mdf(int p){
	int id=query(1,1,n,pl[p],pr[p]);
	if(id==inf)return ;
	updata(1,1,n,a[id].fi,a[id].se,-id),q.push({id,p});
}
void work(){
	n=read();m=read();lst=m;
	for(int i=1;i<=n;i++)t[read()]++;
	build(1,1,n);
	for(int i=1;i<=m;i++){
		int l=read(),r=read();a[i]={l,r};
		updata(1,1,n,l,r,i);
	}
	for(int i=1;i<=m+1;i++)ff[i]=i;
	for(int v=n;v&&lst;v--)if(t[v]){
		int k=1;while(chk(2*k)<=t[v])k<<=1;
		for(int j=__lg(k)-1;~j;j--)if(chk(k+(1<<j))<=t[v])k+=(1<<j);
		num=chk(k);
		sort(id+1,id+k+1,[&](int u,int v){return a[u].fi>a[v].fi;});
		for(int i=1,p=n+1,nn=num+1;i<=k;i++)if(p>a[id[i]].se)pl[--nn]=p=a[id[i]].fi;
		for(int i=1;i<=k;i++)updata(1,1,n,a[id[i]].fi,a[id[i]].se,-id[i]),del(id[i],v);
		for(int i=1;i<=num;i++)mdf(i);
		while(!q.empty()){
			auto[id,p]=q.top();q.pop();mdf(p);
			if(ff[id]!=id)continue;
			del(id,v);
		}
		for(int i=1;i<=num;i++){
			priority_queue<pii>().swap(ql[i]);
			priority_queue<pii>().swap(qr[i]);
		}
	}
	for(int i=1;i<=m;i++)printf("%lld\n",ans[i]);
}
```

#### [Day 1 C. Bitaro's Travel 2](https://qoj.ac/contest/2061/problem/11403)

出了最后一步，每个点会往能去到的最高的点跳。每个点能去到一个连通块，形成重构树。

按高度从小往大加点，并查集维护。

#### [Day 2 A. Ambulance](https://qoj.ac/contest/2062/problem/11404)

一定有两个分界线，前缀去左上，后缀去右下之类。

枚举第一条分界线，对两边分别做第二条分界线的决策，再合并起来。复杂度 $O(n^2T)$。

```cpp
int l,n,m;
pii a[maxn];
int lsh[maxn];
int f1[maxn][maxm],f2[maxn][maxm],g1[maxn][maxm],g2[maxn][maxm];
int val1[maxm],val2[maxm];
int id[maxn],rnk[maxn];
void work(){
	l=read();n=read();m=read()/2;
	for(int i=1;i<=n;i++)a[i]={read(),read()};
	sort(a+1,a+n+1,[&](pii u,pii v){return u.fi+u.se<v.fi+v.se;});
	for(int i=1;i<=n;i++)id[i]=i;
	sort(id+1,id+n+1,[&](int u,int v){return a[u].se-a[u].fi<a[v].se-a[v].fi;});
	for(int i=1;i<=n;i++)rnk[id[i]]=i;
	for(int i=0;i<=n;i++){
		for(int j=1;j<=n;j++){
			int v1=0,v2=0;
			if(rnk[j]<=i)v1=a[j].fi+a[j].se-2,v2=l-a[j].fi+a[j].se-1;
			for(int k=0;k<=m;k++){
				f1[j][k]=min(m+1,f1[j-1][k]+v2);
				if(k>=v1)chkmn(f1[j][k],f1[j-1][k-v1]);
			}
			v1=0,v2=0;
			if(rnk[j]>i)v1=a[j].fi+a[j].se-2,v2=a[j].fi-1+l-a[j].se;
			for(int k=0;k<=m;k++){
				f2[j][k]=min(m+1,f2[j-1][k]+v2);
				if(k>=v1)chkmn(f2[j][k],f2[j-1][k-v1]);
			}
		}
		for(int j=n;j;j--){
			int v1=0,v2=0;
			if(rnk[j]<=i)v1=l-a[j].fi+l-a[j].se,v2=l-a[j].fi+a[j].se-1;
			for(int k=0;k<=m;k++){
				g1[j][k]=min(m+1,g1[j+1][k]+v2);
				if(k>=v1)chkmn(g1[j][k],g1[j+1][k-v1]);
			}
			v1=0,v2=0;
			if(rnk[j]>i)v1=l-a[j].fi+l-a[j].se,v2=a[j].fi-1+l-a[j].se;
			for(int k=0;k<=m;k++){
				g2[j][k]=min(m+1,g2[j+1][k]+v2);
				if(k>=v1)chkmn(g2[j][k],g2[j+1][k-v1]);
			}
		}
		for(int j=0;j<=n;j++){
			for(int k=0;k<=m;k++)val1[k]=val2[k]=m+1;
			for(int k=0;k<=m;k++)chkmn(val1[f1[j][k]],f2[j][m-k]);
			for(int k=0;k<=m;k++)chkmn(val2[g1[j+1][k]],g2[j+1][m-k]);
			for(int k=1;k<=m;k++)chkmn(val1[k],val1[k-1]),chkmn(val2[k],val2[k-1]);
			for(int k=0;k<=m;k++)if(val1[k]+val2[m-k]<=m){puts("Yes");return ;}
		}
	}
	puts("No");
}
```



#### [Day 2 B. Collecting Stamps 4](https://qoj.ac/contest/2062/problem/11405)

每个 AABB 对不合法，每次交换必然能消除一对。

二位数点。

#### [Day 3 A. Bitaro the Brave 3](https://qoj.ac/contest/2063/problem/11407)

费用流。

模拟费用流，优先流权值大的，不会退流。

按权值分层，对于一层流量全部相同的，变为二分图最大匹配，hall 定理，$ans=|L|-\max_S |S|-|N(S)|$。这样相当于选一个后缀，关于 $l$ 形成凸包。

$n$ 层每层 $n$ 条边的凸包，建出来后差分合并。

```cpp
int n,lim,m,q;
struct node{
	int t,h,p;
}a[maxn],b[maxn];
pii st[maxn];int tp;
int vk[maxm],vb[maxm];
void upd(int l,int r,int k,int b){
	if(l>r)return ;
	vk[l]+=k,vk[r+1]-=k,vb[l]+=b,vb[r+1]-=b;
}
void work(){
	n=read();lim=read();m=read();
	for(int i=1;i<=n;i++)a[i]={read(),read(),read()};
	sort(a+1,a+n+1,[&](node u,node v){return u.p>v.p;});
	for(int l=1;l<=n;l++){
		int r=l;while(r<n&&a[l].p==a[r+1].p)r++;
		sort(a+l,a+r+1,[&](node u,node v){return u.t<v.t;});
		int p=0,p1=1,p2=l;
		while(p1<l&&p2<=r){
			if(a[p1].t<a[p2].t)b[++p]=a[p1++];
			else b[++p]=a[p2++];
		}
		while(p1<l)b[++p]=a[p1++];
		while(p2<=r)b[++p]=a[p2++];
		for(int i=1;i<=r;i++)swap(a[i],b[i]);
		int del=b[r].p-a[r+1].p;
		st[tp=1]={0,0};
		for(int i=r,sum=0;i;i--){
			sum+=a[i].h;
			int k=del*sum,b=-del*(m-a[i].t);
			if(m-a[i].t>=inf/del)continue;
			while(tp>1&&(__int128)(st[tp].se-b)*(st[tp].fi-st[tp-1].fi)<(__int128)(k-st[tp].fi)*(st[tp-1].se-st[tp].se))tp--;
			st[++tp]={k,b};
		}
		int lst=0;
		for(int i=1;i<tp;i++){
			int p=(st[i].se-st[i+1].se)/(st[i+1].fi-st[i].fi);p=min(p,lim);
			upd(lst,p,st[i].fi,st[i].se);
			lst=p+1;
		}
		upd(lst,lim,st[tp].fi,st[tp].se);
		l=r;
	}
	for(int i=0;i<=lim;i++)vk[i]+=vk[i-1],vb[i]+=vb[i-1];
	q=read();
	int p=1;
	while(q--){
		int val=read();
		while(p<=lim&&vk[p]*p+vb[p]<=val)p++;
		printf("%lld\n",p-1);
	}
}
```



