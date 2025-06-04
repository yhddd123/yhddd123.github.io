---
title: 'P5996 题解'
date: 2023-12-31 17:21:37
tags: [题解,网络流]
published: true
hideInList: false
feature: 
isTop: false
---
### [P5996](https://www.luogu.com.cn/problem/P5996)

网络流。同 [P2762 太空飞行计划问题](https://www.luogu.com.cn/problem/P2762) 建图方式，将物品与 $s$ 连 $(s,i,v_i)$，警察与 $t$ 连 $(j+n,t,v_j)$，警察与对应的物品连 $(i,j+n,inf)$，答案为所有物品的收益和减最小割。割 $s,i,v_i$ 表示不选物品，收益减 $v_i$；割 $j+n,t,v_j$ 表示贿赂警察，收益减 $v_j$；警察与对应的物品的连边永远不被割，表示要么放弃物品要么贿赂警察。

$n,m\leq 10^5$，显然跑不了网络流。考虑模拟最大流。

首先要描述警察 $j$ 与物品 $i$ 的关系。要满足：

$$\mid \frac{x_i-x_j}{y_i-y_j} \mid \leq \frac{w}{h}$$

$$x_j\times h-y_j\times w\leq x_i\times h-y_i\times w$$

$$x_j\times h+y_j\times w\geq x_i\times h+y_i\times w$$

令 $x=x\times h+y\times w,y=x\times h-y\times w$。得到 $x_i\leq x_j,y_i\geq y_j$ ，能很好描述。

将物品和警察放在一起从左到右，从上到下考虑，自然满足 $x_i\leq x_j$。贪心，一个警察 $j$ 的流优先从 $y_i\geq y_j$ 且 $y_i$ 最小处流过来，因为更大的 $y_i$ 能满足更多人限制。用 set 储存物品，警察处 lower_bound 查找。set 的 erase 函数会返回删去的值的下一个的迭代器。

### code

```cpp
int n,m,w,h,ans;
struct nd{
	int x,y,v,op;
}a[maxn];
bool cmp(nd u,nd v){
	if(u.x!=v.x)return u.x<v.x;
	return u.y>v.y;
}
set<pii> s;
void work(){
	n=read();m=read();w=read();h=read();
	for(int i=1;i<=n;i++){
		int u=read(),v=read(),val=read();
		a[i]={u*h+v*w,u*h-v*w,val,1};ans+=a[i].v;
	}
	for(int i=1;i<=m;i++){
		int u=read(),v=read(),val=read();
		a[i+n]={u*h+v*w,u*h-v*w,val,0};
	}
	sort(a+1,a+n+m+1,cmp);
	for(int i=1;i<=n+m;i++){
		if(a[i].op)s.insert({a[i].y,a[i].v});
		else{
			auto it=s.lower_bound({a[i].y,0});
			while(a[i].v){
				if(it==s.end())break;
				pii p=*it;it=s.erase(it);
				int d=min(a[i].v,p.second);
				a[i].v-=d;p.second-=d;ans-=d;
				if(p.second)s.insert(p);
			}
		}
	}
	printf("%lld\n",ans);
}
```