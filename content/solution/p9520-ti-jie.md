---
title: 'P9520 题解'
date: 2023-12-31 22:19:23
tags: [题解,图论,数据结构]
published: true
hideInList: false
feature: 
isTop: false
---
[[JOISC2022] 监狱](https://www.luogu.com.cn/problem/P9520)

### 思路

因为是一棵树，最短路径唯一，所以每次都让一个人走到底。当走 $s->t$，$s->t$ 中此时没有点，意味着起点这条路径上的人一定先于这个人走，终点在这条路径导航的人一定后于这个人走。对于他们的相对顺序的限制，先走向后走连边，连边跑拓扑排序看有没有环。复杂度 $O(n^2)$。

优化建图，形如一个点向一条路径连边，一条路径向一个点连边。把一个点拆成两个，一个记录进入，一个出去。

线段树 $O(n\log^2 n)$，但可以倍增优化 $O(n\log n)$。记 $in_{u,i}$ 和 $out_{u,i}$ 表示 $u$ 到 $u$ 的 $2^i$ 级祖先这段区间。然后跟线段树优化一样向下一级区间连边。点向路径连边则在跳路径的 lca 是连边。

显然倍增常数过大甚至有时不如线段树。

```cpp
int n,m;
int head[maxn<<6],tot;
struct nd{
	int nxt,to;
}e[maxn<<7];
int d[maxn<<6];
void add(int u,int v){e[++tot]={head[u],v};head[u]=tot;d[v]++;}
int to[maxn][17],dep[maxn];
int in[maxn][17],out[maxn][17],idx;
void dfs(int u,int fa){
	to[u][0]=fa;dep[u]=dep[fa]+1;
	for(int i=1;i<=16;i++)to[u][i]=to[to[u][i-1]][i-1];
	for(int i=0;i<=16;i++)if(to[u][i])in[u][i]=++idx,out[u][i]=++idx,d[idx-1]=d[idx]=0;
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;if(v==fa)continue;
		dfs(v,u);
	}
}
int lca(int u,int v){
	if(dep[u]<dep[v])swap(u,v);
	for(int i=16;~i;i--)if(dep[to[u][i]]>=dep[v])u=to[u][i];
	if(u==v)return u;
	for(int i=16;~i;i--)if(to[u][i]!=to[v][i])u=to[u][i],v=to[v][i];
	return to[u][0];
}
int kth(int u,int k){
	for(int i=16;~i;i--)if((k>>i)&1)u=to[u][i];
	return u;
}
void updin(int u,int v,int w){
	if(u==v){
		add(w,u);
		return ;
	}
	if(dep[u]<dep[v])swap(u,v);
	for(int i=16;~i;i--)if(dep[to[u][i]]>=dep[v]){
		add(w,in[u][i]);
		u=to[u][i];
	}
	if(u==v)return ;
	for(int i=16;~i;i--)if(to[u][i]!=to[v][i]){
		add(w,in[u][i]),add(w,in[v][i]);
		u=to[u][i],v=to[v][i];
	}
	add(w,to[u][0]);
	add(w,u),add(w,v);
}
void updout(int u,int v,int w){
	if(u==v){
		add(u+n,w);
		return ;
	}
	if(dep[u]<dep[v])swap(u,v);
	for(int i=16;~i;i--)if(dep[to[u][i]]>=dep[v]){
		add(out[u][i],w);
		u=to[u][i];
	}
	// cout<<u<<" "<<v<<" "<<w<<" out\n";
	if(u==v)return ;
	for(int i=16;~i;i--)if(to[u][i]!=to[v][i]){
		add(out[u][i],w),add(out[v][i],w);
		u=to[u][i],v=to[v][i];
	}
	add(to[u][0]+n,w);
	add(u+n,w),add(v+n,w);
}
queue<int> q;
void work(){
	n=read();
	for(int i=1;i<n;i++){
		int u=read(),v=read();
		add(u,v),add(v,u);
	}
	m=read();idx=2*n+m;
	dfs(1,0);
	for(int i=1;i<=n;i++)head[i]=0;tot=0;
	for(int i=1;i<=idx;i++)d[i]=0;
	for(int u=1;u<=n;u++){
		for(int i=1;i<=16;i++)if(to[u][i]){
			add(in[u][i],in[u][i-1]),add(in[u][i],in[to[u][i-1]][i-1]);
			add(out[u][i-1],out[u][i]),add(out[to[u][i-1]][i-1],out[u][i]);
		}
		if(to[u][0]){
			add(in[u][0],u),add(in[u][0],to[u][0]);
			add(u+n,out[u][0]),add(to[u][0]+n,out[u][0]);
		}
	}
	for(int i=1;i<=m;i++){
		int u=read(),v=read();
		add(i+2*n,u+n),add(v,i+2*n);
		// cout<<i+2*n<<" "<<u+n<<" "<<v<<"\n";
		int tp=lca(u,v),uu,vv;
		if(tp==u)uu=kth(v,dep[v]-dep[tp]-1);
		else uu=to[u][0];
		if(tp==v)vv=kth(u,dep[u]-dep[tp]-1);
		else vv=to[v][0];
		// cout<<uu<<" "<<vv<<" q\n";
		updin(u,vv,i+2*n);updout(uu,v,i+2*n);
	}
	// for(int u=1;u<=idx;u++){
		// for(int i=head[u];i;i=e[i].nxt){
			// int v=e[i].to;
			// cout<<u<<" "<<v<<"\n";
		// }
	// }
	for(int i=1;i<=idx;i++)if(!d[i])q.push(i);
	while(!q.empty()){
		int u=q.front();q.pop();
		// if(u>2*n&&u<=2*n+m)cout<<u-2*n<<" t\n";
		for(int i=head[u];i;i=e[i].nxt){
			int v=e[i].to;
			if(d[v]){
				d[v]--;
				if(!d[v])q.push(v);
			}
		}
	}
	for(int i=1;i<=idx;i++)head[i]=0;tot=0;
	// for(int i=1;i<=idx;i++)if(d[i])cout<<i<<" "<<d[i]<<" d\n";
	for(int i=2*n+1;i<=2*n+m;i++)if(d[i]){printf("No\n");return ;}
	printf("Yes\n");
}
```