---
title: 'The 3rd Universal Cup 做题记录 (1)'
date: 2024-10-18 21:53:09
tags: [ucup,做题记录,acm]
published: true
hideInList: false
feature: 
isTop: false
---
The 3rd Universal Cup 做题记录

Stage 0 - Stage 9：[[the-3rd-universal-cup-zuo-ti-ji-lu-1|The 3rd Universal Cup 做题记录 (1)]]

Stage 10 - Stage 19：[[the-3rd-universal-cup-zuo-ti-ji-lu-2|The 3rd Universal Cup 做题记录 (2)]]

[Stage 0: Trial Contest](https://qoj.ac/contest/1695) ADFGHIJM

[Stage 1: St. Petersburg](https://qoj.ac/contest/1696) ACDGHJKNO

[Stage 2: Zielona Góra](https://qoj.ac/contest/1699) ACDEGH

[Stage 4: Hongō](https://qoj.ac/contest/1738) BCDEKLN

[Stage 5: Moscow](https://qoj.ac/contest/1741) ABEFGIKM

[Stage 6: Osijek](https://qoj.ac/contest/1762) ABCDHIJKL

[Stage 7: Warsaw](https://qoj.ac/contest/1774) ABEGKL

[Stage 8: Cangqian](https://qoj.ac/contest/1780) BCDEFHIJLM

[Stage 9: Xi'an](https://qoj.ac/contest/1784) AEFGHIJN

## [The 3rd Universal Cup. Stage 0: Trial Contest](https://qoj.ac/contest/1695)

### [A. Arrested Development](https://qoj.ac/contest/1695/problem/8768)

$O(n^2V)$ dp 可过。

### [D. Dihedral Group](https://qoj.ac/contest/1695/problem/8771)

一定是正序或倒序的连续区间。

### [F. Magic Bean](https://qoj.ac/contest/1695/problem/8773)

可以只交换一个环的 $4$ 号和另一个环的 $1$ 号。

### [G. Manhattan Walk](https://qoj.ac/contest/1695/problem/8774)

每个位置独立。设 $dp_{i,j}$ 为 $(i,j)$ 去到终点的期望，$dp_{i+1,j},dp_{i,j+1}$ 分别为 $a,b$，$a<b$。如果 $a+p\le b$ 一定走 $a$，否则按等待时间划分走 $a$ 还是 $b$。

```cpp
int n,m;
double dp[maxn][maxn],p;
void work(){
	n=read();m=read();p=read();
	dp[n][m]=0.0;
	for(int i=n;i;i--){
		for(int j=m;j;j--){
			if(i==n&&j==m)continue;
			else if(i==n)dp[i][j]=dp[i][j+1]+p/4.0;
			else if(j==m)dp[i][j]=dp[i+1][j]+p/4.0;
			else{
				double a=dp[i][j+1],b=dp[i+1][j];
				if(a>b)swap(a,b);
				if(b>=a+p)dp[i][j]=a+p/4.0;
				else{
					dp[i][j]=a/2.0+(b-a)/(2*p)*(a+(b-a)/2.0)+(p-b+a)/(2*p)*b;
				}
			}
		}
	}
	printf("%.10lf\n",dp[1][1]);
}
```

### [H. MountainCraft](https://qoj.ac/contest/1695/problem/8775)

查询区间并。线段树维护区间最小值和区间最小值个数。

### [I. Not Another Constructive!](https://qoj.ac/contest/1695/problem/8776)

在 ```A``` 处计算前缀 ```N``` 和后缀 ```C``` 的乘积。设 $dp_{i,j,k,num}$ 为前 $i$ 个，前缀有 $j$ 个，后缀有 $k$ 个，能否有 $num$ 个子序列。bitset 优化。

### [M. Training, Round 2](https://qoj.ac/contest/1695/problem/8780)

记录前 $i$ 个题能否达到 $(j,k)$。每个 $(j,k)$ 只会更新一次。set 维护。

```cpp
int n,a,b,ans;
set<int> s[maxn];
bool vis[maxn][maxn];
void work(){
	n=read();a=read(),b=read();
	s[0].insert(0);
	for(int i=1;i<=n;i++){
		int la=read()-a,ra=read()-a,lb=read()-b,rb=read()-b;
		if(ra<0||rb<0)continue;
		la=max(la,0ll),ra=min(ra,n),lb=max(lb,0ll),rb=min(rb,n);
		vector<pii> tmp;
		for(int j=la;j<=ra;j++){
			auto it=s[j].lower_bound(lb);
			while(it!=s[j].end()&&(*it)<=rb){
				tmp.push_back({j,(*it)+1}),tmp.push_back({j+1,(*it)});
				vis[j][(*it)]=1;
				it=s[j].erase(it);
			}
		}
		for(pii p:tmp)if(!vis[p.fi][p.se]){
			ans=max(ans,p.fi+p.se);
			s[p.fi].insert(p.se);
		}
	}
	printf("%lld\n",ans);
}
```

## [The 3rd Universal Cup. Stage 1: St. Petersburg](https://qoj.ac/contest/1696)

### [A. Element-Wise Comparison](https://qoj.ac/contest/1696/problem/8781)

bitset 维护 $f_{i,j}=a_i<a_j$。每 $m$ 个点划一个段，统计跨过段的答案，维护一段的后缀 or。

```cpp
int n,m,a[maxn],p[maxn],ans;
bitset<maxn> f[maxn],g[maxn],s;
void work(){
	n=read();m=read();
	for(int i=1;i<=n;i++)a[i]=read(),p[a[i]]=i;
	for(int i=1;i<=n;i++)f[i].set(i);
	for(int i=n;i;i--)f[p[i]]|=f[p[i+1]];
	for(int i=n;i;i--)f[i]&=s,s.set(i);
	for(int i=1;i<=n;i+=m){
		for(int j=1;j<=m;j++)g[j].reset();
		if(i+m-1>n)break;
		g[m]=f[i+m-1];
		for(int j=i+m-2;j>=i;j--)g[j-i+1]=g[j-i+2]&(f[j]<<(i+m-1-j));
		s.set();
		for(int j=i;j<=i+m-1&&j+m-1<=n;j++){
			ans+=(s&g[j-i+1]).count();
			if(j+m<=n)s&=f[j+m]>>(j-i+1);
		}
	}
	printf("%lld\n",ans);
}
```

### [C. Cherry Picking](https://qoj.ac/contest/1696/problem/8783)

从大往小加，线段树维护区间前缀后缀和最大连续 $1$。

### [D. Dwarfs' Bedtime](https://qoj.ac/contest/1696/problem/8784)

在 $0$ 时刻先每个问一次，然后每隔 $49,48,\dotsb ,1$ 问一次，问到状态翻转就挂到 $12$ 小时后连续的问。

### [G. Unusual Case](https://qoj.ac/contest/1696/problem/8787)

随机一个点开始找，当前找到 $a_1,\dotsb,a_k$，如果找不到新的出边，那么 $a_k$ 连向 $a_p$，将路径改为 $a_1\to\dotsb\to a_{p-1}\to a_p\to a_k\to a_{k-1}\dotsb\to a_{p+1}$。据题解说是 $O(n)$ 的。

```cpp
int n,m,k;
set<pii> s;
vector<int> e[maxn];
mt19937 rnd(time(0));
int id[maxn],tp;
bool vis[maxn];
void work(){
	n=read();m=read();k=read();
	for(int i=1;i<=m;i++){
		int u=read(),v=read();
		if(u>v)swap(u,v);
		s.insert({u,v});
	}
	while(k--){
		for(int i=1;i<=n;i++)vis[i]=0,e[i].clear();
		id[tp=1]=rnd()%n+1;vis[id[1]]=1;
		for(auto[x,y]:s)e[x].pb(y),e[y].pb(x);
		while(tp<n){
			if(rnd()&1)reverse(id+1,id+tp+1);
			int u=id[tp];bool fl=0;
			shuffle(e[u].begin(),e[u].end(),rnd);
			for(int v:e[u])if(!vis[v]){
				vis[v]=fl=1;id[++tp]=v;
				break;
			}
			if(fl)continue;
			for(int i=1;i<=tp;i++)if(id[i]==e[u].back()){
				reverse(id+i+1,id+tp+1);
				break;
			}
		}
		for(int i=1;i<=tp;i++)printf("%lld ",id[i]);puts("");
		for(int i=1;i<tp;i++)s.erase({min(id[i],id[i+1]),max(id[i],id[i+1])});
	}
}
```

### [H. Page on vdome.com](https://qoj.ac/contest/1696/problem/8788)

答案为 $\min(n+1,10)$。

### [J. First Billion](https://qoj.ac/contest/1696/problem/8790)

对 $a_i\bmod B$ 做 bitset 背包，还原方案时如果既可以选也可以不选，就随一个。取 $B=2.5\times 10^6$。

```cpp
int n,a[maxn];
int B=2500000;
bitset<2500000> dp[maxn];
mt19937 rnd(1);
void work(){
	n=read();
	for(int i=1;i<=n;i++)a[i]=read();
	dp[0][0]=1;
	for(int i=1;i<=n;i++){
		dp[i]=(dp[i-1]<<(a[i]%B))|dp[i-1]|(dp[i-1]>>(B-a[i]%B));
	}
	while(1){
		vector<int> id;
		for(int i=n,s=0;i;i--){
			if(dp[i-1][s]&&dp[i-1][(s-a[i]%B+B)%B]&&(rnd()&1))id.pb(i),s=(s-a[i]%B+B)%B;
			else if(!dp[i-1][s])id.pb(i),s=(s-a[i]%B+B)%B;
		}
		int sum=0;for(int i:id)sum+=a[i];
		if(sum==1e9){
			printf("%lld ",id.size());for(int i:id)printf("%lld ",i);
			return ;
		}
	}
}
```

也可以分为若干块，块内折半，块间选绝对值前 $k$ 小合并。对不同块取不同 $k$。

### [N. (Un)labeled graphs](https://qoj.ac/contest/1696/problem/8794)

$\log n$ 个点维护每个点的编号，把 $\log n$ 个点连成一条链。剩下 $3$ 个点。取 $a$ 为度数最大的点，$b$ 标记所有的 $n$ 个点，$c$ 是唯一不连 $a$ 的点，标记 $b$ 和 $\log n$ 个点的链头。

## [The 3rd Universal Cup. Stage 2: Zielona Góra](https://qoj.ac/contest/1699)

### [A. Interesting Paths](https://qoj.ac/contest/1699/problem/8517)

正反 dfs，找到可能在 $1\to n$ 上的点和边，答案为 $m-n+2$。若一条路径经过 $x$ 个之前没经过的点，则会经过 $x+1$ 条之前没经过的边。一定能经过所有可能在 $1\to n$ 上的点和边。

### [C. Radars](https://qoj.ac/contest/1699/problem/8519)

能覆盖矩阵等价于能覆盖 $4$ 个角落，状压 $4$ 个角落是否被覆盖。

### [D. Xor Partitions](https://qoj.ac/contest/1699/problem/8520)

$dp_i=\sum dp_j\times (s_i\oplus s_j)$。按位拆开，$dp_i=\sum_j 2^j\sum dp_j[(s_i\oplus s_j) 第 j 位为 1]$。维护 $sum_{j,0/1}$，表示当前 $s_i$ 第 $j$ 位为 $1$ 的 $dp_i$ 之和。

### [E. Pattern Search II](https://qoj.ac/contest/1699/problem/8521)

$ans\le 3n$。最大的 $S_k$ 是 $O(\log n)$ 级别的。设 $pre_{k,i},suf_{k,i}$ 表示在 $S_k$ 中从 $i$ 出发向前向后能匹配多长的 $t$，需要多长的 $s$，仿 $f_i=f_{i-1}+f_{i-2}$ 合并。

```cpp
int n,m=30,ans=inf;
char s[maxn];
struct nd{
	int len;
	pii pre[maxn],suf[maxn];
}f[32];
nd merge(nd u,nd v){
	nd res;res.len=u.len+v.len;
	for(int i=1;i<=n;i++){
		res.suf[i]=u.suf[i].fi==n+1?u.suf[i]:make_pair(v.suf[u.suf[i].fi].fi,u.len+v.suf[u.suf[i].fi].se);
		res.pre[i]=v.pre[i].fi==0?v.pre[i]:make_pair(u.pre[v.pre[i].fi].fi,v.len+u.pre[v.pre[i].fi].se);
		if(u.pre[i].fi==0&&v.suf[i+1].fi==n+1)ans=min(ans,u.pre[i].se+v.suf[i+1].se);
	}
	return res;
}
void work(){
	scanf("%s",s+1);n=strlen(s+1);
	if(n==1){puts("1");return ;}
	for(int i=1;i<=n;i++){
		if(s[i]=='a'){
			f[1].pre[i]={i-1,1},f[1].suf[i]={i+1,1};
			f[0].pre[i]=f[0].suf[i]={i,0};
		}
		else{
			f[0].pre[i]={i-1,1},f[0].suf[i]={i+1,1};
			f[1].pre[i]=f[1].suf[i]={i,0};
		}
	}
	f[0].len=f[1].len=1;
	for(int i=2;i<=m;i++)f[i]=merge(f[i-1],f[i-2]);
	printf("%lld\n",ans);
}
```

### [G. Puzzle II](https://qoj.ac/contest/1699/problem/8523)

可以两步交换指定的两个数，换掉较少的颜色。序列的变化形如平移的形式，平衡树维护。

### [H. Weather Forecast](https://qoj.ac/contest/1699/problem/8524)

二分答案，取 $a_i-x$ 前缀和的最长上升子序列和 $k$ 比较。

剩下的待补。

## [The 3rd Universal Cup. Stage 4: Hongō](https://qoj.ac/contest/1738)

### [B. Black or White 2](https://qoj.ac/contest/1738/problem/9114)

令 $k=\min(k,nm-k)$，$n>m$。第 $1$ 行隔一个填一个，之后插空一次填 $(i,j)$ 和 $(i-1,j)$。多出来的填 $(n,m)$。

### [C. Contour Multiplication](https://qoj.ac/contest/1738/problem/9115)

$dp_{i,s}$ 为与 $popcount(s\oplus t)=i$ 的所有 $t$ 的共同系数。依次枚举 $j$ 将 $dp_{i,s}\to dp_{i-1}{s\oplus 2^j}$。

### [D. DRD String](https://qoj.ac/contest/1738/problem/9116)

设 $dp_i$ 为长为 $i$ 且不存在 $s[1,j]=s[i-j+1,i],j<i-j+1$ 的方案数。前缀和转移。

### [E. Equally Dividing](https://qoj.ac/contest/1738/problem/9117)

只要 $sum\bmod n=0$ 就有解。若 $m$ 为偶，每列交替升序降序；否则 $n$ 为奇，可以构造前 $3$ 列填 $[1,3n]$。

### [K. Kth Sum](https://qoj.ac/contest/1738/problem/9123)

升序排序，二分答案 $x$。对于每个 $i$ 可以 $O(n)$ 计算 $(i,j,k)$ 的答案。设阈值 $B$，前 $B$ 个的贡献 $O(nB)$ 计算。如果没超过 $k$，$B$ 的 $(B,j,k)$ 贡献 $\le \frac{k}{B}$。后边只需要前 $\frac{k}{B}$ 小的 $(j,k)$ 对，$O(\frac{k}{B}\log n)$ 预处理。

```cpp
int n,k,B;
int a[maxn],b[maxn],c[maxn];
priority_queue<pii> q;
int pos[maxn];
int d[maxn*200],tp;
int f(int x){
	int res=0;
	for(int i=1,j=n;b[i]+c[1]<=x&&i<=n;i++){
		while(b[i]+c[j]>x)j--;
		res+=j;
	}
	return res;
}
bool check(int x){
	int sum=f(x-a[B]);
	if(sum*B>=k)return 1;
	for(int i=1;i<B;i++){
		sum+=f(x-a[i]);
		if(sum>=k)return 1;
	}
	for(int i=1,j=n;i<=tp&&j>B;i++){
		while(j>B&&a[j]+d[i]>x)j--;
		sum+=j-B;
		if(sum>=k)return 1;
	}
	return 0;
}
void work(){
	n=read();k=read();B=min(n,(int)sqrt(k/n)+1);
	for(int i=1;i<=n;i++)a[i]=read();
	for(int i=1;i<=n;i++)b[i]=read();
	for(int i=1;i<=n;i++)c[i]=read();
	sort(a+1,a+n+1),sort(b+1,b+n+1),sort(c+1,c+n+1);
	for(int i=1;i<=n;i++)q.push({-(b[i]+c[pos[i]=1]),i});
	while(!q.empty()&&tp<k/B){
		d[++tp]=-q.top().fi;
		int u=q.top().se;q.pop();
		if(pos[u]<n)q.push({-(b[u]+c[++pos[u]]),u});
	}
	int l=0,r=inf,res=inf;
	while(l<=r){
		int mid=l+r>>1;
		if(check(mid))res=mid,r=mid-1;
		else l=mid+1;
	}
	printf("%lld\n",res);
}
```

### [L. Largest Triangle](https://qoj.ac/contest/1738/problem/9124)

取相邻的 $a_i,a_{i+1},a_{i+2}$ 海伦公式计算。

### [N. Number of Abbreviations](https://qoj.ac/contest/1738/problem/9126)

对于 $l<r$ 要求 $s_l\neq s_r$ 才能交换。

## [The 3rd Universal Cup. Stage 5: Moscow](https://qoj.ac/contest/1741)

###  [A. Counting Permutations](https://qoj.ac/contest/1741/problem/9130)

模 $m1$ 和 $m2$ 相等的可以排列。

### [B. Bookshelf Tracking](https://qoj.ac/contest/1741/problem/9131)

在最后一次 ```R```  操作前维护属于前半边还是后半边。

### [E. Building a Fence](https://qoj.ac/contest/1741/problem/9134)

分类讨论先做哪些，剩下的部分填到哪里。所有方式取 min。

### [F. Teleports](https://qoj.ac/contest/1741/problem/9135)

设 $dp_{l,r}$ 为区间 $[l,r]$ 的答案，枚举 $k$ 翻转，每次要么拆成更小的两个区间要么从相等长度的区间转移而来。先做第一种转移，第二种转移是同层最短路。

### [G. Exponent Calculator](https://qoj.ac/contest/1741/problem/9136)

$e^x=\sum_{n=0}^{\infty}\frac{x^n}{n!}$。每个 $n$ 要两次，$|x|$ 增大精度下降。计算 $e^{\frac{x}{2^B}}$ 后平方 $B$ 次。取 $n=7,B=10$。

### [I. Marks Sum](https://qoj.ac/contest/1741/problem/9138)

在后 $2000$ 位一定存在前缀和 $\bmod 2000=0/1$。 可以写为 $2000x+y$，$x\le 1000$，传 $2x+y$ 即可。

### [K. Train Depot](https://qoj.ac/contest/1741/problem/9140)

区间加，求区间 max。线段树合并。注意到修改的特殊性，合并时如果存在 $tree_x=tag_x$ 就一定不优，返回 $v$，极大减小常数。否则需要递归到 $tree_u=tag_u$ 且 $tree_v=tag_v$ 再比较 $tree_u$ 和 $tree_v$，理论复杂度依然正确但是常数极大。

### [M. Uniting Amoebas](https://qoj.ac/contest/1741/problem/9142)

答案为 $\sum a_i-\max a_i$。

## [The 3rd Universal Cup. Stage 6: Osijek](https://qoj.ac/contest/1762)

### [A. Coprime Array](https://qoj.ac/contest/1762/problem/9167)

特判 $gcd(s,x)=1$。除非 $s$ 为奇 $x$ 为偶，两步可行。否则多一个 $1$。随机第一个数，失败时对于一个 $x$ 的质因数 $p$ 有 $u\bmod p=0$ 或 $(s-u)\bmod p=0$，成功率为 $\prod_{p|x}\frac{p-2}{p}$。

### [B. Square Locator](https://qoj.ac/contest/1762/problem/9168)

设 B 坐标为 $(x,y)$，绕 A $(0,\sqrt{OA})$  顺时针或逆时针旋转 $90$ 度得 D。联立解方程。

### [C. -is-this-bitset-](https://qoj.ac/contest/1762/problem/9169)

将 $dep_u\le 12$ 的 $a_u$ 设为 $2^{20-dep_u+1}$，能表示出所有 $512$ 的倍数。对于 $dep_u>12$ 的 $u$ 设 $dp_{u,i}$ 为 $1\to u$ 链上 $a_x$ 的背包模 $512$ 为 $i$ 最小和为多少。记录修改的位置减少空间。

### [D. Cycle Game](https://qoj.ac/contest/1762/problem/9170)

警示：一个 $3\times 3$ 的全黑矩形也不合法。

先最外层加一圈全为白。等价于时刻白色区域八连通且每个黑点都与一个白点八连通。线段树分治，初始一些边在一个前缀时间存在。到叶子时检查如果该点为黑与其八连通的黑点会不会无法与白点八连通。如果不删这个点，有些边重新合法。

### [H. Game Design](https://qoj.ac/contest/1762/problem/9174)

设 $dp_{i,j}$ 为前 $i$ 层且有 $j$ 条边跨过 $i$ 的方案数。枚举 $i$ 的出入边向前向后转移。

### [I. Geometry Hacking](https://qoj.ac/contest/1762/problem/9175)

在凹多边形是可能会死。构造 $(-1,-1)$，$(1,0)$，$(i+2,-i)$，$(0,1)$，面积都相等且最小。

### [J. Non-Interactive Nim](https://qoj.ac/contest/1762/problem/9176)

后手要使先手操作时存在二进制最高位的 $a_i$ 只有一个。即后手操作时存在二进制最高位的 $a_i$ 只有 $2$ 个，将其中一个变为 $0$。从高位往低位删即可。

### [K. String and Nails](https://qoj.ac/contest/1762/problem/9177)

每次删左下角即可，按 $(x,y)$ 排序。

### [L. All-You-Can-Eat](https://qoj.ac/contest/1762/problem/9178)

维护当前选的 $sum$，$[0,200)$ 的集合，$[200,400)$ 的集合，$[400,600)$ 的集合。$sum>600$ 一定合法，否则每次加入 $x$ 时贪心调整三个集合。

## [The 3rd Universal Cup. Stage 7: Warsaw](https://qoj.ac/contest/1774)

### [A. Bus Analysis](https://qoj.ac/contest/1774/problem/9220)

代价 $2\to 1,6\to 3$。dp 套 dp。内层 dp，设 $dp_{i,j}$ 为前 $i$ 个点，代价为 $j$ 最长向后多远。只有 $mn,mn+1,mn+2$ 的 dp 值有用。外层 dp 设 $f_{i,x,y,z}$ 为前 $i$ 个点，$mn,mn+1,mn+2$ 的 dp 值分别在 $x,y,z$。当 mn 增加时增加答案。除了最开始只有 $a+20\le b,b+20\le c$ 的三元组有用。

```cpp
int n,a[maxn],ans;
int dp[2][76][76][76],pw[maxn],f[6],cur;
void inc(int &u,int v){((u+=v)>=mod)&&(u-=mod);}
void work(){
	n=read();
	for(int i=1;i<=n;i++)a[i]=read();
	pw[0]=1;for(int i=1;i<=n;i++)inc(pw[i]=pw[i-1],pw[i-1]);
	dp[0][0][0][0]=1;
	for(int i=1;i<=n;i++){
		int d=a[i]-a[i-1];
		mems(dp[i&1],0);
		if(i==1){
			int a=0,b=0,c=0;
			int aa=max(0ll,a-d),bb=max(0ll,b-d),cc=max(0ll,c-d);
			f[0]=aa,f[1]=bb,f[2]=cc,f[3]=f[4]=f[5]=0;
			for(int j=0;j<5;j++){
				f[j+1]=max(f[j+1],f[j]+20);
				if(j+3<6)f[j+3]=max(f[j+3],f[j]+75);
			}
			for(int j=1;j<=5;j++)f[j]=max(f[j],f[j-1]);
			inc(dp[i&1][f[0]][f[1]][f[2]],dp[cur][a][b][c]);
			int p=0;while(!f[p])p++;
			(ans+=dp[cur][a][b][c]*pw[n-i]%mod*p)%=mod;
			inc(dp[i&1][f[p]][f[p+1]][f[p+2]],dp[cur][a][b][c]);
		}
		for(int a=0;a<=75;a++){
			for(int b=a+20;b<=75;b++){
				for(int c=b+20;c<=75;c++)if(dp[cur][a][b][c]){
					int aa=max(0ll,a-d),bb=max(0ll,b-d),cc=max(0ll,c-d);
					f[0]=aa,f[1]=bb,f[2]=cc,f[3]=f[4]=f[5]=0;
					for(int j=0;j<5;j++){
						f[j+1]=max(f[j+1],f[j]+20);
						if(j+3<6)f[j+3]=max(f[j+3],f[j]+75);
					}
					for(int j=1;j<=5;j++)f[j]=max(f[j],f[j-1]);
					inc(dp[i&1][f[0]][f[1]][f[2]],dp[cur][a][b][c]);
					int p=0;while(!f[p])p++;
					(ans+=dp[cur][a][b][c]*pw[n-i]%mod*p)%=mod;
					inc(dp[i&1][f[p]][f[p+1]][f[p+2]],dp[cur][a][b][c]);
				}
			}
		}
		cur^=1;
	}
	printf("%lld\n",ans*2%mod);
}
```

### [B. Missing Boundaries](https://qoj.ac/contest/1774/problem/9221)

有不确定的端点先当成 $[p,p]$。按左端点排序，记录最多最少能放多少 $(-1,-1)$。

### [E. Express Eviction](https://qoj.ac/contest/1774/problem/9224)

将横纵坐标都小于等于 $2$ 的障碍连边，等价于不存在左下边界到右上边界的路径。最小割。

### [G. Game of Geniuses](https://qoj.ac/contest/1774/problem/9226)

答案为最大的行的最小值。

### [K. Routing K-Codes](https://qoj.ac/contest/1774/problem/9230)

设 $f_u$ 为 $u$ 为根的和，$sum_u=\sum_{v\in subtree(u)} 2^{dep_v}$，$mxdep_u$ 为最大深度。换根 dp。

### [L. Random Numbers](https://qoj.ac/contest/1774/problem/9231)

$a_i$ 期望为 $\frac{n}{2}$。所以检查长度为 $[1,B]$ 和 $[\frac{n}{2}-B,\frac{n}{2}+B]$ 的区间。

## [The 3rd Universal Cup. Stage 8: Cangqian](https://qoj.ac/contest/1780)

### [B. Simulated Universe](https://qoj.ac/contest/1780/problem/8933)

设 $dp_{i,j,k}$ 为前 $i$ 个，$i$ 之前有 $j$ 个没匹配的祝福，向后能匹配 $k$ 个祝福是否可行。把 $k$ 压入状态，即 $dp_{i,j}$ 表示最大的 $k$ 是多少。

### [C. Challenge NPC](https://qoj.ac/contest/1780/problem/8934)

构造二分图，$1,4$ 为左，$2,3$ 为右，$1\to 2,4\to 3$。然后奇数为左向之前的右连边，偶数为右向除了 $2\times i-1$ 之前的左连边。

### [D. Puzzle: Easy as Scrabble](https://qoj.ac/contest/1780/problem/8935)

一个格子如果有两个方向的要求则为矛盾格子，最后为空。队列维护矛盾格子向后推。

### [E. Team Arrangement](https://qoj.ac/contest/1780/problem/8936)

注意到划分数不多，搜出来每组大小后贪心检查。按组的大小从小往大，在一个人的左端点处将他的右端点加入优先队列，对每个组优先取队列中最小的。

### [H. Permutation](https://qoj.ac/contest/1780/problem/8939)

二分，时刻维护当前区间次大值位置。如果次大值和最大值在同一边则用一次，否则两次。每次将 $len$ 变为 $d\times len$ 用 $1$ 次，$(1-d)\times len$ 用 $2$ 次，取 $d=0.6$。

### [I. Piggy Sort](https://qoj.ac/contest/1780/problem/8940)

按位置之和排序，可以知道每张照片的先后顺序。$m>n$ 所以必然有一只猪出现在相邻照片的同一位置。枚举这个位置，检查是否存在这样一条直线经过 $m$ 个点。每只猪只可能出现在一条直线上。

### [J. Even or Odd Spanning Tree](https://qoj.ac/contest/1780/problem/8941)

找到最小生成树，只替换一条边，维护奇偶边权的路径最大值。

### [L. Challenge Matrix Multiplication](https://qoj.ac/contest/1780/problem/8943)

每次找一条从 $d_u>0$ 到 $d_v<0$ 的路径，$\sum |in_u-out_u|$ 减少 $2$。对于一条路径，$a_i$ 的答案包含 $a_{i+1}$ 的答案。从 $v$ 到 $u$ 依次 bfs 计算答案增量，每个点只经过一次。

```cpp
int n,m;
vector<int> e[maxn],g[maxn];
int d[maxn];
int st[maxn],tp;
int ans[maxn];
bool vis[maxn];
queue<int> q;
void work(){
	n=read();m=read();
	for(int i=1;i<=m;i++){
		int u=read(),v=read();
		e[u].pb(v),g[u].pb(v);
		d[u]++,d[v]--;
	}
	for(int t=1;t<=60;t++){
		int p=0;for(int i=1;i<=n;i++)if(d[i]>0){p=i;break;}
		if(!p)break;
		tp=0;d[p]--;
		while(d[p]>=0){
			st[++tp]=p;
			int v=e[p].back();e[p].pop_back();
			p=v;
		}
		st[++tp]=p;d[p]++;
		for(int i=1;i<=n;i++)vis[i]=0;
		int num=0;
		for(int i=tp;i;i--){
			q.push(st[i]),vis[st[i]]=1;
			while(!q.empty()){
				int u=q.front();q.pop();;++num;
				for(int v:g[u]){
					if(!vis[v])q.push(v),vis[v]=1;
				}
			}
			if(!ans[st[i]])ans[st[i]]=num;
		}
	}
	for(int i=1;i<=n;i++)if(!ans[i])ans[i]=1;
	for(int i=1;i<=n;i++)printf("%lld ",ans[i]);
}
```

## [The 3rd Universal Cup. Stage 9: Xi'an](https://qoj.ac/contest/1784)

### [A. An Easy Geometry Problem](https://qoj.ac/contest/1784/problem/9242)

差分，哈希 $a_i$ 和反过来的 $k-a_i$。线段树维护哈希值。二分答案。

### [E. Dominating Point](https://qoj.ac/contest/1784/problem/9246)

出度最大的点 $u$ 为支配点。设 $u$ 连向 $S$，$T$ 连向 $u$。如果存在 $x$ 使得 $dis(u,x)>2$，那么 $x$ 连向所有 $S$ 和 $u$，$d_x>d_u$，矛盾。如果 $T$ 为空，无解。否则 $T$ 组成的子图的支配点 $uu$ 也符合条件。如果 $uu$ 不是指向 $T$ 所有点，递归下去得到 $uuu$。否则指向 $uu$ 且属于 $S$ 的部分的支配点符合条件。

### [F. An Easy Counting Problem](https://qoj.ac/contest/1784/problem/9247)

lucas 定理，等价于拆成 $p$ 进制数下每一位的组合数之积。设 $dp_{i,j}$ 为填到前 $i$ 位，组合数之积为 $j$，$cnt_k$ 为一位时的答案。$dp_{i,j}=\sum_{kl\mod p=j} dp_{i,k}\times cnt_l$。满足结合律，快速幂优化。$p$ 为质数有原根，下标 $i$ 改为 $g^x\bmod p=i$ 的 $x$，加法卷积。

### [H. Elimination Series Once More](https://qoj.ac/contest/1784/problem/9249)

从小到大加入，每次更新 $n$ 个点。

### [I. Max GCD](https://qoj.ac/contest/1784/problem/9250)

质因数分解，枚举答案。可能贡献的 $(i,j,k)$ 满足 $i,j$ 是相邻的 $v$ 的倍数，双指针最近的 $k$。共 $O(n\sqrt n)$ 组。把 $(k,v)$ 挂在 $i$ 上，二位数点，做 $O(1)$ 插入 $O(\sqrt n)$ 查询的分块。

### [J. Graph Changing](https://qoj.ac/contest/1784/problem/9251)

$>3$ 一次后无解，分讨 $n$ 和 $t$。