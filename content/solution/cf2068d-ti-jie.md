---
title: 'CF2068D 题解'
date: 2025-03-25 18:37:15
tags: [题解,dp]
published: true
hideInList: false
feature: 
isTop: false
---
[CF2068D](https://www.luogu.com.cn/problem/CF2068D)

### 思路

$f$ 升序、$t$ 降序排序，对应位置乘起来。

如何判定一个 $t$ 是否合法。构造一个有根树，每个点有长为 $1$ 和 $2$ 的两条出边，有 $n$ 个叶子，$t$ 数组为叶子的深度。$t$ 中的 $x+1$ 和 $x$ 可以合并为 $x-1$。即从大到小枚举值域 $x$，设有 $j$ 个 $x+1$，$k$ 个 $x$，加入 $c$ 个深度为 $x$ 的叶子，然后 $x$ 减 $1$，有 $k+c-j$ 个 $x+1$ 和 $j$ 个 $x$。只要满足 $cnt_{x+1}\ge cnt_x$ 即可。

所以可以 dp，再设一维 $i$ 表示已经选了前 $i$ 深的叶子，加入 $1$ 个深度为 $x$ 的叶子权值加 $f_i\times x$。对于一个 $x$ 复杂度为 $O(n^3)$，$x$ 是 $\log n$ 级别的，最大可以取到 $20$。

还原方案即模拟构造树的过程。

### code

```cpp
int n,a[maxn],id[maxn];
char c[10];
int dp[21][maxn][maxn][maxn];
void chkmn(int &u,int v){(u>v)&&(u=v);}
pii fa[maxn*15];
int t[21],pos;
vector<char> ans[maxn];
void work(){
	n=read();
	for(int i=1;i<=n;i++)a[i]=read(),a[i]=read();
	for(int i=1;i<=n;i++)id[i]=i;
	sort(id+1,id+n+1,[&](int u,int v){return a[u]<a[v];});
	sort(a+1,a+n+1);
	mems(dp,0x3f);dp[20][0][0][0]=0;
	for(int x=20;x;x--){
		for(int i=0;i<n;i++){
			for(int j=0;j<=i;j++){
				for(int k=0;j+k<=i;k++){
					chkmn(dp[x][i+1][j][k+1],dp[x][i][j][k]+a[i+1]*x);
				}
			}
		}
		for(int i=0;i<=n;i++){
			for(int j=0;j<=i;j++){
				for(int k=j;j+k<=i;k++)if(dp[x][i][j][k]<inf){
					chkmn(dp[x-1][i][k-j][j],dp[x][i][j][k]);
				}
			}
		}
	}
	// printf("%lld\n",dp[0][n][0][1]);
	vector<int> val;
	for(int x=0,i=n,j=0,k=1;x<=20;){
		x++,j+=k,swap(j,k);
		while(i&&k&&dp[x][i][j][k]==dp[x][i-1][j][k-1]+a[i]*x){
			i--,k--;
			val.pb(x);
		}
	}
	reverse(val.begin(),val.end());
	for(int x:val)t[x]++;
	vector<int> id1,id2;
	int pos=n;
	for(int x=20,i=1;~x;x--){
		while(t[x]--)id2.pb(i++);
		vector<int> tmp;
		while(id2.size()&&id1.size()){
			++pos,tmp.pb(pos);
			fa[id2.back()]={pos,1},id2.pop_back(),fa[id1.back()]={pos,2},id1.pop_back();
		}
		id1=id2,id2=tmp;
	}
	for(int i=1;i<=n;i++){
		vector<int> res;
		int u=i;
		while(fa[u].fi){
			res.pb(fa[u].se);
			u=fa[u].fi;
		}
		reverse(res.begin(),res.end());
		for(int w:res)ans[id[i]].pb(w==1?'.':'-');
	}
	for(int i=1;i<=n;i++){
		for(char c:ans[i])putchar(c);puts("");
	}
}
```

