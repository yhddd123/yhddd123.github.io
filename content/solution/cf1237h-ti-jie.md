---
title: 'CF1237H 题解'
date: 2023-12-31 16:57:45
tags: [题解,构造]
published: true
hideInList: false
feature: 
isTop: false
---
[CF1237H](https://www.luogu.com.cn/problem/CF1237H)

### 思路

构造。

因为是对偶数位操作，有一个巧妙的转化：将每两位和为一位。令 $00$ 为 $0$， $01$ 为 $1$， $10$ 为 $2$， $11$ 为 $3$。其中 $1$ 翻转得到 $2$，$2$ 翻转得到 $1$。

如果有解，则 $suma0=sumb0,suma3=sumb3,suma1+suma2=sumb1+sumb2$。

考虑从一个大问题转换为小问题。$N+1=2\times n+1$，猜测答案是用两个操作实现 $a_i=b_i$，再有一个灵活的额外操作。可以一个一个处理。

要找到一种方法使得在不改变其他结构的同时移动 $a_i$。观察发现，我们可以实现两步将 $a_i$ 换到 $a_1$，$a_{1...{i-1}}$ 不改变结构的换到 $a_{2...i}$。具体是操作 $2\times i-2$ 和 $2\times i$。

所以从后向前，设当前维护到 $a_i$，则 $a_{1...{i-1}}$ 分别等于 $b_{{n-i+2}...n}$。找到 $a_j=b_{n-i+1}$ 且 $i\leq j$，执行上面操作即可。共 $N$ 次操作。

现在问题是，$suma1\neq sumb1$ ，我们要反转一次使 $suma1=sumb1$。

我们可以找到 $a$ 中某个前缀，使得 $suma1-suma1_i+suma2_i=sumb1$，翻转这个前缀。但也可能找不到，这时一定有 $b$ 的某个前缀，使得 $sumb1-sumb1_i+sumb2_i=suma1$。这时翻转 $b$ 的这个前缀得到 $b'$，把 $a$ 做成 $b'$ 再翻转这个前缀。

### code

```cpp
int n,a[maxn],b[maxn];
char s[maxn],t[maxn];
int sum[4];
vector<int> ans;
int aa[maxn],bb[maxn],nn;
bool check(){
	if(ans.size()>nn+1)return 0;
	for(int i:ans){
		for(int j=1;j<=i/2;j++)swap(aa[j],aa[i-j+1]);
//		for(int j=1;j<=nn;j++)cout<<aa[j];cout<<"\n";
	}
//	for(int i=1;i<=nn;i++)cout<<aa[i];cout<<"\n";
	for(int i=1;i<=nn;i++)if(aa[i]!=bb[i])return 0;
	return 1;
}
void work(){
	scanf("%s%s",s+1,t+1);n=strlen(s+1);
	
	nn=n;
	for(int i=1;i<=n;i++)aa[i]=s[i]-'0',bb[i]=t[i]-'0';
	
	for(int i=2;i<=n;i+=2)a[i/2]=(s[i-1]-'0')*2+s[i]-'0';
	for(int i=2;i<=n;i+=2)b[i/2]=(t[i-1]-'0')*2+t[i]-'0';
	n>>=1;
	for(int i=1;i<=n;i++)if(b[i]==1||b[i]==2)b[i]=3-b[i];
	sum[0]=sum[1]=sum[2]=sum[3]=0;
	for(int i=1;i<=n;i++)sum[a[i]]++;
	for(int i=1;i<=n;i++)sum[b[i]]--;
	if(sum[0]||sum[3]||sum[1]+sum[2]){printf("-1\n");return ;}
	ans.clear();int pos=0;
	bool fl=(sum[1]==0);
	for(int i=1;i<=n&&!fl;i++){
		sum[1]-=(a[i]==1);sum[1]+=(a[i]==2);
		if(!sum[1]){
			ans.push_back(2*i);
			for(int j=1;j<=i/2;j++)swap(a[j],a[i-j+1]);
			for(int j=1;j<=i;j++)if(a[j]==1||a[j]==2)a[j]=3-a[j];
			fl=1;
		}
	}
	sum[1]=-sum[2];
	for(int i=1;i<=n&&!fl;i++){
		sum[1]+=(b[i]==1);sum[1]-=(b[i]==2);
		if(!sum[1]){
			pos=2*i;
			for(int j=1;j<=i/2;j++)swap(b[j],b[i-j+1]);
			for(int j=1;j<=i;j++)if(b[j]==1||b[j]==2)b[j]=3-b[j];
			fl=1;
		}
	}
	for(int i=1;i<=n;i++){
		for(int j=i;j<=n;j++)if(a[j]==b[n-i+1]){
			if(j*2-2!=0)ans.push_back(j*2-2);
			ans.push_back(j*2);
			for(int k=j-1;k;k--)a[k+1]=a[k];
			a[1]=b[n-i+1];
			break;
		}
	}
	if(pos)ans.push_back(pos);
	printf("%lld\n",(int)ans.size());
	for(int i:ans)if(i)printf("%lld ",i);
	printf("\n");
//	cout<<check()<<"\n";
}
```