---
title: 'AT_joisc2018_l 题解'
date: 2023-12-31 17:11:27
tags: [题解,图论]
published: true
hideInList: false
feature: 
isTop: false
---
[joisc2018_l](https://www.luogu.com.cn/problem/AT_joisc2018_l)

### 思路

$a_i$ 和 $a_{i+1}$ 之间取最短路最优。但因为有不能折返的限制，所以希望对每对 $u,v$ 找到 $k$ 条最短路使得任意断掉 $u$ 的一条出边和 $v$ 的一条入边，$u$ 到 $v$ 的最短路还在 $k$ 条中。

先跳过这一部分。如果可以在可行复杂度内预处理出结构体 $mn_{u,v,i}$ 表示 $u$ 到 $v$ 的第 $i$ 条最短路的距离，最短路中 $u$ 去向的点和去向 $v$ 的点，怎么做。

考虑线段树维护每个间隔。记录 $v_{i,j}$ 表示间隔的区间 $[l,r]$ 中，$a_l$ 到 $a_{l+1}$ 取第 $i$ 条最短路，$a_r$ 到 $a_{r+1}$ 取第 $j$ 条最短路的区间最短路。合并时枚举左边区间的右端点状态和右边区间的左端点状态，复杂度 $O(k^4l\log l)$。$l\le 10^5$，所以希望 $k$ 尽量小。

可以构造 $k=4$ 条最短路。

- $u$ 到 $v$ 的最短路：$u,uu,\dots,vv,v$。

- 不经过 $uu,vv$ 的最短路：$u,uu',\dots,vv',v$。

- 不经过 $uu$ 且不同于 $2$ 的最短路：$u,u3/uu',\dots,v3,v$。

- 不经过 $vv$ 且不同于 $2$ 的最短路：$u,u4,\dots,v4/vv',v$。

现在要求两点间不过第三点的最短路。厉害的是，可以把无向边拆除两条有向边当成点跑的最短路。

从每条边 $s$ 开始跑最短路，有 $m$ 个点，$\sum {deg_u}^2=m^2$ 条边，复杂度 $O(m^3\log m)$。但有大量的边只会造成一次入队。设当前做到边 $u$，$u$ 指向点 $uu$，如果这是第一次到达点 $uu$，那么枚举除了边 $u$ 的反向边以外的起点为 $uu$ 的边转移，记录 $lst_{uu}=u$；如果这是第二次到达点 $uu$，说明边形成一个环，可以转移到 $lst_{uu}$ 的反向边，并且转移到其他所有边都不会更优；如果大于 $2$ 次，就不会有任何转移。这样做入队次数为 $O(\sum deg_u)=O(m)$，单次复杂度 $O(m\log m)$。

然后枚举点 $u$ 和出边 $i$，点 $v$ 和出边 $j$，找到 $4$ 条最短路。复杂度 $O(\sum deg_u\sum deg_v)=O(m^2)$。

总复杂度 $O(m^2\log m+k^4l\log l)$。

### code

```cpp
int n,m,t,l;
int head[maxn],tot=1;
struct nd{
	int nxt,to,fr;ll w;
}e[maxn];
void add(int u,int v,ll w){e[++tot]={head[u],v,u,w};head[u]=tot;}
ll dis[maxn][maxn];
struct Dis{
	int id;ll dis;
	bool operator <(const Dis&tmp)const{return dis>tmp.dis;}
};
priority_queue<Dis> q;
bool vis[maxn];int bk[maxn];
void dij(int s){
	for(int i=2;i<=tot;i++)dis[s][i]=inf;
	memset(vis,0,sizeof(vis));memset(bk,0,sizeof(bk));
	dis[s][s]=e[s].w;q.push({s,dis[s][s]});
	// cout<<s<<"\n";
	while(!q.empty()){
		int u=q.top().id;q.pop();
		if(vis[u])continue;vis[u]=1;
		// cout<<u<<" "<<dis[s][u]<<"\n";
		if(bk[e[u].to]){
			if(dis[s][bk[e[u].to]]>dis[s][u]+e[bk[e[u].to]].w){
				dis[s][bk[e[u].to]]=dis[s][u]+e[bk[e[u].to]].w;
				q.push({bk[e[u].to],dis[s][bk[e[u].to]]});
			}
			bk[e[u].to]=-1;
		}
		if(!bk[e[u].to]){
			for(int i=head[e[u].to];i;i=e[i].nxt){
				int v=e[i].to;if(!bk[e[u].to]&&i==(u^1))continue;
				// cout<<v<<"\n";
				if(dis[s][i]>dis[s][u]+e[i].w){
					dis[s][i]=dis[s][u]+e[i].w;
					q.push({i,dis[s][i]});
				}
			}
			bk[e[u].to]=u^1;
		}
	}
}
int a[maxm];
struct path{
	ll dis;int x,y;
}mn[maxn][maxn][4];
path Min(path u,path v){if(u.dis<v.dis)return u;return v;}
struct mat{
	ll v[4][4];
	mat(){memset(v,0x3f,sizeof(v));}
}tree[maxm<<2];
mat merge(mat u,mat v,int mid){
	mat res;
	for(int i=0;i<4;i++){
		for(int j=0;j<4;j++){
			res.v[i][j]=inf;
			for(int k=0;k<4;k++){
				for(int l=0;l<4;l++){
					if(mn[a[mid]][a[mid+1]][k].y!=mn[a[mid+1]][a[mid+2]][l].x)res.v[i][j]=min(res.v[i][j],u.v[i][k]+v.v[l][j]);
				}
			}
		}
	}
	return res;
}
#define mid (l+r>>1)
#define ls nd<<1
#define rs nd<<1|1
void build(int nd,int l,int r){
	if(l==r){
		for(int i=0;i<4;i++)tree[nd].v[i][i]=mn[a[l]][a[l+1]][i].dis;
		return ;
	}
	build(ls,l,mid),build(rs,mid+1,r);
	tree[nd]=merge(tree[ls],tree[rs],mid);
}
void updata(int nd,int l,int r,int p){
	if(l==r){
		for(int i=0;i<4;i++)tree[nd].v[i][i]=mn[a[l]][a[l+1]][i].dis;
		return ;
	}
	if(p<=mid)updata(ls,l,mid,p);
	else updata(rs,mid+1,r,p);
	tree[nd]=merge(tree[ls],tree[rs],mid);
}
void work(){
	n=read();m=read();t=read();l=read();
	for(int i=1;i<=m;i++){
		int u=read(),v=read(),w=read();
		add(u,v,w),add(v,u,w);
	}
	for(int i=1;i<=l;i++)a[i]=read();
	for(int i=2;i<=tot;i++)dij(i);
	for(int u=1;u<=n;u++){
		for(int v=1;v<=n;v++)if(u!=v){
			for(int i=0;i<4;i++)mn[u][v][i]={inf,0,0};
			for(int i=head[u];i;i=e[i].nxt){
				int uu=e[i].to;
				for(int j=head[v];j;j=e[j].nxt){
					int vv=e[j].to;
					mn[u][v][0]=Min(mn[u][v][0],{dis[i][j^1],uu,vv});
				}
			}
			for(int i=head[u];i;i=e[i].nxt){
				int uu=e[i].to;
				for(int j=head[v];j;j=e[j].nxt){
					int vv=e[j].to;
					if(uu!=mn[u][v][0].x&&vv!=mn[u][v][0].y)mn[u][v][1]=Min(mn[u][v][1],{dis[i][j^1],uu,vv});
				}
			}
			for(int i=head[u];i;i=e[i].nxt){
				int uu=e[i].to;
				for(int j=head[v];j;j=e[j].nxt){
					int vv=e[j].to;
					if(uu!=mn[u][v][0].x&&vv!=mn[u][v][1].y)mn[u][v][2]=Min(mn[u][v][2],{dis[i][j^1],uu,vv});
				}
			}
			for(int i=head[u];i;i=e[i].nxt){
				int uu=e[i].to;
				for(int j=head[v];j;j=e[j].nxt){
					int vv=e[j].to;
					if(uu!=mn[u][v][1].x&&vv!=mn[u][v][0].y)mn[u][v][3]=Min(mn[u][v][3],{dis[i][j^1],uu,vv});
				}
			}
		}
	}
	build(1,1,l-1);
	while(t--){
		int u=read(),v=read();a[u]=v;
		if(u>1)updata(1,1,l-1,u-1);
		updata(1,1,l-1,u);
		ll ans=inf;for(int i=0;i<4;i++)for(int j=0;j<4;j++)ans=min(ans,tree[1].v[i][j]);
		if(ans>=inf)ans=-1;
		printf("%lld\n",ans);
	}
}
```