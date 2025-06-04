---
title: 'string'
date: 2024-11-29 21:50:55
tags: []
published: true
hideInList: false
feature: 
isTop: false
---
## #字符串

### kmp

```cpp
char s[maxn],q[maxn];
int n,m,nxt[maxn];
int main(){
	scanf("%s%s",s+1,q+1);n=strlen(s+1),m=strlen(q+1);
	for(int i=2,j=0;i<=m;i++){
		while(j&&q[i]!=q[j+1])j=nxt[j];
		if(q[i]==q[j+1])j++;
		nxt[i]=j;
	}
	for(int i=1,j=0;i<=n;i++){
		while(j&&s[i]!=q[j+1])j=nxt[j];
		if(s[i]==q[j+1])j++;
		if(j==m){
			printf("%d\n",i-m+1);
			j=nxt[j];
		}
	}
	for(int i=1;i<=m;i++)printf("%d ",nxt[i]);
}
```

### manacher

```cpp
int n,ans;
char s[maxn],a[maxn<<1];
int len[maxn<<1];
void change(){
	a[0]='#';a[1]='#';
	for(int i=1;i<=n;i++)a[i<<1]=s[i],a[i<<1|1]='#';
	n=n<<1|1;
}
void manacher(){
	int maxr=0,mid=0;
	for(int i=1;i<=n;i++){
		if(i<maxr)len[i]=min(len[mid*2-i],len[mid]+mid-i);
		else len[i]=1;
		while(a[i+len[i]]==a[i-len[i]])++len[i];
		if(len[i]+i>maxr){
			maxr=len[i]+i;
			mid=i;
		}
	}
}
signed main(){
	scanf("%s",s+1);n=strlen(s+1);
	change();manacher();
	for(int i=1;i<=n;i++)ans=max(ans,len[i]);
	printf("%d",ans-1);
}
```

### Z 函数

```cpp
int n,z[maxn];
char s[maxn];
void work(){
	scanf("%s",s);n=strlen(s);
	for(int i=1,l=0,r=0;i<n;i++){
		z[i]=max(0ll,min(z[i-l],r-i+1));
		while(i+z[i]<n&&s[z[i]]==s[i+z[i]])z[i]++;
		if(i+z[i]-1>r)l=i,r=i+z[i]-1;
	}
	for(int i=0;i<n;i++)printf("%lld ",z[i]);
}
```

### [[sam-zuo-ti-ji-lu|SAM]]

```cpp
int n,ans;
char s[maxn];
int len[maxn],lnk[maxn];
int a[maxn][26];
int p=1,cur=1;
int siz[maxn];
void insert(int c){
	int nd=++cur;
	len[nd]=len[p]+1;siz[nd]=1;
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
int head[maxn],tot;
struct nd{
	int nxt,to;
}e[maxn];
void add(int u,int v){e[++tot]={head[u],v};head[u]=tot;}
void dfs(int u){
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;
		dfs(v),siz[u]+=siz[v];
	}
}
void work(){
	scanf("%s",s+1),n=strlen(s+1);
	for(int i=1;i<=n;i++)insert(s[i]-'a');
	for(int i=2;i<=cur;i++)add(lnk[i],i);
	dfs(1);
	for(int i=2;i<=cur;i++)if(siz[i]>1)ans=max(ans,siz[i]*len[i]);
	printf("%lld\n",ans);
}
```

### 带通配符字符串匹配

^5a3229

ntt 部分略。要求 $n$ 不能过大，否则使用 fft。

```cpp
int n,m;
char s[maxn],t[maxn];
int f[maxn],g[maxn],res[maxn];
vector<int> ans;
void work(){
	m=read();n=read();
	scanf("%s%s",t,s);
	reverse(t,t+m);
	int lim=1;while(lim<n)lim<<=1;
	for(int i=0;i<lim;i++)to[i]=(to[i>>1]>>1)|((i&1)?lim>>1:0);
	for(int i=0;i<m;i++)if(t[i]!='*')f[i]=(t[i]-'a')*(t[i]-'a');
	for(int i=0;i<n;i++)if(s[i]!='*')g[i]=1;
	ntt(f,lim,1),ntt(g,lim,1);
	for(int i=0;i<lim;i++)res[i]=f[i]*g[i]%mod,f[i]=g[i]=0;
	for(int i=0;i<m;i++)if(t[i]!='*')f[i]=t[i]-'a';
	for(int i=0;i<n;i++)if(s[i]!='*')g[i]=s[i]-'a';
	ntt(f,lim,1),ntt(g,lim,1);
	for(int i=0;i<lim;i++)(res[i]+=mod-2*f[i]*g[i]%mod)%=mod,f[i]=g[i]=0;
	for(int i=0;i<m;i++)if(t[i]!='*')f[i]=1;
	for(int i=0;i<n;i++)if(s[i]!='*')g[i]=(s[i]-'a')*(s[i]-'a');
	ntt(f,lim,1),ntt(g,lim,1);
	for(int i=0;i<lim;i++)(res[i]+=f[i]*g[i])%=mod,f[i]=g[i]=0;
	ntt(res,lim,-1);
	for(int i=m-1;i<n;i++)if(!res[i])ans.pb(i-m+2);
	printf("%lld\n",(int)ans.size());
	for(int i:ans)printf("%lld ",i);
}
```
