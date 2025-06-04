---
title: 'CCPC 2024 Chongqing Site 做题记录'
date: 2024-11-19 15:49:04
tags: [acm]
published: true
hideInList: false
feature: 
isTop: false
---
## [第十届中国大学生程序设计竞赛 重庆站（CCPC 2024 Chongqing Site）](https://qoj.ac/contest/1840)

### [A. 乘积，欧拉函数，求和](https://qoj.ac/contest/1840/problem/9619)

注意到 $53\times 53\le 3000$，只要 $16$ 个质数，直接状压有没有选这些质数。每个数除掉掉这 $16$ 个质数，剩下一个大质数或 $1$，把剩下的数相同的一起做，一起乘 $\frac{x-1}{x}$.

```cpp
int n,a[maxn],ans;
int pre[15]={2,3,5,7,11,13,17,19,23,29,31,37,41,43,47};
inline int ksm(int a,int b=mod-2){
	int ans=1;
	while(b){
		if(b&1)ans=ans*a%mod;
		a=a*a%mod;
		b>>=1;
	}
	return ans;
}
vector<int> id[maxn];
int dp[1<<15],f[1<<15];
int msk[maxn];
void work(){
	n=read();
	for(int i=1;i<=n;i++)a[i]=read();
	for(int i=1;i<=n;i++){
		int x=a[i];
		for(int j=0;j<15;j++)if(x%pre[j]==0){
			msk[i]|=1<<j;
			while(x%pre[j]==0)x/=pre[j];
		}
		if(x==53*53)x=53;
		id[x].pb(i);
	}
	dp[0]=1;
	for(int i=1;i<=maxn-10;i++)if(id[i].size()){
		mems(f,0);
		for(int j:id[i]){
			for(int s=(1<<15)-1;~s;s--){
				(f[s|msk[j]]+=dp[s]*(i==1?a[j]:a[j]/i*(i-1))+f[s]*a[j])%=mod;
			}
		}
		for(int s=0;s<(1<<15);s++)(dp[s]+=f[s])%=mod;
	}
	for(int s=0;s<(1<<15);s++)if(dp[s]){
		int val=dp[s];
		for(int i=0;i<15;i++)if(s&(1<<i))val=val*ksm(pre[i])%mod*(pre[i]-1)%mod;
		(ans+=val)%=mod;
	}
	printf("%lld\n",ans);
}
```

### [B. osu!mania](https://qoj.ac/contest/1840/problem/9620)

模拟，$+0.5+eps$ 下取整。

### [C. 连方](https://qoj.ac/contest/1840/problem/9621)

特判全 ```.```  或全 ```#```，剩下的一定可以构造出来。$c_{2,i}$ 与 $c_{1,i}$ 反过来填，使第一行连通。$c_{3,i}$ 取一个单点连接第 $2$ 行，$567$ 行同 $321$ 行，第 $4$ 行将第 $3,5$ 行的单点连通。

### [D. 有限小数](https://qoj.ac/contest/1840/problem/9622)

将 $b$ 的 $2,5$ 因子拆出来，令 $b=b'p$，$b'$ 中没有 $2,5$ 因子。发现 $d=2^i5^jb$。枚举 $i,j$，$2^i5^j=q$，有 $\frac{a}{pb}+\frac{c}{qb}=\frac{e}{10^m}$，$aq+pc=be$。exgcd 解 $c,e$。

```cpp
int a,b;
pii ans={inf,inf};
void exgcd(int a,int b,int &x,int &y){
	if(!b){x=1,y=0;return ;}
	exgcd(b,a%b,x,y);
	int p=x;
	x=y,y=p-(a/b)*y;
}
void work(){
	a=read(),b=read();ans={inf,inf};int p=1;
	while(b%2==0)b/=2,p*=2;
	while(b%5==0)b/=5,p*=5;
	int xx=0,yy=0;exgcd(b,p,xx,yy);
	if(b==1){puts("0 1");return ;}
	for(int i=1;i*b<=inf;i*=2){
		for(int j=i;j*b<=inf;j*=5){
			int q=j,c=yy,d=q*b;
			c*=-a*q;c%=b,c+=b,c%=b;
			ans=min(ans,{c,d});
		}
	}
	printf("%lld %lld\n",ans.fi,ans.se);
}
```

