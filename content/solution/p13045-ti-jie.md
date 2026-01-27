---
title: 'P13045 题解'
date: 2025-07-18 21:54:10
tags: [题解]
published: true
hideInList: false
feature: 
isTop: false
---
[P13045](https://www.luogu.com.cn/problem/P13045)

### 思路

也是很唐的题。跟 Ad-hoc 爆了。

先手确实很劣，但如果先手连 $(1,1)$ 不就变成后手了吗！

模仿人机操作。如果它连 $(i,j)$，那你就连 $(j,i)$，多得一分；否则它连 $(i,i)$，你就找一个得分最大的 $(j,j)$，有概率亏分。

但是人机在最后还比你多一步，而你第一步 $(1,1)$ 虽然不亏但也没赚。所以第一步选 $(x,x)$，一个比较靠边但可以让人机更多的选 $(i,j)$ 让你扩大优势的位置。取 $x=10$ 有 $0.8$ 的胜率。

然后你破防去看 std。

不妨更人机一点。在第一步之后，你也在最优的里面乱选。虽然这样你每一轮的得分不减，但是人机最后一步的得分大大增加，这样只有 $0.3$ 的胜率。

但是 std 声称，同为最大得分的选择，更靠右的更有优势。感觉上也很是这样，因为你最终的目的在于减少人机最后一步的得分，而你最开始选在靠右的位置。然后就有 $0.9$ 的胜率了？？？

### code

```cpp
int n;
int a[maxn][maxn];
void upd(int u,int v){
    for(int i=1;i<=2*n;i++){
        for(int j=1;j<=2*n;j++){
            if(u==i||v==j)a[i][j]=-inf;
            else a[i][j]+=((i-u)*(j-v)<0);
        }
    }
}
pii que(){
    pair<int,pii> mx={0,{-2*n,-2*n}};
    for(int i=1;i<=2*n;i++){
        for(int j=1;j<=2*n;j++)mx=max(mx,{a[i][j],{-i,-j}});
    }
    return {-mx.se.fi,-mx.se.se};
}
pii ask(int u,int v){
    cout<<u<<" "<<v<<endl;
    upd(u,v);
    u=read(),v=read();
    upd(u,v);
    return {u,v};
}
void work(){
    memset(a,0,sizeof(a));
    int x=10;
    pii p=ask(x,x);
    for(int i=2;i<=n;i++){
        p=que();
        p=ask(p.fi,p.se);
    }
    read();
}
```