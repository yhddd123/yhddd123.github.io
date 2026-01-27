---
title: 'abc349g 题解'
date: 2023-12-31 07:40:15
tags: [题解,字符串]
published: true
hideInList: false
feature: 
isTop: false
---
[abc349g](https://www.luogu.com.cn/problem/AT_abc349_g)

### 思路

从前往后枚举 $i$，每次对 $i+1\le j\le i+a_i$ 的 $j$  赋值 $b_j=b_{i\times 2-j}$。同时有 $b_{i+a_i+1}\ne b_{i-a_i-1}$。用 $ban_{i,j}$ 记录 $i$ 不能是 $j$，如果要给 $i$ 赋值就选最小的。

最直接的就是并查集倍增将两段区间并起来。

可以用类似马拉车的思路得到一个贪心算法。枚举，维护 $r$ 表示当前已知 $b_1\dotsb b_r$。如果 $i+a_i\ge r$ 就把 $r$ 更新到 $i+a_i$，否则什么也不做。最后在 hash 判断所有 $a_i$ 是不是都满足条件。

### code

```cpp
int n,a[maxn],b[maxn];
int h[maxn],h2[maxn],pw[maxn],bas,val[10];
int calc(int l,int r){return (h[r]-h[l-1]*pw[r-l+1]%mod+mod)%mod;}
int calc2(int l,int r){return (h2[l]-h2[r+1]*pw[r-l+1]%mod+mod)%mod;}
vector<int> ban[maxn];bool vis[10];
void work(){
	n=read();
	for(int i=1;i<=n;i++)a[i]=read();
	for(int i=2,r=1;i<=n;i++){
		if(i>r){
			int mex=10;
			for(int j:ban[i])vis[j]=1;
			for(int j=0;j<10;j++)if(!vis[j]){mex=j;break;}
			for(int j:ban[i])vis[j]=0;
			if(mex==10){printf("No\n");return ;}
			b[r=i]=mex;
		}
		if(i+a[i]>r){
			for(int j=r+1;j<=i+a[i];j++)b[j]=b[i*2-j];
			r=i+a[i];
		}
		if(i-a[i]-1){ban[i+a[i]+1].push_back(b[i-a[i]-1]);}
	}
	srand(time(0));
	bas=rand()*rand()%mod;
	for(int i=0;i<10;i++)val[i]=rand()*rand()%bas;
	pw[0]=1;for(int i=1;i<=n;i++)pw[i]=pw[i-1]*bas%mod;
	for(int i=1;i<=n;i++)h[i]=(h[i-1]*bas+val[b[i]])%mod;
	for(int i=n;i;i--)h2[i]=(h2[i+1]*bas+val[b[i]])%mod;;
	for(int i=1;i<=n;i++){
		if(calc(i-a[i],i)!=calc2(i,i+a[i])){printf("No");return ;}
		if(i-a[i]>1&&i+a[i]<n){
			if(b[i-a[i]-1]==b[i+a[i]+1]){printf("No");return ;}
		}
	}
	printf("Yes\n");
	for(int i=1;i<=n;i++)printf("%lld ",b[i]+1);
}
```