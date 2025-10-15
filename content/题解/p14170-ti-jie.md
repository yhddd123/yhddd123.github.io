---
title: P14170 题解
date: 2025-10-11 21:50:25
tags:
  - 题解
  - 计数
published: true
hideInList: false
feature:
isTop: false
---
厉害题。根本想不到。

### Solution

先考虑完美匹配怎么做。

考虑 hall 定理判定，要求 $\forall S,|S|\le|N(S)|$。记 $w(S)=|S|-|N(S)|$。考虑容斥掉不合法的，对于 $\exist S,w(S)>0$ 的图，选取一个代表元，使得 $w(S)$ 最大，存在相等时令 $|S|$ 最小。

可以证明，这样使得每个没有完美匹配的图，有唯一的代表元 $S$，所以只会被减一次。假设存在另一个 $S'$ 满足 $w(S)=w(S'),|S|=|S'|$。如果 $S$ 与 $S'$ 无交，$w(S\cup S')$ 更大。否则 $S$ 与 $S'$ 相交却不包含，设 $S2=S\cap S',S1=S-S2,S3=S'-S2$，可以得到 $w(S\cap S')+w(S\cup S')=|S1|+2|S2|+|S3|-|N(S2)|-|N(S1)\cup N(S2)\cup N(S3)|\ge |S1|+2|S2|+|S3|-|N(S1)\cup N(S2)|-|N(S2)\cup N(S3)|=w(S)+w(S')$。如果取等于号，则 $|S\cap S'|$ 更小，否则 $w(S\cap S')$ 和 $w(S\cup S')$ 中必然有一个比 $w(S)$ 大。

于是可以设 $f_{S,T}$ 表示只考虑 $S$ 和 $T$ 中的边，满足 $N(S)=T$，存在完美匹配的概率；$g_{S,T}$ 表示只考虑 $S$ 和 $T$ 中的边，满足 $N(S)=T$，且此时 $S$ 是代表元的概率。记 $ok_{S,T}$ 表示 $N(S)=T$ 的概率，$no_{S,T}$ 表示 $S$ 和 $T$ 中无边的概率。

对于 $f_{S,T}$，总方案数为 $ok_{S,T}$，不合法的是枚举代表元 $S1$ 和 $T1=N(S1)$，此时 $S1$ 不能向 $T-T1$ 连边，$S-S1,T-T1$ 必须有完美匹配（否则 $w(S1)$ 可以更大）。

对于 $g_{S,T}$，总方案数为 $ok_{S,T}$，不合法的是枚举更优的代表元 $S1$ 和 $T1$，其余限制与算 $f_{S,T}$ 时相同。

现在要算所有最大匹配的方案数。最大匹配等于左部点数量减 $\max (|S|-|N(S))$。

枚举全图的代表元 $S$ 和 $T$（对于完美匹配则 $S=T=\empty$），剩下的 $U_L-S$ 也得有完美匹配，额外枚举 $T1\subseteq U_R-T$ 表示 $U-S$ 与哪些右部点形成完美匹配，此时 $U_L-S$ 不能连向 $U_R-T-T1$。

复杂度 $O(3^{2n})$。

### code

```cpp
int n,m,e[maxn][maxn],ans;
int no[1<<maxn][1<<maxn],ok[1<<maxn][1<<maxn];
int f[1<<maxn][1<<maxn],g[1<<maxn][1<<maxn];
int sz[1<<maxn];
void work(){
	n=read(),m=read();ans=0;
	for(int i=0;i<n;i++){
		for(int j=0;j<m;j++)e[i][j]=read()*ni%mod;
	}
	for(int s=0;s<(1<<n);s++){
		for(int t=0;t<(1<<m);t++){
			no[s][t]=1;
			for(int i=0;i<n;i++)if(s&(1<<i)){
				for(int j=0;j<m;j++)if(t&(1<<j))no[s][t]=no[s][t]*(1-e[i][j]+mod)%mod;
			}
			ok[s][t]=1;
			for(int j=0;j<m;j++)if(t&(1<<j)){
				ok[s][t]=ok[s][t]*(1-no[s][1<<j]+mod)%mod;
			}
		}
	}
	for(int s=0;s<(1<<max(n,m));s++)sz[s]=__builtin_popcount(s);
	for(int s=0;s<(1<<n);s++){
		for(int t=0;t<(1<<m);t++){
			if(sz[s]>sz[t]){
				g[s][t]=ok[s][t];
				for(int s1=s;s1;s1=(s1-1)&s){
					for(int t1=t;;t1=(t1-1)&t){
						if((s1!=s||t1!=t)&&sz[s1]-sz[t1]>=sz[s]-sz[t]){
							(g[s][t]+=mod-g[s1][t1]*no[s1][t^t1]%mod*f[s^s1][t^t1]%mod)%=mod;
						}
						if(!t1)break;
					}
				}
			}
			else{
				f[s][t]=ok[s][t];
				for(int s1=s&(s-1);s1;s1=(s1-1)&s){
					for(int t1=t&(t-1);;t1=(t1-1)&t){
						if(s1!=s||t1!=t)(f[s][t]+=mod-g[s1][t1]*no[s1][t^t1]%mod*f[s^s1][t^t1]%mod)%=mod;
						if(!t1)break;
					}
				}
			}
		}
	}
	for(int s=0;s<(1<<n);s++){
		for(int t=(1<<m)-1;t;t--){
			for(int t1=t&(t-1);;t1=(t1-1)&t){
				(f[s][t]+=f[s][t1]*no[s][t^t1])%=mod;
				if(!t1)break;
			}
		}
	}
	g[0][0]=1;
	for(int s=0;s<(1<<n);s++){
		for(int t=0;t<(1<<m);t++)if(g[s][t]){
			(ans+=g[s][t]*no[s][(1<<m)-1-t]%mod*f[(1<<n)-1-s][(1<<m)-1-t]%mod*(n-(sz[s]-sz[t])))%=mod;
		}
	}
	printf("%lld\n",ans);
}
```