---
title: 'P11224 题解'
date: 2025-07-29 21:36:31
tags: [题解,图论]
published: true
hideInList: false
feature: 
isTop: false
---
[P11224](https://www.luogu.com.cn/problem/P11224)

> 如果您觉得这个任务在比赛中很难，那是因为它确实很难。事实上，这个任务的创意最初是作为2017/2018赛季HONI比赛的提案提出的。这个任务的唯一问题是作者自己也无法解决它。然而，一些比作者更聪明的人也尝试解决这个任务，但他们也未能成功，因此这个任务就这样在尘封的天花板上积满了灰尘。
>
> 幸运的是，通过使用现代技术，即网络搜索引擎，作者找到了大卫·埃普斯坦（David Eppstein）于2009年发表的论文《图论方法解决计算几何问题》（“Graph-Theoretic Solutions to Computational Geometry Problems”），文中描述了该等价问题的解决方案。

### 思路

设 $(i,j)$ 表示 $i$ 行 $j$ 列格子的左上角，维护 $pl/pr/pu/pd_{i,j}$ 表示这个角四周伸出去的边两侧格子是否不同。

这样得到了黑色格子的轮廓，是一些可以有凹角和中空的多边形。考虑那些 $270^{\circ}$ 的角，可以选择反向延长某条边，分割为合法的 $90^{\circ}$。如果存在两个 $270^{\circ}$ 的角在同一行或列，连接这两个角，可以消去两个 $270^{\circ}$，生成两个 $90^{\circ}$。否则反向延长某条边至与某条边相交，消去一个 $270^{\circ}$，生成三个 $90^{\circ}$。

希望最小化矩形数量，等价于最小化 $90^{\circ}$ 角的数量。显然合并两个 $270^{\circ}$ 性价比更高。如果一个 $270^{\circ}$ 先后和两个 $270^{\circ}$ 相连，实际效果只有一对  $270^{\circ}$ 相连。所以等价于最大化 $270^{\circ}$ 的匹配。如果两个匹配的连线相交也不合法。但匹配只有横着和竖着两种，且只有横着和竖着能相交，对匹配建点，对冲突的匹配连边，为二分图，求最大独立集。

二分图最大独立集的补集等于最小点覆盖，最小点覆盖大小等于最大匹配的大小。最小点覆盖的构造为残量网络上 $S$ 不可达的左部点和 $S$ 可达的右部点。

找出那些匹配被选择后，将两个角连起来即将两点间的边设置为两侧格子（染色）不同。对于剩下的 $270^{\circ}$，随便选一边分割直至与另一条边相交。

复杂度为 $n\times m$ 个点 $n\times m$ 条边的二分图网络流，$O(nm\sqrt{nm})$。

### code

```cpp
int n,m;
char S[maxn];
bool a[maxn][maxn];
bool pl[maxn][maxn],pr[maxn][maxn],pu[maxn][maxn],pd[maxn][maxn];
int p1[maxn][maxn],p2[maxn][maxn];
map<tuple<int,int,int>,int> id;int idx1,idx2;
tuple<int,int,int> rnk[maxm];
int head[maxm],tot=1;
struct nd{
    int nxt,to,w;
}e[maxm];
void add(int u,int v,int w){
	// cout<<u<<" "<<v<<"\n";
    e[++tot]={head[u],v,w};head[u]=tot;
    e[++tot]={head[v],u,0};head[v]=tot;
}
int s,t,flow;
int dep[maxm],rad[maxm];
queue<int> q;
bool bfs(){
    for(int i=1;i<=t;i++)dep[i]=0,rad[i]=head[i];
    dep[s]=1;q.push(s);
    while(!q.empty()){
        int u=q.front();q.pop();
        for(int i=head[u];i;i=e[i].nxt){
            int v=e[i].to;
            if(e[i].w&&!dep[v]){
                dep[v]=dep[u]+1;
                q.push(v);
            }
        }
    }
    return dep[t];
}
int dfs(int u,int res){
    if(u==t)return res;
    int cnt=0;
    for(int i=rad[u];i;i=e[i].nxt){
        int v=e[i].to;rad[u]=i;
        if(e[i].w&&dep[v]==dep[u]+1){
            int out=dfs(v,min(e[i].w,res));
            cnt+=out,res-=out;
            e[i].w-=out,e[i^1].w+=out;
            if(!res)break;
        }
    }
    return cnt;
}
bool vis[maxm];
void dfs(int u){
    vis[u]=1;
    for(int i=head[u];i;i=e[i].nxt){
        int v=e[i].to;if(v==s||v==t||vis[v])continue;
        if(e[i].w)dfs(v);
    }
}
int bk[maxn][maxn];
int ans[maxn][maxn],res;
void col(int u,int v){
	if(ans[u][v])return ;ans[u][v]=res;
    if(a[u][v-1]&&!pd[u][v])col(u,v-1);
    if(a[u][v+1]&&!pd[u][v+1])col(u,v+1);
    if(a[u-1][v]&&!pr[u][v])col(u-1,v);
    if(a[u+1][v]&&!pr[u+1][v])col(u+1,v);
}
void work(){
    n=read();m=read();
    for(int i=1;i<=n;i++){
        scanf("%s",S+1);
        for(int j=1;j<=m;j++)a[i][j]=S[j]=='C';
    }
    n++,m++;
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++){
            if(a[i][j]!=a[i][j-1])pu[i+1][j]=pd[i][j]=1;
            if(a[i][j]!=a[i-1][j])pr[i][j]=pl[i][j+1]=1;
        }
    }
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++){
            if(a[i][j]&&pu[i][j]&&!pd[i][j]&&pl[i][j]&&!pr[i][j])bk[i][j]=1;
            if(a[i][j-1]&&pu[i][j]&&!pd[i][j]&&!pl[i][j]&&pr[i][j])bk[i][j]=2;
            if(a[i-1][j]&&!pu[i][j]&&pd[i][j]&&pl[i][j]&&!pr[i][j])bk[i][j]=3;
            if(a[i-1][j-1]&&!pu[i][j]&&pd[i][j]&&!pl[i][j]&&pr[i][j])bk[i][j]=4;
            // if(bk[i][j])cout<<i<<" "<<j<<" "<<bk[i][j]<<"\n";
        }
    }
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++)if(bk[i][j]==1||bk[i][j]==3){
        	int k=j+1;
        	while(k<=m){
        		if(bk[i][k]==2||bk[i][k]==4){
	            	// cout<<i<<" "<<j<<" "<<k<<" a\n";
	                rnk[id[{i,j,k}]=++idx1]={i,j,k};
	                for(int l=j;l<=k;l++)p1[i][l]=idx1;
	                break;
                }
        		if(!pr[i][k]&&!a[i][k])break;
        		k++;
            }
            j=k;
        }
    }
    for(int i=1;i<=m;i++){
        for(int j=1;j<=n;j++)if(bk[j][i]==1||bk[j][i]==2){
        	int k=j+1;
        	while(k<=n){
        		if(bk[k][i]==3||bk[k][i]==4){
	            	// cout<<i<<" "<<j<<" "<<k<<" b\n";
	                rnk[id[{i,j,k}]=idx1+(++idx2)]={i,j,k};
	                for(int l=j;l<=k;l++)p2[l][i]=idx1+idx2;
	                j=k;
	                break;
	            }
        		if(!pd[k][i]&&!a[k][i])break;
        		k++;
        	}
            j=k;
        }
    }
    s=idx1+idx2+1,t=idx1+idx2+2;
    // cout<<idx1<<" "<<idx2<<" "<<s<<" "<<t<<"\n";
    for(int i=1;i<=idx1;i++)add(s,i,1);
    for(int i=1;i<=idx2;i++)add(i+idx1,t,1);
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++)if(p1[i][j]&&p2[i][j]){
        	// cout<<p1[i][j]<<" "<<p2[i][j]<<"\n";
            add(p1[i][j],p2[i][j],1);
        }
    }
    while(bfs())flow+=dfs(s,inf);
    // cout<<flow<<"\n";
    dfs(s);
    // for(int i=1;i<=t;i++)cout<<vis[i]<<" ";cout<<"\n";
    int num=0;
    for(int i=1;i<=idx1;i++)if(vis[i]){
    	++num;
        auto[p,l,r]=rnk[i];
    	// cout<<i<<" "<<p<<" "<<l<<" "<<r<<" a\n";
        for(int j=l;j<r;j++)pr[p][j]=pl[p][j+1]=1;
        bk[p][l]=bk[p][r]=0;
    }
    for(int i=idx1+1;i<=idx1+idx2;i++)if(!vis[i]){
    	++num;
        auto[p,l,r]=rnk[i];
    	// cout<<i<<" "<<p<<" "<<l<<" "<<r<<" b\n";
        for(int j=l;j<r;j++)pd[j][p]=pu[j+1][p]=1;
        bk[l][p]=bk[r][p]=0;
    }
    // cout<<idx1+idx2-flow<<" "<<num<<"\n";
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++)if(bk[i][j]){
        	// cout<<i<<" "<<j<<" "<<bk[i][j]<<"\n";
            if(bk[i][j]&1){
                for(int k=j;!(pd[i][k]&&pu[i][k])&&k<=m;k++)pr[i][k]=pl[i][k+1]=1;
            }
            else{
                for(int k=j;!(pd[i][k]&&pu[i][k])&&k;k--)pl[i][k]=pr[i][k-1]=1;
            }
        }
    }
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++)if(a[i][j]&&!ans[i][j])++res,col(i,j);
    }
    for(int i=1;i<n;i++){
        for(int j=1;j<m;j++)printf("%d ",ans[i][j]);puts("");
    }
    // for(int i=1;i<n;i++){
        // for(int j=1;j<m;j++)cout<<setw(3)<<ans[i][j];cout<<"\n";
    // }
}
```