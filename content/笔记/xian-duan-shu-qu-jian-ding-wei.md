---
title: '线段树区间定位'
date: 2025-02-03 09:22:48
tags: [笔记,数据结构]
published: true
hideInList: false
feature: 
isTop: false
---
模拟线段树上的若干操作，然后查询相关的计数信息。

学习自 [https://www.luogu.com/article/qh85y10k](https://www.luogu.com/article/qh85y10k)。

## 区间定位数

定义 $[l,r]$ 的区间定位数，为（广义）线段树上 $[l,r]$ 最少拆为多少个区间的并。

区间 $[l,r]$ 在线段树上的区间定位数等于 $2\times (r-l+1)-|S|$，其中 $S$ 为 $[l,r]$ 完全包含的区间数。

### [P7143](https://www.luogu.com.cn/problem/P7143)

> 对于 $[1,n]$ 的标准线段树求所有区间的区间定位数之和。

前半部分拆开 $O(1)$ 算，后半部分 $|S|=\sum l\times (n-r+1)=(n+1)\times \sum l+\sum l\times r$，分治维护 $cnt,\sum l,\sum r,\sum l\times r$。

```cpp
int n;
map<int,int> cnt,sl,sr,slr,res;
void sovle(int n){
	if(cnt[n])return ;
	if(n==1){
		cnt[n]=sl[n]=sr[n]=slr[n]=res[n]=1;
		return ;
	}
	int mid=(n+1)>>1,vmid=mid%mod;
	sovle(mid),sovle(n-mid);
	cnt[n]=(cnt[mid]+cnt[n-mid]+1)%mod;
	sl[n]=(sl[mid]+sl[n-mid]+cnt[n-mid]*vmid+1)%mod;
	sr[n]=(sr[mid]+sr[n-mid]+cnt[n-mid]*vmid+n)%mod;
	slr[n]=(slr[mid]+slr[n-mid]+(sl[n-mid]+sr[n-mid])*vmid+cnt[n-mid]*vmid%mod*vmid+n)%mod;
	res[n]=((n%mod+1)*sl[n]+mod-slr[n])%mod;
}
int sum1(int n){return n*(n+1)/2%mod;}
int sum2(int n){return n*(n+1)%mod*(2*n+1)%mod*ni(6)%mod;}
void work(){
	n=read();sovle(n);
	int ans=2*(sum1(n%mod)*(n%mod+1)+mod-sum2(n%mod))%mod;
	printf("%lld\n",(ans+mod-res[n])%mod);
}
```

## 区间定位

（广义）线段树上，$[l,r]$ 的区间定位可以描述为：

取出 $[l-1,l-1]$ 和 $[r+1,r+1]$ 的 lca $U$。$[l-1,l-1]$ 到 $U$ 的左儿子（不含）的链上是左儿子的节点的右兄弟。右边同理。

![](https://yhddd123.github.io/post-images/1738552008851.webp)

额外建出 $[0,0]$ 和 $[n+1,n+1]$。

### [P5210](https://www.luogu.com.cn/problem/P5210)

> 对于 $[1,n]$ 的广义线段树 $q$ 次询问 $u,l,r$ 求 $\sum_{v\in S} dis(u,v)$。

$\sum_{v\in S} dis(u,v)=|S|\times dep_u+\sum_{v\in S}dep_v-2\times \sum_{v\in S}dep_{lca(u,v)}$。设 $cl_u,cr_u,sl_u,sr_u$ 表示 $u$ 的所有祖先的左偏/右偏儿子的右兄弟/左兄弟的数量/深度和，求出 lca 后差分求出。

对于 lca，分类讨论。如果 $u$ 在 $U$ 子树外，lca 为 $U$。否则假设在 $U$ 的左子树内，求出 $u$ 和 $[l-1,l-1]$ 的 lca $x$。对于 $U$ 右子树中的区间 lca 为 $U$；左子树 $x$ 一下的 lca 为 $x$；左子树 $x$ 以上都是 $u$ 的祖先，lca 为区间的父亲，特判 $u$ 在 $x$ 的右子树中时 $u$ 和 $x$ 的右儿子的 lca 不为 $x$ 而是 $x$ 的右儿子。

```cpp
int n,idx,rt,q;
int ls[maxn],rs[maxn],fa[maxn],pos[maxn];
int dfs(int l,int r){
	if(l>r)return 0;
	if(l==r)return pos[l]=++idx;
	int id=++idx,p=read();
	ls[id]=dfs(l,p),rs[id]=dfs(p+1,r);
	return id;
}
int st[20][maxn],dfn[maxn],tim,dep[maxn],siz[maxn];
int cl[maxn],cr[maxn],sl[maxn],sr[maxn];
void dfs(int u){
	if(!u)return ;
	dep[u]=dep[fa[u]]+1;siz[u]=1;
	cl[u]=cl[fa[u]]+(u==ls[fa[u]])*(rs[fa[u]]!=0),sl[u]=sl[fa[u]]+(u==ls[fa[u]])*dep[u];
	cr[u]=cr[fa[u]]+(u==rs[fa[u]])*(ls[fa[u]]!=0),sr[u]=sr[fa[u]]+(u==rs[fa[u]])*dep[u];
	st[0][dfn[u]=++tim]=fa[u];
	dfs(ls[u]),dfs(rs[u]);
	siz[u]+=siz[ls[u]]+siz[rs[u]];
}
int mmax(int u,int v){return dfn[u]<dfn[v]?u:v;}
int lca(int u,int v){
	if(u==v)return u;
	u=dfn[u],v=dfn[v];
	if(u>v)swap(u,v);u++;
	int k=__lg(v-u+1);
	return mmax(st[k][u],st[k][v-(1<<k)+1]);
}
bool in(int u,int v){return dfn[u]<=dfn[v]&&dfn[v]<dfn[u]+siz[u];}
void work(){
	n=read();rt=dfs(1,n);
	pos[0]=++idx;ls[++idx]=pos[0];rs[idx]=rt;rt=idx;
	pos[n+1]=++idx;rs[++idx]=pos[n+1];ls[idx]=rt;rt=idx;
	for(int i=1;i<=idx;i++)fa[ls[i]]=fa[rs[i]]=i;fa[0]=0;
	dfs(rt);
	for(int j=1;j<20;j++){
		for(int i=1;i+(1<<j)-1<=idx;i++)st[j][i]=mmax(st[j-1][i],st[j-1][i+(1<<j-1)]);
	}
	q=read();
	while(q--){
		int u=read(),l=read(),r=read(),tp=lca(pos[l-1],pos[r+1]);
		int num=cl[pos[l-1]]-cl[ls[tp]]+cr[pos[r+1]]-cr[rs[tp]];
		int sum=sl[pos[l-1]]-sl[ls[tp]]+sr[pos[r+1]]-sr[rs[tp]];
		int ans=num*dep[u]+sum;
		if(!in(tp,u)||u==tp)ans-=2*dep[lca(u,tp)]*num;
		else if(in(ls[tp],u)){
			int x=lca(pos[l-1],u);
			ans-=2*dep[tp]*(cr[pos[r+1]]-cr[rs[tp]]);
			ans-=2*(sl[x]-sl[ls[tp]]-(cl[x]-cl[ls[tp]]));
			if(in(rs[x],u))ans-=2;
			ans-=2*dep[x]*(cl[pos[l-1]]-cl[x]);
		}
		else{
			int x=lca(pos[r+1],u);
			ans-=2*dep[tp]*(cl[pos[l-1]]-cl[ls[tp]]);
			ans-=2*(sr[x]-sr[rs[tp]]-(cr[x]-cr[rs[tp]]));
			if(in(ls[x],u))ans-=2;
			ans-=2*dep[x]*(cr[pos[r+1]]-cr[x]);
		}
		printf("%lld\n",ans);
	}
}
```

## 区间修改的 tag 下放

按对 $[l,r]$ 做区间操作时 tag 的下放对节点的 tag 的不同影响将节点分为 $5$ 类。

1.访问到并继续递归的结点。不管之前什么样，现在肯定没标记。

2.区间定位点。不管之前什么样，现在肯定有标记。

3.$2$ 的真后代。不变。

4.$1$ 的儿子，且不是 $1,2$。如果有祖先或自己有标记则有标记。

5.$4$ 的真后代。不变。

![](https://yhddd123.github.io/post-images/1738552040412.webp)

维护 $f_i,g_i$ 表示 节点/节点及祖先 有没有标记即可转移。

### [P5280](https://www.luogu.com.cn/problem/P5280)

>  $q$ 次操作。有 $\frac{1}{2}$ 的概率对 $[l,r]$ 做区间修改；询问期望有几个节点有 tag。

对于 $1$ 类点，$\frac{f'_i}{2}\to f_i,\frac{g'_i}{2}\to g_i$；对于 $2$ 类点，$\frac{f'_i+1}{2}\to f_i,\frac{g'_i+1}{2}\to g_i$；对于 $4$ 类点，$\frac{f'_i+g'_i}{2}\to f_i$。

线段树维护即可。可以维护 $gg_i=1-g_i$ 然后 $\frac{gg'_i}{2}\to gg_i$，维护除了几次 $2$。

```cpp
int n,q,ans;
int inv[maxn];
#define mid (l+r>>1)
#define ls nd<<1
#define rs nd<<1|1
int f[maxn<<2],g[maxn<<2],tag[maxn<<2];
void build(int nd,int l,int r){
	g[nd]=1;
	if(l==r)return ;
	build(ls,l,mid),build(rs,mid+1,r);
}
void inc(int &u,int v){((u+=v)>=mod)&&(u-=mod);}
void downf(int nd,int w){
	inc(ans,mod-f[nd]),f[nd]=(f[nd]+w)*inv[1]%mod,inc(ans,f[nd]);
}
void downg(int nd,int w){
	g[nd]=g[nd]*inv[w]%mod,tag[nd]+=w;
}
void down(int nd){
	downg(ls,tag[nd]),downg(rs,tag[nd]),tag[nd]=0;
}
void updata(int nd,int l,int r,int ql,int qr){
	if(l>=ql&&r<=qr){downf(nd,1),downg(nd,1);return ;}
	if(tag[nd])down(nd);
	if(ql<=mid)updata(ls,l,mid,ql,qr);
	else downf(ls,mod+1-g[ls]);
	if(qr>mid)updata(rs,mid+1,r,ql,qr);
	else downf(rs,mod+1-g[rs]);
	downf(nd,0);g[nd]=(g[nd]+1)*inv[1]%mod;
}
void work(){
	n=read();q=read();int mul=1;
	build(1,1,n);
	inv[0]=1,inv[1]=(mod+1)/2;for(int i=2;i<=q;i++)inv[i]=inv[i-1]*inv[1]%mod;
	while(q--){
		int op=read();
		if(op==1){
			mul=mul*2%mod;
			int l=read(),r=read();
			updata(1,1,n,l,r);
		}
		else printf("%lld\n",ans*mul%mod);
	}
}
```

### [P6630](https://www.luogu.com.cn/problem/P6630)

> $k$ 次随机选取 $[l,r]$ 做区间修改，询问最后期望有几个节点有 tag。

对于 $1$ 类点，$f_i=g_i=0$；对于 $2$ 类点，$f_i=g_i=1$；对于 $3$ 类点，$f_i=f'_i,g_i=1$；对于 $4$ 类点，$f_i=g_i=g'_i$；对于 $5$ 类点，$f_i=f'_i,g_i=g'_i$。

对于区间 $[l,r]$，父亲为 $[fl,fr]$，选取 $[ql,qr]$ 使得 $[l,r]$ 成为某类点的方案数分别为。记 $val_i=\frac{i\times(i+1)}{2}$。成为 $1$ 类点，$val_n-val_{l-1}-val_{n-r}-l\times (n-r+1)$；成为 $2$ 类点，$l\times (n-r+1)-fl\times (n-fr+1)$；成为 $3$ 类点，$fl\times (n-fr+1)$；成为 $4$ 类点，$val_{l-1}+val_{n-r}-val_{fl-1}-val_{n-fr}$；成为 $5$ 类点，$val_{fl-1}+val_{n-fr}$；

维护 $f,g,1$ 的 $3\times 3$ 矩阵。

```cpp
int n,k,ans,inv;
int val(int n){return n*(n+1)/2%mod;}
void calc(int l,int r,int fl,int fr){
	mat a;
	a.e[2][2]=1;
	int p1=(val(n)-val(l-1)-val(n-r)-l*(n-r+1)%mod+3*mod)*inv%mod;
	int p2=(l*(n-r+1)%mod-fl*(n-fr+1)%mod+mod)*inv%mod;
	int p3=fl*(n-fr+1)%mod*inv%mod;
	int p4=(val(l-1)+val(n-r)-val(fl-1)-val(n-fr)+2*mod)*inv%mod;
	int p5=(val(fl-1)+val(n-fr))*inv%mod;
	// assert((p1+p2+p3+p4+p5)%mod==1);
	(a.e[2][0]+=p2)%=mod;
	(a.e[2][1]+=p2)%=mod;
	(a.e[0][0]+=p3)%=mod;
	(a.e[2][1]+=p3)%=mod;
	(a.e[1][0]+=p4)%=mod;
	(a.e[1][1]+=p4)%=mod;
	(a.e[0][0]+=p5)%=mod;
	(a.e[1][1]+=p5)%=mod;
	a=ksm(a,k);
	(ans+=a.e[2][0])%=mod;
}
void dfs(int l,int r,int fl,int fr){
	if(l>r)return ;
	calc(l,r,fl,fr);
	if(l==r)return ;
	int p=read();
	dfs(l,p,l,r),dfs(p+1,r,l,r);
}
void work(){
	n=read();k=read();inv=ni(val(n));
	dfs(1,n,0,n);
	printf("%lld\n",ans);
}
```