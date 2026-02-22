---
title: 'P14316 题解'
date: 2025-11-18 22:33:31
tags: [题解,数据结构]
published: true
hideInList: false
feature: 
isTop: false
---
[P14316](https://www.luogu.com.cn/problem/P14316)

平衡！设 $n,q,a_i$ 同阶。

尝试找到支配对，形如一些最小的 $(l,r,x)$ 使得包含 $[l,r]$ 的询问 $x$ 可以存在。

对于右端点 $i$，考虑哪些 $j$ 和 $i$ 形成支配对。

若 $a_j\le a_i$，可以整除分块。对于 $\lfloor\frac{a_i}{l}\rfloor=\lfloor\frac{a_i}{r}\rfloor$ 的  $O(\sqrt n)$  个区间 $[l,r]$，只考虑 $a_j\in[l,r]$ 且 $j$ 最大的位置。

要维护值域上一个区间中最后一个出现的位置，即需要 $O(n)$ 次 $O(\sqrt n)$ 单点修改 和 $O(n\sqrt n)$ 次 $O(1)$ 区间求 max，[[dan-dian-xiu-gai-qu-jian-qu-max-de-gen-hao-ping-heng|根号平衡]]。如果直接维护 ST 表，从下往上第 $i$ 层要修改 $O(2^i)$ 个位置，一共 $O(n)$ 个位置。分块，块内块间分别建 ST 表，分别 $O(\sqrt n)$ 修改，可以 $O(1)$ 查询。

对于 $a_j>a_i$，可以根号分治。若 $a_i>\sqrt n$，$\frac{n}{a_i}\le \sqrt n$，可以直接枚举倍数 $k$，只考虑 $a_j\in [ka_i,(k+1)a_i)$ 且 $j$ 最大的位置。否则 $a_i\le \sqrt n$，只考虑 $j\in[pos_{a_i}+1,i-1]$ 的位置，其中 $pos_{a_i}$ 是 $a_i$ 上一次出现的位置，对于每个值只用把整个序列扫一遍。

现在有 $O(n\sqrt n)$ 个支配对。从左往右扫右端点，维护 $lst_x$ 表示 $x$ 出现的最小位置，加入在右端点的支配对 $(l,r,x)$，$lst_x$ 对 $l$ chkmx。用 $O(n\sqrt n)$ 次 $O(1)$ 单点加 和 $O(n)$ 次 $O(\sqrt n)$ 后缀求和维护所有左端点的答案。

单用任意一个做法，可以正反各扫一遍，但是存支配对需要 $O(n\sqrt n)$ 空间。

精细实现整除分块，在 $[1,\sqrt n]$ 分别枚举 $l$ 和 $\frac{a_i}{l}$，可以使除法次数减半。

```cpp
int n,m=400001,q,a[maxn];
vector<pii> ask[maxn];
int ans[maxn];
int lst[maxn],pos[maxn];
int addv[maxn],addb[maxm];
inline void upd(int p,int w){addv[p]+=w,addb[p/B]+=w;}
inline int que(int p){
	int id=p/B,ans=0;
	int pr=min(m,(id+1)*B);
	for(int i=p;i<pr;i++)ans+=addv[i];
	pr=m/B;
	for(int i=id+1;i<=pr;i++)ans+=addb[i];
	return ans;
}
inline void chk(int p,int w){
	if(lst[p]<w){
		upd(lst[p],-1),lst[p]=w,upd(lst[p],1);
	}
}
int stv[maxm][10][B+5],stb[10][maxm];
inline int quev(int id,int l,int r){
	int k=__lg(r-l+1);
	return max(stv[id][k][l],stv[id][k][r-(1<<k)+1]);
}
inline int queb(int l,int r){
	int k=__lg(r-l+1);
	return max(stb[k][l],stb[k][r-(1<<k)+1]);
}
inline int que(int l,int r){
	int idl=l/B,idr=r/B;
	if(idl==idr)return quev(idl,l-idl*B,r-idl*B);
	int res=0;
	res=max(res,quev(idl,l-idl*B,B-1));
	if(idl+1<=idr-1)res=max(res,queb(idl+1,idr-1));
	res=max(res,quev(idr,0,r-idr*B));
	return res;
}
void mdf(int p,int w){
	int id=p/B;p-=id*B;
	stv[id][0][p]=w;
	for(int i=1;i<10;i++){
		int pl=max(0,p-(1<<i)+1),pr=min(B-1-(1<<i)+1,p);
		for(int j=pl;j<=pr;j++)stv[id][i][j]=max(stv[id][i-1][j],stv[id][i-1][j+(1<<i-1)]);
	}
	stb[0][id]=quev(id,0,B-1);
	for(int i=1;i<10;i++){
		int pl=max(0,id-(1<<i)+1),pr=min(m/B-(1<<i)+1,id);
		for(int j=pl;j<=pr;j++)stb[i][j]=max(stb[i-1][j],stb[i-1][j+(1<<i-1)]);
	}
}
void work(){
	n=read();q=read();
	for(int i=1;i<=n;i++)a[i]=read();
	for(int i=1;i<=q;i++){
		int l=read(),r=read();
		ask[r].pb({l,i});
	}
	for(int i=1;i<=n;i++){
		mdf(a[i],i);
		for(int l=1;l*l<=a[i];l++){
			int x=a[i]/l;
			chk(x,pos[l]);
		}
		for(int x=1,r=a[i],l;x*x<=a[i];x++,r=l-1){
			l=a[i]/(x+1)+1;
			chk(x,que(l,r));
		}
		if(a[i]<=B){
			for(int j=pos[a[i]]+1;j<i;j++)chk(a[j]/a[i],j);
		}
		else{
			for(int k=0;k*a[i]<=m;k++)chk(k,que(k*a[i],min(m,(k+1)*a[i]-1)));
		}
		pos[a[i]]=i;
		chk(0,que(a[i]+1,m));
		for(auto[l,id]:ask[i])ans[id]=que(l);
	}
	for(int i=1;i<=q;i++)write(ans[i]),puts("");
}
```

