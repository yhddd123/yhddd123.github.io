---
title: 'P13042 题解'
date: 2025-07-09 18:05:49
tags: [题解,dp]
published: true
hideInList: false
feature: 
isTop: false
---
[P13042](https://www.luogu.com.cn/problem/P13042)

### 思路

博弈是在线段树上，按照深度，$g_{nd}=\max(g_{ls},g_{rs})$ 或 $g_{nd}=\min(g_{ls},g_{rs})$。 

转 $0/1$。枚举 $v\in[1,m]$，设 $f_v$ 表示结果 $\ge v$ 的情况数，设 $g_{nd,0/1}$ 表示线段树节点 $nd$ 上是否 $\ge v$ 的方案数。$ans=\sum v\times(f_{v}-f_{v+1})=\sum f_v$。

要求一些节点有相同的数值，状压 $2^n$ 记录初始状态。初始为 $0$ 有 $v-1$ 种选择，初始为 $1$ 有 $m-v+1$ 种选择。复杂度 $O(m2^n2^l)$。

如果没有要求一些节点有相同的数值，可以在线段树叶子节点令 $g_{nd,0}=v-1,g_{nd,1}=m-v+1$，不用状压。有要求多个节点相同的不超过 $\frac{2^l}{2}=16$ 个，可以只状压这部分。复杂度 $O(m2^{2^{l-1}}2^l)$。

对于每个 $v$，都是枚举 $s$，系数为常数乘 $(v-1)^{n-|S|}\times (m-v+1)^{|S|}$，$f_v$ 是关于 $v$ 不超过 $n$ 次多项式。则 $ans_m=\sum_{i=1}^m f_m$，是关于 $m$ 不超过 $n+1$ 次多项式。弄 $n+2$ 个点值插值即可。复杂度 $O(n2^{2^{l-1}}2^l)$。

### code

```cpp
int n,m,l,a[maxn];
int siz[maxn],rnk[maxn];
vector<int> id;
int f[maxn],ans;
int g[maxn<<2][2];
#define mid ((l+r)>>1)
#define ls nd<<1
#define rs nd<<1|1
int calc(int v){
    int ans=0;
    for(int s=0;s<(1<<id.size());s++){
        auto dfs=[&](auto &&self,int nd,int l,int r,int d)->void{
            if(l==r){
                g[nd][0]=g[nd][1]=0;
                if(~rnk[a[l]]){
                    if(s&(1<<rnk[a[l]]))g[nd][1]=1;
                    else g[nd][0]=1;
                }
                else g[nd][0]=v-1,g[nd][1]=m-v+1;
                return ;
            }
            self(self,ls,l,mid,d+1),self(self,rs,mid+1,r,d+1);
            if(d&1)g[nd][1]=(g[ls][0]*g[rs][1]+g[ls][1]*g[rs][0]+g[ls][1]*g[rs][1])%mod,g[nd][0]=g[ls][0]*g[rs][0]%mod;
            else g[nd][0]=(g[ls][0]*g[rs][0]+g[ls][0]*g[rs][1]+g[ls][1]*g[rs][0])%mod,g[nd][1]=g[ls][1]*g[rs][1]%mod;
        };
        dfs(dfs,1,0,(1<<l)-1,1);
        (ans+=ksm(v-1,id.size()-__builtin_popcount(s))*ksm(m-v+1,__builtin_popcount(s))%mod*g[1][1])%=mod;
    }
    return ans;
}
void work(){
    n=read();m=read();l=read();ans=0;
    for(int i=0;i<(1<<l);i++)a[i]=read();
    for(int i=1;i<=n;i++)siz[i]=0,rnk[i]=-1;
    for(int i=0;i<(1<<l);i++)siz[a[i]]++;
    id.clear();
    for(int i=1;i<=n;i++)if(siz[i]>1)id.pb(i),rnk[i]=id.size()-1;
    int num=0;for(int i=1;i<=n;i++)if(!siz[i])++num;
    for(int i=1;i<=n+2;i++)f[i]=calc(i);
    for(int i=1;i<=n+2;i++)(f[i]+=f[i-1])%=mod;
    if(m<=n+2){printf("%lld\n",f[m]*ksm(m,num)%mod);return ;}
	for(int i=1;i<=n+2;i++){
		int mul=f[i];
		for(int j=1;j<=n+2;j++)if(i!=j)mul=mul*(m-j+mod)%mod*ksm(i-j+mod)%mod;
		(ans+=mul)%=mod;
	}
    printf("%lld\n",ans*ksm(m,num)%mod);
}
```



