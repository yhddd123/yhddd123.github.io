---
title: 'CF1286E 题解'
date: 2023-12-31 16:58:20
tags: [题解,字符串]
published: true
hideInList: false
feature: 
isTop: false
---
[CF1286E](https://www.luogu.com.cn/problem/CF1286E)

### 思路

维护当前 border 集合和答案。从 $i-1$ 的合法集合过来。对于集合中的区间 $[1,x]$，如果 $s_{x+1}\ne s_i$ 则删去，否则拓展为 $[1,x+1]$。如果 $s_i=s_1$ 则加入 $[1,1]$。一共最多 $O(n)$ 个次加入，所以最多 $O(n)$ 次删除。

考虑删除那些。$i-1$ 的合法位置是从 $i$ 到 $1$ 跳 nxt 到的位置。对于每个节点每种颜色找出在 nxt 树上，$s_{x+1}=s_{i+1}$ 的最近祖先，每次向上跳到那里。显然链上 $s_{x+1}=s_i$ 的点可以保留，其他都要删掉。把除了颜色 $s_i$ 的一路跳上去删掉。末尾添数维护 st 表最小值计算删除的代价。每个 border 删一次，复杂度 $O(n\log n)$。

对于合法的那些，新加入 $w_i$，权值要对 $w_i$ 取 min。用 map 维护每个权值的个数，将大于 $a_i$ 的数量加进 $a_i$ 并删除，每个加入的权值被操作一次就变成另一个权值的数量的一部分，复杂度 $O(n\log n)$。

爆 long long，维护 $ans=ans1\times bas+ans2$。略卡空间。

### code

```cpp
int n,a[maxn];
int nxt[maxn],to[maxn][26];
ll ans1,ans2,ans26,ansmod;
char s[maxn];
int st[20][maxn];
void add(int p){
	st[0][p]=a[p];
	for(int i=1;(1<<i)<=p;i++)st[i][p]=min(st[i-1][p],st[i-1][p-(1<<i-1)]);
}
int que(int l,int r){
	int k=log2(r-l+1);
	return min(st[k][r],st[k][l+(1<<k)-1]);
}
void inc(ll x){
	(ans26+=x)%=26,(ansmod+=x)&=((1<<30)-1);
	ans2+=x;ans1+=ans2/inf,ans2%=inf;
}
inline void write(__int128 x){static char buf[40];static int len=-1;if(x<0)putchar('-'),x=-x;do buf[++len]=x%10,x/=10;while(x);while(len>=0)putchar(buf[len--]+48);}
void prinf(){
	if(!ans1)printf("%lld\n",ans2);
	else{
		__int128 val=(__int128)ans1*inf+ans2;
		write(val);puts("");
	}
}
ll res;
map<int,int> mp;
void ins(int u,int v){mp[u]+=v,res+=1ll*u*v;}
void mn(int x){
	auto it=mp.upper_bound(x);int num=0;
	while(it!=mp.end()){
		num+=(*it).second;res-=1ll*(*it).first*(*it).second;
		it=mp.erase(it);
	}
	ins(x,num);
}
void work(){
	n=read();
	for(int i=1,j=0;i<=n;i++){
		cin>>s[i];s[i]=(s[i]-'a'+ans26)%26+'a';
		a[i]=read()^ansmod;
		add(i);inc(que(1,i));
		if(i==1){prinf();continue;}
		while(j&&s[i]!=s[j+1])j=nxt[j];
		if(s[i]==s[j+1])j++;
		nxt[i]=j;
		if(s[1]==s[i])ins(a[i],1);
		for(int k=0;k<26;k++)to[i][k]=to[nxt[i]][k];
		to[i][s[nxt[i]+1]-'a']=nxt[i];
		for(int k=0;k<26;k++)if(s[i]-'a'!=k){
			int x=to[i-1][k];
			while(x){
				ins(que(i-1-x+1,i-1),-1);
				x=to[x][k];
			}
		}
		mn(a[i]);inc(res);prinf();
	}
}
```