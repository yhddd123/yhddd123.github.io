---
title: 'P13574 题解'
date: 2025-08-31 20:36:35
tags: [题解,数学]
published: true
hideInList: false
feature: 
isTop: false
---
[P13574](https://www.luogu.com.cn/problem/P13574)

### 思路

最后的情况形如 $s_i=L$ 且 $s_{i+1}=R$。设 $[1,i-1]$ 的子弹不到达 $i$ 的概率为 $f_i$， $[i+1，n]$ 的子弹不到达 $i$ 的概率为 $g_i$，则 $ans_i=ans_{i+1}=n!\times f_i\times g_{i+1}$。

一个合法的排列要求子弹不到达最右侧，要求任意一个后缀的相对顺序中第一个人为向左。不断向前加人，计算后缀合法相对顺序的概率，$f_i=\prod_{j<i,s_j=L}\frac{i-j}{i-j+1}$。

取对数，将乘除转为加减，就是模 $mod-1$ 的卷积形式。[任意模数多项式乘法](https://www.luogu.com.cn/problem/P4245)，甚至因为有一边只有 0/1，fft 也能冲。

至于求 $1\sim n$ 模意义下的对数。直接 BSGS，$O(n\sqrt{mod})$。可以直接线性筛求质数的对数，$O(\frac{n\sqrt{mod}}{\ln n})$。不用重复预处理，$O(B)$ 预处理，$\frac{n}{\ln n}$ 次 $O(\frac{mod}{B})$ 的查询，$O(\sqrt{\frac{n\times mod}{\ln n}})$。这部分跟 [[ji-yu-zhi-yu-yu-chu-li-de-kuai-su-li-san-dui-shu|基于值域预处理的快速离散对数]] 的前半部分没什么区别，预处理 $1\sim \sqrt{mod}+1$ 的对数后可以 $O(\log{mod})$ 回答一次询问，复杂度 $O(\frac{mod^{\frac{3}{4}}}{\log^{\frac{1}{2}}mod}+\frac{n}{\ln n}\log {mod})$。

总之 $n$ 可以开到 $10^6$ ？

### code

```cpp
int n,ans[maxn];
char s[maxn];
const int maxm=1<<22;
struct hsh_table{
	int head[maxm],tot;
	struct nd{
		int nxt;
		int key;
		int val;
	}e[maxm];
	int hsh(int u){return u&(maxm-1);}
	bool find(int key){
		int u=hsh(key);
		for(int i=head[u];i;i=e[i].nxt){
			if(e[i].key==key)return 1;
		}
		return 0;
	}
	int &operator[](int key){
		int u=hsh(key);
		for(int i=head[u];i;i=e[i].nxt){
			if(e[i].key==key)return e[i].val;
		}
		e[++tot]={head[u],key,0};head[u]=tot;
		return e[tot].val;
	}
}mp;
int gg=3,B,bas;
int bsgs(int v){
	for(int i=0,mul=v;i<=mod/B;i++){
		if(mp.find(mul))return i*B+mp[mul];
		mul=1ll*mul*bas%mod;
	}
}
bool vis[maxn];
int pre[maxn],cnt;
int h[maxn];
namespace mtt{
int _mod=mod-1;
struct cp{
	db a,b;
	cp(db u=0,db v=0){a=u,b=v;}
	cp operator+(const cp&tmp)const{return {a+tmp.a,b+tmp.b};}
	cp operator-(const cp&tmp)const{return {a-tmp.a,b-tmp.b};}
	cp operator*(const cp&tmp)const{return {a*tmp.a-b*tmp.b,a*tmp.b+b*tmp.a};}
};
const db pi=acos(-1);
int to[maxn<<3];
void fft(vector<cp> &a,int flag){
	int n=a.size();
	for(int i=0;i<n;i++)if(i<to[i])swap(a[i],a[to[i]]);
	for(int l=2;l<=n;l<<=1){
		cp bas=cp(cos(2*pi/l),flag*sin(2*pi/l));
		int k=l>>1;
		for(int i=0;i<n;i+=l){
			cp mul=cp(1,0);
			for(int j=i;j<i+k;j++){
				cp val=mul*a[j+k];
				a[j+k]=a[j]-val,a[j]=a[j]+val;
				mul=mul*bas;
			}
		}
	}
	if(flag==-1){
		for(int i=0;i<n;i++)a[i].a/=n,a[i].b/=n;
	}
}
const int B=(1<<15)-1;
int calc(db x){return (long long)(x+0.5)%_mod;}
vector<int> mul(vector<int> a,vector<int> b){
	int n=a.size()-1,m=b.size()-1,k=1;
	while(k<n+m+1)k<<=1;
	for(int i=0;i<k;i++)to[i]=(to[i>>1]>>1)|((i&1)?(k>>1):0);
	vector<cp> f(k),g(k),h(k);
	for(int i=0;i<=n;i++)f[i]=cp(a[i]&B,0),g[i]=cp(a[i]>>15,0);
	for(int i=0;i<=m;i++)h[i]=cp(b[i]&B,b[i]>>15);
	fft(f,1),fft(g,1),fft(h,1);
	for(int i=0;i<k;i++)f[i]=f[i]*h[i],g[i]=g[i]*h[i];
	fft(f,-1),fft(g,-1);
	vector<int> ans(n+m+1);
	for(int i=0;i<=n+m;i++)ans[i]=(1ll*calc(f[i].a)+(1ll*(calc(f[i].b)+calc(g[i].a))<<15ll)%_mod+(1ll*calc(g[i].b)<<30ll)%_mod)%_mod;
	return ans;
}
}
int f[maxn],g[maxn];
void work(){
	scanf("%d%s",&n,s+1);B=sqrt(1ll*mod*n/log2(n)),bas=ksm(ksm(gg,B));
	for(int i=0,mul=1;i<B;i++){
		mp[mul]=i;
		mul=1ll*mul*gg%mod;
	}
	h[1]=0;for(int i=2;i<=n;i++){
		if(!vis[i])pre[++cnt]=i,h[i]=bsgs(i);
		for(int j=1;j<=cnt&&i*pre[j]<=n;j++){
			vis[i*pre[j]]=1,h[i*pre[j]]=(h[pre[j]]+h[i])%(mod-1);
			if(i%pre[j]==0)break;
		}
	}
	int fac=1;for(int i=1;i<=n;i++)fac=1ll*fac*i%mod;
	vector<int> a(n+1),b(n+1),c(n+1);
	for(int i=1;i<=n;i++)a[i]=(h[i]+mod-1-h[i+1])%(mod-1);
	for(int i=1;i<=n;i++)b[i]=(s[i]=='R');
	c=mtt::mul(a,b);
	for(int i=1;i<=n;i++)f[i]=ksm(gg,c[i]);
	for(int i=1;i<=n;i++)a[i]=(h[i]+mod-1-h[i+1])%(mod-1);
	reverse(s+1,s+n+1);
	for(int i=1;i<=n;i++)b[i]=(s[i]=='L');
	reverse(s+1,s+n+1);
	c=mtt::mul(a,b);
	for(int i=1;i<=n;i++)g[n-i+1]=ksm(gg,c[i]);
	for(int i=1;i<n;i++)if(s[i]=='L'&&s[i+1]=='R'){
		// int mul1=1,mul2=1;
		// for(int j=1;j<i;j++)if(s[j]=='R')mul1=mul1*(i-j)%mod*ksm(i-j+1)%mod;
		// for(int j=i+2;j<=n;j++)if(s[j]=='L')mul2=mul2*(j-i-1)%mod*ksm(j-i)%mod;
		// cout<<i<<" "<<mul1<<" "<<mul2<<" "<<f[i]<<" "<<g[i+1]<<"\n";
		ans[i]=ans[i+1]=1ll*fac*f[i]%mod*g[i+1]%mod;
	}
	if(s[1]=='R')ans[1]=1ll*fac*g[1]%mod;
	if(s[n]=='L')ans[n]=1ll*fac*f[n]%mod;
	for(int i=1;i<=n;i++)write(ans[i]),putchar(' ');
}
```

