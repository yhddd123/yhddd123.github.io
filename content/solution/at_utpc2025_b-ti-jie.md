---
title: 'AT_utpc2025_b 题解'
date: 2026-03-01 21:15:35
tags: [题解,计数]
published: true
hideInList: false
feature: 
isTop: false
---
[AT_utpc2025_b](https://www.luogu.com.cn/problem/AT_utpc2025_b)

厉害。完全感受不出为什么双射几下就可以降复杂度，搬运一下官方题解。

首先 $O(n^4)$ 容易，区间 dp 一下，状态还要记当前子树中序遍历开始的编号，每次枚举中点。但是没有前途。

首先 $n$ 个点的二叉树与 $n+1$ 个点的每个点儿子有序的有根树（ordinal tree）双射，两者都与 $2n$ 的合法括号序列双射。

二叉树与 ordinal tree  的双射即，ordinal tree 有一个根 $0$，$0$ 的儿子依次是二叉树 $1$ 开始的右链，依次下去，每个 ordinal tree 的节点 $u$ 的儿子依次是二叉树 $u$ 的左儿子开始的右链。然后二叉树的中序遍历就变成 ordinal tree 的 dfs 出栈序。

二叉树与括号序列的双射即，$S(T)=$"$($"$+S(L)+$"$)$"$+S(R)$。ordinal tree 与括号序列的双射即按顺序 dfs，进子树左括号出子树右括号。

现在有 $m$ 对 $(a_i,b_i)$，按包含顺序建树。设在 ordinal tree 第 $i$ 个限制对应的子树大小为 $siz_i$。

将 ordinal tree 对应到从 $(0,0)$ 到 $(n,n)$ 的格路，对于刚进入子树和即将离开子树的两个位置，要求 $(a_i,b_i-siz_i)$ 和 $(a_i+siz_i-1,b_i-1)$ 必须被格路经过，且在两点之间所有点不能超过 $y=x+b_i-siz_i-a_i$。

设 $f_{u,d}$ 表示 $(a_u,b_u)$，$siz_u=d$。对于 $u$ 的儿子 $v1,\ldots,v_k$，再多设 $g_{i,j}$ 表示处理了 $v_i$，且 $siz_{v_i}=j$。现在枚举 $(u,d,i,j,k)$，$(v,i)$ 是 $O(m)$ 的，复杂度 $O(mn^3)$。

写一下 $g_{v1,j}$ 到 $g_{v2,k}$ 的转移，强制进出子树的一步不能算，这个就是从 $(a_{v1}+j-1,b_{v1})$ 到 $(a_{v2}-1,b_{v2}-k)$ 随便走格路不碰某条直线。 那 $j\le a_{v_2}-a_{v1}$ 且 $k\le b_{v2}-b_{v1}$。因为是按包含关系建树，所以所有矩形 $[a_{v1},a_{v2}]\times [b_{v1},b_{v2}]$ 两两不交，所以 $(v,i,j,k)$ 是 $O(n^2)$，总复杂度 $O(n^3)$。

```cpp
using mint=ModInt<998244353>;

mint fac[maxn<<1],inv[maxn<<1];
mint C(int m,int n){
    if(n<0||m<0||m<n)return 0;
    return fac[m]*inv[n]*inv[m-n];}
void init(int n){
    fac[0]=1;for(int i=1;i<=n;i++)fac[i]=fac[i-1]*i;
    inv[n]=fac[n].inv();for(int i=n-1;~i;i--)inv[i]=inv[i+1]*(i+1);
}
mint calc(int x,int y,int xx,int yy){return C(xx-x+yy-y,xx-x);}
mint go(int b,int x,int y,int xx,int yy){//y=x+b
	if(y>x+b||yy>xx+b)return 0;
	return calc(x,y,xx,yy)-calc(y-b,x+b,xx,yy);
}
int n,m,a[maxn],b[maxn];
pii c[maxn];
vector<int> e[maxn];
mint f[maxn][maxn],g[maxn],tmp[maxn];
int st[maxn],tp;
void dfs(int u){
	for(int v:e[u])dfs(v);
	for(int d=1;d<=n+1;d++){
		int lim=b[u]-d-a[u]+1;
		if(!e[u].size()){
			f[u][d]=go(lim,a[u],b[u]-d,a[u]+d-1,b[u]-1);
			continue;
		}
		int lm=d;
		for(int j=1;j<=lm;j++){
			g[j]=go(lim,a[u],b[u]-d,a[e[u][0]]-1,b[e[u][0]]-j)*f[e[u][0]][j];
		}
		for(int i=1;i<e[u].size();i++){
			int v1=e[u][i-1],v2=e[u][i];
			lm=min(lm,a[v2]-a[v1]);
			for(int j=1;j<=lm;j++){
				for(int k=1;k<=b[v2]-b[v1];k++){
					tmp[k]+=g[j]*go(lim,a[v1]+j-1,b[v1],a[v2]-1,b[v2]-k)*f[v2][k];
				}
			}
			lm=b[v2]-b[v1];
			for(int j=1;j<=lm;j++)g[j]=tmp[j],tmp[j]=0;
		}
		for(int j=1;j<=lm;j++){
			f[u][d]+=g[j]*go(lim,a[e[u].back()]+j-1,b[e[u].back()],a[u]+d-1,b[u]-1);
		}
	}
}
void work(){
	n=read();m=read();init(2*n);
	for(int i=1;i<=m;i++)c[i]={read(),read()};sort(c+1,c+m+1);
	a[0]=0,b[0]=n+1;for(int i=1;i<=m;i++)a[i]=c[i].fi,b[i]=c[i].se;
	for(int i=0;i<=m;i++){
		while(tp&&b[st[tp]]<b[i])tp--;
		if(tp)e[st[tp]].pb(i);
		st[++tp]=i;
	}
	dfs(0);
	printf("%lld\n",f[0][n+1]);
}
```