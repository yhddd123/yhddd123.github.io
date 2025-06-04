---
title: 'agc049a 题解'
date: 2023-12-31 07:41:53
tags: [题解,概率期望]
published: true
hideInList: false
feature: 
isTop: false
---
[agc049a](https://www.luogu.com.cn/problem/AT_agc049_a)

### 思路

期望。

与 [CF280C](https://www.luogu.com.cn/problem/CF280C) 相似的思路。

每个点最多被做一次，或者被其他点影响。设 $f_i$ 表示 $i$ 是否被选，为 $0$ 或 $1$。答案为 $E[\sum f_i]$，即 $\sum f_i$ 的期望。

$$ans=E[\sum f_i]=\sum E[f_i]=\sum p_i$$

所以答案为每个点被选的概率的和。

能影响点 $i$ 使其不被选的点，是那些能到达 $i$ 的点，如果在 $i$ 之前被选，那么 $i$ 就不用选了。所以设 $siz$ 为能影响点 $i$ 的点数（包括自己），则 $p_i=\frac{1}{siz}$ 。

$n\leq100$ ，用 弗洛伊德 看一个点能去哪些点。

### code

```cpp
double n,ans,siz;
char c[maxn];
int e[maxn][maxn];
signed main(){
	cin>>n;
	for(int i=1;i<=n;i++){
		cin>>c+1;
		for(int j=1;j<=n;j++)e[j][i]=c[j]-'0';
	}
	for(int i=1;i<=n;i++)e[i][i]=1;
	for(int k=1;k<=n;k++){
		for(int i=1;i<=n;i++){
			for(int j=1;j<=n;j++){
				if(e[i][k]&&e[k][j])e[i][j]=1;
			}
		}
	}
	for(int i=1;i<=n;i++){
		siz=0;
		for(int j=1;j<=n;j++){
			if(e[i][j])++siz;
		}
		ans+=1.0/siz;
	}
	printf("%.10lf",ans);
}
```