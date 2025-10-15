---
title: 'P12729 题解'
date: 2025-06-10 12:40:18
tags: [题解,字符串]
published: true
hideInList: false
feature: 
isTop: false
---
[P12729](https://www.luogu.com.cn/problem/P12729)

### 思路

记前缀和 $sum_i$ 表示 $i$ 及之前左括号减右括号的数量。判断 $[l,r]$ 是合法的括号序列，等价于 $sum_{l-1}=sum_r$ 且 $\min_{i=l}^r sum_i\ge sum_{l-1}$。

枚举答案在 $A$ 上的左端点 $l$，计算 $A$ 从 $l$ 开始的后缀与 $B$ 的最长公共子串的长度 $len$。此时 $r\le l+len-1$ 的 $A[l,r]$ 是两串的公共子串，二分在范围内且 $sum_{l-1}=sum_r$ 且 小于第一个 $sum_p<sum_{l-1}$ 的 $p$ 的最大的 $r$。

对于 $l$ 求 $l+len-1$，可以用 [[sam-zuo-ti-ji-lu#^a43ccc|求两串最长公共子串]] 的过程。反转 $B$ 建 SAM，反转 $A$ 倒序与 $B$ 匹配，匹配到 $l$ 时匹配的长度即为 $len$。

考虑把剩下的也弄成线性。合法括号序列的限制可以看成：按 $sum_i$ 从小到大依次把点染黑，染黑一个点前求右边第一个黑点的位置。反过来做用双向链表维护。同时处理 $sum$ 相同的点，首先第一个 $sum_p<sum_{l-1}$ 的 $p$ 有单调性，其次 $l+len-1$ 也有单调性，扫一遍即可。

复杂度 $O(n)$，字符集大小为 $2$ 就忽略了。

### code

```cpp
int n,m,ans;
char s[maxn],t[maxn];
int lnk[maxn],len[maxn];
int a[maxn][2];
int p=1,cur=1;
void insert(int c){
	int nd=++cur;
	len[nd]=len[p]+1;
	while(p&&!a[p][c])a[p][c]=nd,p=lnk[p];
	if(!p){lnk[p=nd]=1;return ;}
	int q=a[p][c];
	if(len[q]==len[p]+1)lnk[nd]=q;
	else{
		int cl=++cur;
		len[cl]=len[p]+1,lnk[cl]=lnk[q];
		a[cl][0]=a[q][0],a[cl][1]=a[q][1];
		lnk[nd]=lnk[q]=cl;
		while(p&&a[p][c]==q)a[p][c]=cl,p=lnk[p];
	}
	p=nd;
}
void go(int &p,int c,int &l){
	while(1){
		if(a[p][c]){
			p=a[p][c],l++;
			break;
		}
		if(!l)break;
		l--;
		if(l==len[lnk[p]])p=lnk[p];
	}
}
int sum[maxn],to[maxn];
vector<int> pos[maxn];
int pre[maxn],nxt[maxn];
void del(int p){
	int p1=pre[p],p2=nxt[p];
	nxt[p1]=p2,pre[p2]=p1;
}
void work(){
	scanf("%s%s",s+1,t+1);n=strlen(s+1),m=strlen(t+1);ans=0;
	for(int i=1;i<=cur;i++)lnk[i]=len[i]=a[i][0]=a[i][1]=0;p=cur=1;
	for(int i=m;i;i--)insert(t[i]==')');
	for(int i=n,nd=1,l=0;i;i--){
		go(nd,s[i]==')',l);
		to[i]=i+l-1;
	}
	sum[0]=n;for(int i=1;i<=n;i++)sum[i]=sum[i-1]+(s[i]=='(')*2-1;
	for(int i=0;i<=2*n;i++)pos[i].clear();
	for(int i=0;i<=n;i++)pos[sum[i]].pb(i);
	for(int i=1;i<=n;i++)nxt[i]=i+1,pre[i]=i-1;
	nxt[0]=1,pre[0]=0,nxt[n+1]=n+1,pre[n+1]=n;
	for(int i=2*n;~i;i--)if(pos[i].size()){
		for(int j=pos[i].size()-1;~j;j--)del(pos[i][j]);
		for(int j=0,k;j<pos[i].size();){
			k=j;
			while(k<pos[i].size()&&pos[i][k]<nxt[pos[i][j]])k++;
			if(j==k)j++;
			int l=j;
			while(j<k){
				while(l<k&&pos[i][l]<=to[pos[i][j]+1])l++;
				if(j<l)ans=max(ans,min(pos[i][k-1],pos[i][l-1])-pos[i][j]);
				j++;
			}
		}
	}
	printf("%d\n",ans);
}
```

