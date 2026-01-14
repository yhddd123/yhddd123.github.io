---
title: 'CF2135E 题解'
date: 2025-09-20 13:58:29
tags: [题解,数学]
published: true
hideInList: false
feature: 
isTop: false
---
[CF2135E](https://www.luogu.com.cn/problem/CF2135E2)

### 思路

令 $0$ 为 $-1$，$1$ 为 $1$，求前缀和。$f(s)$ 一定是前缀是 $0$，后缀是 $1$，并且 $f(s)$ 前面有 $|\min s_i|$ 个 $0$。因为 $rev(s)$ 的 $0/1$ 数量与 $s$ 相同，那么只要两者的前缀和的 min 一样，就有 $f(s)=f(rev(s))$。也就是数 $\min s_i=s_n-\max s_i$ 的 $s$ 的数量。

### E1

设 $f(n,m,l,r)$ 表示从 $(0,0)$ 到 $(n,m)$ 且不碰 $y=x+l,y=x+r$ 的路径数，其中要求 $l\le 0\le r$。则由反射容斥，$f(n,m,l,r)=\sum_k \binom{n+m}{n+k(r-l)}-\sum_k\binom{n+m}{n+k(r-l)+k}$。只有 $\frac{n}{r-l}$ 个组合数有值。

枚举 $\min s_i=l,\max s_i=r$，要求从 $(0,0)$ 到 $(\frac{n+s_n}{2},\frac{n-s_n}{2})$，$+1$ 向右，$-1$ 向上，恰好碰到 $y=-l$ 和 $y=-r$，即 $f(\frac{n+l+r}{2},\frac{n-l-r}{2},-r,-l)+f(\frac{n+l+r}{2},\frac{n-l-r}{2},-r-1,-l+1)-f(\frac{n+l+r}{2},\frac{n-l-r}{2},-r,-l+1)-f(\frac{n+l+r}{2},\frac{n-l-r}{2},-r-1,-l)$。

对 $r-l=v$ 的 $(l,r)$ 一起计算，枚举 $k$。当 $l$ 从 $-v$ 移动到 $0$ 时，$r$ 也从 $0$ 移动到 $v$，带进 $f(n,m,-r,-l)$ 求出边界后，第一个 $k$ 枚举的相当于第 $n$ 行组合数的区间和，第 $2$ 个 $k$ 枚举的相当于 $(v+1)$ 个 $\binom{n}{\frac{n+v}{2}+kv}$。另外三项大致相同，特别的，因为 $l,r$ 对称，减去的两组 $f$ 的值应当是相等的。

复杂度 $O(n\ln n)$。

#### code

```cpp
int calc(int n,int m,int l,int r){
	// cout<<n<<" "<<m<<" "<<l<<" "<<r<<endl;
	// if(l>=0||r<=0)return 0;
	// if(n+l>=m||n+r<=m)return 0;
	// if(l==r)return 0;
	int res=0;
	for(int k=-(m+r-l-1)/(r-l);k<=n/(r-l);k++)(res+=C(n+m,n-k*(r-l)))%=mod;
	for(int k=-(m-r+r-l-1)/(r-l);k<=(n+r)/(r-l);k++)(res+=mod-C(n+m,n-k*(r-l)+r))%=mod;
	return res%mod;
}
int sum[maxn];
void work(){
    n=read();ans=0;
    for(int i=0;i<=n;i++)sum[i]=C(n,i);
    for(int i=1;i<=n;i++)(sum[i]+=sum[i-1])%=mod;
    for(int v=2-(n&1);v<=n;v+=2){
    	//f(n,m,l,r)
    	for(int k=-((n+v)/2+v-1)/v;k<=(n+v)/2/v;k++){
    		(ans+=que((n-v)/2-k*v,(n+v)/2-k*v))%=mod;
    	}
    	for(int k=-((n-v)/2+v-1)/v;k<=(n+v)/2/v;k++){
    		(ans+=mod-C(n,(n+v)/2-k*v)*(v+1)%mod)%=mod;
		}
		//f(n,m,l-1,r+1)
    	for(int k=-((n+v)/2+(v+2)-1)/(v+2);k<=(n+v)/2/(v+2);k++){
    		(ans+=que((n-v)/2-k*(v+2),(n+v)/2-k*(v+2)))%=mod;
    	}
    	for(int k=-((n-v)/2-1+(v+2)-1)/(v+2);k<=((n+v)/2+1)/(v+2);k++){
    		(ans+=mod-C(n,(n+v)/2+1-k*(v+2))*(v+1)%mod)%=mod;
		}
		//f(n,m,l,r+1)
    	for(int k=-((n+v)/2+(v+1)-1)/(v+1);k<=(n+v)/2/(v+1);k++){
    		(ans+=2*mod-2*que((n-v)/2-k*(v+1),(n+v)/2-k*(v+1)))%=mod;
    	}
    	for(int k=-((n-v)/2-1+(v+1)-1)/(v+1);k<=((n+v)/2+1)/(v+1);k++){
    		(ans+=2*C(n,(n+v)/2+1-k*(v+1))*(v+1)%mod)%=mod;
		}
    	// for(int l=-v;l<=0;l++){
    		// int r=l+v;
        	// (ans+=mod-calc((n+l+r)/2,(n-l-r)/2,-r-1,-l)+mod-calc((n+l+r)/2,(n-l-r)/2,-r,-l+1))%=mod;
    	// }
    }
    printf("%lld\n",ans);
}
```

### E2

从 E1 到 E2 根本不是人。

发现组合数求区间和的部分，实际上是 $\sum \binom{n}{i}$ 和 $O(\ln n)$ 个等差数列上的单点。

相互抵消之后，可以写成 $3$ 行：

```code
    for(int i=0;i<=n;i++)val[i]=C(n,i);
	for(int v=2-(n&1);v<=n;v+=2){
    	for(int k=(n+v)/2%v;k<=n;k+=v)ans-=v*val[k]%mod;
		for(int k=((n+v)/2+1)%(v+2);k<=n;k+=v+2)ans+=mod-(v+2)*val[k]%mod;
		for(int k=((n+v)/2+1)%(v+1);k<=n;k+=v+1)ans+=2*(v+1)*val[k]%mod;
    }
```

很有规律的样子，把系数打表出来。设 $f_{n,i}$ 求 $n$ 的答案时 $\binom{n}{i}$ 前乘的系数。

```cpp
3 -1 
4 0 -2 
1 3 -1 -3 
2 4 0 -2 -2 
5 1 3 -1 -3 -3 
0 2 4 0 -2 -2 -4 
1 5 1 3 -1 -3 -3 1 
8 0 2 4 0 -2 -2 -4 -2 
-1 1 5 1 3 -1 -3 -3 1 -9 
0 8 0 2 4 0 -2 -2 -4 -2 2 
```

发现 $f_{n,i}=f_{n-2,i-1}$。

再尝试把 $3$ 种 $k$ 的系数分别打出来。

第一种：

```cpp
-1,-1,
-2,0,-2,
-4,-1,-1,-4,
-4,-2,0,-2,-4,
-6,-4,-1,-1,-4,-6,
-8,-4,-2,0,-2,-4,-8,
-8,-6,-4,-1,-1,-4,-6,-8,
-8,-8,-4,-2,0,-2,-4,-8,-8,
-13,-8,-6,-4,-1,-1,-4,-6,-8,-13,
-12,-8,-8,-4,-2,0,-2,-4,-8,-8,-12,
```

对于第一种，$f'_{n,i}=f'_{n-2,i-1}$ 依旧成立。还有 $f'_{n,0}=f'_{n,n}$。那 $f'_{n,i}$ 就等于 $f'_{|n-2i|,0}$。

OEIS $f'_{n,0}$ ，是 [A002131](https://oeis.org/A002131)，即 $n$ 的奇因数 $d$ 的 $\frac{n}{d}$ 之和 。大概也能证明，$\frac{n+v}{2} \bmod v=0$，即 $n=(2k+1)v$ 的 $v$ 有 $v$ 的贡献。

可以猜测第 $2$ 和 $3$ 种大概就是这个基础上有偏移和加减。

第二种除以 $2$：

```cpp
2,0,
3,0,0,
4,2,0,2,
5,3,0,0,3,
8,4,2,0,2,4,
7,5,3,0,0,3,5,
8,8,4,2,0,2,4,8,
12,7,5,3,0,0,3,5,7,
12,8,8,4,2,0,2,4,8,8,
11,12,7,5,3,0,0,3,5,7,12,
```

很难发现：在奇数行，就是 A002131 的偶数项；在偶数行，是 A002131 的奇数项减 $1$。

第三种：

```cpp
0,0,
0,0,0,
3,0,0,3,
4,0,0,0,4,
5,3,0,0,3,5,
6,4,0,0,0,4,6,
7,5,3,0,0,3,5,7,
8,6,4,0,0,0,4,6,8,
12,7,5,3,0,0,3,5,7,12,
10,8,6,4,0,0,0,4,6,8,10,
11,12,7,5,3,0,0,3,5,7,12,11,
16,10,8,6,4,0,0,0,4,6,8,10,16,
```

很难发现：在奇数行，是 A002131 的奇数项减 $1$；在偶数行，是两倍的 [A352047](https://oeis.org/A352047)，而 A352047，即 $n$ 的真奇因数 $d$ 的 $\frac{n}{d}$ 之和，是 A002131 在奇数时减一。

至于求 A002131，即 $\prod 2^{k_2}\times (1+p_i+\dotsb +p_i^{k_i})$，线性筛即可。注意要筛到 $2\times 10^7+1$。

复杂度 $O(n)$。

### code

```cpp
int val[maxn];
int f[maxn];
int pre[maxn],cnt;
bool vis[maxn];
int si[maxn];
void init(int n){
	si[1]=1;for(int i=2;i<=n;i++){
		if(!vis[i])pre[++cnt]=i,si[i]=(i==2?2:i+1);
		for(int j=1;j<=cnt&&i*pre[j]<=n;j++){
			vis[i*pre[j]]=1;
			if(i%pre[j]==0){
                if(pre[j]==2)si[i*pre[j]]=pre[j]*si[i];
                else si[i*pre[j]]=si[i]+pre[j]*(si[i]-si[i/pre[j]]);
				break;
			}
            if(pre[j]==2)si[i*pre[j]]=pre[j]*si[i];
            else si[i*pre[j]]=(1+pre[j])*si[i];
		}
	}
}
void work(){
    n=read();ans=0;
    for(int i=0;i<=n;i++)val[i]=C(n,i);
    for(int i=0;i<=n;i++)f[i]=0;
    // for(int v=2-(n&1);v<=n;v+=2){
    	// for(int k=(n+v)/2%v;k<=n;k+=v)f[k]-=v;
		// for(int k=((n+v)/2+1)%(v+1);k<=n;k+=v+1)f[k]+=2*(v+1);
		// for(int k=((n+v)/2+1)%(v+2);k<=n;k+=v+2)f[k]-=v+2;
    // }
	for(int i=0;i<=n;i++)f[i]+=mod-si[abs(n-2*i)];
	if(n&1){
		for(int i=0;i<=n;i++)f[i]+=2*si[abs(n-2*i-1)];
	}
	else{
		for(int i=0;i<=n;i++)f[i]+=2*(si[abs(n-2*i-1)]-1);
	}
	if(n&1){
		for(int i=0;i<=n;i++)f[i]+=mod-(si[abs(n-2*i)]-1);
	}
	else{
		for(int i=0;i<n/2;i++)f[i]+=mod-2*(si[n/2-i]-((n/2-i)&1));
		for(int i=n/2+1;i<=n;i++)f[i]+=mod-2*(si[i-n/2]-((i-n/2)&1));
	}
	// for(int i=0;i<=n;i++)cout<<f[i]<<" ";cout<<"\n";
    for(int i=0;i<=n;i++)(ans+=f[i]*val[i])%=mod;
    ans%=mod,ans+=mod,ans%=mod;
    printf("%lld\n",ans);
}
```