### [E. 合成大西瓜](https://qoj.ac/contest/1840/problem/9623)

可以取到所有度数 $\ge 2$ 的点和次大值。

### [H. str(list(s))](https://qoj.ac/submission/745689)

设 $dp_{i,j}$ 表示第 $i$ 轮模 $p$ 为 $j$ 的位置的和，$f_{i,j,0/1}$ 表示第 $i$ 轮模 $p$ 为 $j$ 的位置是否为 ```'``` '的方案数。按规则模拟。

### [I. 算术](https://qoj.ac/contest/1840/problem/9627)

$1122\to33$，$11\to 22$。

### [J. 骰子](https://qoj.ac/contest/1840/problem/9628)

答案为 $6nm$。在一个 $2\times 2$ 的矩阵内可以从以 $6$ 为底去到相邻位置以 $6$ 为底。

### [K. 小 C 的神秘图形](https://qoj.ac/contest/1840/problem/9629)

模拟。

### [M. Median Replacement](https://qoj.ac/contest/1840/problem/9631)

如果一个数成为长为 $3$ 的区间的中位数，就可以成为最后的数。将值域离散化，对于 $x$ 计算答案 $\ge x$ 的方案数，即 $\prod r_i-l_i+1$ 减去答案 $<x$ 的方案数。转为 $0/1/2$，设 $dp_{i,0/1,0/1}$ 表示这个和上一个是否 $\ge x$，不能存在 $101$ 或 $110$。很难发现 $val_x$ 是关于 $x$ 的若干次多项式，取 $200$ 个之后插值。

```cpp
int n,ans;
int l[maxn],r[maxn];
int lsh[maxn],len;
int x[maxn],y[maxn];
int dp[maxn][2][2];
int calc(int v){
	for(int i=1;i<=n;i++)dp[i][0][0]=dp[i][0][1]=dp[i][1][0]=0;dp[0][0][0]=1;
	int mul=1;
	for(int i=1;i<=n;i++){
		int len=r[i]-l[i]+1,l1=max(0ll,min(len,v-l[i])),l2=max(0ll,min(len,r[i]-v+1));
		dp[i][0][0]=(dp[i-1][0][0]+dp[i-1][1][0])*l1%mod;
		dp[i][0][1]=dp[i-1][0][0]*l2%mod;
		dp[i][1][0]=dp[i-1][0][1]*l1%mod;
		mul=mul*len%mod;
	}
	return (mul+3*mod-dp[n][0][0]-dp[n][0][1]-dp[n][1][0])%mod;
}
int lag(int k,int v){
	int res=0;
	for(int i=1;i<=k;i++){
		int mul1=1,mul2=1;
		for(int j=1;j<=k;j++)if(i!=j){
			mul1=mul1*(v+mod-x[j])%mod;
			mul2=mul2*(x[i]+mod-x[j])%mod;
		}
		(res+=y[i]*mul1%mod*ksm(mul2))%=mod;
	}
	return res;
}
void work(){
	n=read();ans=0;
	for(int i=1;i<=n;i++)l[i]=read();
	for(int i=1;i<=n;i++)r[i]=read();
	lsh[len=1]=1;
	for(int i=1;i<=n;i++)lsh[++len]=l[i],lsh[++len]=r[i]+1;
	sort(lsh+1,lsh+len+1),len=unique(lsh+1,lsh+len+1)-lsh-1;
	for(int i=1;i<len;i++){
		int ll=lsh[i],rr=lsh[i+1]-1,k=min(rr-ll+1,200ll);
		for(int j=ll;j<=ll+k-1;j++)y[j-ll+1]=calc(x[j-ll+1]=j);
		for(int j=1;j<=k;j++)(y[j]+=y[j-1])%=mod;
		if(rr-ll+1==k)(ans+=y[rr-ll+1])%=mod;
		else (ans+=lag(k,rr))%=mod;
	}
	printf("%lld\n",ans);
}
```