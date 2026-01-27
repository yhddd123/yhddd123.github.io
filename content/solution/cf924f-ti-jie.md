---
title: 'CF924F 题解'
date: 2023-12-31 07:50:19
tags: [题解,dp]
published: true
hideInList: false
feature: 
isTop: false
---
[CF924F](https://www.luogu.com.cn/problem/CF924F)

### 思路

对于一个数字做背包，$f_i$ 表示当前位能不能凑出 $i$。$f_i\to f_{\mid i-v\mid}$，$f_i\to f_{i+v}$。答案一定在 $[0,9]$ 中，发现大于 $72$ 的背包不优。

当做 $18$ 位时，这个背包状态有 $12880$ 种。实验发现，$12880$ 也是全部状态数。可以用数位 dp 套这个背包。宽搜所有转移。

设 $f_{dep,u,k}$ 为当前剩下后 $dep$ 位随便选，当前在内层自动机的位置为 $u$，最最小值小于 $k$ 的答案。$T$ 组询问，差分询问 $x$，按 $x$ 从高位到低位在自动机上走，如果没有限制就加上对应的 f 值。

记录状态一个 $73$ 位 01 串方面，卡哈希，可以考虑用一个 ```pair``` 记两个 ```long long``` 表示前一半后一半的值。

### code

```cpp
int l,r,k,ans;
bool dp[maxn][75],nw[75];
map<pii,int> mp;int idx;
pii calc(bool *a){
	int v1=0,v2=0;
	for(int i=0;i<=36;i++)v1=v1<<1|a[i];
	for(int i=37;i<=72;i++)v2=v2<<1|a[i];
	return {v1,v2};
}
int to[maxn][12];
queue<int> q;
void init(){
	dp[1][0]=1;mp[calc(dp[1])]=++idx;q.push(1);
	while(!q.empty()){
		int u=q.front();q.pop();
		for(int i=0;i<=9;i++){
			for(int j=0;j<=72;j++)nw[j]=0;
			for(int j=0;j<=72;j++){
				if(j+i<=72)nw[i+j]|=dp[u][j];
				nw[abs(j-i)]|=dp[u][j];
			}
			if(mp[calc(nw)])to[u][i]=mp[calc(nw)];
			else{
				mp[calc(nw)]=++idx;to[u][i]=idx;q.push(idx);
				for(int j=0;j<=72;j++)dp[idx][j]=nw[j];
			}
		}
	}
}
int f[19][maxn][12];
int dfs(int dep,int u){
	if(~f[dep][u][k])return f[dep][u][k];
	if(!dep){
		for(int i=0;i<=k;i++)if(dp[u][i])return f[dep][u][k]=1;
		return 0;
	}
	f[dep][u][k]=0;
	for(int i=0;i<=9;i++)f[dep][u][k]+=dfs(dep-1,to[u][i]);
	return f[dep][u][k];
}
int a[19],tp;
int sovle(int x){
	int nd=1,tp=0;
	while(x){
		a[++tp]=x%10;
		x/=10;
	}
	int res=0;
	for(int i=tp;i;i--){
		for(int j=0;j<a[i];j++)res+=dfs(i-1,to[nd][j]);
		nd=to[nd][a[i]];
		// cout<<i<<" "<<res<<"\n";
	}
	for(int i=0;i<=k;i++)if(dp[nd][i]){res++;break;}
	return res;
}
void work(){
	l=read(),r=read(),k=read();
	printf("%lld\n",sovle(r)-sovle(l-1));
}

int T;
signed main(){
	init();
	cout<<idx<<"\n";
	memset(f,-1,sizeof(f));
	// return 0;
	T=read();
	while(T--)work();
}
```