---
title: 'P14836 题解'
date: 2026-01-26 21:52:42
tags: [题解,dp]
published: true
hideInList: false
feature: 
isTop: false
---
[P14836](https://www.luogu.com.cn/problem/P14836)

厉害。

分开算一种分配方案的满意度和分配物品的方案数。

将 $c_i$ 排序，形成若干个相等连续段，表示为长 $2^{m-1}$ 的 $\text{<}$ 或 $\text{=}$。对一个 $2^{m-1}$ 的大小关系算满意度：设 $coef_{s1,s2}$ 表示当前已经加入 $s1$ 这些人，形成长 $|s1|-1$ 的大小关系 $s2$，每次枚举 $s1$ 的一个超集作为新的一个相等连续段，贡献可以在外面 $O(3^mm^2)$ 算。对于 $\binom{m}{i}$ 个长为 $i$ 的 $s1$，有 $2^{i-1}$ 个 $s2$，$2^{m-i}$ 个超集，总复杂度 $O(4^m)$。

对于 $\sum c_i=n$，方案数是 $\binom{n}{c_1,\ldots,c_m}$，$\bmod p$ 不为 $0$ 的充要条件是 $\sum c_i=n$ 在每个 $p$ 进制位上都没有进位。那就按 $n$ 的 $p$ 进制表示从大到小，设 $f_{i,s}$ 表示已经考虑了 $i$ 位，目前大小关系为 $s$，新加入一位的时候，可以进一步划分原有的相等连续段，即枚举 $s$ 的超集 $t$，预处理系数 $g_{s,t,v}$ 表示给一层的 $c_i$ 填入 $[0,p)$ 的数，将大小关系 $s$ 进一步划分为 $s\cup t$，且一层总和为 $v$，即 $n$ 的 $p$ 进制在这一位的值。这里复杂度 $O(q3^m\log_p n)$。

那系数 $g_{s,t,i}$，显然 $s$ 的每个相等连续段相互独立。设 $h_{i,s,v}$ 表示将一个长 $i+1$ 的相等连续段在新的一位变为长 $i$ 的大小关系 $s$，总和 $v$ 的方案数。$g$ 就是每一段的 $h$ 背包起来。但是 $O(3^mp^2)$ 抗不住，可以把连续段组成相同的等价的 $(s,t)$ 缩起来，这样大概只有不到 $1.8\times 10^4$ 对。

然后是 $h_{i,s,v}$，就枚举 $i$ 和 $s$，然后 dp 前 $j$ 个数，最后一位选了 $k$，当前总和为 $s$，转移可能要分步。每次如果遇到 $\text{<}$，先强制让 $k$ 加 $1$，然后 $k$ 可以任意变大，对所有 $k$ 一起做。复杂度 $O(2^mmp^2)$。

注意取模的速度。

```cpp
const int p=317;
ll n;int m,q;
int a[maxm][maxm],b[maxm][maxm];
int val[10],k;
ll f[10][1<<maxm-1];
map<pii,int> mp;int idx;
int g[18000][maxn];ll g1[maxn];
int h[maxm][1<<maxm-1][maxn],h1[maxn][maxn],h2[maxn][maxn];
int coef[1<<maxm][1<<maxm-1],c1[1<<maxm];
int C[maxn][maxn];
vector<pii> to[1<<maxm-1];
inline void inc(int &u,int v){((u+=v)>=p)&&(u-=p);}
void work(){
	m=read();
	for(int i=0;i<m;i++){
		for(int j=0;j<m;j++)a[i][j]=read()%p;a[i][i]=1;
	}
	for(int i=0;i<m;i++){
		for(int j=0;j<m;j++)b[i][j]=read()%p;b[i][i]=1;
	}
	for(int i=0;i<p;i++){
		C[i][0]=1;for(int j=1;j<=i;j++)inc(C[i][j]=C[i-1][j],C[i-1][j-1]);
	}
	for(int s=1;s<(1<<m);s++){
		int val=1;
		for(int i=0;i<m;i++)if(s&(1<<i)){
			for(int j=0;j<m;j++)if(s&(1<<j))val=val*b[i][j]%p;
		}
		coef[s][0]=val;
	}
	for(int s=1;s<(1<<m);s++){
		int ss=(1<<m)-s-1;
		for(int t=ss;t;t=(t-1)&ss){
			int &val=c1[t]=1;
			for(int i=0;i<m;i++)if(t&(1<<i)){
				for(int j=0;j<m;j++)if(s&(1<<j))val=val*a[i][j]%p;
				for(int j=0;j<m;j++)if(t&(1<<j))val=val*b[i][j]%p;
			}
		}
		int sz=__builtin_popcount(s)-1;
		for(int s1=0;s1<(1<<sz);s1++)if(coef[s][s1]){
			coef[s][s1]%=p;
			for(int t=ss;t;t=(t-1)&ss){
				coef[s|t][s1|(1<<sz)]+=coef[s][s1]*c1[t];
			}
		}
	}
	for(int i=0;i<m;i++){
		for(int s=0;s<(1<<i);s++){
			for(int k=0;k<p;k++){
				for(int l=0;l<p;l++)h1[k][l]=0;
				if(k*(i+1)<p)h1[k][k]=1;
			}
			for(int j=0;j<i;j++){
				if(s&(1<<j)){
					for(int k=0;k<p-1;k++){
						for(int s=0;s+(k+1)*(i-j)<p;s++)h2[k+1][s]=h1[k][s];
					}
					for(int k=0;k<p;k++){
						for(int s=0;s+k*(i-j)<p;s++)h1[k][s]=h2[k][s],h2[k][s]=0;
					}
					for(int k=0;k<p-1;k++){
						for(int s=0;s+(k+1)*(i-j)<p;s++)h1[k+1][s]+=h1[k][s];
					}
				}
				for(int k=0;k<p;k++){
					for(int s=0;s+k*(i-j)<p;s++)if(h1[k][s])h2[k][s+k]=h1[k][s]*C[s+k][s]%p;
				}
				for(int k=0;k<p;k++){
					for(int s=0;s+k*(i-j-1)<p;s++)h1[k][s]=h2[k][s],h2[k][s]=0;
				}
			}
			for(int k=0;k<p;k++){
				for(int ss=0;ss<p;ss++)inc(h[i][s][ss],h1[k][ss]);
			}
		}
	}
	for(int s=0;s<(1<<m-1);s++){
		int ss=(1<<m-1)-1-s;
		for(int t=ss;;t=(t-1)&ss){
			vector<pii> a;
			for(int i=0,p=0;i<m;i++)if(i==m-1||(s&(1<<i))){
				int v=0;for(int j=p;j<i;j++)v|=((t>>j)&1)<<j-p;
				a.pb({i-p,v});
				p=i+1;
			}
			sort(a.begin(),a.end());
			int s0=0,s1=0,tt=0;
			for(auto[l,v]:a){
				s1+=v<<tt;
				tt+=l;
				s0|=1<<tt;
				tt++;
			}
			s0-=1<<m-1;
			if(mp.find({s0,s1})==mp.end()){
				mp[{s,t}]=++idx;
				int *gg=g[idx];
				gg[0]=1;
				for(auto[l,v]:a){
					int *hh=h[l][v];
					for(int i=0;i<p;i++){
						for(int j=0;i+j<p;j++)g1[i+j]+=gg[i]*hh[j]*C[i+j][i];
					}
					for(int i=0;i<p;i++)gg[i]=g1[i]%p,g1[i]=0;
				}
			}
			to[s].pb({t,mp[{s0,s1}]});
			if(!t)break;
		}
	}
	q=read();
	while(q--){
		n=read();
		k=0;while(n)val[++k]=n%p,n/=p;
		reverse(val+1,val+k+1);
		f[0][0]=1;
		for(int i=1;i<=k;i++){
			for(int s=0;s<(1<<m-1);s++)f[i][s]=0;
			for(int s=0;s<(1<<m-1);s++)if(f[i-1][s]){
				for(auto[t,id]:to[s])f[i][s|t]+=f[i-1][s]*g[id][val[i]];
			}
			for(int s=0;s<(1<<m-1);s++)if(f[i][s])f[i][s]%=p;
		}
		ll ans=0;for(int s=0;s<(1<<m-1);s++)ans+=f[k][s]*coef[(1<<m)-1][s];
		printf("%lld\n",ans%p);
	}
}
```

