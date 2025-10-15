---
title: 'P11150 题解'
date: 2025-02-03 21:13:40
tags: [题解,字符串]
published: true
hideInList: false
feature: 
isTop: false
---
[P11150](https://www.luogu.com.cn/problem/P11150)

### upd 25.2.7

被 [1](https://www.luogu.com.cn/discuss/1054533) [2](https://www.luogu.com.cn/discuss/1056262) hack 了。内容有修改。暂时通过了所有 hack。后缀排序应该还是对的。

### 思路

先在 $s$ 末尾加入极大字符。要找到 $(i,j)$ 使得 $s[1,i]+t[1,j-1]=s[1,i+j-1]$ 且 $t_j<s_{i+j}$。最小化第一个不同的位置 $i+j$，再最小化 $t$ 从 $j$ 开始的后缀**加上 $s$ 从 $i+1$ 开始的后缀**，再最小化 $s$ 中的位置 $i$。

先枚举 $j$，枚举 $s_{i+j}=c$ 且 $t_j<c$，（**$c$ 要枚举极大字符**），可以用 SAM 做子串定位找到最小的 $i$ 使得 $s[i+1,i+j]=t[1,j-1]+c$。然后对于相等的 $i+j$，预处理 $t$ 的后缀排序即可比较 $t$ 的两个后缀的字典序大小。但是问题出在这里，如果两个后缀短的是长的的前缀，那就需要比较 $s$ 的后缀的部分。要将 $s$ 中的部分拉到 $t$ 的后缀上比较，后文后缀都指 $t$ 的后缀。用 height 数组求两个后缀的 lcp 即可判断后缀是否为另一个的前缀。

要比较$i1+j1=i2+j2$ 的 $(i1,j1)$ 和 $(i2,j2)$ ，有 $j2>j1$。如果 $j2$ 开始的后缀不是 $j1$ 开始的后缀的前缀，就直接比较 $rk_{j1}$ 和 $rk_{j2}$。否则比较 $t[j1+m-j2+1,m]$ 和  $s[i2+1,i1]$，因为之前匹配，所以 $s[i2+1,i1]$ 是 $t$ 的前缀。如果从 $j1+m-j2+1$ 开始的后缀不是从 $1$ 开始的后缀的前缀，那比较 $rk_{j1+m-j2+1}$ 和 $rk_1$；否则两个串完全相等。

此时已经找到了最小的串，但是 $i$ 选取的位置可以往前。找到 $t$ 的最小循环节 $l$，用字符串哈希向前比较 $s[i-l+1,i]$ 是否等于 $t[1,l]$，如果相等就可以把 $i$ 向前挪 $l$。二分加速，二分将 $i$ 向前挪 $l\times mid$，要求 $s$ 每 $l$ 个一段都相等，即 $s[i-l\times mid+1,i-mid]=s[i-l\times (mid-1)+1,i]$。

用了 $O(n\log^2n)$ 的后缀排序，否则就 $O(n\log n)$。

### code

```cpp
int n,m,q;
char s[maxn],t[maxn];
int len[maxn],lnk[maxn];
int a[maxn][11];
int p=1,cur=1;
int pos[maxn];
void insert(int c){
	int nd=++cur;
	len[nd]=len[p]+1;
	pos[nd]=len[nd];
	while(p&&!a[p][c])a[p][c]=nd,p=lnk[p];
	if(!p){lnk[p=nd]=1;return ;}
	int q=a[p][c];
	if(len[p]+1==len[q])lnk[nd]=q;
	else{
		int cl=++cur;
		len[cl]=len[p]+1,lnk[cl]=lnk[q];
		memcpy(a[cl],a[q],sizeof(a[q]));
		lnk[nd]=lnk[q]=cl;
		while(p&&a[p][c]==q)a[p][c]=cl,p=lnk[p];
	}
	p=nd;
}
vector<int> e[maxn];
void dfs(int u){
	if(!pos[u])pos[u]=n+1;
	for(int v:e[u]){
		dfs(v);
		pos[u]=min(pos[u],pos[v]);
	}
}
int sa[maxn],rk[maxn],tmp[maxn],ht[maxn];
int st[20][maxn];
int calc(int l,int r){
	int k=__lg(r-l+1);
	return min(st[k][l],st[k][r-(1<<k)+1]);
}
bool chk(int i,int j){return rk[i]>rk[j]&&calc(rk[j]+1,rk[i])==m-j+1;}
int f[maxn],g[maxn];
int val[11],bas,pw[maxn];
mt19937 rnd(time(0));
int calcf(int l,int r){if(l>r)return 0;return (f[r]-f[l-1]*pw[r-l+1]%mod+mod)%mod;}
int calcg(int l,int r){if(l>r)return 0;return (g[r]-g[l-1]*pw[r-l+1]%mod+mod)%mod;}
void work(){
	n=read();q=read();scanf("%s",s+1);s[++n]='0'+10;
	for(int i=0;i<=10;i++)val[i]=rnd()%mod;bas=rnd()%mod;
	pw[0]=1;for(int i=1;i<=n;i++)pw[i]=pw[i-1]*bas%mod;
	for(int i=1;i<=n;i++)f[i]=(f[i-1]*bas+val[s[i]-'0'])%mod;
	for(int i=1;i<=n;i++)insert(s[i]-'0');
	for(int i=2;i<=cur;i++)e[lnk[i]].pb(i);
	dfs(1);
	while(q--){
		scanf("%s",t+1);m=strlen(t+1);
		for(int i=1;i<=m;i++)sa[i]=i,rk[i]=t[i]-'0'+1;
		for(int len=1;len<m;len<<=1){
			sort(sa+1,sa+m+1,[&](int u,int v){
				return rk[u]==rk[v]?rk[u+len]<rk[v+len]:rk[u]<rk[v];
			});
			for(int i=1;i<=m;i++)tmp[i]=rk[i];
			for(int i=1,v=0;i<=m;i++){
				if(tmp[sa[i]]==tmp[sa[i-1]]&&tmp[sa[i]+len]==tmp[sa[i-1]+len])rk[sa[i]]=v;
				else rk[sa[i]]=++v;
			}
		}
		ht[1]=0;
		for(int i=1,l=0;i<=m;i++){
			if(rk[i]==1)continue;
			if(l)l--;
			while(min(i+l,sa[rk[i]-1]+l)<=m&&t[i+l]==t[sa[rk[i]-1]+l])l++;
			ht[rk[i]]=l;
		}
		for(int i=1;i<=m;i++)st[0][i]=ht[i];
		for(int j=1;j<20;j++){
			for(int i=1;i+(1<<j)-1<=m;i++){
				st[j][i]=min(st[j-1][i],st[j-1][i+(1<<j-1)]);
			}
		}
		for(int i=1;i<=m;i++)g[i]=(g[i-1]*bas+val[t[i]-'0'])%mod;
		int p1=n+1,p2=m+1;
		for(int j=1,u=1;j<=m&&u;j++){
			for(int c=t[j]-'0'+1;c<=10;c++)if(a[u][c]){
				int i=pos[a[u][c]]-j;
				if(i+j<p1+p2)p1=i,p2=j;
				else if(i+j==p1+p2){
					if(!chk(p2,j)){
						if(rk[j]<=rk[p2])p1=i,p2=j;
					}
					else if(!chk(1,p2+m-j+1)){
						if(rk[1]<=rk[p2+m-j+1])p1=i,p2=j;
					}
					else p1=i,p2=j;
				}
			}
			u=a[u][t[j]-'0'];
		}
		int mm=m;
		for(int i=1;i<m;i++)if(m%i==0){
			if(calcg(1,m-i)==calcg(i+1,m)){mm=i;break;}
		}
		if(calcf(p1-mm+1,p1)==calcg(1,mm)){
			int l=1,r=p1/mm,res=0;
			while(l<=r){
				int mid=l+r>>1;
				if(calcf(p1-(mid-1)*mm+1,p1)==calcf(p1-mid*mm+1,p1-mm))l=mid+1,res=mid;
				else r=mid-1;
			}
			p1-=res*mm;
		}
		printf("%lld\n",min(n-1,p1));
	}
}

/*
3 1
102
101

10 1
0000110011
1100110011
*/
```

