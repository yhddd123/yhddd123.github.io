---
title: 'CF875C 题解'
date: 2023-12-31 07:49:48
tags: [题解,图论]
published: true
hideInList: false
feature: 
isTop: false
---
[CF875C](https://www.luogu.com.cn/problem/CF875C)

### 思路

显然，满足 $S_{i-1}\leq S_i$ 即可使整体升序。对于每个 $S_{i-1}\leq S_i$，都需要满足一些限制，只要所有限制前后不矛盾，则输出是。

分析 $S_{i-1}\leq S_i$。枚举位置 $j$ 为第一个两者不等的位置，有几种情况：

- 不存在 $j$。此时如果 $len_{S_{i-1}}\leq len_{S_i}$，则 $S_{i-1}\leq S_i$，没有额外限制。否则 $S_i$ 一定小于 $S_{i-1}$，无解。

- $S_{i-1,j}$ 小于 $S_{i,j}$，则 $S_{i-1}$ 暂时小于 $S_i$，满足条件。此时只要 $S_{i,j}$ 不改，或 $S_{i-1,j}$ 和 $S_{i,j}$ 同时改即可。也就是说，$S_{i,j}$ 如果改了，$S_{i-1,j}$ 必须改。

- $S_{i-1,j}$ 大于 $S_{i,j}$，则 $S_{i-1}$ 暂时大于 $S_i$，不满足条件。此时必须改 $S_{i-1,j}$，$S_{i,j}$ 一定不能改。

由上分析，可以建图解决。

令 $s$ 表示一定改的起点，$t$ 表示一定不改的终点。

情况 $1$ 没有额外要求。情况 $2$ 要求改 $S_{i,j}$ 必须改 $S_{i-1,j}$，即 $S_{i,j}$ 向 $S_{i-1,j}$ 连边。情况 $3$ 要求改 $S_{i-1,j}$，不改 $S_{i,j}$，即 $s$ 向 $S_{i,j}$ 连边，$S_{i-1,j}$ 向 $t$ 连边。

从 $s$ 开始搜索，如果能走到 $t$ 则矛盾，否则能走到的点即为要改的点。

### code

```cpp
int n,m,ans;
int s,t,cur;
int a[2][maxn];
bool vis[maxn];
int head[maxn],tot;
struct nd{
	int nxt,to;
}e[maxn<<1];
void add(int u,int v){
	e[++tot]={head[u],v};
	head[u]=tot;
}
void dfs(int u){
	vis[u]=1;
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;
		if(!vis[v]){
			dfs(v);
		}
	}
}

int T;
signed main(){
	//	freopen(".in","r",stdin);
	//	freopen(".out","w",stdout);
	
	n=read();m=read();
	s=0;t=m+1;
	for(int i=1;i<=n;i++){
		a[cur][0]=read();
		for(int j=1;j<=a[cur][0];j++){
			a[cur][j]=read();
		}
		if(i!=1){
			for(int j=1;j<=min(a[cur^1][0],a[cur][0]);j++){
				if(a[cur^1][j]>a[cur][j]){
					add(s,a[cur^1][j]);
					add(a[cur][j],t);
					break;
				}
				if(a[cur^1][j]<a[cur][j]){
					add(a[cur][j],a[cur^1][j]);
					break;
				}
				if(j==min(a[cur^1][0],a[cur][0])&&a[cur^1][0]>a[cur][0]){
					printf("No\n");
					return 0;
				}
			}
			
		}
		cur^=1;
	}
	dfs(s);
	if(vis[t]){
		printf("No\n");
	}
	else{
		printf("Yes\n");
		for(int i=1;i<=m;i++)if(vis[i])++ans;
		printf("%lld\n",ans);
		for(int i=1;i<=m;i++)if(vis[i])printf("%lld ",i);
	}
}
```