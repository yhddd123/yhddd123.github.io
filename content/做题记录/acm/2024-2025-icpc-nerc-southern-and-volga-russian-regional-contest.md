---
title: '2024-2025 ICPC, NERC, Southern and Volga Russian Regional Contest'
date: 2024-11-19 17:12:21
tags: [acm]
published: true
hideInList: false
feature: 
isTop: false
---
[https://codeforces.com/contest/2038](https://codeforces.com/contest/2038)

### [A. Bonus Project](https://codeforces.com/contest/2038/problem/A)

$c_i$ 最多为 $\frac{a_i}{b_i}$。从后往前考虑。如果到 $n-1$ 个人时还有 $>c_{n-1}+c_n$ 的工作，就都罢工了；否则第 $n-1$ 个人会尽量留给 $n$ 做，且不让 $n$ 罢工。取 $c_n=\min(k,c_n)$，$k$ 减去 $c_n$ 递归为 $n-1$ 的子问题。

### [B. Make It Equal](https://codeforces.com/contest/2038/problem/B)

当 $a_i=x$ 时对所有 $i$ 做一遍得到 $a_i=x-1$，所以 $x$ 可二分。每次检查时暴力做若干轮，能减就减，$\sum a_i-x\times n$ 至少减半。

### [C. DIY](https://codeforces.com/contest/2038/problem/C)

扔掉只出现一次的，排序。检查取 $(a_1,a_2),(a_{n-1},a_n)$ 还是 $(a_1,a_2),(a_n,a_{n-1})$。

### [D. Divide OR Conquer](https://codeforces.com/contest/2038/problem/D)

对于右端点 $i$，合法的值 $x$ 的左端点区间 $[l,r]$ 只有 $O(\log V)$ 个。二分加 st 表找出来。$dp_{i,x}=\sum_{l\le j\le r}\sum_{y\le x}dp_{j-1,y}$。 扫描线 $i$，离散化后树状数组维护 $\le x$ 的 dp 值之和。对于 $i$ 的区间 $[l,r]$，$dp_{i,x}$ 在扫到 $l-1$ 时减去  $\le x$ 的 dp 值之和，扫到 $r$ 时加上 $\le x$ 的 dp 值之和，扫到 $i$ 时加到树状数组里。

```cpp
int n,a[maxn],ans;
int f[18][maxn];
int calc(int l,int r){
	int k=__lg(r-l+1);
	return f[k][l]|f[k][r-(1<<k)+1];
}
struct node{
	int l,r,x,f;
};
int lsh[maxn<<5],len;
vector<node> ask[maxn];
vector<pii> add[maxn],del[maxn];
void inc(int &u,int v){((u+=v)>=mod)&&(u-=mod);}
#define lb(x) (x&(-x))
int tree[maxn<<5];
void upd(int x,int w){while(x<=len)inc(tree[x],w),x+=lb(x);}
int que(int x){int res=0;while(x)inc(res,tree[x]),x-=lb(x);return res;}
void work(){
	n=read();
	for(int i=1;i<=n;i++)f[0][i]=a[i]=read();
	for(int j=1;j<18;j++){
		for(int i=1;i+(1<<j)-1<=n;i++)f[j][i]=f[j-1][i]|f[j-1][i+(1<<j-1)];
	}
	for(int i=1;i<=n;i++){
		int p=i;
		while(p){
			int l=1,r=p,res=p;
			while(l<=r){
				int mid=l+r>>1;
				if(calc(mid,i)==calc(p,i))res=mid,r=mid-1;
				else l=mid+1;
			}
			ask[i].pb({res,p,calc(p,i),0});
			lsh[++len]=ask[i].back().x;
			p=res-1;
		}
	}
	ask[0].pb({0,0,0,1});lsh[++len]=0;
	sort(lsh+1,lsh+len+1);len=unique(lsh+1,lsh+len+1)-lsh-1;
	for(int i=0;i<=n;i++){
		for(int j=0;j<ask[i].size();j++){
			ask[i][j].x=lower_bound(lsh+1,lsh+len+1,ask[i][j].x)-lsh;
		}
	}
	for(int i=1;i<=n;i++){
		for(int j=0;j<ask[i].size();j++){
			int l=ask[i][j].l-1,r=ask[i][j].r-1,x=ask[i][j].x;
			del[l].pb({i,j}),add[r].pb({i,j});
		}
	}
	for(int i=0;i<=n;i++){
		for(auto[i,j]:del[i])inc(ask[i][j].f,mod-que(ask[i][j].x));
		for(int j=0;j<ask[i].size();j++)upd(ask[i][j].x,ask[i][j].f);
		for(auto[i,j]:add[i])inc(ask[i][j].f,que(ask[i][j].x));
	}
	for(auto[l,r,x,f]:ask[n])inc(ans,f);
	printf("%lld\n",ans);
}
```


### [F. Alternative Platforms](https://codeforces.com/contest/2038/problem/F)

按 $(a_i,b_i)$ 降序，枚举最大值取到 $a_i$，枚举 $k$，要求在 $[1,i-1]$ 中选 $k-1$ 个且至少有一个 $b_j\le a_i$。容斥为减去所有都大于 $a_i$ 的情况，记 $num_i=\sum_{j\le i}[b_j> a_i]$，$ans_k=a_i\times(\binom{i-1}{k-1}-\binom{num_i}{k-1})$。$a_i\times\binom{i-1}{k-1}$ 差卷积。记 $val_j=\sum a_i\times [num_i=j]$，$val_j\times\binom{j}{k-1}$ 差卷积。交换 $a_i,b_i$，把大于等于改为严格大于再做一遍。

```cpp
int n;
pii a[maxn];
int num[maxn];
int lsh[maxn<<1],len;
int tree[maxn<<1];
#define lb(x) (x&(-x))
void upd(int x,int w){
	while(x<=len){tree[x]+=w,x+=lb(x);}
}
int que(int x){
	int res=0;
	while(x)res+=tree[x],x-=lb(x);
	return res;
}
int fac[maxn],inv[maxn];
inline int ksm(int a,int b=mod-2){
	int ans=1;
	while(b){
		if(b&1)ans=ans*a%mod;
		a=a*a%mod;
		b>>=1;
	}
	return ans;
}
int C(int m,int n){
	if(m<n||m<0||n<0)return 0;
	return fac[m]*inv[n]%mod*inv[m-n]%mod;
}
int ans[maxn],val[maxn];
using ploy::mul;
void work(){
	n=read();
	for(int i=1;i<=n;i++)a[i].fi=read(),lsh[++len]=a[i].fi;
	for(int i=1;i<=n;i++)a[i].se=read(),lsh[++len]=a[i].se;
	sort(lsh+1,lsh+len+1);len=unique(lsh+1,lsh+len+1)-lsh-1;
	for(int i=1;i<=n;i++)a[i].fi=lower_bound(lsh+1,lsh+len+1,a[i].fi)-lsh;
	for(int i=1;i<=n;i++)a[i].se=lower_bound(lsh+1,lsh+len+1,a[i].se)-lsh;
	fac[0]=1;for(int i=1;i<=n;i++)fac[i]=fac[i-1]*i%mod;
	inv[n]=ksm(fac[n]);for(int i=n-1;~i;i--)inv[i]=inv[i+1]*(i+1)%mod;
	sort(a+1,a+n+1);reverse(a+1,a+n+1);
	vector<int> f(n+1),g(n+1);
	f[0]=0;for(int i=1;i<=n;i++)f[i]=lsh[a[i].fi]*fac[i-1]%mod;
	for(int i=0;i<=n;i++)g[i]=inv[n-i];
	f=mul(f,g);
	for(int k=1;k<=n;k++)ans[k]=f[k+n]*inv[k-1]%mod;
	// for(int i=1;i<=n;i++){
		// for(int k=1;k<=n;k++)(ans[k]+=lsh[a[i].fi]*C(i-1,k-1))%=mod;
	// }
	for(int i=1;i<=n;i++){
		int num=que(len)-que(a[i].fi);
		if(a[i].se>a[i].fi)(val[num]+=lsh[a[i].fi])%=mod;
		upd(a[i].se,1);
	}
	f.resize(n),g.resize(n+1);
	for(int i=0;i<n;i++)f[i]=mod-val[i]*fac[i]%mod;
	for(int i=0;i<=n;i++)g[i]=inv[n-i];
	f=mul(f,g);
	for(int k=1;k<=n;k++)(ans[k]+=f[n+k-1]*inv[k-1])%=mod;
	// for(int i=0;i<n;i++){
		// for(int k=1;k<=n;k++)(ans[k]+=mod-val[i]*C(i,k-1)%mod)%=mod;
	// }
	for(int i=0;i<=n;i++)val[i]=0;
	for(int i=0;i<=len;i++)tree[i]=0;
	for(int i=1;i<=n;i++)swap(a[i].fi,a[i].se);
	sort(a+1,a+n+1);reverse(a+1,a+n+1);
	f.resize(n+1),g.resize(n+1);
	f[0]=0;for(int i=1;i<=n;i++)f[i]=lsh[a[i].fi]*fac[i-1]%mod;
	for(int i=0;i<=n;i++)g[i]=inv[n-i];
	f=mul(f,g);
	for(int k=1;k<=n;k++)(ans[k]+=f[k+n]*inv[k-1])%=mod;
	// for(int i=1;i<=n;i++){
		// for(int k=1;k<=n;k++)(ans[k]+=lsh[a[i].fi]*C(i-1,k-1))%=mod;
	// }
	for(int i=1;i<=n;i++){
		int num=que(len)-que(a[i].fi-1);
		if(a[i].se>=a[i].fi)(val[num]+=lsh[a[i].fi])%=mod;
		upd(a[i].se,1);
	}
	f.resize(n),g.resize(n+1);
	for(int i=0;i<n;i++)f[i]=mod-val[i]*fac[i]%mod;
	for(int i=0;i<=n;i++)g[i]=inv[n-i];
	f=mul(f,g);
	for(int k=1;k<=n;k++)(ans[k]+=f[n+k-1]*inv[k-1])%=mod;
	// for(int i=0;i<n;i++){
		// for(int k=1;k<=n;k++)(ans[k]+=mod-val[i]*C(i,k-1)%mod)%=mod;
	// }
	for(int i=1;i<=n;i++)printf("%lld ",ans[i]*ksm(C(n,i))%mod);puts("");
}
```

### [G. Guess One Character](https://codeforces.com/contest/2038/problem/G)

问 $1$ 和 $11$ 知道 $1$ 的连续段数，问 $01$ 能确定第一位。

### [I. Polyathlon](https://codeforces.com/contest/2038/problem/I)

复制一遍，对每个 $x$，求 $a_i[x,x+m-1]$ 排序后的最大值。因为 $m$ 内一定能区分，等价于对 $a_i[x,2\times m]$ 排序。考虑基数排序，从后往前对每位排序，复杂度 $O(nm)$。

```cpp
int n,m;
vector<int> a[maxn];
char s[maxn];
int id[maxn];
void work(int j){
	vector<int> pos[2];
	for(int i=1;i<=n;i++)pos[a[id[i]][j]].pb(id[i]);
	n=0;
	for(int i:pos[0])id[++n]=i;
	for(int i:pos[1])id[++n]=i;
}
int ans[maxn];
void work(){
	n=read();m=read();
	for(int i=1;i<=n;i++)a[i].resize(m+1);
	for(int i=1;i<=n;i++){
		scanf("%s",s+1);
		for(int j=1;j<=m;j++)a[i][j]=s[j]=='1';
	}
	for(int i=1;i<=n;i++)id[i]=i;
	for(int i=m-1;i;i--)work(i);
	for(int i=m;i;i--)work(i),ans[i]=id[n];
	for(int i=1;i<=m;i++)printf("%lld ",ans[i]);
}
```

### [J. Waiting for...](https://codeforces.com/contest/2038/problem/J)

模拟。

### [K. Grid Walk](https://codeforces.com/contest/2038/problem/K)

取出 $gcd(i,a)$ 和 $gcd(j,b)$ 的 $O(\log V)$ 个后缀最小值，在这些点组成的矩形上走。

### [L. Bridge Renovation](https://codeforces.com/contest/2038/problem/L)

贪心，枚举几个 $(18,21,21)$，$0/1$ 个 $(18,21)$，$0/1$ 个 ($18,25)$。其他的填 $(18,18,18)$，$(21,21)$，$(25,25)$。

### [M. Royal Flush](https://codeforces.com/contest/2038/problem/M)

设 $dp_{i,a}$ 表示剩 $i$ 张牌，$n$ 种花色的 $[10,14]$ 各持 $a_i$ 张，$a$ 是一个降序的 vector，里面只存没有被删过的状态的降序数量。枚举各种策略，枚举扔牌之后每种牌各进多少张，算概率，记搜。

注意取一个 $a$ 的前缀转移不一定最优，例如当前 $n=2$，有 $4$ 张 $x$ 和一张 $y$，扔掉 $y$ 之后一次只能摸一张扔一张，不如扔掉 $x$。策略是枚举一个子集。常数极小，60ms 以内。

```cpp
int n;
map<vector<int>,db> dp[55];
map<vector<int>,bool> vis[55];
db C(int m,int n){
	if(m<n||m<0||n<0)return 0;
	db ans=1;
	for(int i=1;i<=n;i++)ans=ans*(m-i+1)/(1.0*i);
	return ans;
}
db dfs(int dep,vector<int> a){
	if(dep<=0)return -1;
	if(a.front()==5)return -1;
	if(vis[dep][a])return dp[dep][a];vis[dep][a]=1;
	vector<int> aa=a;
	db ans=inf;
	int num=0;while(a.size()&&!a.back())a.pop_back(),++num;
	vector<int> aaa=a;
	for(int s=0;s<(1<<aaa.size());s++){
		a.clear();
		for(int i=0;i<aaa.size();i++)if(s&(1<<i))a.pb(aaa[i]);
		for(int i=1;i<=num;i++)a.pb(0);
		if(!a.size())continue;
		db res=0;
		int sum=0;for(int i:a)sum+=5-i;
		int in=5;for(int i:a)in-=i;
		if(!in)continue;
		for(int i=0;i<=(a.size()>0?5-a[0]:0);i++){
			if(i)a[0]+=i;
			for(int j=0;j<=(a.size()>1?5-a[1]:0)&&i+j<=in;j++){
				if(j)a[1]+=j;
				for(int k=0;k<=(a.size()>2?5-a[2]:0)&&i+j+k<=in;k++){
					if(k)a[2]+=k;
					for(int l=0;l<=(a.size()>3?5-a[3]:0)&&i+j+k+l<=in;l++){
						if(l)a[3]+=l;
						vector<int> aaaa=a;
						db val=C((a.size()>0?5-a[0]+i:0),i)*C((a.size()>1?5-a[1]+j:0),j)*C((a.size()>2?5-a[2]+k:0),k)*C((a.size()>3?5-a[3]+l:0),l)*C(dep-sum,in-i-j-k-l);
						val=val/C(dep,in);
						sort(a.begin(),a.end(),greater<int>());
						res+=val*(dfs(dep-in,a)+1);
						a=aaaa;
						if(l)a[3]-=l;
					}
					if(k)a[2]-=k;
				}
				if(j)a[1]-=j;
			}
			if(i)a[0]-=i;
		}
		ans=min(ans,res);
	}
	if(ans==inf)ans=-1;
	return dp[dep][aa]=ans;
}
void work(){
	n=read();
	vector<int> a(n,0);
	printf("%.9lf\n",dfs(13*n,a));
}
```

### [N. Fixing the Expression](https://codeforces.com/contest/2038/problem/N)

改运算符优于改数字。
