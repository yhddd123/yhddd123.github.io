---
title: 'arc196c 题解'
date: 2025-07-12 15:11:39
tags: [题解,dp]
published: true
hideInList: false
feature: 
isTop: false
---
[arc196c](https://www.luogu.com.cn/problem/AT_arc196_c)

### 思路

容斥。

钦定有 $k$ 个分解线，$k+1$ 段中后面的不能连向前面的，每段中可能还有更小的段，系数为 $(-1)^k$。

规定一个段以白点结尾。可以合法的前缀中每个黑点都要被前缀中的白点匹配，即前缀中白点数要多于黑点。

把所有白点单独拉出来，设它们在原序列中下标为 $p_i$，在这个长为 $n$ 的新序列上 dp。

设 $f_i$ 表示钦定最后一段结尾为 $i$ 的带系数的方案数。枚举前一个 $j$，$[1,j]$ 中匹配了 $p_j-j$ 对，剩 $i-(p_j-j)$ 个白点，选出 $p_i-i-(p_j-j)$ 个和 $[j+1,i]$ 中的黑点匹配。

$$f_i=\binom{i}{p_i-i}(p_i-i)!-\sum_{j=1}^{i-1}\binom{i-(p_j-j)}{p_i-i-(p_j-j)}(p_i-i-(p_j-j))!f_j$$

半在线卷积。$f_i=-\sum_{j=l}^{mid}\frac{(i-(p_j-j))!}{(2\times i-p_i)!}f_j$，将 $p_j-j$ 相同的 $f_j$ 放一起，可以看作 $p_j-j$ 和 $i-(p_j-j)$ 卷积。即下标在 $[p_l-l,p_{mid}-mid]$ 和 $[mid+1-(p_{mid}-mid),r-(p_l-l)]$ 范围内的两个数组卷积，虽然单个长度没有办法保证，但是一整层的长度之和保证为 $O(n)$。

复杂度 $O(n\log^2 n)$。

### code

```cpp
int n;
char s[maxn<<1];
int p[maxn],f[maxn];
int fac[maxn],inv[maxn];
int C(int m,int n){return fac[m]*inv[n]%mod*inv[m-n]%mod;}
void sovle(int l,int r){
    if(l==r){
        if(l>=p[l]-l)f[l]=(C(l,p[l]-l)*fac[p[l]-l]+mod-f[l])%mod;
        else f[l]=0;
        return ;
    }
    int mid=l+r>>1;
    sovle(l,mid);
    int fl=p[l]-l,fr=p[mid]-mid,gl=max(0ll,mid+1-(p[mid]-mid)),gr=max(0ll,r-(p[l]-l));
    vector<int> ff(fr-fl+1),gg(gr-gl+1);
    for(int i=l;i<=mid;i++)if(i>=p[i]-i)(ff[p[i]-i-fl]+=f[i])%=mod;
    for(int i=gl;i<=gr;i++)gg[i-gl]=fac[i];
    vector<int> hh=mul(ff,gg);
    for(int i=mid+1;i<=r;i++)if(i>=p[i]-i)(f[i]+=hh[i-fl-gl]*inv[2*i-p[i]])%=mod;
    sovle(mid+1,r);
}
void work(){
    n=read();scanf("%s",s+1);
    if(s[1]=='W'||s[2*n]=='B'){puts("0");return ;}
    n=0;for(int i=1;s[i]=='W'||s[i]=='B';i++)if(s[i]=='W')p[++n]=i;
    fac[0]=1;for(int i=1;i<=n;i++)fac[i]=fac[i-1]*i%mod;
    inv[n]=ksm(fac[n]);for(int i=n-1;~i;i--)inv[i]=inv[i+1]*(i+1)%mod;
    sovle(1,n);
    // for(int i=1;i<=n;i++){
    //     f[i]=C(i,p[i]-i)*fac[p[i]-i]%mod;
    //     for(int j=1;j<i;j++)(f[i]+=mod-C(i-(p[j]-j),p[i]-i-(p[j]-j))*fac[p[i]-i-(p[j]-j)]%mod*f[j]%mod)%=mod;
    //     // cout<<i<<" "<<p[i]<<" "<<f[i]<<"\n";
    // }
    // for(int i=1;i<=n;i++)cout<<i<<" "<<p[i]<<" "<<f[i]<<"\n";
    printf("%lld\n",f[n]);
}
```

