---
title: 'CF1218A 题解'
date: 2023-12-31 07:51:46
tags: [题解,图论,dp]
published: true
hideInList: false
feature: 
isTop: false
---
[CF1218A](https://www.luogu.com.cn/problem/CF1218A)

模拟赛一车贪心水过去了除了我。

### 思路

是基环树。先考虑树。如果从一个点开始，定为根，$ans=\sum siz_u$。换根 dp 即可。

把环找出来，考虑在环上点 $u$ 的子树中开始染色的答案。染色的方式是大致是从子树的叶子开始向上。对 $u$ 的每个非环上儿子做树的 dp。记 $g_u$ 表示从环上进入子树向下染色的答案，$dp_u$ 表示换根的、从子树内任意节点开始染色的方案。从环上 $u$ 的非环上儿子 $v$ 的子树开始的答案是 $dp_v+\sum_{v'\neq v} g_{v'}$，$ans_u=\sum g_v+\max (dp_v-g_v)$。染完环上 $u$ 的子树后，绕环染环上点。再从除 $u$ 外的环上点向下染其他环上点的子树，答案为 $\sum g_v$。

发现前后贡献固定，变动的是染环的顺序。染环是染一个区间，每次向左右拓展。每次染一个点，答案加上当前连通块大小，当前连通块大小减 $siz_u$。贪心向小的染是错的，因为有后效性。记录 $siz$ 的前缀和，区间 dp，$O(1)$ 向左右转移。$dp_{l,r}=\max (dp_{l+1,r}+n-(sum_r-sum_l),dp_{l,r-1}+n-(sum_{r-1}-sum_{l-1}))$。第一维记录区间长度，滚动即可。

### code

```cpp
int n;
int head[maxn],tot;
struct nd{
	int nxt,to;
}e[maxn<<1];
void add(int u,int v){e[++tot]={head[u],v};head[u]=tot;}
int siz[maxn],dp[maxn],g[maxn];
int d[maxn];
void dfs(int u,int fa){
	siz[u]=1;g[u]=0;
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;if(v==fa||d[v]==2)continue;
		dfs(v,u);siz[u]+=siz[v];g[u]+=g[v];
	}
	g[u]+=siz[u];
}
void dfs1(int u,int fa){
	if(d[fa]==2)siz[u]=n-siz[u]+1;
	else siz[u]=1;
	dp[u]=0;
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;if(v==fa||d[v]==2)continue;
		dfs1(v,u);siz[u]+=siz[v];dp[u]+=dp[v];
	}
	dp[u]+=siz[u];
}
int ans,res;
void dfs2(int u,int fa){
	ans=max(ans,dp[u]);
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;if(v==fa||d[v]==2)continue;
		dp[u]-=dp[v];dp[u]-=siz[u];siz[u]-=siz[v];dp[u]+=siz[u];
		dp[v]-=siz[v];siz[v]+=siz[u];dp[v]+=siz[v];dp[v]+=dp[u];
		dfs2(v,u);
		dp[v]-=dp[u];dp[v]-=siz[v];siz[v]-=siz[u];dp[v]+=siz[v];
		dp[u]-=siz[u];siz[u]+=siz[v];dp[u]+=siz[u];dp[u]+=dp[v];
	}
}
queue<int> q;
int p[maxn],num;
bool vis[maxn];
void dfs3(int u){
	vis[u]=1;p[++num]=u;
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;
		if(d[v]!=2)continue;
		if(!vis[v])dfs3(v);
	}
}
int f[2][maxn],cur,sum[maxn];
int calc(int l,int r){
	if(l>r)return sum[num]-sum[l-1]+sum[r];
	return sum[r]-sum[l-1];
}
void work(){
	n=read();
	for(int i=1;i<=n;i++){
		int u=read()+1,v=read()+1;
		add(u,v),add(v,u);
		d[u]++,d[v]++;
	}
	for(int i=1;i<=n;i++)if(d[i]==1)q.push(i);
	while(!q.empty()){
		int u=q.front();q.pop();
		for(int i=head[u];i;i=e[i].nxt){
			int v=e[i].to;
			if(d[v]>1){
				d[v]--;
				if(d[v]==1)q.push(v);
			}
		}
	}
	for(int i=1;i<=n;i++)if(d[i]==2)p[++num]=i;
	num=0;dfs3(p[1]);
	int sumg=0;
	for(int ii=1;ii<=num;ii++){
		int u=p[ii];
		siz[u]=1;
		for(int i=head[u];i;i=e[i].nxt){
			int v=e[i].to;
			if(d[v]!=2)dfs(v,u),sumg+=g[v],siz[u]+=siz[v];
		}
	}
	for(int i=1;i<=num;i++)sum[i]=sum[i-1]+siz[p[i]];
	// cout<<sumg<<"\n";
	for(int ii=1;ii<=num;ii++){
		int u=p[ii];
		int val=0;int s=n;
		for(int i=head[u];i;i=e[i].nxt){
			int v=e[i].to;
			if(d[v]!=2){
				ans=0;int lstsiz=siz[v];
				dfs1(v,u),dfs2(v,u);siz[v]=lstsiz;
				val=max(val,ans-g[v]+n-siz[v]);
				// cout<<ans<<" "<<g[v]<<" "<<siz[v]<<"\n";
			}
		}
		val=max(val,n);
		s-=siz[u];
		f[1][ii]=val+sumg;
	}
	cur=1;
	for(int i=2;i<=num;i++){
		for(int l=1,r=l+i-1;l<=num;l++,r=(r==num?1:r+1)){
			f[i&1][l]=max(f[cur][l]+n-calc(l,(r==1?num:r-1)),f[cur][(l==num?1:l+1)]+n-calc((l==num?1:l+1),r));
		}
		cur^=1;
	}
	for(int i=1;i<=num;i++)res=max(res,f[num&1][i]);
	printf("%lld\n",res);
}
```