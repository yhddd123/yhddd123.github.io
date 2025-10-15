---
title: 'P11519 题解'
date: 2025-01-07 17:23:15
tags: [题解,图论]
published: true
hideInList: false
feature: 
isTop: false
---
[P11519](https://www.luogu.com.cn/problem/P11519)

学习了这份[提交](https://qoj.ac/submission/445313)，记录一下。

### 思路

没有重复的加边，且所有边形成森林，所以答案等于至今为止所有的加边合并的连通块 $siz_u\times siz_v$，减去时刻 $s-t$ 及以前所有的删边合并的连通块 $siz_u\times siz_v$。要求强制在线维护连通块相关信息。

由于加边删边的特殊性，可以 $O(n\log^2 n)$ 启发式合并分裂。记录路径压缩的并查集祖先，set 维护每个点的边和每个并查集里的点。加边是正常的启发式合并并查集信息。分裂时只要保证枚举的点数为两个新连通块较小的一个就可以得到和启发式合并相同的复杂度。具体的，同时维护两个新连通块，往较小的一边拓展一个点直到有一边无法增加。为了防止枚举到菊花使一边增加过多的点，类似当前弧优化一次枚举一条边。两边用队列维护当前的点和出边的指针。分裂时当前连通块的祖先可能在点数小的一边，但是不能枚举点数多的一边修改，所以把祖先理解为并查集的编号，点数小的部分给一个全新的编号。
### code

```cpp
int n,q,op;ll ans,sum;
set<int> e[maxn],id[maxn<<1];
int fa[maxn],idx;
ll del[maxn*3];
struct node{
	int u,fa;
	set<int>::iterator it;
};
void work(){
	op=read();n=read();q=read();idx=n;
	for(int i=1;i<=n;i++)fa[i]=i,id[i].insert(i);
	for(int qq=1;qq<=q;qq++){
		del[qq]=del[qq-1];
		int opt=read();
		if(opt==1){
			ll u=read(),v=read();
			if(op)u^=ans,v^=ans;
			e[u].insert(v),e[v].insert(u);
			int uu=fa[u],vv=fa[v];
			sum+=1ll*id[uu].size()*id[vv].size();
			if(id[uu].size()<id[vv].size())swap(u,v),swap(uu,vv);
			for(int i:id[vv])fa[i]=uu,id[uu].insert(i);id[vv].clear();
		}
		if(opt==2){
			ll u=read(),v=read();
			if(op)u^=ans,v^=ans;
			e[u].erase(v),e[v].erase(u);
			vector<int> pos[2];
			queue<node> que[2];
			pos[0].pb(u),pos[1].pb(v);
			if(e[u].size())que[0].push({u,0,e[u].begin()});
			if(e[v].size())que[1].push({v,0,e[v].begin()});
			while(que[0].size()&&que[1].size()){
				int o=pos[1].size()<pos[0].size();
				auto[u,fa,it]=que[o].front();que[o].pop();
				int v=(*it);
				if(v!=fa){
					pos[o].pb(v);
					if(e[v].size())que[o].push({v,u,e[v].begin()});
				}
				it++;
				if(it==e[u].end())continue;
				if((*it)==fa)it++;
				if(it==e[u].end())continue;
				que[o].push({u,fa,it});
			}
			if(!que[0].size()&&(que[1].size()||pos[0].size()<pos[1].size())){
				swap(u,v),swap(pos[0],pos[1]);
			}
			del[qq]+=1ll*pos[1].size()*(id[fa[u]].size()-pos[1].size());
			++idx;
			for(int i:pos[1])id[fa[u]].erase(i),id[idx].insert(i),fa[i]=idx;
		}
		if(opt==3){
			int t=read();
			if(op)t^=ans;
			printf("%lld\n",ans=sum-del[qq-t]);
		}
	}
}
```