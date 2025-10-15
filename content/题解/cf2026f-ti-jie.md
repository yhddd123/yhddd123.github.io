---
title: 'CF2026F 题解'
date: 2025-01-16 21:59:00
tags: [dp,数据结构]
published: true
hideInList: false
feature: 
isTop: false
---
[CF2026F](https://www.luogu.com.cn/problem/CF2026F)

### 思路

离线建出版本树，需要支持在两端加入删除并维护背包，形如 [[deque-shi-xian|deque]]。维护两个栈，一头一尾，分别维护背包，$O(V)$ 合并两个背包。复杂度 $(qV)$。

### code

```cpp
int q,idx,tot,cntq;
int rt[maxn],ans[maxn];
vector<pii> que[maxn];
vector<pair<int,pii>> e[maxn];
vector<pii> st,ed;
int f[maxn][maxv],g[maxn][maxv];
void addback(int p,int t){
	ed.pb({p,t});int tim=ed.size();
	for(int i=0;i<=maxv-10;i++)g[tim][i]=g[tim-1][i];
	for(int i=p;i<=maxv-10;i++)g[tim][i]=max(g[tim][i],g[tim-1][i-p]+t);
}
void addfront(int p,int t){
	st.pb({p,t});int tim=st.size();
	for(int i=0;i<=maxv-10;i++)f[tim][i]=f[tim-1][i];
	for(int i=p;i<=maxv-10;i++)f[tim][i]=max(f[tim][i],f[tim-1][i-p]+t);
}
void rebuild(){
	for(int tim=1;tim<=ed.size();tim++){
		auto[p,t]=ed[tim-1];
		for(int i=0;i<=maxv-10;i++)g[tim][i]=g[tim-1][i];
		for(int i=p;i<=maxv-10;i++)g[tim][i]=max(g[tim][i],g[tim-1][i-p]+t);
	}
	for(int tim=1;tim<=st.size();tim++){
		auto[p,t]=st[tim-1];
		for(int i=0;i<=maxv-10;i++)f[tim][i]=f[tim-1][i];
		for(int i=p;i<=maxv-10;i++)f[tim][i]=max(f[tim][i],f[tim-1][i-p]+t);
	}
}
void rebuildfront(){
	int pos=(ed.size()+1)/2;
	for(int i=0;i<pos;i++)st.pb(ed[i]);
	reverse(st.begin(),st.end());
	reverse(ed.begin(),ed.end());
	for(int i=1;i<=pos;i++)ed.pop_back();
	reverse(ed.begin(),ed.end());
	rebuild();
}
void rebuildback(){
	int pos=(st.size()+1)/2;
	for(int i=0;i<pos;i++)ed.pb(st[i]);
	reverse(ed.begin(),ed.end());
	reverse(st.begin(),st.end());
	for(int i=1;i<=pos;i++)st.pop_back();
	reverse(st.begin(),st.end());
	rebuild();
}
pii popfront(){
	if(!st.size())rebuildfront();
	pii p=st.back();st.pop_back();
	return p;
}
pii popback(){
	if(!ed.size())rebuildback();
	pii p=ed.back();ed.pop_back();
	return p;
}
int query(int v){
	int ans=0;
	for(int i=0;i<=v;i++)ans=max(ans,f[st.size()][i]+g[ed.size()][v-i]);
	return ans;
}
void dfs(int u){
	for(auto[v,id]:que[u])ans[id]=query(v);
	for(auto[v,p]:e[u]){
		if(!p.fi){
			pii w=popfront();
			dfs(v);
			addfront(w.fi,w.se);
		}
		else{
			addback(p.fi,p.se);
			dfs(v);
			popback();
		}
	}
}
void work(){
	q=read();rt[1]=idx=tot=1;
	while(q--){
		int opt=read();
		if(opt==1){
			int x=read();
			rt[++idx]=rt[x];
		}
		if(opt==2){
			int x=read(),p=read(),t=read();
			e[rt[x]].pb({++tot,{p,t}}),rt[x]=tot;
		}
		if(opt==3){
			int x=read();
			e[rt[x]].pb({++tot,{0,0}}),rt[x]=tot;
		}
		if(opt==4){
			int x=read(),p=read();
			que[rt[x]].pb({p,++cntq});
		}
	}
	dfs(1);
	for(int i=1;i<=cntq;i++)printf("%lld\n",ans[i]);
}
```

