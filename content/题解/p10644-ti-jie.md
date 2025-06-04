---
title: 'P10644 题解'
date: 2024-11-25 19:46:17
tags: [题解,构造]
published: true
hideInList: false
feature: 
isTop: false
---
[P10644](https://www.luogu.com.cn/problem/P10644)

[Public NOIP Round #8 D. 矩阵](https://pjudge.ac/contest/1847/problem/21864)

大量证明缺失，只有构造方法。参考 [std](https://github.com/nordicolympiad/nordic-olympiad-2022/blob/main/powergrid/submissions/accepted/nils.cpp)。

### 思路

令 $f_i=\sum_{j=1}^m a_{i,j}$，$g_j=\sum_{i=1}^n a_{i,j}$。当 $c'_{i,j}=f_i-g_j$ 时认为 $c'_{i,j}$ 的符号是正确的。记 $p1$ 为一个不全相同的行，$p2$ 为一个不全相同的列。

如果能构造出合法的 $\sum f_i=\sum g_j$，可以同 [arc135d](https://www.luogu.com.cn/problem/AT_arc135_d) 的方法，取出同符号的 $f_i,g_j$ 消掉绝对值较小的，再取出符号相反的 $f_i,f_j$ 或 $g_i,g_j$ 消掉绝对值较小的。

如果存在 $p1,p2$。找到一个 $c_{p1,p2}\neq c_{p1,p3}$，枚举 $c'_{p1,p2}$ 和 $c'_{p1,p3}$ 的符号，令 $f_{p1}=0,g_{p2}=c'_{p1,p2},g_{p3}=c'_{p1,p3}$，带进去解 $f_i,g_j$ ，有唯一解。然后调整，令 $f_{p1}$ 初始为 $\frac{\sum f_i-\sum g_j}{n-m}$ 使 $\sum f_i=\sum g_j$。

如果不存在 $p1$ 和 $p2$，即所有 $c_{i,j}$ 相等。如果 $n$ 为偶数，构造 $g_j=0$，前 $\frac{n}{2}$ 个 $f_i$ 为 $c_{1,1}$，其他为 $-c_{1,1}$。否则 $n$ 为奇数，令 $g_j$ 全为 $x$，有 $n1$ 个 $f_i$ 为 $x+c_{1,1}$，$n2=n-n1$ 个为 $x-c_{1,1}$，有 $c_{1,1}=\frac{(m-n)x}{n1-n2}$。$n1\neq n2$，枚举 $n1$ 求 $x$。$m$ 为奇偶也同理。

否则 $p1,p2$ 只有一个有值，反转 $n,m$ 使 $p1$ 有值。因为每列的 $c_{i,j}$ 都相等，构造第一行复制 $n$ 次。所以有 $n\times f_1=\sum f_i=\sum g_j$，$g_j=f_1-c'_{i,j}$，$\sum g_j=m\times f_1-\sum c'_{1,j}$。所以 $(n-m)\times f_1=-\sum c'_{1,j}$。设 $dp_{i,s}$ 表示前 $i$ 个 $c'_{i,j}$ 的和为 $s$ 是否可行。当 $n\neq m$ 时要求 $s\bmod (n-m)=0$，$O(n^2)$ dp 取模后的 $s$。$n=m$ 时要求$\sum c'_{i,j}=0$，bitset $O(\frac{n^3}{w})$ 加速。

### code

```cpp
int n,m;
int a[maxn][maxn],c[maxn][maxn],b[maxn][maxn];
int f[maxn],g[maxn];
void get(){
	vector<int> f1,f2,g1,g2;
	for(int i=1;i<=n;i++){
		if(f[i]<0)f1.pb(i);
		if(f[i]>0)f2.pb(i);
	}
	for(int j=1;j<=m;j++){
		if(g[j]<0)g1.pb(j);
		if(g[j]>0)g2.pb(j);
	}
	while(f1.size()&&g1.size()){
		int u=f1.back(),v=g1.back();f1.pop_back(),g1.pop_back();
		int d=min(abs(f[u]),abs(g[v]));
		a[u][v]-=d;f[u]+=d,g[v]+=d;
		if(f[u])f1.pb(u);
		if(g[v])g1.pb(v);
	}
	while(f2.size()&&g2.size()){
		int u=f2.back(),v=g2.back();f2.pop_back(),g2.pop_back();
		int d=min(abs(f[u]),abs(g[v]));
		a[u][v]+=d;f[u]-=d,g[v]-=d;
		if(f[u])f2.pb(u);
		if(g[v])g2.pb(v);
	}
	while(f1.size()&&f2.size()){
		int u=f1.back(),v=f2.back();f1.pop_back(),f2.pop_back();
		int d=min(abs(f[u]),abs(f[v]));
		a[u][1]-=d,a[v][1]+=d;f[u]+=d,f[v]-=d;
		if(f[u])f1.pb(u);
		if(f[v])f2.pb(v);
	}
	while(g1.size()&&g2.size()){
		int u=g1.back(),v=g2.back();g1.pop_back(),g2.pop_back();
		int d=min(abs(g[u]),abs(g[v]));a[1][u]-=d,a[1][v]+=d;
		g[u]+=d,g[v]-=d;
		if(g[u])g1.pb(u);
		if(g[v])g2.pb(v);
	}
}
void check(){
	for(int i=1;i<=n;i++){
		for(int j=1;j<=m;j++)printf("%lld ",a[i][j]);puts("");
	}
	for(int i=1;i<=n;i++)f[i]=0;
	for(int j=1;j<=m;j++)g[j]=0;
	for(int i=1;i<=n;i++)for(int j=1;j<=m;j++)f[i]+=a[i][j],g[j]+=a[i][j];
	for(int i=1;i<=n;i++){
		for(int j=1;j<=m;j++)if(b[i][j]!=abs(g[j]-f[i]))assert(0);
	}
}
int p1,p2,p3;
bool work_dif(int v1,int v2){
	f[p1]=0,g[p2]=v1,g[p3]=v2;
	for(int i=1;i<=n;i++)if(i!=p1){
		if(abs(v1+c[i][p2]-v2)==c[i][p3]){f[i]=v1+c[i][p2];continue;}
		if(abs(v1-c[i][p2]-v2)==c[i][p3]){f[i]=v1-c[i][p2];continue;}
		return 0;
	}
	for(int j=1;j<=m;j++)if(j!=p2&&j!=p3){
		int v=f[1]+c[1][j],fl=1;
		for(int i=1;i<=n;i++)fl&=abs(v-f[i])==c[i][j];
		if(fl){g[j]=v;continue;}
		v=f[1]-c[1][j],fl=1;
		for(int i=1;i<=n;i++)fl&=abs(v-f[i])==c[i][j];
		if(fl){g[j]=v;continue;}
		return 0;
	}
	int sum=0;
	for(int i=1;i<=n;i++)sum+=f[i];
	for(int j=1;j<=m;j++)sum-=g[j];
	if(n==m)return !sum;
	if(abs(sum)%abs(n-m))return 0;
	int d=sum/(n-m);
	for(int i=1;i<=n;i++)f[i]-=d;
	for(int j=1;j<=m;j++)g[j]-=d;
	return 1;
}
void work_sam(){
	if(!c[1][1])return ;
	if(!(n&1)){
		for(int i=1;i<=n/2;i++)f[i]=c[1][1];
		for(int i=n/2+1;i<=n;i++)f[i]=-c[1][1];
		return ;
	}
	if(!(m&1)){
		for(int i=1;i<=m/2;i++)g[i]=c[1][1];
		for(int i=m/2+1;i<=m;i++)g[i]=-c[1][1];
		return ;
	}
	for(int n1=0;n1<=n;n1++){
		int n2=n-n1,d=n1-n2;
		if(abs(c[1][1]*d)%abs(m-n)==0){
			int x=c[1][1]*d/(m-n);
			for(int i=1;i<=n1;i++)f[i]=x+c[1][1];
			for(int i=n1+1;i<=n;i++)f[i]=x-c[1][1];
			for(int j=1;j<=m;j++)g[j]=x;
			return ;
		}
	}
	for(int m1=0;m1<=m;m1++){
		int m2=m-m1,d=m1-m2;
		if(abs(c[1][1]*d)%abs(n-m)==0){
			int x=c[1][1]*d/(n-m);
			for(int j=1;j<=m1;j++)g[j]=x+c[1][1];
			for(int j=m1+1;j<=m;j++)g[j]=x-c[1][1];
			for(int i=1;i<=n;i++)f[i]=x;
			return ;
		}
	}
}
bool dp[maxn][maxn];
int B=maxn*maxn;
bitset<maxn*maxn*2> bs[maxn];
void work_sam_dif(){
	if(n!=m){
		dp[0][0]=1;
		int d=abs(m-n);
		for(int i=1;i<=m;i++){
			for(int j=0;j<d;j++)if(dp[i-1][j]){
				dp[i][(j+c[1][i])%d]=1;
				dp[i][(j+d-c[1][i]%d)%d]=1;
			}
		}
		vector<int> val(m+1);
		int p=0;
		for(int i=m;i;i--){
			if(dp[i-1][(p+c[1][i])%d])val[i]=-c[1][i],(p+=c[1][i])%=d;
			else val[i]=c[1][i],(p+=d-c[1][i]%d)%=d;
		}
		int sum=0;for(int i=1;i<=m;i++)sum+=val[i];
		for(int i=1;i<=n;i++)f[i]=sum/(m-n);
		for(int i=1;i<=m;i++)g[i]=f[1]-val[i];
	}
	else{
		bs[0][B]=1;
		for(int i=1;i<=m;i++)bs[i]=(bs[i-1]<<c[1][i])|(bs[i-1]>>c[1][i]);
		vector<int> val(m+1);
		int p=B;
		for(int i=m;i;i--){
			if(bs[i-1][p+c[1][i]])val[i]=-c[1][i],p+=c[1][i];
			else val[i]=c[1][i],p-=c[1][i];
		}
		for(int i=1;i<=m;i++)g[i]=-val[i];
	}
}
void sovle(){
	n=read(),m=read();
	for(int i=1;i<=n;i++){
		for(int j=1;j<=m;j++)b[i][j]=c[i][j]=read();
	}
	if(n==1&&m==1){puts("0");return ;}
	for(int i=1;i<=n;i++){
		for(int j=1;j<=m;j++)if(c[i][j]!=c[i][1])p1=i;
	}
	for(int j=1;j<=m;j++){
		for(int i=1;i<=n;i++)if(c[i][j]!=c[1][j])p2=j;
	}
	if(p1&&p2){
		p3=1;for(int j=1;j<=m;j++)if(c[p1][p2]!=c[p1][j])p3=j;
		if(!work_dif(c[p1][p2],c[p1][p3])){
			if(!work_dif(c[p1][p2],-c[p1][p3])){
				if(!work_dif(-c[p1][p2],c[p1][p3])){
					if(!work_dif(-c[p1][p2],-c[p1][p3]))puts("Wa work_dif");
				}
			}
		}
	}
	else if(!p1&&!p2)work_sam();
	else{
		bool fl=0;
		if(!p1){
			fl=1;
			swap(p1,p2);
			for(int i=1;i<=max(n,m);i++){
				for(int j=1;j<i;j++)swap(c[i][j],c[j][i]);
			}
			swap(n,m);
		}
		work_sam_dif();
		if(fl){
			for(int i=1;i<=max(n,m);i++){
				for(int j=1;j<i;j++)swap(c[i][j],c[j][i]);
			}
			swap(n,m);
			swap(f,g);
		}
	}
	get();check();
}
```