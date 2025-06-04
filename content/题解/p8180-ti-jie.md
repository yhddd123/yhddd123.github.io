---
title: 'P8180 题解'
date: 2024-11-01 15:45:04
tags: [题解]
published: true
hideInList: false
feature: 
isTop: false
---
### [P8180](https://www.luogu.com.cn/problem/P8180)

不同的解法，感觉比较牛。

### 思路

对 $ll_i$ 和 $rr_i$ 排序。直接考虑最小值在哪里，假设为位置 $p$。那么 $[1,p-1]$ 的 $rr_i$ 都 $\le p$，$[p,n]$ 的 $rr_i$ 都 $>p$，$ll_i$ 也有相似的限制。都符合 $ll,rr$ 限制的 $p$ 是唯一的，更进一步，符合 $rr$ 的限制的最右的点和符合 $ll$ 限制的最左的点是同一个点，且就是 $p$。否则不难说明会寄。

那就分治 $[l,r]$，找到 $p$，真实的 $ll_p$ 是 $ll_l=l$，真实的 $rr_p$ 是 $rr_r=r$，平移 $ll[l,p-1]=ll[l+1,p],rr[p+1,r]=rr[p,r-1]$ 后分治 $[l,p-1],[p+1,rr]$，贡献是 $\binom{r-l}{r-p}$。$O(n^2)$ 的分治只需要 $ll$ 或 $rr$ 中的一个数组，会被单调递增递减卡 T。难以快速寻找区间对应的 $p$ 。

但是只要枚举到了 $p$ 可以 $O(1)$ 检查是否合法。从左往右和从右往左同时枚举第一个满足 $ll$ 限制和最后一个满足 $rr$ 限制的点，一找到就退出递归。这样能保证每个区间枚举次数为分治两边的较短的长度，复杂度分析同 [min+sum](https://www.luogu.com.cn/problem/AT_abc282_h)，每个点被枚举一次对应的区间翻倍。注意双指针也要保证严格枚举次数为两边的较短的长度，恰好比当前枚举的位置多 $1$ 即可。

复杂度 $O(n\log n)$。

### code

```cpp
int n,ans=1;
int ll[maxn],rr[maxn];
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
int C(int m,int n){return fac[m]*inv[n]%mod*inv[m-n]%mod;}
void sovle(int l,int r,int p1,int p2,int p3,int p4){
	if(l>=r)return ;
	int p=0;
	for(int ir=r,il=l,jr=p4+1,jl=p1-1;ir>=l;ir--,il++){
		while(jr-1>=p3&&rr[jr-1]>ir){
			jr--;
			if(jr-p3<ir-l)break;
		}
		if(ir-l==jr-p3){
			p=ir;
			break;
		}
		while(jl+1<=p2&&ll[jl+1]<il){
			jl++;
			if(jl-p1>il-l)break;
		}
		if(il-l==jl-p1){
			p=il;
			break;
		}
		// cout<<il<<" "<<ir<<" "<<jl<<" "<<jr<<"\n";
	}
	// cout<<l<<" "<<r<<" "<<p<<" "<<p1<<" "<<p2<<" "<<p3<<" "<<p4<<"\n";
	if(p<l||p>r)exit(0);
	ans=ans*C(r-l,r-p)%mod;
	sovle(l,p-1,p1+1,p1+p-l,p3,p3+p-l-1),sovle(p+1,r,p1+p-l+1,p2,p3+p-l,p4-1);
}
void work(){
	n=read();
	for(int i=1;i<=n;i++)ll[i]=read();
	for(int i=1;i<=n;i++)rr[i]=read();
	sort(ll+1,ll+n+1),sort(rr+1,rr+n+1);
	fac[0]=1;for(int i=1;i<=n;i++)fac[i]=fac[i-1]*i%mod;
	inv[n]=ksm(fac[n]);for(int i=n-1;~i;i--)inv[i]=inv[i+1]*(i+1)%mod;
	sovle(1,n,1,n,1,n);
	printf("%lld\n",ans);
}
```