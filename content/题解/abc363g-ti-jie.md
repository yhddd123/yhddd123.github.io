---
title: 'abc363g 题解'
date: 2025-09-10 16:45:10
tags: [题解,网络流]
published: true
hideInList: false
feature: 
isTop: false
---

[abc363g](https://www.luogu.com.cn/problem/AT_abc363_g)

### 思路

如果没有修改，可以费用流：建一排点表示每天的选择，$S$ 向 $d_i$ 天连流量 $1$ 费用 $p_i$；$i$ 天向 $i-1$ 天连流量 $+\infty$ 费用 $0$；$i$ 天向 $T$ 连流量 $1$ 费用 $0$。

模拟费用流。如果可以以一个任意的顺序加入 $(d_i,p_i)$，维护流量变化，那么就可以线段树分治回答修改。

加入 $(d_i,p_i)$ 等价于在之前的残量网络中加入边 $S\to d_i$，此时可能形成的 $S\to T$ 的负权路径或负环形如：

- $S\to d_i\to j\to T$，即在 $j$ 天执行任务 $i$。

- $S\to d_i\to d_j\to S$，即用任务 $i$ 替换任务 $j$。

所以只需要知道第 $d_i$ 天能去到哪些天，判断这些天有没有去 $T$ 的流量，再判断 $d_j$ 属于这些天的最小 $p_j$ 能不能被 $p_i$ 替换。

第 $d_i$ 天能去到 $1\sim d_i$ 天，也有可能通过反向边去到 $d_i$ 右边，总之是一个前缀。可以直接用线段树维护 $i\to i+1$ 的流量。更好理解的方式是用 Hall 定理判定任务和天的二分图匹配，即要求 $j\ge \sum[d_i\le j]$。

### Code

```cpp
int n,q,ans;
int a[maxn],b[maxn];
int lst[maxn];
#define mid ((l+r)>>1)
#define ls nd<<1
#define rs nd<<1|1
namespace sgt1{
pii mn[maxn<<2];int tag[maxn<<2];
void build(int nd,int l,int r){
    mn[nd]={l,l};
    if(l==r)return ;
    build(ls,l,mid),build(rs,mid+1,r);
}
void upd(int nd,int w){mn[nd].fi+=w,tag[nd]+=w;}
void down(int nd){upd(ls,tag[nd]),upd(rs,tag[nd]),tag[nd]=0;}
void updata(int nd,int l,int r,int ql,int qr,int w){
    if(l>=ql&&r<=qr)return upd(nd,w);
    if(tag[nd])down(nd);
    if(ql<=mid)updata(ls,l,mid,ql,qr,w);
    if(qr>mid)updata(rs,mid+1,r,ql,qr,w);
    mn[nd]=min(mn[ls],mn[rs]);
}
pii query(int nd,int l,int r,int ql,int qr){
    if(l>=ql&&r<=qr)return mn[nd];
    if(tag[nd])down(nd);
    if(qr<=mid)return query(ls,l,mid,ql,qr);
    if(ql>mid)return query(rs,mid+1,r,ql,qr);
    return min(query(ls,l,mid,ql,qr),query(rs,mid+1,r,ql,qr));
}
}
namespace sgt2{
multiset<int> val[maxn];
pii mn[maxn<<2];
void build(int nd,int l,int r){
    mn[nd]={inf,l};
    if(l==r){val[l].insert(inf);return ;}
    build(ls,l,mid),build(rs,mid+1,r);
}
void modif(int nd,int l,int r,int p,int w,int op){
    if(l==r){
        if(op==1)val[l].insert(w);
        else val[l].erase(val[l].find(w));
        mn[nd]={*val[l].begin(),l};
        return ;
    }
    if(p<=mid)modif(ls,l,mid,p,w,op);
    else modif(rs,mid+1,r,p,w,op);
    mn[nd]=min(mn[ls],mn[rs]);
}
pii query(int nd,int l,int r,int ql,int qr){
    if(l>=ql&&r<=qr)return mn[nd];
    if(qr<=mid)return query(ls,l,mid,ql,qr);
    if(ql>mid)return query(rs,mid+1,r,ql,qr);
    return min(query(ls,l,mid,ql,qr),query(rs,mid+1,r,ql,qr));
}
}
vector<pii> tree[maxn<<2];
void updata(int nd,int l,int r,int ql,int qr,pii w){
    if(ql>qr)return ;
    if(l>=ql&&r<=qr){tree[nd].pb(w);return ;}
    if(ql<=mid)updata(ls,l,mid,ql,qr,w);
    if(qr>mid)updata(rs,mid+1,r,ql,qr,w);
}
void sovle(int nd,int l,int r){
    vector<pii> add,del;
    auto upd=[&](pii p,int op,bool fl=1){
        ans+=p.se*op;
        sgt1::updata(1,1,n,p.fi,n,-op);
        sgt2::modif(1,1,n,p.fi,p.se,op);
        if(fl){
            if(op==1)add.pb(p);
            else del.pb(p);
        }
    };
    for(pii p:tree[nd]){
        pii res=sgt1::query(1,1,n,p.fi,n);
        if(res.fi>0)upd(p,1);
        else{
            res=sgt2::query(1,1,n,1,res.se);
            if(res.fi<=p.se)upd({res.se,res.fi},-1),upd(p,1);
        }
    }
    if(l==r)printf("%lld\n",ans);
    else sovle(ls,l,mid),sovle(rs,mid+1,r);
    for(pii p:del)upd(p,1,0);
    for(pii p:add)upd(p,-1,0);
}
void work(){
    n=read();q=read();
    for(int i=1;i<=n;i++)a[i]=read();
    for(int i=1;i<=n;i++)b[i]=read();
    for(int i=1;i<=n;i++)lst[i]=1;
    for(int i=1;i<=q;i++){
        int p=read(),u=read(),v=read();
        updata(1,1,q,lst[p],i-1,{a[p],b[p]});
        a[p]=u,b[p]=v,lst[p]=i;
    }
    for(int i=1;i<=n;i++)updata(1,1,q,lst[i],q,{a[i],b[i]});
    sgt1::build(1,1,n),sgt2::build(1,1,n);
    sovle(1,1,q);
}
```