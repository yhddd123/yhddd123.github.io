---
title: 'The 3rd Universal Cup 做题记录 (2)'
date: 2024-10-18 21:49:38
tags: [做题记录,acm]
published: true
hideInList: false
feature: 
isTop: true
---
The 3rd Universal Cup 做题记录

Stage 0 - Stage 9：[[the-3rd-universal-cup-zuo-ti-ji-lu-1|The 3rd Universal Cup 做题记录 (1)]]

Stage 10 - Stage 19：[[the-3rd-universal-cup-zuo-ti-ji-lu-2|The 3rd Universal Cup 做题记录 (2)]]]]

[Stage 10: West Lake](https://qoj.ac/contest/1803) ACDGHKL

[Stage 11: Sumiyosi](https://qoj.ac/contest/1804) ABCHIKLMO

[Stage 12: Qinhuangdao](https://qoj.ac/contest/1807) ABCDEGHKLM

[Stage 13: Sendai](https://qoj.ac/contest/1812) BCDEFGHIKMO

[Stage 14: Harbin](https://qoj.ac/contest/1817) ABCDEGJKLM

[Stage 15: Chengdu](https://qoj.ac/contest/1821) ABCDEGIJKL

[Stage 16: Nanjing](https://qoj.ac/contest/1828) BCEFGIJKM

[Stage 17: Jinan](https://qoj.ac/contest/1843) ABCDEFIJL

## [The 3rd Universal Cup. Stage 10: West Lake](https://qoj.ac/contest/1803)

### [A. Italian Cuisine](https://contest.ucup.ac/contest/1803/problem/9434)

复制一遍，枚举 $i$ 维护右端点 $j$。要求 $(x,y)$ 到过 $(a_i,b_i),(a_j,b_j)$ 的直线距离大于 $r$ 或 等于 $r$ 且交点不在线段上，即 $\angle OIJ$ 和 $\angle OJI$ 至少一个为钝角，即两个向量的数量积小于零。要求 $(a_i,b_i),(x,y),(a_j,b_j)$ 的夹角和 $(a_i,b_i),(x,y),(a_{j-1},b_{j-1})$ 的夹角同正负，即两个向量的叉积同正负。三点坐标求面积 $S=\frac{\lvert x1y2+x2y3+x3y1-x1y3-x2y1-x3y2\rvert}{2}$。 ^b0e69e

### [C. Permutation](https://contest.ucup.ac/contest/1803/problem/9432)

大概在 $\frac{2}{3}n\log n$ 级别。线段树维护区间 $[l,r]$ 有什么数，每次随机取出两个数，将左半边设为 $u$，右半边设为 $v$ 询问。如果 $ans=0/2$ 可以将 $u,v$ 放入左右儿子，否则如果这是第一次，就把 $u,v$ 放回去重来，否则一定找得到一个数 $x$，将某半边设为 $x$ 再问一遍。理论上是 $\frac{3}{4}n\log n$，加上剪枝次数就差不多刚好了，偶尔会超。

![](https://yhddd123.github.io/post-images/1729259469582.png)

upd：正解是已知 $u,v$ 在同半边后并查集将 $u,v$ 当作一个点继续做。

### [D. Collect the Coins](https://contest.ucup.ac/contest/1803/problem/9427)

按 $t_i$ 排序，二分答案 $x$。设 $dp_{i,j}$ 为前 $i$ 个询问，另一个人在询问 $j$。如果 $\lvert p_i-p_{i-1}\rvert\le x\times (t_i-t_{i-1})$，$dp_{i,j}$ 继承 $dp_{i-1,j}$。然后再考虑 $j$ 更新 $dp_{i,i-1}$。拆绝对值有 $p_i+xt_i\ge p_j+xt_j$ 且 $p_i-ct_i\le p_j-xt_j$。维护对应的 $mn$ 和 $mx$ 即可。

### [G. Stop the Castle 2](https://qoj.ac/contest/1803/problem/9424)

优先破坏两对车的障碍。枚举障碍，如果一个障碍能破坏一横一竖两对车，连边二分图匹配。其余的一次断一队车，set 维护是否存在一横或一竖相邻的车。

### [H. Intersection of Paths](https://qoj.ac/contest/1803/problem/9416)

按 $k$ 从大往小回答，不断加入两端的 siz 较小值符合 $k$ 的边。动态修改边权求直径。直径表示为欧拉序上连续的 $u,v,w$ 的 $dis_u-2dis_v+dis_w$，线段树维护区间加和式子的部分的最大值。

### [K. Palindromic Polygon](https://contest.ucup.ac/contest/1803/problem/9417)

复制一遍，设 $dp_{i,j,0/1/2}$ 为区间 $[i,j]$ 中选了 $i,j$ 且是回文串、除了 $i$ 是回文串，除了 $j$ 是回文串的最大面积。

### [L. Cosmic Travel](https://qoj.ac/contest/1803/problem/9411)

建 trie 树，对于每个节点求出异或上所有 $j\in [0,2^d)$ 的 前 $k\le siz$ 的和，可以由左右儿子推知。询问时在 $l,r$ 覆盖整个 $[0,2^d)$ 时回答。复杂度 $O(n\log V)$。

## [The 3rd Universal Cup. Stage 11: Sumiyosi](https://qoj.ac/contest/1804)

### [A. Welcome to NPCAPC](https://qoj.ac/contest/1804/problem/9435)

矩阵快速幂，预处理 $2^i$ 处的矩阵。

### [B. Some Sum of Subset](https://qoj.ac/contest/1804/problem/9436)

倒序背包，在第一次 $>m$ 处统计答案。预处理有 $i$ 个可以任选对 $j<i$ 的贡献系数。

### [C. Solve with Friends](https://qoj.ac/contest/1804/problem/9437)

枚举 A 做几个，预处理前缀和，按 $a_i-b_i$ 排序依次把 B 做改为 A 做。

### [H. Music Game](https://qoj.ac/contest/1804/problem/9442)

期望做 $\prod \frac{1}{p_i}$ 次，每个前缀都有概率失败，失败有代价。按 $t_u*(1-p_u)+(t_u+t_v)*p_u<t_v*(1-p_v)+(t_u+t_v)*p_v$ 排序。

### [I. Left Equals Right](https://qoj.ac/contest/1804/problem/9443)

直接 dp 前 $i$ 个选 $j$ 个和为 $s$，左右随便排列。

### [K. Peace with Magic](https://qoj.ac/contest/1804/problem/9445)

设 $dp_{i,j}$ 为前 $i$ 个，$h_i=j$ 的代价。前后缀 min 转移。

### [L. Construction of Town](https://qoj.ac/contest/1804/problem/9446)

先连成菊花，然后 $[2,n]$ 中两两连边。

### [O. New School Term](https://qoj.ac/contest/1804/problem/9449)

从后往前加，维护拓展域并查集。每次合并后，需要能凑出和为 $n$。拓展域的限制为 $siz_i,siz_j$ 只能选一个，维护 $a_i-b_j$ 的 01 背包。bitset 二进制分组，本质不同数 $O(\sqrt n)$ 级别。复杂度 $O(\frac{\sqrt nn^2}{w})$。

## [The 3rd Universal Cup. Stage 12: Qinhuangdao](https://qoj.ac/contest/1807)

### [A. Balloon Robot](https://qoj.ac/contest/1807/problem/9450)

可以找到一个起点 $p$ 使得从 $p$ 出发 $t_i$ 时在 $a_i$。贡献形如区间加一次函数，且只能在所有的 $p_i$ 和 $m$ 处取得最小值。离散化后差分。

### [B. Expected Waiting Time](https://qoj.ac/contest/1807/problem/9451)

设 $f_i$ 为长为 $2\times i$ 的合法括号序列数，即卡特兰数 $\frac{\binom{2n}{n}}{n+2}$。枚举 $i$，$i$ 作为左端点的方案数为 $\sum_{j=i+1}^{2\times n} f_{j-i-1}f_{n-(j-i+1)}$，其他情况 $i$ 作为右端点。是一个前缀的形式，预处理前缀和。总代价除以方案数得期望。

### [D. Graph Generator](https://qoj.ac/contest/1807/problem/9453)

合并形如一颗树，有 $d_{fa}\ge d_u$。令 $d_{fa}$ 最小的可行的 $fa$ 作为 $u$ 的父亲。从下往上检查答案，要求 $fa$ 的出边在 $u$ 子树中的数量等于 $siz_u$。

### [E. String of CCPC](https://qoj.ac/contest/1807/problem/9454)

加一个字符最多贡献为 $1$，最多只加一个字符。

### [G. Numbers](https://qoj.ac/contest/1807/problem/9456)

按二进制从高位到低位贪心，使用 python。

### [H. Prime Set](https://qoj.ac/contest/1807/problem/9457)

除了 $1+1=2$ 特例外，奇数向偶数连边，二分图匹配。先不加 $1$ 求出最大匹配，再加上 $1$ 匹配，最后剩下的 $1$ 两两匹配。

### [K. Diversity and Variance](https://qoj.ac/contest/1807/problem/9460)

令 $m=n-m$ 为保留的数。特判 $m=1$。答案一定为一段前缀加一段后缀，值相同的数要选字典序小的。按 $(a_i,i)$ 和 $(a_i,-i)$ 分别排序。方差拆为 $\sum x_i^2$ 和 $\sum x_i$ 相关，求出可能贡献答案的是那些前缀。两个方案的字典序比较时，分类讨论比较两边不重叠的区间的最小值。

### [L. One-Dimensional Maze](https://qoj.ac/contest/1807/problem/9461)

向左走 ```R``` 的数量和向右走 ```L``` 的数量的 min。

### [M. Safest Buildings](https://qoj.ac/contest/1807/problem/9462)

离原点近的一定不劣。离原点距离小于 $\lvert R-2r\rvert$ 的一样优，如果没有这样的点，离原点最近的点最优。

## [The 3rd Universal Cup. Stage 13: Sendai](https://qoj.ac/contest/1812)

### [B. Topological Sort](https://qoj.ac/contest/1812/problem/9477)

枚举 $i$，找到 $p_j>p_i,j<i$ 的最大 $j$，要求 $j+1,\dotsb,i-1$ 到 $i$ 不能没有边，如果不存在 $j$ 则为 $2^{i-1}$。

### [C. Shift Puzzle](https://qoj.ac/contest/1812/problem/9478)

乱搞冲过去的。

倒序做把 T 的第 $m$ 列改为全 $1$，然后 S 通过第 $m$ 列不断调整。大常数写法对 $n$ 小有优势，两种写法拼起来。

### [D. And DNA](https://qoj.ac/contest/1812/problem/9479)

$m=0$ 时 $ans=1$，$m=1$ 时不存在 ```00``` 或 ```111```，建图 $01\to 10,01\to11,10\to 01,11\to 10$，矩乘快速幂维护一个点走 $n$ 步回到自己的方案数。$m$ 为偶数 $a_i$ 同奇偶，等于 $ans_{\frac{m}{2}}+ans_{\frac{m}{2}-1}$。否则最下一位与上面位独立，等于 $ans_1\times ans_{\frac{m-1}{2}}$。记搜。

### [F. Min Nim](https://qoj.ac/contest/1812/problem/9481)

$n$ 为奇或非最小值数量 $num$ 为奇先手赢。

### [G. Count Pseudo-Palindromes](https://qoj.ac/contest/1812/problem/9482)

对于 $[l,r]$，$i$ 是跨过 $l$ 或 $r$ 的最小/大的数。随机异或哈希，预处理 $f_i,g_i$ 表示前后缀 $sum_i$ 的出现次数。并查集从 $l_{a_i}$ 开始跳没有到过的点到 $r_{a_i}$，跳到的点是 $i$ 对 $l/r$ 有贡献。哈希表做到 $O(n)$。

### [H. Maximize Array](https://qoj.ac/contest/1812/problem/9483)

贪心取最大的且下标最小的。维护模 $k$ 的位置的后缀 min。

### [I. Colored Complete Graph](https://qoj.ac/contest/1812/problem/9484)

先问 $1$ 和 $2,\dotsb,n$。维护红点集合和蓝点集合，每次各取出一个点 $u,v$，如果 $col(u,v)$ 为红就删掉 $v$，否则删掉 $u$，直到一个集合为空。$n-1+n-2$ 次。

### [K. Random Mex](https://qoj.ac/contest/1812/problem/9486)

来自 AT 官方题解。

考虑组合意义：有 $0,\dotsb ,m$ 个盒子，给第 $a_i$ 个盒子放一个球，找到一个编号小于最小空盒子编号的盒子将其中所有的球放入 $m$ 号盒子的方案数。即 $\sum_{k=0}^mk\times\sum [mex(a)=k]$，即为答案。反过来，$n$ 个球分给 $m+1$ 个盒子，第 $m$ 个盒子不为空，存在至少一个空盒子，把第 $m$ 个盒子中的球放到编号最小的空盒子中。即 $(m+1)^n-m^n-(m+1)!S(n,m+1)$。$S(n,m)$ 为第二类斯特林数。

### [M. Do Not Turn Back](https://qoj.ac/contest/1812/problem/9488)

设 $dp_{t,u}$ 为时刻 $t$ 位置 $u$ 的答案，容斥掉 $u\to v\to u$ 和 $v\to u\to v\to u$ 的情况，特判 $t=2$ 不存在一来一去一回。$dp_{t,u}=\sum_{(u,v)\in E} dp_{t-1,v}-(d_u-[t\neq 2])\times dp_{t-2,u}$。矩乘快速幂。

### [O. Sub Brackets](https://qoj.ac/contest/1812/problem/9490)

当两个线段交为奇数时存在矛盾。连边求最大独立集，等价于总数减最小覆盖集。

## [The 3rd Universal Cup. Stage 14: Harbin](https://qoj.ac/contest/1817)

### [A. Build a Computer](https://qoj.ac/contest/1817/problem/9519)

类似线段树的结构，按不同长度分别线段树查询，完全包含一个区间就加上一个 $d$ 个点表示 $[0,2^d)$ 的结构。只有最短和最长的长度区间进入线段树查询，其余的直接在第一次返回。

### [B. Concave Hull](https://qoj.ac/contest/1817/problem/9520)

最优结构是凸包挖去一个凸包内的点和一条凸包上的边构成的三角形。有贡献的凸包内的点是凸包内的点的凸包上的点，且内层凸包上每个点贡献到外层凸包上的边是单调的。叉积计算。

```cpp
int n;
struct poi{
	int x,y;
	bool operator<(const poi&tmp)const{return x<tmp.x||(x==tmp.x&&y<tmp.y);}
	poi operator-(const poi&tmp)const{return {x-tmp.x,y-tmp.y};}
	int operator*(const poi&tmp)const{return x*tmp.y-y*tmp.x;}
};
vector<poi> a;
vector<int> tubao(vector<poi> a){
	if(a.size()==1)return vector<int>({0});
	if(a.size()==2)return vector<int>({0,1});
	vector<int> res;
	for(int i=0;i<a.size();i++){
		while(res.size()>1){
			int lst=res.back();res.pop_back();
			if((a[lst]-a[res.back()])*(a[i]-a[lst])>=0){res.pb(lst);break;}
		}
		res.pb(i);
	}
	int sz=res.size();
	for(int i=a.size()-2;~i;i--){
		while(res.size()>sz){
			int lst=res.back();res.pop_back();
			if((a[lst]-a[res.back()])*(a[i]-a[lst])>=0){res.pb(lst);break;}
		}
		res.pb(i);
	}
	res.pop_back();
	return res;
}
bool vis[maxn];
void work(){
	n=read();a.resize(n);
	for(int i=0;i<n;i++)a[i]={read(),read()};
	sort(a.begin(),a.end());
	vector<int> res=tubao(a);
	vector<poi> b,c;
	for(int i=0;i<n;i++)vis[i]=0;
	for(int i:res)vis[i]=1,b.pb(a[i]);
	if(b.size()==n){puts("-1");return ;}
	for(int i=0;i<n;i++)if(!vis[i])c.pb(a[i]);
	a=c;c.clear();
	res=tubao(a);
	for(int i:res)c.pb(a[i]);
	int m=c.size(),pos=0;
	for(int i=1;i<m;i++)if((c[i]-b[0])*(c[i]-b[1])<(c[pos]-b[0])*(c[pos]-b[1]))pos=i;
	int ans=inf,sum=0;
	for(int i=0;i<b.size();i++)sum+=b[i]*b[(i+1)%b.size()];
	for(int i=0;i<b.size();i++){
		while((c[pos]-b[i])*(c[pos]-b[(i+1)%b.size()])>(c[(pos+1)%m]-b[i])*(c[(pos+1)%m]-b[(i+1)%b.size()]))pos=(pos+1)%m;
		ans=min(ans,(c[pos]-b[i])*(c[pos]-b[(i+1)%b.size()]));
	}
	printf("%lld\n",sum-ans);
}
```

### [C. Giving Directions in Harbin](https://qoj.ac/contest/1817/problem/9521)

模拟，特判 $\Delta x=\Delta y=0$ 是要绕一圈。

### [D. A Simple String Problem](https://qoj.ac/contest/1817/problem/9522)

不妨令 $s$ 中存在答案字符串的一半及以上，翻转并交换 $s$ 和 $t$ 再做一遍。枚举答案长度 $len$，每隔 $len$ 取一个点 $i$，一定能经过答案字符串的一半上的一点，在讨论另一半对应的点在 $s_{i+len}$ 或 $t_{i+len-1}$，二分哈希求两串和 $s$ 串两个位置的 lcp 和 lcs。

### [E. Marble Race](https://qoj.ac/contest/1817/problem/9523)

按每个球在每个起点出发到零点的时间升序枚举。设 $f_i$ 表示有 $i$ 个球在零点右边的概率，$f_i=af_i+bf_{i-1}$。维护球 $i$ 经过零点的次数 $tim_i$，撤销 $a=n-tim_i,b=tim_i$，$tim_i$ 加 $1$，加入 $a=n-tim_i,b=tim_i$。

### [J. New Energy Vehicle](https://qoj.ac/contest/1817/problem/9528)

每次优先用下一个充电点近的电池，set 模拟。

### [K. Farm Management](https://qoj.ac/contest/1817/problem/9529)

要么操作最大的 $a_i$，收益 $(m-\sum l_i)\times \max a_i$。要么操作较小的 $a_i$，然后不选这个 $a_i$，二分剩下的分到那些地方。

### [L. A Game On Tree](https://qoj.ac/contest/1817/problem/9530)

算方案数。对于 $e_1,\dotsb,e_k$，贡献为 $\sum |e_i|^2+2\sum_{i<j} |e_i||e_j|$。维护 $s_u=\sum_{v\in subtree(u)} siz_v^2$，dfs 时维护贡献。

```cpp
int n,ans;
int head[maxn],tot;
struct nd{
	int nxt,to;
}e[maxn<<1];
void add(int u,int v){e[++tot]={head[u],v};head[u]=tot;}
int siz[maxn],sum[maxn];
void dfs(int u,int fa){
	siz[u]=1,sum[u]=0;
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;if(v==fa)continue;
		dfs(v,u);
		(ans+=2*sum[u]*sum[v])%=mod;
		(ans+=2*(n-siz[v])*(n-siz[v])%mod*(sum[v]+mod-siz[v]*siz[v]%mod))%=mod;
		(sum[u]+=sum[v])%=mod;siz[u]+=siz[v];
	}
	(sum[u]+=siz[u]*siz[u])%=mod;
	(ans+=siz[u]*siz[u]%mod*(n-siz[u])%mod*(n-siz[u]))%=mod;
}
void work(){
	n=read();ans=0;
	for(int i=1;i<=n;i++)head[i]=0;tot=0;
	for(int i=1;i<n;i++){
		int u=read(),v=read();
		add(u,v),add(v,u);
	}
	dfs(1,0);
	int ss=(n*(n-1)/2)%mod;ss=ss*ss%mod;
	ans=ans*ksm(ss)%mod;
	printf("%lld\n",ans);
}
```

## [The 3rd Universal Cup. Stage 15: Chengdu](https://qoj.ac/contest/1821)

### [A. Arrow a Row](https://qoj.ac/contest/1821/problem/9535)

要求最后三个为 ```>>>```，第一个为  ```>```，至少有一个 ```-```。

### [B. Athlete Welcome Ceremony](https://qoj.ac/contest/1821/problem/9536)

$dp_{i,j,k}$ 表示取多少个 a,b,c 的答案，在三个维度做 $3$ 次前缀和。

注意到有 $x>n$ 这样的无意义询问，对 $n$ 取 min。

### [C. Chinese Chess](https://qoj.ac/contest/1821/problem/9537)

处理出两两点间不同种棋的最短路。发现询问次数 $\le 3$，对 $ans=1/2/3$ 分别做。直接枚举决策点，按答案将询问分为几个部分，要求递归下去的子问题也符合能区分。而且发现对于 $ans=3$，第一步问 $(0,0)$ 就可以了，不会接着往下枚举。

### [D. Closest Derangement](https://qoj.ac/contest/1821/problem/9538)

偶数只有一种情况，$a_i=2k$ 和 $a_j=2k+1$ 交换。

奇数有 $n-1$ 种情况，$123$ 被换为 $231$ 或 $312$。重载比较函数排序。分类讨论，比较两边不重叠的部分的一个区间的下标最小值。

```cpp
int n,k;
int a[maxn],p[maxn];
int id[maxn];
pii mn[20][maxn];
pii que(int l,int r){
	if(l>r)return {inf,0};
	int k=log2(r-l+1);
	return min(mn[k][l],mn[k][r-(1<<k)+1]);
}
bool cmp(int uu,int vv){
	int u=uu,v=vv,fl=0;
	if(u==v)return 0;
	if(u>v)swap(u,v),fl=1;
	if(u/2==v/2){
		pii pos=que(u-1,v);
		return fl^(pos.se&1);
	}
	int l=(u&1)?u-2:u,r=(v&1)?v:v+1;
	pii pos=min({que(l,u-2),que(u,v-1),que(v+1,r)});
	if(v&1){
		if((pos.se&1)&&pos.se>=u)return fl^1;
		return fl;
	}
	else{
		if((pos.se&1)&&pos.se>=u&&pos.se<v)return fl^1;
		return fl;
	}
}
void work(){
	n=read();k=read();
	for(int i=1;i<=n;i++)a[i]=read(),p[a[i]]=i,mn[0][a[i]]={i,a[i]};
	for(int j=1;j<=18;j++){
		for(int i=1;i+(1<<j)-1<=n;i++)mn[j][i]=min(mn[j-1][i],mn[j-1][i+(1<<j-1)]);
	}
	if(n&1){
		if(k>n-1){puts("-1");return ;}
		for(int i=2;i<=n;i++)id[i]=i;
		sort(id+2,id+n+1,cmp);
		int pos=id[k+1];
		for(int i=1;i<=((pos&1)?pos-3:pos-2);i+=2)swap(a[p[i]],a[p[i+1]]);
		for(int i=((pos&1)?pos+1:pos+2);i<=n;i+=2)swap(a[p[i]],a[p[i+1]]);
		if(pos&1)swap(a[p[pos-2]],a[p[pos]]),swap(a[p[pos-1]],a[p[pos]]);
		else swap(a[p[pos-1]],a[p[pos+1]]),swap(a[p[pos-1]],a[p[pos]]);
		for(int i=1;i<=n;i++)printf("%lld ",a[i]);puts("");
	}
	else{
		if(k>1)puts("-1");
		else{
			for(int i=1;i<=n;i+=2)swap(a[p[i]],a[p[i+1]]);
			for(int i=1;i<=n;i++)printf("%lld ",a[i]);puts("");
		}
	}
}
```

### [E. Disrupting Communications](https://qoj.ac/contest/1821/problem/9539)

点边容斥，设 $dp_{u}$ 为子树 $u$ 的答案，$dp_{u}=\prod dp_v+1$，记录前后缀积。换根求出所有 $u$ 为根和跨过边 $(u,v)$ 的答案，维护 lca 求路径和。

### [G. Expanding Array](https://qoj.ac/contest/1821/problem/9541)

只有 $a_i,a_i|a_{i+1},a_i\oplus a_{i+1},a_i\&a_{i+1},a_i\oplus (a_i\& a_{i+1}),(a_i\&a_{i+1})\oplus a_{i+1},0$ 能被取到，去重计数。

### [I. Good Partitions](https://qoj.ac/contest/1821/problem/9543)

对于 $a_i>a_{i+1}$ 的位置，要求 $i$ 整除 $k$，单点修，求全局 gcd。

### [K. Magical Set](https://qoj.ac/contest/1821/problem/9545)

每个 $a_i\to a'_i$，代价为 $\frac{a_i}{a'_i}$ 的质因数数。连边最大费用最大流。

## [The 3rd Universal Cup. Stage 16: Nanjing](https://qoj.ac/contest/1828)

### [B. Birthday Gift](https://qoj.ac/contest/1828/problem/9565)

反转奇数位，变为相临的 $01$ 可以消掉，等价于 $\min(num0,num1)$，将 $2$ 填到少的一边。

### [C. Topology](https://qoj.ac/contest/1828/problem/9566)

设 $dp_{u,i}$ 表示 除去 $u$ 子树，$u$ 的拓扑序排名为 $i$。预处理挖去子树 $v$，$v$ 的兄弟及其子树的拓扑序方案数 $f_v$。$dp_{v,j}=\sum_{i<j}dp_{u,i}\times f_v\times\binom{n-i-siz_u+1+siz_u-siz_v-1}{siz_u-siz_v-1}$。前缀和转移。

### [F. Subway](https://qoj.ac/contest/1828/problem/9569)

$dis_{i,j}$ 表示 在第 $i$ 条线第 $j$ 个站（编号为 $u$ ）的最短路，dij，线路上的转移容易。当松弛 $dis_{i,j}$ 时，$dis_{i,j}$  越小，$b_i$ 越大，在每个 $u$ 维护凸包。对于可以更新的 $dis_{p,q}$，$id_{i,j}=id_{p,q}=u$ ，更新 $a_p$ 最小的 $dis_{p,q}$。每个 $u$ 的 $(p,q)$ 按 $a_p$ 排序，双指针维护 $u$ 处没被松弛的最小 $p$，在凸包上二分 $x=a_p$ 时的最小值。

```cpp
int n,k;
int a[maxn],b[maxn];
vector<pii> e[maxn];
vector<int> dis[maxn];
vector<bool> vis[maxn];
vector<pii> pos[maxn];
int p[maxn];
vector<pii> st[maxn];
bool chk(pii u,pii v,pii w){
	return (__int128)(w.se-u.se)*(u.fi-v.fi)<=(__int128)(v.se-u.se)*(u.fi-w.fi);
}
priority_queue<pair<int,pii>> q;
int calc(pii l,int x){return x*l.fi+l.se;}
int fd(int u,int x){
	int l=0,r=st[u].size()-1,res=0;
	while(l<r){
		int mid=l+r>>1;
		if(calc(st[u][mid],x)<=calc(st[u][mid+1],x))r=mid;
		else l=mid+1;
	}
	return calc(st[u][l],x);
}
void work(){
	n=read();k=read();
	for(int i=1;i<=k;i++)a[i]=read();
	for(int i=1;i<=k;i++)b[i]=read();
	for(int i=1;i<=k;i++){
		int len=read();
		e[i].resize(len),vis[i].resize(len),dis[i].resize(len);
		for(int j=0;j<len-1;j++)e[i][j]={read(),read()};
		e[i][len-1].fi=read();
		for(int j=0;j<len;j++){
			pos[e[i][j].fi].pb({i,j});
			dis[i][j]=inf;
		}
	}
	for(int i=1;i<=n;i++)sort(pos[i].begin(),pos[i].end(),[&](pii u,pii v){return a[u.fi]<a[v.fi];});
	for(int i=0;i<pos[1].size();i++){
		dis[pos[1][i].fi][pos[1][i].se]=0;
		q.push({0,{pos[1][i].fi,pos[1][i].se}});
	}
	while(!q.empty()){
		int i=q.top().se.fi,j=q.top().se.se;q.pop();
		if(vis[i][j])continue;vis[i][j]=1;
		if(j+1<e[i].size()){
			if(dis[i][j+1]>dis[i][j]+e[i][j].se){
				dis[i][j+1]=dis[i][j]+e[i][j].se;
				q.push({-dis[i][j+1],{i,j+1}});
			}
		}
		int u=e[i][j].fi;
		if(!st[u].size()||b[i]<st[u].back().fi){
			while(st[u].size()>1&&chk(st[u][st[u].size()-2],st[u].back(),{b[i],dis[i][j]}))st[u].pop_back();
			st[u].pb({b[i],dis[i][j]});
		}
		while(p[u]<pos[u].size()&&vis[pos[u][p[u]].fi][pos[u][p[u]].se])p[u]++;
		if(p[u]<pos[u].size()){
			int v=fd(u,a[pos[u][p[u]].fi]);
			if(dis[pos[u][p[u]].fi][pos[u][p[u]].se]>v){
				dis[pos[u][p[u]].fi][pos[u][p[u]].se]=v;
				q.push({-dis[pos[u][p[u]].fi][pos[u][p[u]].se],{pos[u][p[u]].fi,pos[u][p[u]].se}});
			}
		}
	}
	for(int i=2;i<=n;i++){
		int res=inf;
		for(auto[id,j]:pos[i])res=min(res,dis[id][j]);
		printf("%lld ",res);
	}
}
```

### [I. Bingo](https://qoj.ac/contest/1828/problem/9572)

等于每行每列最大值的最小值。Min-Max 容斥。$\min_{x\in S} x=\sum(-1)^{|T|-1}\max_{x\in T} x$。枚举 $T$ 有 $i$ 行 $j$ 列，有 $i\times m+j\times n-i\times j$ 个格子。设选 $num$ 个格子的最大值为 $i$，$sum_{num}=\binom{i-1}{num-1}num!(n\times m-num)!$，差卷积。

### [J. Social Media](https://qoj.ac/contest/1828/problem/9573)

对每个非朋友 $i$ 求出与 $d_i$ 个朋友有边，要么是最大的两个 $d_i$ 之和，要么是有边的 $(i,j)$ 的 $d_i+d_j+w(i,j)$。

### [K. Strips](https://qoj.ac/contest/1828/problem/9574)

黑点和左右端点将序列分为若干子问题。只有无法覆盖下一个红点时放纸条，如果超过右端点在往回调整。

### [M. Ordainer of Inexorable Judgment](https://qoj.ac/contest/1828/problem/9576)

原点到每个点为圆心半径为 $d$ 的园求切线，取最大最小的夹角。因为有跨过 X 轴正方向的情况，所以是求与当前边界的夹角是否为正。

```cpp
int n;
db x,y,d,t,ans;
pii a[maxn];
int sgn(db x){
	if(x>eps)return 1;
	if(x<-eps)return -1;
	return 0;
}
pii rotate(pii u,db c){
    return {u.fi*cosl(c)-u.se*sinl(c),u.fi*sinl(c)+u.se*cosl(c)};
}
int cross(pii u,pii v){return u.fi*v.se-u.se*v.fi;}
void work(){
	n=read();x=read(),y=read(),d=read(),t=read();
	for(int i=1;i<=n;i++)a[i]={read(),read()};
	pii l={0,0},r={0,0};
	for(int i=1;i<=n;i++){
		db v=atan2l(d,sqrtl(a[i].fi*a[i].fi+a[i].se*a[i].se-d*d));
		pii ll=rotate(a[i],-v),rr=rotate(a[i],v);
		if(i==1)l=ll,r=rr;
		else{
			if(sgn(cross(ll,l))>=0)l=ll;
			if(sgn(cross(rr,r))<=0)r=rr;
		}
	}
    db a=atan2l(y,x),al=atan2l(l.se,l.fi),ar=atan2l(r.se,r.fi);
    al-=a,ar-=a;
    if(sgn(al)<0)al+=2*pi;
    if(sgn(ar)<0)ar+=2*pi;
	a=ar-al;
	if(sgn(a)<0)a+=2*pi;
	while(sgn(t-2*pi)>=0){
		t-=2*pi;
		ans+=a;
	}
	if(sgn(ar-al)>=0){
		if(t>al)ans+=min(t,ar)-al;
	}
	else{
		ans+=min(t,ar);
		if(t>al)ans+=t-al;
	}
	printf("%.12Lf\n",ans);
}
```
## [The 3rd Universal Cup. Stage 17: Jinan](https://qoj.ac/contest/1843)

### [B. The Magician](https://qoj.ac/contest/1843/problem/9549)

记每种花色几张，搜索。

### [C. The Empress](https://qoj.ac/contest/1843/problem/9550)

构造 ```POP i GOTO i+1;PUSH i GOTO i``` 使 $x=x+2$，```POP i GOTO i+1;PUSH i GOTO 1```  使 $x=2x+2$。

### [D. The Emperor](https://qoj.ac/contest/1843/problem/9551)

设从栈顶为 $a$ 进入指令 $i$ 出来时在 $to$，长度为 $len$。记搜。如果 $i$ 处 ```POP a``` 结束，否则进入 ```PUSH b GOTO x```，搜 $(x,b)$，再搜 $to_{x,b},a$，$len_{i,a}=len_{x,b}+len_{to_{x,b},a}+1$。如果搜索次数过大则无解。

```cpp
int n,tim;
int op[maxn],to1[maxn],to2[maxn],v1[maxn],v2[maxn];
char s[maxn];
bool vis[maxn][maxn];
pii dp[maxn][maxn];
pii sovle(int x,int a){
	if(dp[x][a].fi)return dp[x][a];
	++tim;if(tim>=2*n*n)return {0,0};
	if(!a&&op[x])return dp[x][a]={1,0};
	if(v1[x]==a)return {1,to1[x]};
	pii res=sovle(to2[x],v2[x]);
	if(res.se==0){return dp[x][a]={res.fi+1,0};}
	int len=res.fi;res=sovle(res.se,a);
	return dp[x][a]={(res.fi+len+1)%mod,res.se};
}
void work(){
	n=read();
	for(int i=1;i<=n;i++){
		scanf("%s",s+1);
		if(s[1]=='H')op[i]=1;
		else{
			v1[i]=read();scanf("%s",s+1);
			scanf("%s",s+1);int l=strlen(s+1);
			for(int j=1;j<l;j++)to1[i]=to1[i]*10+s[j]-'0';
		}
		scanf("%s",s+1);v2[i]=read();
		scanf("%s",s+1);to2[i]=read();
	}
	pii res=sovle(1,0);
	printf("%lld\n",tim>=2*n*n?-1:res.fi);
}
```

### [E. The Chariot](https://qoj.ac/contest/1843/problem/9552)

分讨，python。

```python
t=int(input())
while t>0:
	t-=1
	s=input().split();
	a=int(s[0])
	b=int(s[1])
	c=int(s[2])
	x=int(s[3])
	y=int(s[4])
	d=int(s[5])
	res=(d+x-1)//x
	ans=a*res
	res=d//x;
	if res!=0:
		ans=min(ans,a*res+b*max(0,min(d-res*x,y))+c*max(0,d-res*x-y));
	if d>=x+y:
		res=d%(x+y);
		ans=min(ans,(a+b*y)*(d//(x+y))+min(a+b*max(res-x,0),res*c))
		ans=min(ans,a+b*y+(d-x-y)*c)
	else:
		ans=min(ans,a+b*max(d-x,0))
	if d>=x:
		u=d%x
		v=d//x
		if v*y>=u:
			ans=min(ans,a*v+b*u)
		k=(d+x+y-1)//(x+y)
		if d-k*x>0:
			ans=min(ans,a*k+b*(d-k*x))
	print(ans)
```

### [F. The Hermit](https://qoj.ac/contest/1843/problem/9553)

$\binom{m}{n}n$ 减去每个数被删除的次数。$i$ 被删除时比 $i$ 小的部分为上一个数的倍数，比 $i$ 大的部分都是 $i$ 的倍数。$i$ 前只能选 $\log m$ 个，枚举倍数转移。

### [I. The Hanged Man](https://qoj.ac/contest/1843/problem/9556)

选出一个偶度数点，一个点连向的叶子两两匹配。否则无解。

### [J. Temperance](https://qoj.ac/contest/1843/problem/9557)

从小往大删，删 $\max(a,b,c)$ 小的不影响 $\max (a',b',c')$ 大的点，所以初始状态下 $<k$ 的删掉。

### [L. The Tower](https://qoj.ac/contest/1843/problem/9559)

对每个人维护动态开点线段树。加的时候从代表空节点的线段树上分裂一个前缀，删的时候和代表空节点的线段树合并。提前把点开到询问的位置，询问时从对应的线段树节点跳线段树父亲至根，记录每个根对应哪个人。