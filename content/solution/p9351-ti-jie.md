---
title: 'P9351 题解'
date: 2023-12-31 21:57:00
tags: [题解,图论]
published: true
hideInList: false
feature: 
isTop: false
---
[P9351](https://www.luogu.com.cn/problem/P9351)

### 思路

观察到一次覆盖操作相当于 $(u,v)$ 向 $(u,v)$ 为中心的一个矩形挖去四个角中每个点连代价为 $1$ 的边。

因为 $r\le c$，$r\le \sqrt {rc}$。暴力是 01bfs，到每个点处理覆盖操作时枚举行一边，用 $n$ 个并查集维护每行没有被删去的后继。对于每个点需要枚举 $\min(2\times n,r)$ 行，每个点只被入队一次。复杂度 $O(rc\sqrt {rc})$。

瓶颈在于枚举一行时有可能整行都没有要入队的点。

观察发现，除了最后一次覆盖操作以外，每一次覆盖操作都只让矩形边界上的点入队一定不劣。如果通过覆盖操作到达矩形边界内一个点有意义，那一定有一个原来的白连通块从这个点跨到矩形外面去，那这样之前通过覆盖操作到达矩形和连通块相交的位置即可。

这样每次一个点向 $4$ 条边中的点连边，维护每行每列的未操作后缀的并查集。复杂度 $O(rc)$

### code

```cpp
int n,m,d;
int sx,sy,ex,ey;
char s[maxn];
vector<vector<int>> a,dis;
int fx[4][2]={{1,0},{-1,0},{0,1},{0,-1}};
vector<vector<int>> f;
int fd(int id,int x){
	if(x==f[id][x])return x;
	return f[id][x]=fd(id,f[id][x]);
}
pii q[maxn];int h=1,t=0;
pii st[maxn];int tp;
int ans;
void work(){
	n=read(),m=read(),d=read();
	a.resize(n+1),dis.resize(n+1);
	for(int i=1;i<=n;i++){
		a[i].resize(m+1),dis[i].resize(m+1);
		for(int j=1;j<=m;j++)dis[i][j]=inf;
	}
	f.resize(n+m+1);
	for(int i=1;i<=n;i++){
		f[i].resize(m+2);f[i][m+1]=m+1;
		for(int j=1;j<=m;j++)f[i][j]=j;
	}
	for(int i=n+1;i<=n+m;i++){
		f[i].resize(n+2);f[i][n+1]=n+1;
		for(int j=1;j<=n;j++)f[i][j]=j;
	}
	sx=read(),sy=read(),ex=read(),ey=read();
	for(int i=1;i<=n;i++){
		scanf("%s",s+1);
		for(int j=1;j<=m;j++)a[i][j]=(s[j]=='.');
	}
	dis[sx][sy]=0,q[++t]={sx,sy};
	int cnt=0;ans=inf;
	while(h<=t){
		tp=0;
		while(h<=t){
			int u=q[h].fi,v=q[h].se;h++;
			if(abs(u-ex)<=d+1&&abs(v-ey)<=d+1&&abs(u-ex)+abs(v-ey)<=2*d)ans=min(ans,dis[u][v]+1);
			f[u][v]=fd(u,v+1);f[v+n][u]=fd(v+n,u+1);
			if(1){	
				int i=max(1,u-d);
				int l=max(1,(i==u-d||i==u+d)?v-d+1:v-d);
				int r=min(m,(i==u-d||i==u+d)?v+d-1:v+d);
				for(int j=fd(i,l);j<=r;j=fd(i,j)){
					if(dis[i][j]>dis[u][v]+1){
						dis[i][j]=dis[u][v]+1;
						st[++tp]={i,j};
					}
					f[i][j]=fd(i,j+1);f[j+n][i]=fd(j+n,i+1);
				}
			}
			if(1){	
				int i=min(n,u+d);
				int l=max(1,(i==u-d||i==u+d)?v-d+1:v-d);
				int r=min(m,(i==u-d||i==u+d)?v+d-1:v+d);
				for(int j=fd(i,l);j<=r;j=fd(i,j)){
					if(dis[i][j]>dis[u][v]+1){
						dis[i][j]=dis[u][v]+1;
						st[++tp]={i,j};
					}
					f[i][j]=fd(i,j+1);f[j+n][i]=fd(j+n,i+1);
				}
			}
			if(1){	
				int i=max(1,v-d);
				int l=max(1,(i==v-d||i==v+d)?u-d+1:u-d);
				int r=min(n,(i==v-d||i==v+d)?u+d-1:u+d);
				for(int j=fd(i+n,l);j<=r;j=fd(i+n,j)){
					if(dis[j][i]>dis[u][v]+1){
						dis[j][i]=dis[u][v]+1;
						st[++tp]={j,i};
					}
					f[i+n][j]=fd(i+n,j+1);f[j][i]=fd(j,i+1);
				}
			}
			if(1){	
				int i=min(m,v+d);
				int l=max(1,(i==v-d||i==v+d)?u-d+1:u-d);
				int r=min(n,(i==v-d||i==v+d)?u+d-1:u+d);
				for(int j=fd(i+n,l);j<=r;j=fd(i+n,j)){
					if(dis[j][i]>dis[u][v]+1){
						dis[j][i]=dis[u][v]+1;
						st[++tp]={j,i};
					}
					f[i+n][j]=fd(i+n,j+1);f[j][i]=fd(j,i+1);
				}
			}
			for(int i=0;i<4;i++){
				int nx=u+fx[i][0],ny=v+fx[i][1];
				if(nx<=0||nx>n||ny<=0||ny>m)continue;
				if(!a[nx][ny])continue;
				if(dis[nx][ny]>dis[u][v]){
					dis[nx][ny]=dis[u][v],q[++t]={nx,ny};
				}
			}
		}
		h=1,t=0;
		cnt++;
		if(dis[ex][ey]!=inf||ans==cnt)break;
		for(int i=1;i<=tp;i++){
			pii p=st[i];
			if(dis[p.fi][p.se]!=cnt)continue;
			q[++t]=p;
		}
	}
	printf("%d\n",min(ans,dis[ex][ey]));
}
```