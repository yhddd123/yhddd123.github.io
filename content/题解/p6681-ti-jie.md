---
title: 'P6681 题解'
date: 2023-12-31 17:22:08
tags: [题解,图论]
published: true
hideInList: false
feature: 
isTop: false
---
[P6681](https://www.luogu.com.cn/problem/P6681)

加强版 [qoj1193](https://qoj.ac/problem/1193)，$n\leq 1000,m=16$。

### 思路

考虑选串的过程，是给短的后面加串直到长短互换。设状态 $id_{i,j}$ 表示当前长的一串末尾是 $s_i$，比短串长 $j$。枚举加入的串，状态的转移分两种：

- 加入后短串还是比长串短。$id_{i,j}$ 到 $id_{i,j+siz_k}$，答案不变。

- 加入后长短互换。$id_{i,j}$ 到 $id_{k,siz_k-(siz_i-j)}$，答案加 $siz_k-(siz_i-j)$。

当加入串 $k$，相当于建图连边如上，边权为答案变化量，跑最短路。终点为 $id(i,0)$ 的最短路长度取 min。$nm$ 个点，$n^2m$ 条边，最短路复杂度 $O(E\log V)=O(n^2m\log nm)$。看上去不可过，实际过了。其实最短路复杂度中的 $E$ 是松弛次数，正常情况下是边数，但在这个图中最大边权为 $m$，所以每个点最多松弛 $m$ 次，复杂度 $O(nm\log nm)$。

### code

```cpp
int n,m;
string s[maxn];
int head[maxn*maxn],tot;
struct nd{
	int nxt,to,w;
}e[maxn*maxn*maxn];
void add(int u,int v,int w){e[++tot]={head[u],v,w};head[u]=tot;}
int dis[maxn*maxn];
struct Dis{
	int dis,id;
	bool operator<(const Dis&tmp)const{return dis>tmp.dis;}
};
bool vis[maxn*maxn];
priority_queue<Dis> q;
int id(int u,int v){return (u-1)*(m+1)+v+1;}
const int inf=1e9;
void work(){
	n=read();m=read();
	for(int i=1;i<=n;i++)cin>>s[i];
	for(int i=1;i<=n;i++){
		for(int j=0;j<s[i].size();j++){
			for(int k=1;k<=n;k++){
				if(i==k&&!j)continue;
				if(s[k].size()>=s[i].size()-j){
					if(s[i].substr(j,s[i].size()-j)==s[k].substr(0,s[i].size()-j)){
						int res=s[k].size()-(s[i].size()-j);
						add(id(i,s[i].size()-j),id(k,res),res);
					}
				}
				else{
					if(s[i].substr(j,s[k].size())==s[k]){
						int res=s[i].size()-j-s[k].size();
						add(id(i,s[i].size()-j),id(i,res),0);
					}
				}
			}
		}
	}
	mems(dis,0x3f);
	for(int i=1;i<=n;i++){
		dis[id(i,s[i].size())]=s[i].size();
		q.push({s[i].size(),id(i,s[i].size())});
	}
	while(!q.empty()){
		int u=q.top().id;q.pop();
		if(vis[u])continue;vis[u]=1;
		// cout<<u<<" "<<dis[u]<<"\n";
		for(int i=head[u];i;i=e[i].nxt){
			int v=e[i].to;
			if(dis[v]>dis[u]+e[i].w){
				dis[v]=dis[u]+e[i].w;
				q.push({dis[v],v});
			}
		}
	}
	int ans=inf;
	for(int i=1;i<=n;i++)ans=min(ans,dis[id(i,0)]);
	if(ans==inf)ans=-1;
	printf("%lld\n",ans);
}
```