---
title: '典题乱做 2'
date: 2025-07-12 22:18:34
tags: [做题记录]
published: true
hideInList: false
feature: 
isTop: false
---
2

### [arc200e](https://www.luogu.com.cn/problem/AT_arc200_e)

令 $a_1=0$，$|a_i|\le 2$。若第 $i,j$ 位为 $1$，没有则为 $m+1$ 位，连边 $(i,j)$。

容斥数：没有边、一条、菊花、三元环。

### [CF2084G](https://www.luogu.com.cn/problem/CF2084G2)

归纳证明答案只与两边的最大或最小有关。$m=2$ 显然，若先手操作两边则答案与先手要求相反。

$$ans=\sum_{i\le j}([i\bmod 2=j\bmod 2]\max(p_i,p_j)+[i\bmod 2\neq j\bmod 2]\min(p_i,p_j))$$

$$ans=\sum i^2-\sum_{i<j}[i\bmod 2\neq j\bmod 2]|p_i-p_j|$$

等价于放在数轴上，奇数位置有 $\lceil\frac{n}{2}\rceil$ 个，最小化奇偶位置距离之和。设前 $i$ 个有 $j$ 个奇数位置的最小代价 $f_{i,j}$。在 $i$ 和 $i+1$ 的间隔加上两边跨过的贡献，为下凸的二次函数。

差分数组单调，维护全局加一次函数，向右平移，插入 $0$。fhq treap 维护 $(g_j,j,1)$。

```cpp
int n,p[maxn],ans;
#define ls lc[u]
#define rs rc[u]
struct Vec{
    int a[3];
    Vec(int _a=0,int _b=0,int _c=0){a[0]=_a,a[1]=_b,a[2]=_c;}
}tree[maxn];
int lc[maxn],rc[maxn],rt,idx;
int w[maxn],siz[maxn];
struct Tag{
    int a[3][3];
    Tag(int _a=1,int _b=0,int _c=0,int _d=0,int _e=1,int _f=0,int _g=0,int _h=0,int _i=1){
        a[0][0]=_a,a[0][1]=_b,a[0][2]=_c,a[1][0]=_d,a[1][1]=_e,a[1][2]=_f,a[2][0]=_g,a[2][1]=_h,a[2][2]=_i;
    }
}tag[maxn];
Vec operator*(const Vec &u,const Tag &v){
    Vec res;
    for(int i=0;i<3;i++){
        res.a[i]=0;
        for(int j=0;j<3;j++){
            res.a[i]+=u.a[j]*v.a[j][i];
        }
    }
    return res;
}
Tag operator*(const Tag &u,const Tag &v){
    Tag res;
    for(int i=0;i<3;i++){
        for(int j=0;j<3;j++){
            res.a[i][j]=0;
            for(int k=0;k<3;k++)res.a[i][j]+=u.a[i][k]*v.a[k][j];
        }
    }
    return res;
}
mt19937 rnd(1);
int newnode(int g,int j){
    int u=++idx;
    ls=rs=0;w[u]=rnd();siz[u]=1;
    tree[u]=Vec(g,j,1);tag[u]=Tag();
    return idx;
}
void upd(int u,Tag w){tree[u]=tree[u]*w,tag[u]=tag[u]*w;}
void down(int u){upd(ls,tag[u]),upd(rs,tag[u]),tag[u]=Tag();}
void up(int u){siz[u]=siz[ls]+siz[rs]+1;}
int merge(int u,int v){
    if(!u||!v)return u|v;
    down(u),down(v);
    if(w[u]<w[v]){
        rs=merge(rs,v);
        up(u);return u;
    }
    else{
        lc[v]=merge(u,lc[v]);
        up(v);return v;
    }
}
pii split(int u){
    if(!u)return {0,0};
    down(u);
    if(tree[u].a[0]<0){
        pii t=split(rs);
        rs=t.fi;up(u);
        return {u,t.se};
    }
    else{
        pii t=split(ls);
        ls=t.se;up(u);
        return {t.fi,u};
    }
}
int st[maxn],tp;
void dfs(int u){
    if(!u)return ;
    down(u);
    dfs(ls),st[++tp]=tree[u].a[0],dfs(rs);
}
void work(){
    n=read();
    for(int i=1;i<=n;i++)p[i]=-1;
    for(int i=1;i<=n;i++)p[read()]=i&1;
    idx=rt=0;
    int l=0,r=0,x=0;
    if(p[1]==1)l=r=1;
    else if(p[1]==-1){
        r=1;
        rt=newnode(0,1);
    }
    for(int i=1;i<n;i++){
        x+=2*l*l-(2*i+(n&1))*l+i*((n+1)/2);
        upd(rt,Tag(1,0,0,4,1,0,-(2*i+(n&1))-2,0,1));
        if(p[i+1]==1){
            upd(rt,Tag(1,0,0,0,1,0,0,1,1));
            l++,r++;
        }
        else if(p[i+1]==-1){
            auto[u,v]=split(rt);
            upd(v,Tag(1,0,0,0,1,0,0,1,1));
            int w=newnode(0,l+siz[u]+1);
            rt=merge(u,merge(w,v));
            r++;
        }
    }
    tp=0;dfs(rt);
    st[0]=x;for(int i=1;i<=tp;i++)st[i]+=st[i-1];
    ans=-st[(n+1)/2-l];for(int i=1;i<=n;i++)ans+=i*i;
    printf("%lld\n",ans);
}
```

