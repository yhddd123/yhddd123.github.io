---
title: 'math'
date: 2024-11-29 21:50:55
tags: []
published: true
hideInList: false
feature: 
isTop: false
---
## #数学 

### 拉格朗日插值

$O(n^2)$。支持 $O(n)$ 插入一项。

连续值域 $O(n)$。

求系数撤销背包 $O(n^2)$。

```cpp
void work(){
	n=read();k=read();
	for(int i=1;i<=n;i++)x[i]=read(),y[i]=read();
	// for(int i=1;i<=n;i++){
		// int mul=y[i];
		// for(int j=1;j<=n;j++)if(i!=j){
			// mul=mul*(k-x[j]+mod)%mod*ksm(x[i]-x[j]+mod)%mod;
		// }
		// (ans+=mul)%=mod;
	// }
    int g=1;
	for(int i=1;i<=n;i++){
		g=g*(k-x[i]+mod)%mod;
		t[i]=y[i];for(int j=1;j<i;j++)t[i]=t[i]*ksm(x[i]-x[j]+mod)%mod;
		for(int j=1;j<i;j++)t[j]=t[j]*ksm(x[j]-x[i]+mod)%mod;
	}
	
	// pre[0]=x;for(int i=1;i<=n;i++)pre[i]=pre[i-1]*(x-i)%mod;
	// suf[n]=x-n;for(int i=n-1;~i;i--)suf[i]=suf[i+1]*(x-i)%mod;
	// int val=0;
	// for(int i=0;i<=n;i++){
		// (val+=y[i]*(i?pre[i-1]:1)%mod*(i<n?suf[i+1]:1)*inv[i]%mod*inv[n-i]%mod*(((n-i)&1)?mod-1:1))%=mod;
	// }
	
	for(int i=1;i<=n;i++)(ans+=t[i]*ksm(k-x[i]+mod))%=mod;ans=ans*g%mod;
	printf("%lld\n",ans);
}
```

### 矩阵求逆

将要求的矩阵和单位矩阵放一起，对左边进行变换弄成单位矩阵，右边为所求。

```cpp
void work(){
	n=read();
	for(int i=1;i<=n;i++){
		for(int j=1;j<=n;j++)a[i][j]=read();a[i][i+n]=1;
	}
	for(int i=1;i<=n;i++){
		if(!a[i][i]){
			for(int j=i+1;j<=n;j++)if(a[j][i]){
				swap(a[i],a[j]);
				break;
			}
		}
		if(!a[i][i]){puts("No Solution");return ;}
		int inv=ksm(a[i][i]);
		for(int j=1;j<=n;j++)if(i!=j){
			int d=a[j][i]*inv%mod;
			for(int k=i;k<=(n<<1);k++)(a[j][k]+=mod-a[i][k]*d%mod)%=mod;
		}
		for(int j=i;j<=(n<<1);j++)a[i][j]=a[i][j]*inv%mod;
	}
	for(int i=1;i<=n;i++){
		for(int j=n+1;j<=(n<<1);j++)printf("%lld ",a[i][j]);puts("");
	}
}
```

### [[p11175-ti-jie|快速离散对数]]

$O(\frac{mod^{0.75}}{\log^{0.5}mod}+q\log {mod})$。

```cpp
int mod,g,n,q;
int B,bas,h0;
struct hsh_table{
}mp;
int bsgs(int v){
	int mul=v;
	for(int i=0;i<=mod/B;i++){
		if(mp.find(mul))return i*B+mp[mul];
		mul=1ll*mul*bas%mod;
	}
}
/*
mod=ba+c
log(a)=log(-c)-log(b)=log(mod-1)+log(c)-log(b)
log(a)=log(a-c)-log(b+1)
min(c,a-c)<=a/2
*/
int h[maxn];
int sovle(int a){
	int b=mod/a,c=mod%a;
	if(a<=n)return h[a];
	if(c<a-c)return inc(inc(h0,sovle(c)),(mod-1-h[b]));
	else return inc(sovle(a-c),mod-1-h[b+1]);
}
bool vis[maxn];
int pre[maxn],cnt;
void work(){
	mod=read();g=read();n=sqrt(mod)+1;B=sqrt(1ll*mod*n/log2(n));
	// cout<<n<<" "<<B<<"\n";
	int mul=1;for(int i=0;i<B;i++){
		mp[mul]=i;
		mul=1ll*mul*g%mod;
	}
	bas=ksm(ksm(g,B));h0=bsgs(mod-1);h[1]=0;
	for(int i=2;i<=n;i++){
		if(!vis[i]){
			h[i]=bsgs(i);
			pre[++cnt]=i;
		}
		for(int j=1;j<=cnt&&1ll*i*pre[j]<=n;j++){
			vis[i*pre[j]]=0;
			h[i*pre[j]]=(h[i]+h[pre[j]])%(mod-1);
			if(i%pre[j]==0)break;
		}
	}
	q=read();
	while(q--){
		int x=read();
		printf("%lld\n",sovle(x));
	}
}
```

