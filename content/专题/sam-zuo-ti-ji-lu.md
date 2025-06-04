---
title: SAM 做题记录
date: 2024-01-01 22:00:40
tags:
  - 做题记录
  - 字符串
published: true
hideInList: false
feature: 
isTop: false
---
## 1.基本

SAM 能表示某个字符串的所有子串，且正好是所有子串。

```cpp
int len[maxn],lnk[maxn];
int a[maxn][26];
int p=1,cur=1;
int ed[maxn];
void insert(int c){
	int nd=++cur;
	len[nd]=len[p]+1;
	while(p&&!a[p][c])a[p][c]=nd,p=lnk[p];
	if(!p){lnk[p=nd]=1;return ;}
	int q=a[p][c];
	if(len[p]+1==len[q])lnk[nd]=q;
	else{
		int cl=++cur;
		len[cl]=len[p]+1;lnk[cl]=lnk[q];
		memcpy(a[cl],a[q],sizeof(a[q]));
		lnk[nd]=lnk[q]=cl;
		while(p&&a[p][c]==q)a[p][c]=cl,p=lnk[p];
	}
	p=nd;
}
```

## 2.应用

### [P3804](https://www.luogu.com.cn/problem/P3804)

> 求子串出现次数乘上子串长度的最大值。

每个节点对应多个子串，最长的长为 $len_u$。节点的 endpos 大小为出现次数。

先把每个前缀所属的点的 siz 设为 $1$，这些点是前缀对应 edp 在 parent tree 上出现的最深的点，因为无法在这些前缀前面加东西。parent tree 上求和即可。

```cpp
	int siz[maxn];
	void insert(int c){
		int nd=++cur;
		a[nd].len=a[p].len+1;
		siz[nd]=1;
		...
	}
	void dfs(int u){
		for(int i=head[u];i;i=e[i].nxt){
			int v=e[i].to;
			dfs(v);
			siz[u]+=siz[v];
		}
	}
	int calc(){
		int res=0;
		for(int i=2;i<=cur;i++)add(a[i].lnk,i);
		dfs(1);
		for(int i=2;i<=cur;i++)if(siz[i]>1)res=max(res,siz[i]*a[i].len);
		return res;
	}
```


### [P2408](https://www.luogu.com.cn/problem/P2408)

> 不同子串个数。

#### 1.dp

在后缀自动机上从根节点开始的每一条路径都是一个子串，求出路径数量，便可以求出子串数。建 SAM dp。

```cpp
void dfs(int u){
	if(dp[u])return ;
	dp[u]=1;
	for(int i=head[u];i;i=e[i].nxt){
		int v=e[i].to;dfs(v);
		dp[u]+=dp[v];
	}
}
```

#### 2.定义

SAM 一个节点对应的长度分别算贡献。parent tree 上，$minlen_u=maxlen_{lnk_u}+1$。对于每个 $i$，$ans$ 加上 $len_u-len_{lnk_u}$。

```cpp
	for(int i=1;i<=n;i++)insert(c[i]-'a'),ans+=len[p]-len[lnk[p]];
```

