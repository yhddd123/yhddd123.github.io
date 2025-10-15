---
title: 'P13028 题解'
date: 2025-07-07 22:15:22
tags: [题解]
published: true
hideInList: false
feature: 
isTop: false
---
[P13028](https://www.luogu.com.cn/problem/P13028)

### 思路

唯一能决定你在一道题的回答的只有其他 $n$ 个人在该题答案是否相同。

#### $n=1$

如果得分大于一半，就回答相同的答案；否则回答相反的答案。

#### $n=2$

设有 $num$ 个问题两人答案相同，另外 $n-num$ 题两人只有一人答对。所以对于两人答案相同的题目，有 $\frac{va+vb-(n-num)}{2}$ 道正确，如果多余一半就回答相同的，否则相反。对于剩下的 $n-num$ 题，得分高的人能更多，跟得分高的人回答。

#### $n=3$

设有 $num$ 个问题三人答案相同，$num1$ 个 $B,C$ 相同，$num2$ 个 $A,C$ 相同，$num3$ 个问题 $A,B$ 相同。

此时无法确定每类问题中有几个多数人的答案正确，设分别有 $w,x,y,z$ 个。则有 $va=w+num1-x+y+z$ 等三个等式，枚举 $w$ 后可以唯一确定另外三个。

每种问题，可以选择回答和多数人相同或相反。只需要对于每种可能的 $w,x,y,z$，对于 $2^4$ 种决策，分别算出得分乘对应方案数 $\binom{num}{w}\times \binom{num1}{x}\times \binom{num2}{y}\times \binom{num3}{z}$ 即可。方案数需要 ```__int128```。

复杂度 $O(Tm2^n)$。

### code

```cpp
int n,m;
char a[maxn],b[maxn],c[maxn];
int va,vb,vc;
ll C[maxn][maxn];
ll val[16];
ll gcd(ll a,ll b){return b==0?a:gcd(b, a%b);}
void work(){
    n=read();m=read();
    if(n==1){
        scanf("%s",a+1);va=read();
        if(va<=m/2){
            for(int i=1;i<=m;i++){
                if(a[i]=='F')a[i]='T';
                else a[i]='F';
            }
            va=m-va;
        }
        for(int i=1;i<=m;i++)cout<<a[i];cout<<" "<<va<<"/1"<<"\n";
    }
    if(n==2){
        scanf("%s",a+1);va=read();
        scanf("%s",b+1);vb=read();
        if(va<vb)swap(a,b),swap(va,vb);
        int num=0;for(int i=1;i<=m;i++)if(a[i]==b[i])++num;
        int cnt=(va+vb-m+num)/2,lst=va-cnt;
        if(cnt<=num/2){
            for(int i=1;i<=m;i++)if(a[i]==b[i]){
                if(a[i]=='F')a[i]='T';
                else a[i]='F';
            }
            cnt=num-cnt;
        }
        for(int i=1;i<=m;i++)cout<<a[i];cout<<" "<<cnt+lst<<"/1"<<"\n";
    }
    if(n==3){
        scanf("%s",a+1);va=read();
        scanf("%s",b+1);vb=read();
        scanf("%s",c+1);vc=read();
        int num=0,num1=0,num2=0,num3=0;
        for(int i=1;i<=m;i++){
            if(a[i]==b[i]&&a[i]==c[i])++num;
            else if(b[i]==c[i])++num1;
            else if(a[i]==c[i])++num2;
            else ++num3;
        }
        for(int s=0;s<16;s++)val[s]=0;ll tot=0;
        for(int w=0;w<=min({num,va,vb,vc});w++){
            va-=w+num1,vb-=w+num2,vc-=w+num3;
            int sum=va+vb+vc;
            int x=(sum-va)/2,y=(sum-vb)/2,z=(sum-vc)/2;
            va+=w+num1,vb+=w+num2,vc+=w+num3;
            if(x>=0&&x<=num1&&y>=0&&y<=num2&&z>=0&&z<=num3&&va==w+num1-x+y+z&&vb==w+num2-y+x+z&&vc==w+num3-z+x+y){
                ll cnt=C[num][w]*C[num1][x]*C[num2][y]*C[num3][z];tot+=cnt;
                for(int s=0;s<16;s++){
                    val[s]+=(ll)(((s&1)?num-w:w)+((s&2)?num1-x:x)+((s&4)?num2-y:y)+((s&8)?num3-z:z))*cnt;
                }
            }
        }
        pair<ll,int> mx={0,0};
        for(int s=0;s<16;s++)mx=max(mx,{val[s],s});
        for(int i=1;i<=m;i++){
            if(a[i]==b[i]&&a[i]==c[i]){
                if(mx.se&1){
                    if(a[i]=='F')a[i]='T';
                    else a[i]='F';
                }
            }
            else if(b[i]==c[i]){
                if(mx.se&2){
                    if(b[i]=='F')a[i]='T';
                    else a[i]='F';
                }
                else a[i]=b[i];
            }
            else if(a[i]==c[i]){
                if(mx.se&4){
                    if(a[i]=='F')a[i]='T';
                    else a[i]='F';
                }
            }
            else{
                if(mx.se&8){
                    if(a[i]=='F')a[i]='T';
                    else a[i]='F';
                }
            }
        }
        ll g=gcd(mx.fi,tot);
        mx.fi/=g,tot/=g;
        for(int i=1;i<=m;i++)cout<<a[i];cout<<" ";write(mx.fi);cout<<"/";write(tot);cout<<"\n";
    }
}
```