---

### poly

#### fft

```cpp
struct cp{
	db a,b;
	cp(db u=0,db v=0){a=u,b=v;}
	cp operator+(const cp&tmp)const{return cp(a+tmp.a,b+tmp.b);}
	cp operator-(const cp&tmp)const{return cp(a-tmp.a,b-tmp.b);}
	cp operator*(const cp&tmp)const{return cp(a*tmp.a-b*tmp.b,a*tmp.b+b*tmp.a);}
}a[maxn<<1],b[maxn<<1],c[maxn<<1];
int to[maxn<<1];
void fft(cp *a,int flag){
	for(int i=0;i<n;i++)if(i<to[i])swap(a[i],a[to[i]]);
	for(int len=2;len<=n;len<<=1){
		cp bas=cp(cos(2*pi/len),flag*sin(2*pi/len));
		for(int i=0;i<n;i+=len){
			cp mul=cp(1,0);
			for(int j=i;j<i+(len>>1);j++){
				cp val=mul*a[(len>>1)+j];
				a[(len>>1)+j]=a[j]-val;
				a[j]=a[j]+val;
				mul=mul*bas;
			}
		}
	}
}
void work(){
	n=read();m=read();
	for(int i=0;i<=n;i++)a[i].a=read();
	for(int i=0;i<=m;i++)b[i].a=read();
	m+=n;n=1;while(n<=m)n<<=1;
	for(int i=0;i<n;i++)to[i]=(to[i>>1]>>1)|((i&1)?(n>>1):0);
	fft(a,1);fft(b,1);
	for(int i=0;i<n;i++)c[i]=a[i]*b[i];
	fft(c,-1);
	for(int i=0;i<=m;i++)printf("%lld ",(int)(c[i].a/n+0.5));
}
```

#### ntt

```cpp
void inc(int &u,int v){((u+=v)>=mod)&&(u-=mod);}
namespace poly{
	inline int ksm(int a,int b=mod-2){
		int ans=1;
		while(b){
			if(b&1)ans=ans*a%mod;
			a=a*a%mod;
			b>>=1;
		}
		return ans;
	}
	int gg=3,invg=ksm(gg);
	int to[maxn];
	vector<int> ntt(vector<int> a,int flag){
		int n=a.size();
		for(int i=0;i<n;i++)if(i<to[i])swap(a[i],a[to[i]]);
		for(int len=2;len<=n;len<<=1){
			int bas=ksm(flag==1?gg:invg,(mod-1)/len),l=len>>1;
			for(int i=0;i<n;i+=len){
				int mul=1;
				for(int j=i;j<i+l;j++){
					int val=mul*a[j+l]%mod;
					inc(a[j+l]=a[j],mod-val);
					inc(a[j],val);
					mul=mul*bas%mod;
				}
			}
		}
		if(flag==-1){
			int inv=ksm(n);
			for(int i=0;i<n;i++)a[i]=a[i]*inv%mod;
		}
		return a;
	}
	vector<int> mul(vector<int> a,vector<int> b){
		int n=a.size()-1,m=b.size()-1;int k=1;
		while(k<n+m+1)k<<=1;
		vector<int> f(k),g(k);
		for(int i=0;i<=n;i++)f[i]=a[i];
		for(int i=0;i<=m;i++)g[i]=b[i];
		for(int i=0;i<k;i++)to[i]=(to[i>>1]>>1)|((i&1)?(k>>1):0);
		f=ntt(f,1),g=ntt(g,1);
		for(int i=0;i<k;i++)f[i]=f[i]*g[i]%mod;
		f=ntt(f,-1);f.resize(n+m+1);
		return f;
	}
}
using ploy::mul;
```

#### mtt

$5$ 次 fft。

```cpp
struct cp{
	db a,b;
	cp(db u=0,db v=0){a=u,b=v;}
	cp operator+(const cp&tmp)const{return {a+tmp.a,b+tmp.b};}
	cp operator-(const cp&tmp)const{return {a-tmp.a,b-tmp.b};}
	cp operator*(const cp&tmp)const{return {a*tmp.a-b*tmp.b,a*tmp.b+b*tmp.a};}
};
const db pi=acos(-1);
int to[maxn<<2];
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
int calc(db x){return (int)(x+0.5)%mod;}
vector<int> mtt(vector<int> a,vector<int> b){
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
	for(int i=0;i<=n+m;i++)ans[i]=(calc(f[i].a)+((calc(f[i].b)+calc(g[i].a))<<15)%mod+(calc(g[i].b)<<30)%mod)%mod;
	return ans;
}
```

