---
title: '矩阵树定理'
date: 2025-02-18 22:00:00
tags: [笔记,数学]
published: true
hideInList: false
feature: 
isTop: false
---

## 矩阵树定理

数生成树数。

### 对于无向图

记度数矩阵 $D$，$D_{i,i}=deg_i$。邻接矩阵 $A$，$A_{i,j}=A_{j,i}$ 等于 $(i,j)$ 的数量。定义 基尔霍夫矩阵 $K=D-A$，则 $K$ 去掉 $k$ 行 $k$ 列 得到 $K'$，$k'$ 的行列式 $det(K')$ 为图的生成树数量。

### 对于有向图

分 叶向树和根向树，将度数分别换为入度和出度，删去 $rt$ 行 $rt$ 列的行列式为以 $rt$ 为根的方案数。

### 模板：[P6178](https://www.luogu.com.cn/problem/P6178)

```cpp
int n,m,op;
int a[maxn][maxn];
int det(int n){
	int ans=1;
	for(int i=2;i<=n;i++){
		for(int j=i+1;j<=n;j++)if(a[j][i]){
			while(a[i][i]){
				int d=a[j][i]/a[i][i];
				for(int k=i;k<=n;k++)(a[j][k]+=mod-a[i][k]*d%mod)%=mod;
				swap(a[i],a[j]),ans=mod-ans;
			}
			swap(a[i],a[j]),ans=mod-ans;
		}
	}
	for(int i=2;i<=n;i++)ans=ans*a[i][i]%mod;
	return ans;
}
void work(){
	n=read();m=read();op=read();
	for(int i=1;i<=m;i++){
		int u=read(),v=read(),w=read();
		if(!op)(a[u][u]+=w)%=mod,(a[v][v]+=w)%=mod,(a[u][v]+=mod-w)%=mod,(a[v][u]+=mod-w)%=mod;
		else (a[v][v]+=w)%=mod,(a[v][u]+=mod-w)%=mod;
	}
	printf("%lld\n",det(n));
}
```

---

### 生成树带权值

如果求图的 生成树每条边的权值之积 的和，将 $D$ 和 $A$ 的值改为对应的权值和。

#### [P3317](https://www.luogu.com.cn/problem/P3317)

对于一颗生成树 $T$，权值为 $\prod_{e\in T}p_e\prod_{e\notin T}(1-p_e)$。把 $\prod_e(1-p_e)$ 提出来，生成树每条边的权值为 $\frac{p_e}{1-p_e}$。

### BEST 定理

对于欧拉图（有向图，存在欧拉回路，入度等于出度，除了孤立点强连通），从 $x$ 出发的欧拉回路等于以 $x$ 为根的根向树的方案数乘以 $deg_x\times \prod (deg_u-1)!$。

#### [P7531](https://www.luogu.com.cn/problem/P7531)

建源汇点，再从 $T$ 向 $S$ 连 $deg_S$ 条边，此时是欧拉图。随便选一个根求内向树，还要除去 $S,T$ 并不能随便定向。

### 相关技巧

#### [P6624](https://www.luogu.com.cn/problem/P6624)

莫比乌斯反演除去 $gcd$ 的贡献。此时生成树的权值为每条边之和，但矩阵树做的是每条边之积。权值 $(wx+1)$ 之积模 $x^2$ 的一次项权值，维护一个结构体的行列式。

#### [P5296](https://www.luogu.com.cn/problem/P5296)

>  求所有生成树权值和的 $k$ 次方的和。

行列式的一个元素中维护 $a_0\sim a_k$ 的所有值，乘法为二项式定理 $(a+b)^k=\sum \binom{k}{i} a^ib^{k-i}$，逆元递推。复杂度 $O(n^3k^2)$。

#### [P4208](https://www.luogu.com.cn/problem/P4208)

最小生成树每种边权选的边数量相等。求出一个 MST 之后，把同个边权的边拉出来，先连上其他边权的边，把每层内的生成树数量乘起来。

#### [Q9278](https://qoj.ac/contest/1791/problem/9278)

> 对初始为 $0$ 的 $n\times n$ 矩阵操作 $m$ 次，对 $l\le i\le r,l\le j\le r$ 的 $a_{i,j}$ 加 $1$。求矩阵的行列式。
>
> $n\le 5\times 10^5,m\le n+300$。

二维差分后行列式值不变，等价于连边 $(l,r+1)$ 后图的基尔霍夫矩阵的行列式，即生成树方案数。注意到 $m-n\le 300$，广义串并联方法，点数 $600$，求出缩完之后每条边在/不在生成树的方案数 $f_e$ 和 $g_e$。提出 $\prod g_e$，边权为 $\frac{f_e}{g_e}$ 再矩阵树定理求生成树权值。