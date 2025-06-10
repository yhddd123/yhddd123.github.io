---
title: 'CF1854D 题解'
date: 2023-12-31 17:10:30
tags: [题解]
published: true
hideInList: false
feature: 
isTop: false
---
[CF1854D](https://www.luogu.com.cn/problem/CF1854D)

### 思路

题目等价于求 $1$ 的联通块大小。

可以 $\log n=9$ 次二分出一个点走 $k$ 步到哪里。有两种用法：走 $n+1$ 步得到环上的某个点和走 $1$ 步得到该点下一个点。

如果找到知道 $1$ 联通块的环是哪些点，就可以对每个不知道的点询问 $n+1$ 得知答案。先从 $1$ 二分 $n+1$ 找到一个环上点，再一直走知道走完一个环。步数与环长 $len$ 有关，$9\times len+500-len\le 4500$。

先找出一个点在 $1$ 联通块的环上，在环上二分 $124$ 次 $1$ 步找到环上连续的 $125$ 个点。对剩下 $375$ 个点找出 $125$ 步能到这 $125$ 个点之一的点。这时至少已知环上连续的 $250$ 个点，有一半的环已知，其他的点走 $n+1$ 步或 $n+1+250$ 步如果在联通块内则一定能到这一半的环。总步数 $9\times 125+375+2\times 250=2000$。如果环长不到 $250$，就直接 $500-len$ 步做完。

这么做的关键是环上连续点长度可以倍增，$500-len$ 步就可以把 $len$ 长的环倍增到 $len\times 2$。如果一开始二分少一些连续长度可以步数更小。

### code

```cpp
int n;
int id[maxn],tot;bool vis[maxn];
vector<int> a,b;
bool ask(int u,int len){
	printf("? %lld %lld %lld ",u,len,tot);
	for(int i=1;i<=tot;i++)printf("%lld ",id[i]);
	printf("\n");fflush(stdout);
	return read();
}
bool get(int u,int len,vector<int> a){
	printf("? %lld %lld %lld ",u,len,(int)a.size());
	for(int i:a)printf("%lld ",i);
	printf("\n");fflush(stdout);
	return read();
}
int find(int u,int len){
	a.clear();
	for(int i=1;i<=n;i++)if(!vis[i]||i==id[1])a.push_back(i);
	while(a.size()>1){
		int num=a.size()>>1;b.clear();
		while(num--)b.push_back(a.back()),a.pop_back();
		if(!get(u,len,a))swap(a,b);
	}
	return a.front();
}
void prinf(){
	sort(id+1,id+tot+1);
	printf("! %lld ",tot);
	for(int i=1;i<=tot;i++)printf("%lld ",id[i]);
	printf("\n");fflush(stdout);
}
void work(){
	n=read();
	a.clear(),b.clear();
	id[++tot]=find(1,n+1);vis[id[tot]]=1;
	for(int t=2;t<=125;t++){
		int p=find(id[tot],1);
		if(p==id[1])break;
		id[++tot]=p,vis[id[tot]]=1;
	}
	if(tot<125){
		for(int i=1;i<=n;i++)if(!vis[i]){
			if(ask(i,n+1)){
				id[++tot]=i;vis[i]=1;
			}
		}
		prinf();return ;
	}
	for(int i=1;i<=n;i++)if(!vis[i]){
		if(ask(i,125)){
			id[++tot]=i;vis[i]=1;
		}
	}
	if(tot<250){
		for(int i=1;i<=n;i++)if(!vis[i]){
			if(ask(i,n+1)){
				id[++tot]=i;vis[i]=1;
			}
		}
		prinf();return ;
	}
	for(int i=1;i<=n;i++)if(!vis[i]){
		if(ask(i,n+1)||ask(i,n+1+250)){
			id[++tot]=i;vis[i]=1;
		}
	}
	prinf();
}
```