对于每个 $i$ 输出答案：[P4070](https://www.luogu.com.cn/problem/P4070)

### [P3975](https://www.luogu.com.cn/problem/P3975)

> 字典序第 $k$ 小子串。

$siz_i$ 表示 $i$ 所对应字符串集合的出现次数。$t=0$ 时 $siz_i=1$；$t=1$ 时 dfs 沿 parent tree 累加。dp 方案数。沿 SAM 走，走的边为答案。

### [SP1811](https://www.luogu.com.cn/problem/SP1811)

> 两个字符串的最长公共子串长度。

对 $s$ 建 SAM，在上面匹配 $t$。当前节点为 $p$，已匹配长度为 $l$。对于当前字符 $c$。

- 如果 $p$ 有出边 $c$，$p=a_{p,c}$，$l$ 加 $1$。

- 否则向上跳 $p=lnk_p$，$l$ 减 $1$，当 $l=0$ 结束。

```cpp
void go(int &p,int c,int &l){
	while(1){
		if(a[p][c]){
			p=a[p][c],l++;
			break;
		}
		if(!l)break;
		l--;
		if(l==len[lnk[p]])p=lnk[p];
	}
}
```

### [P5546](https://www.luogu.com.cn/problem/P5546)

> $n$ 个字符串的最长公共子串长度。

^3abf7c

以 $s_1$ 为匹配串，$s_i$ 建 SAM。令 $sl_j$ 表示 $s_1[1...j]$ 能匹配的最长长度，每个 $s_i$ 取 min。最后对所有 $j$ 取 max。

### [CF235C](https://www.luogu.com.cn/problem/CF235C)

> 求每个询问串的所有循环同构在主串中出现的次数总和。

向后遍历同上题，现在需要删掉开头。

删除开头 $l$ 减 $1$，如果 $l=len_{lnk_p}$，那 $p$ 就不能再在这个节点，$p=lnk_p$。

```cpp
void del(int &pos,int &l,int n){
	if(l>n&&--l==len[lnk[pos]])pos=lnk[pos];
}
```

### [P6640](https://www.luogu.com.cn/problem/P6640)

> 询问 $s[l...r]$ 和 $t$ 的最长公共子串长度。

对 $t$ 建 SAM，$s$ 跑匹配，$sl_i$ 为 $s[1...i]$ 的最长匹配长度。

$$ans=max_{i=l}^r min(sl_i,i-l+1)$$

拆开 min。找出 $sl_i\leq i-l+1$，$i-sl_i+1$ 单调。二分 $mid$ 使 $[l,mid-1]$ 中取 $i-l+1$，$ans=mid-l$；$[mid,r]$ 中取 $sl_i$ ，维护静态区间最大。

### [P4094](https://www.luogu.com.cn/problem/P4094)

> 子串 $s[a...b]$ 的所有子串和 $s[c...d]$ 的最长公共前缀的长度的最大值。

二分答案 $mid$，询问 $s[c...c+mid-1]$ 是否在 $s[a...b]$ 中出现。设节点 $p$ 表示 $s[c,c+mid-1]$，问 $p$ 的 endpos 是否在 $[a+mid-1,b]$ 中有元素。

记录 $p$ 表示 $s[1...i]$，倍增 parent tree 跳到 $len_p\leq mid$。动态开点线段树合并 endpos 集合。

注意，是在 DAG 上线段树合并，不能破坏原有结构，新建点。

```cpp
int n,m;
char c[maxn];
namespace sgt{
#define mid (l+r>>1)
#define ls lc[nd]
#define rs rc[nd]
    bool tree[maxn<<5];
    int lc[maxn<<5],rc[maxn<<5];
    int rt[maxn],idx;
    void updata(int &nd,int l,int r,int p,int w){
        if(!nd)nd=++idx;
        if(l==r){tree[nd]=w;return ;}
        if(p<=mid)updata(ls,l,mid,p,w);
        else updata(rs,mid+1,r,p,w);
        tree[nd]=tree[ls]|tree[rs];
    }
    int merge(int u,int v,int l,int r){
        if(!u||!v)return u|v;
        int nd=++idx;
        if(l==r){tree[nd]=tree[u]|tree[v];return nd;}
        ls=merge(lc[u],lc[v],l,mid);
        rs=merge(rc[u],rc[v],mid+1,r);
        tree[nd]=tree[ls]|tree[rs];
        return nd;
    }
    bool query(int nd,int l,int r,int ql,int qr){
        if(l>=ql&&r<=qr)return tree[nd];
        if(qr<=mid)return query(ls,l,mid,ql,qr);
        if(ql>mid)return query(rs,mid+1,r,ql,qr);
        return query(ls,l,mid,ql,qr)|query(rs,mid+1,r,ql,qr);
    }
#undef mid
}
struct sam{
    int head[maxn],tot;
    struct edgend{
        int nxt,to;
    }e[maxn<<1];
    void add(int u,int v){e[++tot]={head[u],v};head[u]=tot;}
    int f[maxn][19];
    void dfs(int u){
        for(int i=1;i<19;i++)f[u][i]=f[f[u][i-1]][i-1];
        for(int i=head[u];i;i=e[i].nxt){
            int v=e[i].to;
            f[v][0]=u;dfs(v);
            sgt::rt[u]=sgt::merge(sgt::rt[u],sgt::rt[v],1,n);
        }
    }
    void build(char *c,int n){
        for(int i=1;i<=n;i++)insert(c[i]-'a');
        for(int i=1,nd=1;i<=n;i++){
            nd=a[nd][c[i]-'a'];
            ed[i]=nd;
        }
        for(int i=2;i<=cur;i++)add(lnk[i],i);
        dfs(1);
    }
    int find(int l,int r){
        int res=ed[r];
        for(int i=18;~i;i--)if(f[res][i]&&len[f[res][i]]>=r-l+1)res=f[res][i];
        return res;
    }
}s;
bool check(int a,int b,int l,int r){
    int pos=s.find(l,r);
    return sgt::query(sgt::rt[pos],1,n,a+r-l,b);
}
```

### [P5576](https://www.luogu.com.cn/problem/P5576)

> [[sam-zuo-ti-ji-lu#^3abf7c|P5546]] 做区间询问。

选 $s$ 作为文本串对其他所以 $t$ 建的 SAM 匹配。复杂度 $O(|s|n)$，$\sum |s|$ 为定值，$|s|$ 越小越好。

猫树分治 $S(l,r,ql,qr)$，选最小的 $s_k$ 处理跨过 $k$ 的询问。$s_k$ 过长复杂度退化，不能取中点分治。

取阈值 $lim$，长度小于 $lim$ 的为短串，在短串中取中心。如果没有短串，$lim=lim\times 2$。对于 $lim$，最多分治 $\log n$ 次，区间大小 $\frac{\sum len}{lim}$，匹配串 $s$ 长 $lim$。共 $\log {\sum len}$ 种 $lim$，复杂度 $O(\sum len+m)\log n\log len$。

开一个大数组，然后用指针标记位置。

```cpp
int _sl[maxn],*sl[maxn],*sum;
void sovle(int l,int r,int ql,int qr,int lim){
	if(ql>qr)return ;
	int tot=0;
	while(1){
		for(int i=l;i<=r;i++)if(siz[i]<=lim)tmp[++tot]=i;
		if(tot)break;lim<<=1;
	}
	int mid=tmp[1+tot>>1],qmid=ql-1;
	sum=_sl;
	for(int i=l;i<=r;i++){
		sl[i]=sum;
		sum+=siz[mid]+1;
	}
	for(int j=0;j<siz[mid];j++)sl[mid][j]=j+1;
	for(int i=mid+1;i<=r;i++){
		int p=rt[i],d=0;
		for(int j=0;j<siz[mid];j++){
			int c=s[mid][j]-'0';
			go(p,c,d);
			sl[i][j]=min(sl[i-1][j],d);
		}
	}
	for(int i=mid-1;i>=l;i--){
		int p=rt[i],d=0;
		for(int j=0;j<siz[mid];j++){
			int c=s[mid][j]-'0';
			go(p,c,d);
			sl[i][j]=min(sl[i+1][j],d);
		}
	}
	int tr=0;
	for(int i=ql;i<=qr;i++){
		int u=id[i];
		if(qq[u].r<mid)id[++qmid]=u;
		else if(qq[u].l>mid)tmp[++tr]=u;
		else{
			for(int j=0;j<siz[mid];j++)ans[u]=max(ans[u],min(sl[qq[u].l][j],sl[qq[u].r][j]));
		}
	}
	for(int i=1;i<=tr;i++)id[qmid+i]=tmp[i];
	qr=qmid+tr;
	sovle(l,mid-1,ql,qmid,lim);sovle(mid+1,r,qmid+1,qr,lim);
}
```

### [CF666E](https://www.luogu.com.cn/problem/CF666E)

> 求 $s[pl,pr]$ 在 $T[l,r]$ 中哪个串出现次数最多。

对 $t$ 建广义 SAM，$s$ 在上面跑匹配。如果 $s[pl,pr]$ 在 $t$ 中出现，倍增找到 $s[pl,pr]$ 对应的节点。每个节点动态开点线段树，下标为 $t$ 的编号，记录出现次数最大值和下标，线段树合并。

### [P4248](https://www.luogu.com.cn/problem/P4248)

> $t_i=s[i,n]$。求 $\sum_{i<j}len_{t_i}+len_{t_j}-2\times lcp(t_i,t_j)$。

$ans=\frac{n\times (n-1)\times (n+1)}{2}-2\times \sum_{i<j} lcp(t_i,t_j)$。lcp 看作公共前缀数量。记 $siz_u$ 表示节点 endpos 集合大小，对每个节点计算贡献，有 $num_u=len_u-len_{fa_u}$ 个串，每个串出现在 $siz_u$ 个后缀的前缀中，贡献 $num_u\times \frac{siz_u\times (siz_u-1)}{2}$。

### [P2178](https://www.luogu.com.cn/problem/P2178)

翻转建 SAM，lcp 转换为最长公共后缀，即 parent tree 上的 lca 的 len。

### [P7361](https://www.luogu.com.cn/problem/P7361)

> 求 $[l,r]$ 中出现至少两次的子串的最长长度。

用 set 启发式合并 edp 集合，一个长度的贡献为相邻的 edp 点。贡献为 $min(pl-l+1,len)$。离线，扫描线。