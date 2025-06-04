---
title: 'agc069b 题解'
date: 2024-11-25 14:57:18
tags: [题解,图论]
published: true
hideInList: false
feature: 
isTop: false
---
[agc069b](https://www.luogu.com.cn/problem/AT_agc069_b)

### 思路

取两个排列 $p,q$。假设第一步问 $(p_1,q_1)$ 返回是，接下来问 $(p_2,q_2),\dotsb,(p_i,q_i),\dotsb,(p_{n-1},q_{n-1})$。如果某一步问到了是，就再一步把 $(1,q_i),(p_i,1)$ 分出来。最后剩一个问题和 $(p_1,q_1),(p_1,q_n),(p_n,q_n)$，此时三个位置要求至少存在一个 $0$。如果第一步问 $(p_1,q_1)$ 返回否，删掉 $i=p_1$ 和 $j=q_1$ 一行一列进入 $n-1$ 的子问题。当 $n=1$ 时合法。

等价于 $n-1$ 次删掉一行一列，要求这一行一列中至少有一个 $0$。套路的对每个 $a_{i,j}=0$ 连边 $(i,j+n)$。对于每个连通块，找出一颗生成树，从叶子开始连起，最后根不要了，即能找出 $siz-1$ 对一行一列。如果 $\sum siz-1 \ge n-1$ 就合法了。

然后写出来发现 WA $18$ 个点就破防了！特别的，当 $n>2$ 且去到了 $n=2$ 的全 $1$ 矩阵，剩两个问题时，可以问矩阵以外的位置排除一行或一列，所以 $n>2$ 时，$\sum siz-1\ge n-2$ 就合法了。

### code

```cpp
int n;
char s[maxn];
int a[maxn][maxn];
int f[maxn<<1],siz[maxn<<1];
int fd(int x){
	if(f[x]==x)return x;
	return f[x]=fd(f[x]);
}
void work(){
	n=read();
	for(int i=1;i<=n;i++){
		scanf("%s",s+1);
		for(int j=1;j<=n;j++)a[i][j]=(s[j]=='1');
	}
	for(int i=1;i<=n*2;i++)f[i]=i,siz[i]=0;
	for(int i=1;i<=n;i++){
		for(int j=1;j<=n;j++)if(!a[i][j])f[fd(i)]=fd(j+n);
	}
	for(int i=1;i<=2*n;i++)siz[fd(i)]++;
	int ans=0;
	for(int i=1;i<=2*n;i++)if(fd(i)==i)ans+=siz[i]-1;
	if(ans>=n-1||(n>2&&ans>=n-2))puts("Yes");
	else puts("No");
}
```