### [arc199c](https://www.luogu.com.cn/problem/AT_arc199_c)

把 $P^1$ 弄成 $1,\dotsb,n$，$P^i_1$ 弄成 $1$。

一个子树在所有排列中都是区间。区间 dp 设 $f_{l,r}$ 表示 $[l,r]$ 形成子树，$g_{l,r}$ 表示 $[l,r]$ 形成森林。

### [arc199d](https://www.luogu.com.cn/problem/AT_arc199_d)

设 $f_{i,j}$ 和 $g_{i,j}$ 表示长为 $i$ 宽为 $j$ 的矩阵的数量和权值和。考虑最后一行，设 $a_i=p-1$，有 $k$ 个 $jj>p$ 的位置 $b_{jj}=i$。挖去 $i$ 行和这 $k$ 列进入子问题。枚举 $k$，第 $i$ 行的方案数 $val=[j=0] (k+1)+[j!=0]\binom{j}{k+1}$。

$$f_{i,j}=f_{i-1,j-k}\times val$$

$$g_{i,j}=g_{i-1,j-k}\times val+f_{i-1,j-k}\times (val\times j\times k+\sum_p (p-1)\binom{j-p}{k})$$

### [abc406g](https://www.luogu.com.cn/problem/AT_abc406_g)

$f_{i,j}$ 下凸。维护斜率拐点斜率的变化量和最左边直线的 $y=kx+b$。

操作 $1$ 为将斜率绝对值大于 $c$ 的部分推平为正负 $c$。操作 $2$ 为 $p$ 处斜率加 $2\times d$。

### [arc196_c](https://www.luogu.com.cn/problem/AT_arc196_c)

容斥。钦定有 $k$ 个分解线，$k+1$ 段中后面的不能连向前面的，每段中可能还有更小的段，系数为 $(-1)^k$。

规定一个段以白点结尾。可以合法的前缀中每个黑点都要被前缀中的白点匹配。把所有白点单独拉出来，设它们在原序列中下标为 $p_i$，在这个长为 $n$ 的新序列上 dp。

设 $f_i$ 表示最后一段结尾为 $i$ 的带系数的方案数。$f_i=\binom{i}{p_i-i}(p_i-i)!-\sum_{j=1}^{i-1}\binom{i-(p_j-j)}{p_i-i-(p_j-j)}(p_i-i-(p_j-j))!f_j$

半在线卷积。可以看作 $p_j-j$ 和 $i-(p_j-j)$ 卷积，一整层的长度之和保证为 $O(n)$。

### [CF1349D](https://www.luogu.com.cn/problem/CF1349D)

鞅与停时定理。

$$(\sum f_{a_i})-1=\sum(\frac{a_i}{m}f_{a_i-1}+\frac{(m-a_i)(n-2)}{m(n-1)}f_{a_i}+\frac{(m-a_i)}{m(n-1)}f_{a_i+1})$$

$$f_x-\frac{x}{m}=\frac{x}{m}f_{x-1}+\frac{(m-x)(n-2)}{m(n-1)}f_{x}+\frac{(m-x)}{m(n-1)}f_{x+1}$$

不妨设 $f_0=0$。令 $x=0$，$f_0=f_1=0$。递推即可。$ans=\sum f_{a_i}-(n-1)f_0-f_m$。