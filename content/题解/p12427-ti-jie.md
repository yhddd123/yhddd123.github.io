---
title: 'P12427 题解'
date: 2025-07-14 22:20:33
tags: [题解,图论]
published: true
hideInList: false
feature: 
isTop: false
---
[P12427](https://www.luogu.com.cn/problem/P12427)

### 思路

感觉，没那么好搞啊！

对原来的边建点。若 $i$ 边能接到 $j$ 边，连边 $i\to j$。$m^2$ 条边，$O(m^2)$ dfs 找环。需要减少边数。

对原来的点建虚点。连边 $i\to y_i$，$x_i\to i$，但是有颜色要求，不能直接在虚点中转。

对于 $c_i\neq c_j$，一定有一个二进制位不同，在每个二进制位上中转。建虚点 $id(i,j,0/1)$ 代表原图的 $i$ 点，第 $j$ 位 $0/1$。连边 $i\to id(y_i,j,[c_i 第 j 位为 0])$，$id(x_i,j,[c_i 第 j 位为 1]),i$。$m+40n$ 个点，$40m$ 条边，复杂度 $O(n\log n)$。然后卡常就完了。

### code

```cpp
int n,m;
int head[maxn*41],tot;
struct nd{
    int nxt,to;
}e[maxn*40];
void add(int u,int v){e[++tot]={head[u],v};head[u]=tot;}
int ans[maxn],num;
bool vis[maxn*41],bk[maxn*41];
int st[maxn*41],tp;
// void dfs(int u){
    // vis[u]=bk[u]=1;st[++tp]=u;
    // for(int i=head[u];i;i=e[i].nxt){
        // int v=e[i].to;
        // if(!vis[v])dfs(v);
        // else if(bk[v]){
            // if(num)continue;
            // for(int i=tp;i;i--){    
                // if(st[i]<=m)ans[++num]=st[i];
                // if(st[i]==v)break;
            // }
        // }
        // if(num)break;
    // }
    // bk[u]=0;tp--;
// }
void work(){
    n=read();m=read();
    for(int i=1;i<=m+40*n;i++)head[i]=vis[i]=0;tot=0;
    for(int i=1;i<=m;i++){
        int x=read(),y=read(),c=read();
        for(int j=0;j<20;j++){
            int v=(c>>j)&1;
            add(((v^1)*20+j)*n+x+m,i);
            add(i,(v*20+j)*n+y+m);
        }
    }
    num=0;for(int i=1;i<=m+40*n;i++)if(!vis[i]){
    	vis[i]=bk[i]=1,st[++tp]=i;
    	while(tp){
    		int u=st[tp];
		    for(int &i=head[u];i;i=e[i].nxt){
		        int v=e[i].to;
		        if(!vis[v]){vis[v]=bk[v]=1,st[++tp]=v;break;}
		        else if(bk[v]&&!num){
		            for(int i=tp;i;i--){    
		                if(st[i]<=m)ans[++num]=st[i];
		                if(st[i]==v)break;
		            }
		        }
		    }
    		if(!head[u])bk[u]=0,tp--;
    	}
    	if(num)break;
    }
    if(!num){puts("NO");return ;}
    puts("YES");write(num),putchar(' ');for(int i=num;i;i--)write(ans[i]),putchar(' ');puts("");
}
```

