---
title: 'P11175 题解'
date: 2024-10-29 22:23:34
tags: [题解,数学]
published: true
hideInList: false
feature: 
isTop: false
---
### [【模板】基于值域预处理的快速离散对数](https://www.luogu.com.cn/problem/P11175)

记使得 $g^x\equiv n\pmod{mod}$ 的最小非负 $x$ 为 $\log n$，有 $\log ab=\log a+\log b$。

令 $n=\sqrt{mod}+1$，预处理 $n$ 以内的 $\log x$。线性筛，只需要 bsgs 求出 $n$ 以内 $\frac{n}{\ln n}$ 个质数的 $\log p$，就可以 $O(n)$ 求出 $n$ 以内所有 $\log x$。哈希表，预处理时 $B$ 次插入，$\frac{n}{\ln n}$ 次 $\frac{mod}{B}$ 的查询，取 $B=\sqrt{\frac{n\times mod}{\ln n}}$。

查询 $\log a$ 时，如果 $a\le \sqrt{mod}+1$ 直接得出，否则有 $b\times a+c=mod$，$b\le \sqrt{mod}$。$\log a=\log \frac{-c}{b}=\log(c\times -1)-\log b=\log (mod-1)+\log c-\log b$。又因为有 $(b+1)\times a+c=mod+a$，$\log a=\log \frac{a-c}{b+1}=\log(a-c)-\log (b+1)$。$\log b$ 或 $\log(b+1)$ 已知，$\log (mod-1)$ 提前算，$\min(c,a-c)\le \frac{a}{2}$，选 $c$ 和 $a-c$ 较小的一边递归可以做到 $\log {mod}$ 查询。

复杂度 $O(\frac{mod^{\frac{3}{4}}}{\log^{\frac{1}{2}}mod}+q\log {mod})$

### code

```cpp
int mod,g,n,q;
int inc(int u,int v){((u+=v)>=mod-1)&&(u-=mod-1);return u;}
inline int ksm(int a,int b=mod-2){
	int ans=1;
	while(b){
		if(b&1)ans=1ll*ans*a%mod;
		a=1ll*a*a%mod;
		b>>=1;
	}
	return ans;
}
int B,bas,h0;
struct hsh_table{
	int head[maxn],tot;
	struct nd{
		int nxt;
		int key;
		int val;
	}e[maxn];
	int hsh(int u){return u%maxn;}
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
	void clear(){
		tot=0;
		for(int i=0;i<maxn;i++)head[i]=0;
	}
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
	bas=ksm(ksm(g,B));
	h0=bsgs(mod-1);
	h[1]=0;
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