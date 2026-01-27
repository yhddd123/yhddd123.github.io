---
title: 'CF2029H 题解'
date: 2026-01-21 21:37:51
tags: [题解,dp]
published: true
hideInList: false
feature: 
isTop: false
---
[CF2029H](https://www.luogu.com.cn/problem/CF2029H)

厉害。

记 ```+-``` 表示集合的加减。

可能状态设 $S$ 全有了剩下要几步不是很好搞。把每一步拆开，设 $f_S$ 表示恰好能到 $S$ 这个状态的概率，$g_S$ 表示 $S$ 要走出去期望几步。

记 $val_S$ 表示 $S$ 内的边全部不出现的概率，$ban(S,T)$ 表示 $S$ 和 $T$ 之间的边全部不出现的概率，$ban(S,T)=\frac{val_{S\cup T}}{val_Sval_T}$。因为保证任意集合一定能走得出去，所以 $g_S$ 就是存在边走出去的概率的倒数，即 $\frac{1}{1-ban(S,U-S)}$。

恰好到状态 $S$ 的概率，再枚举外面下一步到的 $T$，不能去到 $U-S-T$，且每个 $T$ 中的点都要有边连向连向 $S$，转移到 $f_{S\cup T}$，精细实现复杂度 $O(3^n)$。注意到后面那个限制没有办法拆为只与 $S,T,S\cup T$ 相关，如果可以，就可以子集卷积优化。

比较逆天的是，可以在这里加一个容斥。容斥为从 $f_S$，去到 $T$ 的一个非空子集，但是一定不能去到 $U-S-T$，转移到 $h_{S\cup T}$。此时 $h$ 是 $f$ 的一个高位前缀和。此时的系数是：合法的情况 $ban(S,U-S-T)-ban(S,U-S)$ 乘能走出去的概率 $g_S$。

现在就能做了。$f$ 的本质是在做半在线卷积。每次转移的 $|S|$ 严格变大，按 $|S|$ 分层转移。对于 $|S|=i$ 的一层，先算 $h_S=\sum_{T\subset S} f_Tg_T\frac{val_{U-S+T}}{val_{T}val_{U-S}}$，即把 $T$ 相关的系数在 $j<i$ 层 FWT，$S-T$ 的系数也按层 FWT，点乘然后 IFWT 回去。$h_S$ 还要减去子集 $T$ 的 $f_Tg_Tban(T,U-T)$。然后已经算对了 $|S|=i$ 的 $h_S$，再减去 $\sum_{T\subset S}f_T$ 就是 $f_S$。后面这两个都是一个高位前缀和。

卡常方面，$S$ 一定包含 $1$，状态除以 $2$。然后优化以下取模运算。

```cpp
int n,m;mint ans;
mint e[maxn][maxn];
mint f[1<<maxn-1],g[1<<maxn-1],tf[1<<maxn-1];
mint val[1<<maxn],ival[1<<maxn];
inline mint ban(int s,int t){return val[s|t]*ival[s]*ival[t];}
mint ff[maxn][1<<maxn-1],gg[maxn][1<<maxn-1];
void fmt1(mint *a,int n){
	for(int l=2;l<=n;l<<=1){
		int k=l>>1;
		for(int i=0;i<n;i+=l){
			for(int j=i;j<i+k;j++)a[j+k]+=a[j];
		}
	}
}
void fmt2(mint *a,int n){
	for(int l=2;l<=n;l<<=1){
		int k=l>>1;
		for(int i=0;i<n;i+=l){
			for(int j=i;j<i+k;j++)a[j+k]-=a[j];
		}
	}
}
vector<int> id[maxn];
void work(){
	n=read();m=read();
	for(int i=1;i<=m;i++){
		int u=read()-1,v=read()-1;mint p=read(),q=read();
		e[u][v]=e[v][u]=p/q;
	}
	val[0]=ival[0]=1;for(int s=1;s<(1<<n);s++){
		int k=__lg(s);
		val[s]=val[s^(1<<k)];
		for(int j=0;j<k;j++)if(s&(1<<j))val[s]=val[s]*(1-e[j][k]);
		ival[s]=(val[s]).inv();
	}
	for(int s=0;s+1<(1<<n-1);s++){
		g[s]=(1-ban(s<<1|1,(1<<n)-1-(s<<1|1))).inv();
	}
	f[0]=1;
	for(int s=0;s<(1<<n-1);s++)id[__builtin_popcount(s)].pb(s);
	ff[0][0]=f[0]*g[0]*ival[1];fmt1(ff[0],1<<n-1);
	for(int s=0;s<(1<<n-1);s++)gg[__builtin_popcount(s)][s]=val[(1<<n)-1-(s<<1)];
	for(int i=0;i<n-1;i++)fmt1(gg[i],1<<n-1);
	for(int i=1;i<n-1;i++){
		for(int j=0;j<i;j++){
			for(int s=0;s<(1<<n-1);s++)ff[i][s]+=ff[j][s]*gg[i-j][s];
		}
		fmt2(ff[i],1<<n-1);
		for(int s:id[i])f[s]=ff[i][s]*ival[(1<<n)-1-(s<<1|1)];
		for(int j=0;j<i;j++){
			for(int s:id[j])tf[s]=f[s]*ban((s<<1|1),(1<<n)-1-(s<<1|1))*g[s]+(!!j)*f[s];
		}
		for(int s:id[i])tf[s]=0;
		fmt1(tf,1<<n-1);
		for(int s:id[i])f[s]-=tf[s];
		for(int s=0;s<(1<<n-1);s++)ff[i][s]=0;
		for(int s:id[i])ff[i][s]=f[s]*g[s]*ival[s<<1|1];
		fmt1(ff[i],1<<n-1);
	}
	for(int s=0;s<(1<<n-1);s++)ans+=f[s]*g[s];
	printf("%d\n",ans.x);
}
```

