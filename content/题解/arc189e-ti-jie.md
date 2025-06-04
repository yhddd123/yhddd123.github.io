---
title: 'arc189e 题解'
date: 2024-12-10 21:24:50
tags: [题解,构造]
published: true
hideInList: false
feature: 
isTop: false
---
[arc189e](https://www.luogu.com.cn/problem/AT_arc189_e)

### 思路

$n\le 3$ 无解。$n=4$ 时 $(1,2),(3,4)$ 权值为 $1$，$(1,4),(2,3)$ 权值为 $2$，$(1,3),(2,4)$ 权值为 $3$。$n=5$ 时如样例。

证明 $mx=2$ 不合法。归纳，对于 $n-1$ 的 $p_1,\dotsb,p_{n-1}$ 使得 $mx=2$ 不合法，如果全同色，$n$ 可以加在最前或最后；否则找到分界点 $p_x$，$p_x$ 以前为 $1$，以后为 $2$，如果 $(p_x,n)$ 为 $1$，$p_1,\dotsb,p_x,n,p_{x+1},\dotsb,p_{n-1}$ 不合法，否则 $p_1,\dotsb,p_{x-1},n,p_x,\dotsb,p_{n-1}$ 不合法。

对于 $n>5$ 时 $mx=3$ 合法。将 $n$ 分为 $4$ 个集合 $X1,X2,X3,X4$，对应 $n=4$ 时的 $1,2,3,4$。集合内权值为 $3$，集合间权值为 $n=4$ 的权值。可能不合法的方案会要求连续在 $X1$ 和 $X2$ 间切换，再连续在 $X1$ 和 $X4$ 间切换，即 $|X1|\ge |X2|+|X4|$。其他一些可能不合法的情况也要求其中一个集合至少为另外两个集合之和。令 $|X1|\ge |X2|\ge |X3|\ge |X4|\ge |X1|-1$。但当 $n=5$ 时会寄，特判即可。

### code

```cpp
int n,e[21][21];
void work(){
	n=read();
	if(n<=3){puts("No");return ;}
	puts("Yes");
	if(n==5){
		cout<<"2 1 4 4\n4 3 1\n1 3\n2\n";
		return ;
	}
	int x1=n/4,x2=n/4,x3=n/4,x4=n/4;
	if(n%4)x1++;
	if(n%4>1)x2++;
	if(n%4>2)x3++;
	for(int i=1;i<=x1;i++){
		for(int j=1;j<=x1;j++)e[i][j]=3;
		for(int j=x1+1;j<=x1+x2;j++)e[i][j]=1;
		for(int j=x1+x2+1;j<=x1+x2+x3;j++)e[i][j]=3;
		for(int j=x1+x2+x3+1;j<=n;j++)e[i][j]=2;
	}
	for(int i=x1+1;i<=x1+x2;i++){
		for(int j=x1+1;j<=x1+x2;j++)e[i][j]=3;
		for(int j=x1+x2+1;j<=x1+x2+x3;j++)e[i][j]=2;
		for(int j=x1+x2+x3+1;j<=n;j++)e[i][j]=3;
	}
	for(int i=x1+x2+1;i<=x1+x2+x3;i++){
		for(int j=x1+x2+1;j<=x1+x2+x3;j++)e[i][j]=3;
		for(int j=x1+x2+x3+1;j<=n;j++)e[i][j]=1;
	}
	for(int i=x1+x2+x3+1;i<=n;i++){
		for(int j=x1+x2+x3+1;j<=n;j++)e[i][j]=3;
	}
	for(int i=1;i<=n;i++){
		for(int j=i+1;j<=n;j++)cout<<e[i][j]<<" ";cout<<"\n";
	}
}
```

