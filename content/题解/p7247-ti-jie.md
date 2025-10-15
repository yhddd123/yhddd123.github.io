---
title: 'P7247 题解'
date: 2023-12-31 17:25:11
tags: [题解,dp]
published: true
hideInList: false
feature: 
isTop: false
---
[P7247](https://www.luogu.com.cn/problem/P7247)

参考 EI 题解。

### 思路

因为随机移动，所以可以不管当前在具体哪个点，发现本质不同的只有根节点和非根节点。设 $dp_{i,0/1}$ 表示还剩 $i$ 个未标记点，当前在或不在根节点。可以通过根到随机非根节点的期望 $x$，随机非根节点到根的期望 $y$，随机非根节点到另一个随机非根节点的期望 $z$ 来转移。

可以 dfs 预处理三个值。期望转为总和除以方案数。记 $dis_u$ 表示 $1$ 到 $u$ 的距离。

$$x=\frac{\sum dis_u\times a_u}{n-1}$$

$$y=\frac{\sum dis_u\times a_1}{n-1}$$

$$z=\frac{\sum_{u\neq 1}\sum_{v\neq 1}(dis_u+dis_v-2\times dis_{lca(u,v)}\times a_u}{(n-1)\times(n-2)}$$

对于 $z$ 当递归到 $u$ ，计算 $lca(uu,vv)=u$ 的有序对 $(uu,vv)$ 的答案。分别计算从每个子树出去和进入每个子树的贡献和。然后就可以 dp。

$$dp_{i,0}=\frac{i}{n-1}\times (dp_{i-1,1}+x)+\frac{n-i-1}{n-1}\times(dp_{i,1}+y)$$

$$dp_{i,1}=\frac{i}{n-1}\times (dp_{i-1,1}+z)+\frac{1}{n-1}\times(dp_{i,0}+y)+\frac{n-i-2}{n-1}\times(dp_{i,1}+z)$$

移项解得：

$$dp_{i,0}=dp_{i-1,1}+\frac{(n-1)(i-1)x+(n-i-1)y+(n-i-1)(n-2)z}{n\times i}$$

$$dp_{i,1}=dp_{i-1,1}+\frac{(n-1)x+(n-1)y+(n-1)(n-2)z}{n\times i}$$

### code

```cpp
int n,a[maxn];
int head[maxn],tot;
struct nd{
	int nxt,to,w;
}e[maxn<<1];
void add(int u,int v,int w){e[++tot]={head[u],v,w};head[u]=tot;}
int x,y,z;
int dis[maxn],sum[maxn],siz[maxn],sa[maxn],mul[maxn];
int inc(int u,int v){
	((u+=v)>=mod)&&(u-=mod);
	return u;
}
void dfs(int u,int fa){
	if(u!=1)(x+=dis[u]*a[u])%=mod,(y+=dis[u]*a[1])%=mod;
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;if(v==fa)continue;
		dis[v]=inc(dis[u],e[i].w);dfs(v,u);
		siz[u]+=siz[v],sum[u]=inc(sum[u],sum[v]),sa[u]=inc(sa[u],sa[v]),mul[u]=inc(mul[u],mul[v]);
	}
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;if(v==fa)continue;
		(z+=(siz[u]-siz[v])*(mul[v]-dis[u]*sa[v]%mod+mod))%=mod;
		(z+=(sa[u]-sa[v]+mod)*(sum[v]-siz[v]*dis[u]%mod+mod))%=mod;
	}
	if(u!=1){
		(z+=a[u]*(sum[u]-siz[u]*dis[u]%mod+mod))%=mod;
		(z+=mul[u]-dis[u]*sa[u]%mod+mod)%=mod;
	}
	siz[u]++,sum[u]=inc(sum[u],dis[u]),sa[u]=inc(sa[u],a[u]),(mul[u]+=a[u]*dis[u])%=mod;
}
int dp[maxn][2];
int inv[maxn];
void work(){
	n=read();
	for(int i=1;i<=n;i++)a[i]=read();
	for(int i=1;i<n;i++){
		int u=read(),v=read(),w=read();
		add(u,v,w),add(v,u,w);
	}
	dfs(1,0);
	inv[0]=inv[1]=1;for(int i=2;i<=n;i++)inv[i]=(mod-mod/i)*inv[mod%i]%mod;
	x=x*inv[n-1]%mod,y=y*inv[n-1]%mod,z=z*inv[n-1]%mod*inv[n-2]%mod;
	for(int i=1;i<n;i++){
		dp[i][0]=(dp[i-1][1]+((n-1)*(i+1)%mod*x+(n-i-1)*y+(n-i-1)*(n-2)%mod*z)%mod*inv[i]%mod*inv[n])%mod;
		dp[i][1]=(dp[i-1][1]+((n-1)*x+(n-1)*y+(n-1)*(n-2)%mod*z)%mod*inv[i]%mod*inv[n])%mod;
	}
	printf("%lld\n",dp[n-1][0]);
}
```