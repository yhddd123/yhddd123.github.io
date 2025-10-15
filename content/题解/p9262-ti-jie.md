---
title: 'P9262 题解'
date: 2025-05-04 11:49:35
tags: [题解]
published: true
hideInList: false
feature: 
isTop: false
---
[P9262](https://www.luogu.com.cn/problem/P9262)

### 思路

每次所有滑块滑向上左下右四个方向。

考虑操作的规律。相对的方向做多次只用保留最后一次。同一种操作两两之间如果没有反向的操作，则后面一次无用。用栈来删，发现最后去掉开头结尾 $O(1)$ 次操作后，四种操作以一个合法的顺序重复多次，形如多次转圈。

开头处理若干步后所有的滑块都在某个角落。此时转一圈只改变每个滑块的位置，不改变整体的形状，是一个置换。

做一轮就可以知道原来在一个位置的滑块会去到的新位置。求出置换后，要把他做 $k=\frac{num}{4}$ 次，可以快速幂。也可以找出置换环后 $cyc_i\to cyc_{(i+k)\bmod siz}$。复杂度 $O(nm)$。

### code

```cpp
int n,m,q,a[maxn];
char s[maxq];
int id[maxn],to[maxn],tmp[maxn],res[maxn];
int b[maxm][maxm];
int st[maxn],tp;
bool vis[maxn];
void trans(int op){
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++)b[i][j]=id[(i-1)*m+j];
    }
    if(op==0){
        for(int j=1;j<=m;j++){
            vector<int> id1,id2;
            for(int i=1;i<=n;i++){
                if(a[b[i][j]])id1.pb(b[i][j]);
                else id2.pb(b[i][j]);
            }
            for(int i=0;i<id1.size();i++)b[i+1][j]=id1[i];
            for(int i=0;i<id2.size();i++)b[i+1+id1.size()][j]=id2[i];
        }
    }
    if(op==1){
    }
    if(op==2){
    }
    if(op==3){
    }
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++)id[(i-1)*m+j]=b[i][j];
    }
}
void work(){
    n=read();m=read();
    for(int i=1;i<=n;i++){
        scanf("%s",s+1);
        for(int j=1;j<=m;j++)a[(i-1)*m+j]=(s[j]=='.'?0:s[j]-'A');
    }
    for(int i=1;i<=n*m;i++)id[i]=i;
    q=read();scanf("%s",s+1);
    for(int i=1;i<=q;i++){
        if(s[i]=='G')st[++tp]=0;
        if(s[i]=='D')st[++tp]=1;
        if(s[i]=='L')st[++tp]=2;
        if(s[i]=='P')st[++tp]=3;
        if(tp>1&&(st[tp-1]==st[tp]||(st[tp-1]^1)==st[tp]))st[tp-1]=st[tp],tp--;
        if(tp>2&&st[tp]==st[tp-2])tp--;
    }
    q=tp;
    if(q<8){
        for(int i=1;i<=q;i++)trans(st[i]);
    }
    else{
        for(int i=1;i<=q%4+4;i++)trans(st[i]);
        int lst=(q-(q%4+4))/4;
        for(int i=1;i<=n*m;i++)tmp[i]=id[i];
        for(int i=(q%4)+5;i<=(q%4)+8;i++)trans(st[i]);
        for(int i=1;i<=n*m;i++)to[tmp[i]]=id[i];
        for(int i=1;i<=n*m;i++)if(!vis[i]){
            vector<int> cyc;
            int x=i;
            while(!vis[x])vis[x]=1,cyc.pb(x),x=to[x];
            for(int j=0;j<cyc.size();j++)res[cyc[j]]=cyc[(j+lst)%cyc.size()];
        }
        for(int i=1;i<=n*m;i++)id[i]=res[tmp[i]];
    }
    for(int i=1;i<=n;i++){
        for(int j=1;j<=m;j++){
            if(!a[id[(i-1)*m+j]])putchar('.');
            else putchar(char(a[id[(i-1)*m+j]]+'A'));
        }
        puts("");
    }
}
```