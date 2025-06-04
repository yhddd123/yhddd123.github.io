---
title: 'P7482 题解'
date: 2023-12-31 17:25:39
tags: [题解,dp]
published: true
hideInList: false
feature: 
isTop: false
---
[P7482](https://www.luogu.com.cn/problem/P7482)

### 思路

分治 $[l,mid]$ 到 $(mid,r]$ 的贡献。

对于一个区间计算答案可以用 dp 完成。以 $mid$ 为交界合并左右的 dp 值。设 $f_{i,0/1}$ 表示区间 $[i,mid]$ 或区间 $(mid,i]$，是否选 $mid$ 或 $mid+1$ 的答案。

$$f_{i,0}=\max (f_{i+1,0},f_{i+2,0}+a_i)$$

$$ans(i,j)=\max (f_{i,0}+f_{j,1},f_{i,1}+f_{j,0})$$

记跨过 $mid$ 的贡献为 $w$。

$$w=\sum_{i=l}^{mid}\sum_{j=mid+1}^{r} ans(i,j)$$

记 $g_i=f_{i,1}-f_{i,0}$。

$$w=\sum_{i=l}^{mid}\sum_{j=mid+1}^{r} \max(g_i+f_{i,0}+f_{j,0},g_j+f_{i,0}+f_{j,0})$$

$$w=\sum_{i=l}^{mid}\sum_{j=mid+1}^{r} \max(g_i,g_j)+\sum_{i=l}^{mid}f_{i,0}\times (r-mid)+\sum_{j=mid+1}^r f_{j,0}\times (mid-l+1)$$

后面两个直接做，前面的对于每个 $i$ 拆开 max 计算。

$$\sum_{j=mid+1}^{r} \max(g_i,g_j)=\sum_{j=mid+1}^{r}[g_i\geq g_j]\times g_i+[g_i<g_j]\times g_j$$


对 $(mid,r]$ 的 $g_j$ 排序，二分 $g_i$ 的位置，记录 $g_j$ 的后缀和即可。

其余的递归 $[l,mid]$ 和 $(mid,r]$ 解决。

然后发现一个 sub 都没过。原因是不一定一定要选 $mid$ 和 $mid+1$，将 $f_{i,1}$ 的定义改为区间不考虑任何限制的最大值，强行当作选 $mid$ 位置即可。

### code

```cpp
int n,a[maxn],ans;
int f[maxn][2],g[maxn];
int b[maxn],len,sum[maxn];
void sovle(int l,int r){
	if(l==r){
		(ans+=a[l])%=mod;
		return ;
	}
	int mid=l+r>>1;
	f[mid][0]=0,f[mid][1]=a[mid];
	if(mid-1>=l)f[mid-1][0]=a[mid-1],f[mid-1][1]=max(a[mid-1],a[mid]);
	for(int i=mid-2;i>=l;i--){
		f[i][0]=max(f[i+1][0],f[i+2][0]+a[i]);
		f[i][1]=max(f[i+1][1],f[i+2][1]+a[i]);
	}
	f[mid+1][0]=0,f[mid+1][1]=a[mid+1];
	if(mid+2<=r)f[mid+2][0]=a[mid+2],f[mid+2][1]=max(a[mid+2],a[mid+1]);
	for(int i=mid+3;i<=r;i++){
		f[i][0]=max(f[i-1][0],f[i-2][0]+a[i]);
		f[i][1]=max(f[i-1][1],f[i-2][1]+a[i]);
	}
	int sl=0,sr=0;
	for(int i=l;i<=mid;i++)(sl+=f[i][0])%=mod;
	for(int i=mid+1;i<=r;i++)(sr+=f[i][0])%=mod;
	(ans+=sl*(r-mid)+sr*(mid-l+1))%=mod;
//	cout<<l<<" "<<r<<" "<<ans<<"\n"; 
	for(int i=l;i<=r;i++)g[i]=f[i][1]-f[i][0];
	len=0; 
	for(int i=mid+1;i<=r;i++)b[++len]=g[i];
	sort(b+1,b+len+1);sum[len+1]=0;
	for(int i=len;i>=1;i--)sum[i]=(sum[i+1]+b[i]%mod+mod)%mod;
	for(int i=l;i<=mid;i++){
		int p=upper_bound(b+1,b+len+1,g[i])-b;
		(ans+=(g[i]%mod+mod)*(p-1)+sum[p])%=mod;
//		cout<<i<<" "<<g[i]<<" "<<p<<" "<<sum[p]<<"\n";
	}
	sovle(l,mid),sovle(mid+1,r);
}
```