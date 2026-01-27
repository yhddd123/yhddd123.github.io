---
title: 'P12996 题解'
date: 2025-07-04 12:26:17
tags: [题解,dp]
published: true
hideInList: false
feature: 
isTop: false
---

[P12996](https://www.luogu.com.cn/problem/P12996)

### 思路

不会载球跨过原点，数轴两边分开考虑。按距离排序。

$O(n^2)$ 可以设 $dp_{i,j}$ 表示 $0$ 型已经取掉了前 $i$ 个，$1$ 型取掉了前 $j$ 个。两个相交的同类型匹配不优，可以规定必须转移目前最远端的位置。

只能把两种型号放在一起考虑，设 $dp_i$ 表示已经取了前 $i$ 个的最小代价。$dp_i=\min (dp_{i-1}+2\times x_i,dp_{i-2}+2\times x_i+[op_{i-1}=op_i]\times c)$。

还有一种转移是，设 $i$ 是 $0$ 型，$i$ 要和之前最近的 $1$ 型 $j$ 匹配。此时，$[j+1,i-1]$ 中全为 $0$，若存在 $p$ 和 $q$ 匹配，那可以改为 $(j,p)$ 和 $(q,i)$ 更优。所以 $[j+1,i-1]$ 都和 $j$ 之前的 $1$ 型匹配。令 $j$ 为最近的 $[j+1,i]$ 中两种类型数量相等的位置，在这个区间中可以有后面 $0$ 匹配前面 $1$ 的转移，代价为区间中所有 $0$ 的下标和。

### code

```cpp
int n,c,ans;
int dp[maxn],sum[2][maxn];
int sovle(vector<pii> a){
    int n=a.size();
    a.pb({0,0});sort(a.begin(),a.end());
    unordered_map<int,int> mp;mp[0]=0;
    for(int i=1;i<=n;i++)sum[0][i]=sum[0][i-1],sum[1][i]=sum[1][i-1],sum[a[i].se][i]+=a[i].fi;
    for(int i=1,s=0;i<=n;i++){
        dp[i]=dp[i-1]+2*a[i].fi;
        if(i>=2)dp[i]=min(dp[i],dp[i-2]+2*a[i].fi+(a[i-1].se==a[i].se)*c);
        s+=a[i].se*2-1;
        if(mp.find(s)!=mp.end()){
            int j=mp[s];
            dp[i]=min(dp[i],dp[j]+2*(sum[a[i].se][i]-sum[a[i].se][j]));
        }
        mp[s]=i;
    }
    return dp[n];
}
void work(){
    n=read();c=read();
    vector<pii> a,b;
    for(int i=1;i<=n;i++){
        int x=read(),c=read();
        if(x>0)a.pb({x,c});
        else b.pb({-x,c});
    }
    ans=sovle(a)+sovle(b);
    printf("%lld\n",ans);
}
```