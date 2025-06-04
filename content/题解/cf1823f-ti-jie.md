---
title: 'CF1823F 题解'
date: 2023-12-31 17:09:39
tags: [题解,图论]
published: true
hideInList: false
feature: 
isTop: false
---
[CF1823F](https://www.luogu.com.cn/problem/CF1823F)

### 思路

设 $f_u$ 表示经过 $u$ 的期望次数。$f_u$ 的值是所有与 $u$ 有边的点 $v$ 的答案 $f_v$ 除以走向 $u$ 的概率 $\frac{1}{d_v}$。

$$f_u=[u=s]+\sum_{(u,v)\in E,v\neq t}\frac{f_v}{d_v}$$

$$f_t=1$$

问题是 $f_u$ 的值可以从 $fa$ 得来，转移成环。直接高斯消元 $O(n^3)$，但是没有用到树的性质。成环是因为有来自父亲的转移，但根节点没有。设 $f_u=a_u\times f_{fa}+b_u$，带入 dp 方程。

$$f_u=[u=s]+\frac{f_{fa}}{d_{fa}}+\sum_{(u,v)\in E,v\neq t,v\neq fa}\frac{f_v}{d_v}$$

$$f_u=[u=s]+\frac{f_{fa}}{d_{fa}}+\sum_{(u,v)\in E,v\neq t,v\neq fa}\frac{a_v\times f_u+b_v}{d_v}$$

$$(1-\sum_{(u,v)\in E,v\neq t,v\neq fa}\frac{a_v}{d_v})\times f_u=[u=s]+\frac{f_{fa}}{d_{fa}}+\sum_{(u,v)\in E,v\neq t,v\neq fa}\frac{b_v}{d_v}$$

$$f_u=\frac{\frac{1}{d_{fa}}}{(1-\sum_{(u,v)\in E,v\neq t,v\neq fa}\frac{a_v}{d_v})}\times f_{fa}+\frac{[u=s]+\sum_{(u,v)\in E,v\neq t,v\neq fa}\frac{b_v}{d_v}}{(1-\sum_{(u,v)\in E,v\neq t,v\neq fa}\frac{a_v}{d_v}}$$

对比系数，只与 $u$ 的儿子有关，解出 $a_u,b_u$。再从跟从上往下推一遍。注意到 $v\neq t$ 很烦，直接把 $t$ 设为跟。

### code

```cpp
int n,s,t;
int head[maxn],tot;
struct nd{
	int nxt,to;
}e[maxn<<1];
void add(int u,int v){e[++tot]={head[u],v};head[u]=tot;}
inline int ksm(int a,int b=mod-2){
	int ans=1;
	while(b){
		if(b&1)ans=ans*a%mod;
		a=a*a%mod;
		b>>=1;
	}
	return ans;
}
int d[maxn],f[maxn],a[maxn],b[maxn];
void dfs(int u,int fa){
	int val=1;b[u]=(u==s);
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;if(v==fa)continue;
		dfs(v,u);
		val+=mod-a[v]*ksm(d[v])%mod;
		b[u]+=b[v]*ksm(d[v])%mod;
	}
	val%=mod;b[u]%=mod;
	a[u]=ksm(val*d[fa]%mod);if(fa==t)a[u]=0;
	b[u]=ksm(val)*b[u]%mod;
}
void dfs1(int u,int fa){
	f[u]=(a[u]*f[fa]+b[u])%mod;
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;if(v==fa)continue;
		dfs1(v,u);
	}
}
void work(){
	n=read();s=read();t=read();
	for(int i=1;i<n;i++){
		int u=read(),v=read();
		add(u,v),add(v,u);
		++d[u],++d[v];
	}
	dfs(t,0);
	f[t]=1;dfs1(t,0);
	for(int i=1;i<=n;i++)printf("%lld ",f[i]);
}
```