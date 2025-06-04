---
title: 'CF1007B 题解'
date: 2023-12-31 07:51:03
tags: [题解,数学]
published: true
hideInList: false
feature: 
isTop: false
---
[CF1007B](https://www.luogu.com.cn/problem/CF1007B)

### 思路

显然题目要求计数 $u\mid A,v\mid B,w\mid C$。$O(n\sqrt n)$ 预处理出每个数的所有因数，记为集合 $p_i$。

容斥，记集合 $a,b,c,ab,ac,bc,all$ 为 $p_A,p_B,p_C,p_A\cap p_B,p_A\cap p_A,p_B\cap p_C,p_A\cap p_B\cap p_C$。可以用 bitset 维护交集。

首先加上 $|a||b||c|$。

- $u\in a,v\in bc,w\in bc,v\neq w$。$u,v$ 可以交换，最开始多算 $1$ 次，减去。

- $u\in abc,v\in abc,u\neq v,w\in bc\setminus all$。最开始算 $4$ 次，第一步减 $4$ 次，加上 $1$ 次。

- $u\in ab,v\in bc,w\in ac$。最开始算两次，减去 $1$ 次。

- $u,v,w\in all,u=v\neq w$。最开始算 $3$ 次，第一步减 $3$ 次，加上 $1$ 次。

- $u,v,w\in all$，$u,v,w$ 互不相等。最开始算 $6$ 次，第一步减 $3\times 3$ 次，加上 $4$ 次。

观察到 $2^3\times 3^3\times 5\times 7\times 11=83160$，所以 $|p_i|\le 128$。如果把分解因数写成先分解质因数再 dfs 求因数，复杂度 $O(n)$，常数约为 $400$。

### code

```
long long  a,b,c,ans;
vector<int> p[maxn];
int gcd(int a,int b){
	if(a%b==0)return b;
	return gcd(b,a%b);
}
int id[maxn],tim;
bitset<385> fa,fb,fc;
void work(){
	a=read();b=read();c=read();ans=0;
	fa.reset(),fb.reset(),fc.reset();
	for(int i:p[a])id[i]=0;
	for(int i:p[b])id[i]=0;
	for(int i:p[c])id[i]=0;
	tim=0;
	for(int i:p[a])if(!id[i])id[i]=++tim;
	for(int i:p[b])if(!id[i])id[i]=++tim;
	for(int i:p[c])if(!id[i])id[i]=++tim;
	for(int i:p[a])fa[id[i]]=1;
	for(int i:p[b])fb[id[i]]=1;
	for(int i:p[c])fc[id[i]]=1;
	long long ab=(fa&fb).count(),ac=(fa&fc).count(),bc=(fb&fc).count(),all=(fa&fb&fc).count();
	a=p[a].size(),b=p[b].size(),c=p[c].size();
	// cout<<a*b*c<<" "<<a*bc*(bc-1)/2<<" "<<b*ac*(ac-1)/2<<" "<<c*ab*(ab-1)/2<<" "<<all*(all-1)<<" "<<all*(all-1)*(all-2)/6<<"\n";
	ans=a*b*c-a*bc*(bc-1)/2-b*ac*(ac-1)/2-c*ab*(ab-1)/2+all*(all-1)+4*all*(all-1)*(all-2)/6;
	ans+=all*(all-1)/2*(ab-all)+all*(all-1)/2*(ac-all)+all*(all-1)/2*(bc-all);
	ans-=(ab-all)*(bc-all)*(ac-all);
	printf("%lld\n",ans);
}
int pre[maxn],cnt;
bool vis[maxn];
int f[maxn];
void s(int n){
	for(int i=2;i<=maxn-10;i++){
		if(!vis[i])pre[++cnt]=i,f[i]=i;
		for(int j=1;j<=cnt&&i*pre[j]<=n;j++){
			vis[i*pre[j]]=1;f[i*pre[j]]=pre[j];
			if(i%pre[j]==0)break;
		}
	}
}
vector<pii> val;
void dfs(int dep,int mul,int idx){
	if(dep==val.size()){
		p[idx].push_back(mul);
		return ;
	}
	for(int i=0,s=1;i<=val[dep].se;i++){
		dfs(dep+1,mul*s,idx);
		s*=val[dep].fi;
	}
}
int T;
signed main(){
	T=read();s(maxn-10);
	for(int i=1;i<=maxn-10;i++){
		int x=i;val.clear();
		while(x>1){
			int lst=f[x],num=0;
			while(f[x]==lst){
				++num;
				x/=f[x];
			}
			val.push_back({lst,num});
		}
		dfs(0,1,i);
	}
	while(T--)work();
}
```