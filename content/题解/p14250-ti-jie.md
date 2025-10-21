---
title: 'P14250 题解'
date: 2025-10-21 12:12:17
tags: [题解,交互]
published: true
hideInList: false
feature: 
isTop: false
---
[P14250](https://www.luogu.com.cn/problem/P14250)

一个全部顶满的做法。

### Solution

记 $a$ 的最大、次大、第三大值为 $mx$，$se$，$th$（可以相等）。

先问 $1\sim n$ 的链得到 $\sum a_i$。由于查询操作是离线的，尝试一下发现可以对每个 $i$ 问以 $i$ 为中心的菊花，得到 $ans_i$。这样恰好 $501$ 次 询问 操作。

显然 $ans_i$ 应当等于 $a_i$ 加除了 $a_i$ 以外 $a$ 的最大值和次大值，所以 $a_i\ge th$ 的位置的 $ans_i=mx+se+th$，其他 $ans_i=a_i+mx+se$。

称 $ans_i$ 最大的 $i$ 是不确定位置，把其他位置的 $ans_i$ 加起来，发现 $\sum ans_i=\sum a_i+(n-3)(mx+se)$，解出 $mx+se$ 后可以解出所有确定位置的 $a_i$，以及知道 $th$ 的值应当是什么。那猜测 $mx$ 和 $se$ 就是那个无法区分的值。

现在有 $num$ 个不确定位置，其中只有两个可能大，其余的都是 $th$，要找出这两个位置。

如果 $num\le 5$，则枚举二元组 $(i,j)$ 判断他们是不是最大次大。将确定位置连成链，$i$ 和 $j$ 分别放在两端，剩下的不确定位置全部挂在链中点，猜测直径是不是 $\sum a_i-(num-2)\times th$。此时直径一定取到了链，如果是则挂在中点的位置的值都是 $th$。这样就可以通过 $a_i$ 互不相等。

否则猜测操作应当是两次二分。仿照之前，做一条很长的链，然后在链中点挂一条短的，全部由未确定点组成的链，问直径是不是 $\sum a_i$ 减去短支链的长度。链中点应该是带权（只考虑不确定位置）的中点，短支链应当不能超过 $\frac{num}{3}-1$。这样在 $num\ge 6$ 时可以正确，在 $n$ 大的时候除了第一下只能变 $\frac{2}{3}$ 外都能二分。正好 $20$ 次。

上面是场上唐了。事实上，不要搞短支链，而是全部挂在链中点，就差不多可以正常二分了，$18$ 次。

### Code

```cpp
#define pb push_back
vector<vector<int>> U,V;
vector<int> e1,e2;
int n;
void add(int u){
	e1.clear(),e2.clear();
	for(int i=0;i<n;i++)if(i!=u)e1.pb(i),e2.pb(u);
	U.pb(e1),V.pb(e2);
}
vector<int> a;
bool vis[510];
void add(vector<int> id){
	for(int i=0;i<n;i++)vis[i]=0;
	for(int i:id)vis[i]=1;
	e1.clear(),e2.clear();
	int lst=-1,t=0,p=-1;
	for(int i=0;i<n;i++)if(!vis[i]){
		if(lst!=-1)e1.pb(lst),e2.pb(i);
		lst=i;
		t+=(!a[i]);
		if(p==-1&&t>id.size()+1)p=i;
	}
	e1.pb(p),e2.pb(id[0]);
	for(int i=1;i<id.size();i++)e1.pb(id[i-1]),e2.pb(id[i]);
}
int id[510];
vector<int> haru(int N){
mt19937 rnd(10);
	n=N;
	U.clear(),V.clear();
	for(int i=0;i<n;i++)add(i);
	e1.clear(),e2.clear();
	for(int i=0;i<n-1;i++)e1.pb(i),e2.pb(i+1);
	U.pb(e1),V.pb(e2);
	int k=U.size();
	vector<long long> ans=query(U,V);
	long long sum=ans[k-1];ans.pop_back();
	for(int i=0;i<n;i++)id[i]=i;
	sort(id,id+n,[&](int u,int v){return ans[u]<ans[v];});
	long long s=0;for(int i=0;i<n-2;i++)s+=ans[id[i]];
	long long v=(s-sum)/(n-3);
	a.clear();a.resize(n,0);
	int p=n-3;while(p&&ans[id[p-1]]==ans[id[n-1]])p--;
	for(int i=0;i<p;i++)a[id[i]]=ans[id[i]]-v;
	for(int i=p;i<n;i++)a[id[i]]=0;
	long long v3=ans[id[n-1]]-v;
	if(v==2*v3){
		for(int i=p;i<n;i++)a[id[i]]=v3;
		return a;
	}
	vector<int> pos;
	for(int i=0;i<n;i++)if(!a[i])pos.pb(i);
	shuffle(pos.begin(),pos.end(),rnd);
	int all=pos.size();
	if(all<=5){
		bool fl=0;
		for(int i=0;i<all;i++){
			for(int j=i+1;j<all;j++){
				e1.clear(),e2.clear();
				int p1=-1,p2=-1,p3=-1;
				for(int i=0;i<n;i++)if(a[i]){
					if(p1==-1)p1=i;
					else if(p2==-1)p2=i;
					if(p3!=-1)e1.pb(p3),e2.pb(i);
					p3=i;
				}
				e1.pb(pos[i]),e2.pb(p1),e1.pb(pos[j]),e2.pb(p3);
				for(int k=0;k<all;k++)if(i!=k&&j!=k)e1.pb(pos[k]),e2.pb(p2);
				if(guess(e1,e2,sum-v3*(all-2))){
					fl=1;
					a[pos[i]]=a[pos[j]]=-1;
					for(int k=0;k<all;k++)if(i!=k&&j!=k)a[pos[k]]=v3;
					break;
				}
			}
			if(fl)break;
		}
	}
	else{
		int tmp[2];tmp[0]=tmp[1]=-1;
		for(int t=0;t<2;t++){
			pos.clear();
			for(int i=0;i<n;i++)if(!a[i]&&i!=tmp[0])pos.pb(i);
			shuffle(pos.begin(),pos.end(),rnd);
			while(pos.size()>1){
				int p=min(all/3-1,(int)pos.size()/2);
				vector<int> tmp;
				for(int i=0;i<p;i++)tmp.pb(pos[i]);
				add(tmp);
				if(guess(e1,e2,sum-v3*p))pos.erase(pos.begin(),pos.begin()+p);
				else pos=tmp;
			}
			tmp[t]=pos[0];
		}
		a[tmp[0]]=a[tmp[1]]=-1;
	}
	for(int i=0;i<n;i++)if(!a[i])a[i]=v3;
	return a;
}
```

