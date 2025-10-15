---
title: 'P10272 题解'
date: 2023-12-31 21:58:17
tags: [题解,字符串]
published: true
hideInList: false
feature: 
isTop: false
---
[P10272](https://www.luogu.com.cn/problem/P10272)

[P7525](https://www.luogu.com.cn/problem/P7525) 加强版。

### 思路

分类讨论。如果 $S$ 存在一个周期，设最小周期长为 $len$。那么第 $i$ 次操作是在 $i-1$长度上加 $(n-len)\times 2^i$。用字符串哈希判断是否存在长为 $i$ 的周期，只需要判断 $s[1,n-i]=s[i+1,n]$ 即可。$\sum_{i=l}^r 2^i=2^{r+1}-2^l$。快速幂处理。

如果 $S$ 不存在一个周期，找到真 border $T$，再找到 $T$ 的最小周期 $TT$，发现此时答案只取决于 $S$ 开头存在 $num$ 个连续的 $TT$。记 $cnt=\frac{\mid T\mid}{\mid TT\mid}$，发现每次操作答案增加 $\min(cnt\times 2^i,num)$ 个 $TT$。模拟前 $\log n$ 次操作后每次操作答案增加为定值，计算等差数列即可。

只需要字符串哈希，复杂度 $O(n)$。

### code

```cpp
int n,l,r;
inline int ksm(int a,int b=mod-2){
	int ans=1;b%=(mod-1);
	while(b){
		if(b&1)ans=ans*a%mod;
		a=a*a%mod;
		b>>=1;
	}
	return ans;
}
char c[maxn];
int a[maxn],val[26],bas,pw[maxn];
int calc(int l,int r){
	return (a[r]-a[l-1]*pw[r-l+1]%mod+mod)%mod;
}
void work(){
	scanf("%s",c+1);n=strlen(c+1);l=read(),r=read();
	srand(time(0));bas=rand()*rand()%mod;
	for(int i=0;i<26;i++)val[i]=rand()*rand()%bas;
	for(int i=1;i<=n;i++)a[i]=(a[i-1]*bas+val[c[i]-'a'])%mod;
	pw[0]=1;for(int i=1;i<=n;i++)pw[i]=pw[i-1]*bas%mod;
	int pos=0;
	for(int i=1;i<=n/2;i++)if(n%i==0&&calc(1,n-i)==calc(i+1,n)){pos=i;break;}
//	cout<<pos<<"\n";
	if(pos){printf("%lld\n",(pos*(r-l+1)%mod+(n-pos)*(ksm(2,r+1)-ksm(2,l)+mod)%mod)%mod);return ;}
	for(int i=1;i<n;i++)if(calc(1,i)==calc(n-i+1,n))pos=i;
	if(!pos){printf("%lld\n",n*(r-l+1)%mod);return ;}
	int num=0,cnt=1;
	for(int i=1;i<=pos/2;i++)if(pos%i==0&&calc(1,pos-i)==calc(i+1,pos)){cnt=pos/i;pos=i;break;}
	for(int i=pos;i<=n;i+=pos){
		if(calc(1,pos)==calc(i-pos+1,i))num++;
		else break;
	}
	while(l&&cnt<=num){
		n+=cnt*pos%mod;n%=mod;
		l--,r--;cnt<<=1;
	}
	if(l){
		printf("%lld\n",(n*(r-l+1)%mod+(r+l)*(r-l+1)/2%mod*num%mod*pos%mod)%mod);
		return ;
	}
	int ans=n;
	while(r&&cnt<=num){
		n+=cnt*pos%mod;n%=mod;
		ans+=n;ans%=mod;r--;cnt<<=1;
	}
	printf("%lld\n",(ans+r*n%mod+r*(r+1)/2%mod*num%mod*pos%mod)%mod);
}
```