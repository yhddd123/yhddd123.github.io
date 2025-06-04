---
title: 'P8172 题解'
date: 2024-11-01 14:58:49
tags: [题解,dp,数学]
published: true
hideInList: false
feature: 
isTop: false
---
### [P8172](https://www.luogu.com.cn/problem/P8172)

太良心了，搬题人！联考开了 1.5s 随便过。

这个复杂度不太对，需要卡常。

upd：循环节长度的结论是错的，所以跟他爆了。

### 思路

为方便，交换一下定义，是一个 $m$ 行 $n$ 列的矩阵，列从 $0$ 开始编号，$n\le 13$。

考虑状压 $n$，设 $dp_{i,s}$ 表示已经填满了 $i-1$ 行，第 $i$ 行填了状态 $s$。从 $dp_{i,s}$ 转移到 $dp_{i+1,t}$ 时，设 $f_{j,ss}$ 表示现在要填 $(i,j)$，第 $i+1$ 行 $[0,j)$ 的部分和第 $i$ 行 $[j,n)$ 部分并起来的状态为 $ss$。发现如果 $(i,j)$ 和 $(i,j+1)$ 都为空，$(i,j),(i+1,j),(i+1,j+1)$ 的三角无用，所以没有后效性。

发现 $m=10^9$ 很像矩阵优化 dp。对于每个 $s$ 都 $O(2^nn)$ 算能否转移到每个 $t$。然后就是有 $q$ 个第 $p$ 行点不能是状态 $ss$ 的限制，形如要求做完第 $p-1$ 行的状态 $s$ 逻辑与 $ss$ 为 $0$，然后 $s$ 再或上 $ss$ 继续做，分成 $q$ 段查询。能做 $n\le 6$，跟暴力同分。

只需要知道可行性用 bitset 优化，预处理出 $2$ 的幂次，然后查询时用 bitset 维护向量。能做 $n\le 10$，跟暴力同分。

再观察，猜测经过若干个空的行之后会出现长为 $6$ 的循环节。发现一个状态 $s$ 经过 $6+x$ 个空行之后就能到达所有经过 $6k+x$ 个空行能到达的状态。所以 $len=\min(len,len\bmod 6+6)\le 12$，那只需要维护前 $3$ 个转移矩阵的 $2$ 的幂次。能做 $n\le 12$，跟暴力同分。

卡常方面，有值的状态不多，bitset 自带的 ```_Find_first()``` 和 ```_Find_next(i)``` 函数可以快速跳一个 bitset 为 $1$ 的位置，常熟大大减小。然后发现瓶颈在于矩阵乘法，不妨只维护 $2^1,2^2$ 的转移矩阵，稍微增大查询时向量乘法次数。就赢了！

复杂度 $O((2^n)^2n+\frac{(2^n)^3}{w}+q\frac{(2^n)^2}{w})$。

### code

```cpp
int n,m,k,l;
map<int,int> mp;
const int maxm=1<<13;
#define vec bitset<maxm>
struct mat{
	vec e[maxm];
	mat(){
		for(int i=0;i<l;i++)e[i].reset();
	}
	mat operator*(const mat&tmp)const{
		mat res;
		for(int i=0;i<l;i++){
			for(int k=e[i]._Find_first();k<l;k=e[i]._Find_next(k)){
				res.e[i]|=tmp.e[k];
			}
		}
		return res;
	}
}pw[30];
vec operator*(vec e,mat tmp){
	vec res;res.reset();
	for(int k=e._Find_first();k<l;k=e._Find_next(k)){
		res|=tmp.e[k];
	}
	return res;
}
vec res;
bitset<maxm> f[maxn+1];
vector<pii> que;
void work(){
	n=read();m=read();k=read();
	for(int i=1;i<=k;i++){
		int u=read(),v=read();
		mp[v]|=(1<<u-1);
	}
	if(n<=6)return sub1::sovle();
	l=1<<n;
	for(int s=0;s<l;s++){
		for(int i=0;i<=n;i++)f[i].reset();f[0][s]=1;
		for(int i=0;i<n;i++){
			for(int t=f[i]._Find_first();t<l;t=f[i]._Find_next(t)){
				if(t&(1<<i)){
					f[i+1][t^(1<<i)]=1;
				}
				else{
					if(i+1<n&&!(t&(1<<i+1))){
						f[i+2][t|(1<<i)]=1;
						f[i+2][t|(1<<i+1)]=1;
					}
					if(i&&!(t&(1<<i-1))){
						f[i+1][t|(1<<i)|(1<<i-1)]=1;
					}
					if(i+1<n&&(t&(1<<i+1))){
						f[i+2][t|(1<<i)]=1;
					}
				}
			}
		}
		pw[0].e[s]=f[n];
	}
	for(auto [p,s]:mp)que.pb({p,s});
	que.pb({m+1,l-1});
	int mx=0,B=6,k=29;
	for(int i=0;i<que.size()-1;i++)mx=max(mx,que[i+1].fi-que[i].fi);
	mx=min(mx,B);k=2;
	for(int i=1;i<=k;i++)pw[i]=pw[i-1]*pw[i-1];
	// return ;
	int lst=0;res[0]=1;
	for(auto[p,s]:que){
		int len=p-1-lst;
		len=min(len,len%B+B);
		while(len>=(1<<k))res=res*pw[k],len-=1<<k;
		for(int i=k;~i;i--)if(len&(1<<i)){
			res=res*pw[i];
		}
		for(int t=res._Find_first();t<l;t=res._Find_next(t)){
			if(s&t)res[t]=0;
		}
		if(!res.count()){puts("NO");return ;}
		for(int t=res._Find_first();t<l;t=res._Find_next(t)){
			res[t]=0,res[s|t]=1;
		}
		lst=p-1;
	}
	puts("YES");
}
```

### upd

关于正解，其实也很脑瘫，你把两个有限制的行间的距离缩为 $12$ 以内，总行数 $12q$，就不用矩阵快速幂了，直接做原 dp 即可。复杂度 $O(nq2^n)$。