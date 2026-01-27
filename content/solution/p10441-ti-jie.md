---
title: 'P10441 题解'
date: 2026-01-07 20:43:48
tags: [题解,构造]
published: true
hideInList: false
feature: 
isTop: false
---
[P10441](https://www.luogu.com.cn/problem/P10441)

对于一个确定的比分序列，容斥掉不合法的情况，三元环数量为 $\binom{n}{3}-\sum \binom{d_i}2$。

从 $\{0,\ldots,n-1\}$ 开始，到 $\{\frac{n}{2},\ldots,\frac{n+1}{2}\}$，每次找一个 $x-1$ 和 $x+1$ 调整为 $x,x$，恰好能使三元环数量加 $1$。复杂度 $O(m)$。

注意到最大三元环数 $f(n)$ 是 $O(n^3)$ 的，$f(n)-f(n-1)$ 是 $O(n^2)$ 的，找到第一个满足的 $n'$ 往回调整即可。

从一个合法的比分序列还原竞赛图：按 $d_i$ 排序，从后往前，赢前 $d_i$ 个，输后面的。

为什么对有点没想清楚。正着从小往大调是不太对的，因为你不知道用什么顺序做，有可能出现不存在 $x-1$ 和 $x+1$ 的情况。但倒着从大往小是对的，因为你不会做出两个 $0$ 或两个 $n-1$，所以只要三元环数不为 $0$，就一定有的做。另外这个倒着做虽然看上去是向背离兰道定理的方向做，但是你的操作是有实际意义支持的，所以比分序列不会不合法。

```cpp
int n,m,d[maxn];
int calc(int n){
	return n*(n-1)*(n-2)/6-((n&1)?n*(n/2)*(n/2-1)/2:(n/2)*((n/2)*(n/2-1)/2+(n/2-1)*(n/2-2)/2));
}
bool ans[maxn][maxn];
int id[maxn];
void work(){
	n=read();m=read();
	if(calc(n)<m){puts("No");return ;}
	for(int i=1;i<=n;i++)d[i]=i-1;
	for(int i=1;i<=n;i++)if(calc(i)>=m){
		int del=calc(i)-m;
		if(i&1){
			for(int j=1;j<=i;j++)d[j]=i/2;
		}
		else{
			for(int j=1;j<=i/2;j++)d[j]=i/2-1;
			for(int j=i/2+1;j<=i;j++)d[j]=i/2;
		}
		while(del){
			for(int l=1,r=1;l<=i;l=r+1){
				r=l;while(r<i&&d[r+1]==d[r])r++;
				int tmp=r;
				while(del&&l<r){
					del--;
					d[l++]--,d[r--]++;
				}
				r=tmp;
			}
		}
		break;
	}
	sort(d+1,d+n+1);
	for(int i=n;i;i--){
		int p1=0,p2=i-1;
		for(int j=1;j<i;j++)if(d[j]>=d[d[i]]){p1=j-1;break;}
		for(int j=1;j<i;j++)if(d[j]>d[d[i]]){p2=j-1;break;}
		for(int j=1;j<=p1;j++)ans[i][j]=1,d[i]--;
		for(int j=p2+1;j<i;j++)ans[i][j]=0,d[j]--;
		for(int j=p1+1;j<=p2-d[i];j++)ans[i][j]=0,d[j]--;
		for(int j=p2-d[i]+1;j<=p2;j++)ans[i][j]=1;
	}
	puts("Yes");
	for(int i=2;i<=n;i++){
		for(int j=1;j<i;j++)putchar('0'+ans[i][j]);puts("");
	}
}
```