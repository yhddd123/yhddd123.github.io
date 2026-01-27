---
title: 'arc179d 题解'
date: 2023-12-31 07:46:04
tags: [题解,dp]
published: true
hideInList: false
feature: 
isTop: false
---
[arc179d](https://www.luogu.com.cn/problem/AT_arc179_d)

### 思路

设计树形 dp。$dp_{u,0}$ 表示进子树 $u$ 并不再出去的代价。$dp_{u,1}$ 表示进子树 $u$ 并返回，且传送门在 $fa$、不在子树内使用传送门的代价。$dp_{u,2}$ 表示进入子树 $u$ 并返回，且可以在子树内使用传送门。

发现 $dp_{u,1}$ 一定是遍历子树最后到子树中最深的点通过传送门返回，一定是 $2\times siz_u+\max (dep_i-dep_u)$。$dp_{u,0}$ 和 $dp_{u,2}$ 的唯一区别在于 $dp_{u,0}$ 最后进入的一个子树不用返回。

$$dp_{u,2}=\sum \max(dp_{v,1}+1,dp_{v,2}+2),dp_{u,0}=dp_{u,2}+\min (dp_{v,0}+1-\min(dp_{v,1}+1,dp_{v,2}+2))$$

然后换根 dp。考虑 $\max (dep_i-dep_u)$ 和 $\min (dp_{v,0}+1-\min(dp_{v,1}+1,dp_{v,2}+2))$ 的转移，需要记录最大值和次大值。

### code

```cpp
int n,ans=inf;
int head[maxn],tot;
struct nd{
	int nxt,to;
}e[maxn<<1];
void add(int u,int v){e[++tot]={head[u],v};head[u]=tot;}
int dp[maxn][3],siz[maxn];
pii dep[maxn],mn[maxn];
void dfs(int u,int fa){
	siz[u]=1;mn[u].fi=mn[u].se=0,dep[u].fi=dep[u].se=0;
	if(u!=1&&!e[head[u]].nxt){dp[u][0]=dp[u][1]=dp[u][2]=0;return ;}
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;if(v==fa)continue;
		dfs(v,u);siz[u]+=siz[v];
		if(dep[u].fi<dep[v].fi+1)dep[u].se=dep[u].fi,dep[u].fi=dep[v].fi+1;
		else if(dep[u].se<dep[v].fi+1)dep[u].se=dep[v].fi+1;
		int val=dp[v][0]+1-min(dp[v][1]+1,dp[v][2]+2);
		if(val<mn[u].fi)mn[u].se=mn[u].fi,mn[u].fi=val;
		else if(val<mn[u].se)mn[u].se=val;
		dp[u][0]+=min(dp[v][1]+1,dp[v][2]+2);
		dp[u][2]+=min(dp[v][1]+1,dp[v][2]+2);
	}
	dp[u][0]+=mn[u].fi;dp[u][1]=(siz[u]-1)*2-dep[u].fi;
	// cout<<u<<" "<<dp[u][0]<<" "<<dp[u][1]<<" "<<dp[u][2]<<"\n";
}
void dfs1(int u,int fa){
	ans=min(ans,dp[u][0]);
	// cout<<u<<" "<<dp[u][0]<<" "<<dp[u][1]<<" "<<dp[u][2]<<"\n";
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;if(v==fa)continue;
		int u0=dp[u][0],u1=dp[u][1],u2=dp[u][2];pii du=dep[u],mnu=mn[u];
		siz[u]-=siz[v],siz[v]+=siz[u];
		if(dep[u].fi==dep[v].fi+1)dep[u].fi=dep[u].se;
		int val=dp[v][0]+1-min(dp[v][1]+1,dp[v][2]+2);
		if(mn[u].fi==val)mn[u].fi=mn[u].se;
		dp[u][1]=(siz[u]-1)*2-dep[u].fi;
		dp[u][2]-=min(dp[v][1]+1,dp[v][2]+2);
		dp[u][0]=dp[u][2]+mn[u].fi;
		
		if(dep[v].fi<dep[u].fi+1)dep[v].se=dep[v].fi,dep[v].fi=dep[u].fi+1;
		else if(dep[v].se<dep[u].fi+1)dep[v].se=dep[u].fi+1;
		val=dp[u][0]+1-min(dp[u][1]+1,dp[u][2]+2);
		if(val<mn[v].fi)mn[v].se=mn[v].fi,mn[v].fi=val;
		else if(val<mn[v].se)mn[v].se=val;
		dp[v][0]+=min(dp[u][1]+1,dp[u][2]+2);
		dp[v][2]+=min(dp[u][1]+1,dp[u][2]+2);
		dp[v][0]=dp[v][2]+mn[v].fi;dp[v][1]=(siz[v]-1)*2-dep[v].fi;
		
		dfs1(v,u);
		dp[u][0]=u0,dp[u][1]=u1,dp[u][2]=u2;dep[u]=du,mn[u]=mnu;
		siz[v]-=siz[u],siz[u]+=siz[v];
	}
}
void work(){
	n=read();
	for(int i=1;i<n;i++){
		int u=read(),v=read();
		add(u,v),add(v,u);
	}
	dfs(1,0);
	dfs1(1,0);
	printf("%lld\n",ans);
}
```