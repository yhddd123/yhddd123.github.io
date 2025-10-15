---
title: P11834 题解
date: 2025-10-01 11:03:46
tags:
  - 题解
  - 计数
published: true
hideInList: false
feature:
isTop: false
---
[P11834](https://www.luogu.com.cn/problem/P11834)

为了方便，用 ```+-``` 来表示集合的加减。

记 $num_s$ 表示 $s$ 内部的边数，$cross(s,t)$ 表示 $s$ 指向 $t$ 的边数，因为最开始是无向边，有 $corss(s,t)=\frac{num_{s+t}-num_s-num_t}{2}$。	

转为数方案数，把无向边当作两条有向边，求有多少种删边方案合法。

### 数合法的外向生成树

对于 C 性质，边权全相等，合法的外向生成树就是合法的最小生成树。

要存在合法的外向生成树，即存在一些根能去到所有点，那缩点后这些根应当构成一个强连通分量，且这个强连通分量是唯一的 $0$ 入度的强连通分量。

数强连通分量即 [主旋律](https://www.luogu.com.cn/problem/P11714)。

设 $f_s$ 表示只考虑 $s$ 中的边且 $s$ 为强连通分量的方案数。容斥为减去不合法。不合法的方案是缩点后至少有 $cnt\ge 2$ 零度点，有 $-1^{cnt+1}$ 的容斥系数，剩下的可以乱连。再设 $g_s$ 表示 $s$ 是若干个相互之间没有边的强连通分量带上容斥系数并起来的方案数，每次可以拼上一个包含最小点的强连通分量。

$$f_s=2^{num_s}-\sum_{t\subseteq s} g_t2^{num_{s-t}+cross(t,s-t)}$$

$$g_s=f_s+\sum_{t\subset s,lowbit(s)=lowbit(t)} -f_tg_{s-t}$$

先算 $g_s$，再算 $f_s$，再给 $g_s$ 加上 $f_s$。

至于求答案。设 $ans_s$ 为 $s$ 是全图缩点后的唯一 $0$ 入度强连通分量，也就是 $s$ 是根的方案数。钦定若干个的 $0$ 入度点强连通分量 $s$，再枚举真正的 $0$ 入度点强连通分量 $t\subseteq s$，剩下的乱连。那些钦定的假的 $0$ 入度点强连通分量 $s-t$ 就是 $g_{s-t}$，再拼上 $t$ 还要带 $-1$ 的系数。

$$ans_t=\sum_{t\subseteq s}-f_tg_{s-t}2^{num_{U-s}+cross(s,U-s)}$$

#### code

```cpp
int n,m,ans;
int e[maxn],num[1<<maxn];
int f[1<<maxn],g[1<<maxn];
int pw[maxn*maxn];
void work(){
	n=read();m=read();ans=0;
	for(int i=0;i<n;i++)e[i]=0;
	for(int s=0;s<(1<<n);s++)f[s]=g[s]=num[s]=0;
	for(int i=1;i<=m;i++){
		int u=read()-1,v=read()-1,w=read();
		e[u]|=1<<v,e[v]|=1<<u;
		num[(1<<u)|(1<<v)]+=2;
	}
	for(int i=0;i<n;i++){
		for(int s=0;s<(1<<n);s++)if(s&(1<<i))num[s]+=num[s^(1<<i)];
	}
	f[0]=1,g[0]=mod-1;
	for(int s=1;s<(1<<n);s++){
		for(int t=(s-1)&s;t;t=(t-1)&s)if(__lg(s)==__lg(t))(g[s]+=mod-f[t]*g[s^t]%mod)%=mod;
		f[s]=pw[num[s]];
		for(int t=s;t;t=(t-1)&s){
			int cnt=(num[s]-num[t]-num[s^t])/2+num[s^t];
			(f[s]+=mod-g[t]*pw[cnt]%mod)%=mod;
		}
		(g[s]+=f[s])%=mod;
	}
	for(int s=1;s<(1<<n);s++){
		int cnt=(2*m-num[s]-num[((1<<n)-1)^s])/2+num[((1<<n)-1)^s];
		for(int t=s;t;t=(t-1)&s){
			(ans+=mod-f[t]*g[s^t]%mod*pw[cnt]%mod)%=mod;
		}
	}
	printf("%lld\n",ans*ksm(ksm(4,m))%mod);
}
```

### 数合法的最小外向生成树

要求 最小外向生成树 权值等于原图 最小生成树 权值。

对于最小的限制，就是要求对于任意一个权值 $W$，只加入 $w\le W$ 的边 $(u,v)$，合法的 最小外向生成树 的连通性要等于 最小生成树 的连通性。

于是从小到大按边权加入边，只考虑能使原来连通块合并的新边。这些新边权值全部相同，可以把之前连通块的根当作点，求选一些新边使这些点连通的方案数。

设 $bel_s$ 表示 $s$ 这些点在旧图中能去到的极大连通块的并，$coef_s$ 表示旧图中 $s$ 分别是 $bel_s$ 中的根的方案数。对于 $s$，加入新边的情况下，只考虑 $bel_s$ 内的边，$ans_s$ 表示在$s$ 是合并后连通块的根的方案数；$f_s$ 表示$s$ 是强连通分量的方案数；$g_s$ 表示 $s$ 是若干个强连通分量带上容斥系数拼起来的方案数。

对于两个不同连通块的可能的根 $s,t$，且要求 $s$ 不能指向 $t$，则 $bel_s$ 不能指向 $t$，此时 $s$ 指向 $bel_t-t$，$t$ 指向 $bel_s$，$bel_s-s$ 和 $bel_t-t$ 之间的边是可以存在的。

算 $f_s$ 时，总方案数是 $coef_s2^{num_{bel_s}}$，减去 $t$ 是若干个 0 度强连通分量的 $g_t$，剩下的 $s-t$ 是 $coef_{s-t}$，且 $s-t$ 不能指向 $t$ 。算 $g_s$ 时，还是枚举包含最小点的 $t$，且 $t$ 和 $s-t$ 之间不能有边。算 $ans_t$ 时，还要额外计算整个新连通块剩下部分的边。

$$f_s=coef_s2^{num_bel_s}-\sum_{t\subseteq s,bel_t\cap bel_{s-t}=\empty}g_tcoef_{s-t}2^{cross(t,bel_{s-t})+num_{bel_{s-t}}-num_{bel_t-t}}$$

$$g_s=f_s-\sum_{t\subset s,lowbit(s)=lowbit(t),bel_t\cap bel_{s-t}=\empty}f_tg_{s-t}2^{cross(t,bel_{s-t}-(s-t))+cross(s-t,bel_t-t)+num_{bel_s-s}-num_{bel_t-t}-num_{bel_{s-t}-(s-t)}}$$

求 $ans_t$ 系数和 $g_s$ 大体一样。

只有连通块合并时枚举子集，更小连通块做的次数加起来应该没有全局做的多，复杂度 $O(3^n)$。

#### code

```cpp
int n,m,res,mul=1;
int e[maxn],num[1<<maxn];
int f[1<<maxn],g[1<<maxn],coef[1<<maxn];
int pw[maxn*maxn];
int fa[maxn],id[maxn],vis[maxn];
int fd(int x){
	if(fa[x]==x)return x;
	return fa[x]=fd(fa[x]);
}
tuple<int,int,int> edge[maxn*maxn];
int ans[1<<maxn];
int bel[1<<maxn],sum[1<<maxn];
int cross(int s,int t){return (num[s|t]-num[s]-num[t])/2;}
void work(){
	n=read();m=read();mul=1;
	for(int i=1;i<=m;i++){
		int u=read()-1,v=read()-1,w=read();
		edge[i]={w,u,v};
	}
	for(int s=0;s<(1<<n);s++)ans[s]=0;
	for(int i=0;i<n;i++)ans[1<<i]=1;
	sort(edge+1,edge+m+1);
	for(int i=0;i<n;i++)fa[i]=i,id[i]=1<<i;
	for(int l=1,r=1;l<=m;l=r+1){
		while(r+1<=m&&get<0>(edge[l])==get<0>(edge[r+1]))r++;
		bool fl=0;
		for(int i=l;i<=r;i++){
			auto[w,u,v]=edge[i];
			if(fd(u)!=fd(v))fl=1;
			else mul=mul*4%mod;
		}
		if(!fl)continue;
		for(int i=0;i<n;i++)e[i]=0;
		for(int s=0;s<(1<<n);s++)num[s]=0;
		for(int i=l;i<=r;i++){
			auto[w,u,v]=edge[i];
			if(fd(u)!=fd(v)){
				e[u]|=1<<v,e[v]|=1<<u;
				num[(1<<u)|(1<<v)]+=2;
			}
		}
		for(int i=0;i<n;i++){
			for(int s=0;s<(1<<n);s++)if(s&(1<<i))num[s]+=num[s^(1<<i)];
		}
		for(int s=0;s<(1<<n);s++)sum[s]=0;
		for(int i=0;i<n;i++)if(fa[i]==i){
			for(int s=id[i];s;s=(s-1)&id[i])bel[s]=id[i],(sum[id[i]]+=ans[s])%=mod;
		}
		sum[0]=coef[0]=1;
		for(int s=1;s<(1<<n);s++){
			int u=__lg(s);
			bel[s]=bel[1<<u]|bel[s^(1<<u)];
			if((s&bel[1<<u])==bel[1<<u])sum[s]=sum[s^bel[1<<u]]*sum[bel[1<<u]]%mod;
			else sum[s]=0;
			coef[s]=coef[s^(s&bel[1<<u])]*ans[s&(bel[1<<u])]%mod;
		}
		for(int i=0;i<n;i++)vis[i]=0;
		for(int i=l;i<=r;i++){
			auto[w,u,v]=edge[i];
			u=fd(u),v=fd(v);
			if(u!=v)fa[u]=v,vis[v]=1,id[v]|=id[u],id[u]=0;
		}
		for(int i=0;i<n;i++)if(fa[i]==i&&vis[i]){
			vector<int> ids;
			for(int s=id[i];s;s=(s-1)&id[i])ids.pb(s);
			reverse(ids.begin(),ids.end());
			f[0]=1,g[0]=mod-1;
			for(int s:ids){
				g[s]=0;for(int t=(s-1)&s;t;t=(t-1)&s)if(!(bel[t]&bel[s^t])&&__lg(s)==__lg(t)){
					int cnt=cross(t,bel[s^t]^(s^t))+cross(s^t,bel[t]^t)+num[bel[s]^s]-num[bel[t]^t]-num[bel[s^t]^(s^t)];
					(g[s]+=mod-f[t]*g[s^t]%mod*pw[cnt]%mod)%=mod;
				}
				f[s]=coef[s]*pw[num[bel[s]]]%mod;
				for(int t=s;t;t=(t-1)&s)if(!(bel[t]&bel[s^t])){
					int cnt=cross(t,bel[s^t])+num[bel[s]^t]-num[bel[t]^t];
					(f[s]+=mod-g[t]*coef[s^t]%mod*pw[cnt]%mod)%=mod;
				}
				(g[s]+=f[s])%=mod;
			}
			for(int s:ids)ans[s]=0;
			for(int s:ids){
				for(int t=s;t;t=(t-1)&s)if(!(bel[t]&bel[s^t])){
					int cnt=cross(t,id[i]^bel[t]^(s^t))+cross(s^t,id[i]^t^bel[s^t])+num[id[i]^s]-num[bel[t]^t]-num[bel[s^t]^(s^t)];
					(ans[t]+=mod-f[t]*g[s^t]%mod*pw[cnt]%mod*sum[id[i]^bel[s]]%mod)%=mod;
				}
			}
		}
	// for(int s=0;s<(1<<n);s++)cout<<f[s]*mul%mod<<" ";cout<<"\n";
	// for(int s=0;s<(1<<n);s++)cout<<g[s]*mul%mod<<" ";cout<<"\n";
	// for(int s=0;s<(1<<n);s++)cout<<ans[s]*mul%mod<<" ";cout<<"\n";
	}
	res=0;for(int s=0;s<(1<<n);s++)(res+=ans[s])%=mod;
	printf("%lld\n",res*mul%mod*ksm(ksm(4,m))%mod);
}
```

