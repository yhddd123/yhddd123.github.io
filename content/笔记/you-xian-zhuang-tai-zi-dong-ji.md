---
title: '有限状态自动机'
date: 2026-01-27 11:50:08
tags: [tricks,dp]
published: true
hideInList: false
feature: 
isTop: false
---
> 给定某种操作，做 dp of dp 或数据结构维护区间结果。

直接建自动机，可以规避可能的巨大思维量。

称两种状态等价，当且仅当加上任意长度的相同状态后得到的结果相同。

对于比较简单的操作：可以认为，自动机的大小不大或有循环节；可以认为，加上一个较小长度进行判断就可以区分所有等价类。

然后 bfs，为每个状态记一个代表元。

#### [P12294](https://www.luogu.com.cn/problem/P12294) & [Q12010](https://qoj.ac/contest/2079/problem/12010)

> 给定一个三目运算表。每次可以选三个相邻的数，替换为运算的结果。
>
> 构造方案、对带 $\text{?}$ 的计数。

求能否表示出 $\text{0,1,00,01,10,11}$ 的 $6$ 个自动机。

判断两个状态是否等价可以加上所有 $\le m=6$ 的状态判断能否表示的状态是否相同。

```cpp
struct automation{
	int to;
	int f[110][110][6];
	bool check(int n,int s){
		for(int i=1;i<=n;i++){
			for(int j=i;j<=n;j++){
				for(int o=0;o<6;o++)f[i][j][o]=0;
			}
		}
		for(int i=1;i<=n;i++)f[i][i][(s>>i-1)&1]=1;
		for(int len=2;len<=n;len++){
			for(int i=1,j=len;j<=n;i++,j++){
				for(int k=i;k<j;k++){
					for(int o1=0;o1<6;o1++)if(f[i][k][o1]){
						for(int o2=0;o2<6;o2++)if(f[k+1][j][o2]){
							if(o1<2&&o2<2)f[i][j][(o1|(o2<<1))+2]=1;
							else if(o1<2)f[i][j][op[o1|((o2-2)<<1)]]=1;
							else if(o2<2)f[i][j][op[(o1-2)|(o2<<2)]]=1;
							else{
								f[i][j][(((o1-2)&1)|(op[((o1-2)>>1)|((o2-2)<<1)]<<1))+2]=1;
								f[i][j][(op[(o1-2)|(((o2-2)&1)<<2)]|((o2-2)&2))+2]=1;
							}
						}
					}
				}
			}
		}
		// cout<<n<<" "<<s<<" "<<f[1][n][to]<<"\n";
		return f[1][n][to];
	}
	struct node{
		int len,sta;
		int son[2];
		bool ok;
		__int128 nxt;
	}dfa[55];int idx;
	node init(int l,int s){
		node res; 
		res.len=l,res.sta=s;
		res.son[0]=res.son[1]=0;
		res.ok=check(l,s);
		res.nxt=0;
		for(int i=0,cnt=0;i<=6;i++){
			for(int t=0;t<(1<<i);t++){
				if(check(l+i,s|(t<<l)))res.nxt|=(__int128)1<<cnt;
				cnt++;
			}
		}
		return res;
	}
	void init(int _to){
		to=_to;
		dfa[idx=0]=init(0,0);
		for(int id=0;id<=idx;id++){
			for(int c=0;c<2;c++){
				int l=dfa[id].len+1,s=dfa[id].sta|(c<<l-1);
				node nw=init(l,s);
				int p=-1;for(int j=0;j<=idx;j++)if(nw.nxt==dfa[j].nxt)p=j;
				if(p==-1)dfa[++idx]=nw,p=idx;
				dfa[id].son[c]=p;
			}
			// cout<<dfa[id].len<<" "<<dfa[id].sta<<" "<<dfa[id].son[0]<<" "<<dfa[id].son[1]<<" a\n";
		}
		// cout<<idx<<"\n";
	}
}a[6];
```

#### [P14256](https://www.luogu.com.cn/problem/P14256)

> 石头剪刀布，每次选相邻的操作，保留胜者，最大化平局数量。
>
> 对带 $\text{?}$ 的计数。

判断两个状态是否等价可以加上所有 $\le m=6$ 的状态判断增量是否相同。

```cpp
namespace automation{
	int f[110][110][3];
	int op(int u,int v){return (u==(v+1)%3?u:v);}
	map<vector<int>,int> mp;
	int calc(vector<int> a){
		if(mp.find(a)!=mp.end())return mp[a];
		int n=a.size();
		for(int i=1;i<=n;i++){
			for(int c=0;c<3;c++)f[i][i][c]=-inf;
			f[i][i][a[i-1]]=0;
		}
		for(int len=2;len<=n;len++){
			for(int i=1,j=len;j<=n;i++,j++){
				for(int c=0;c<3;c++)f[i][j][c]=-inf;
				for(int k=i;k<j;k++){
					for(int c1=0;c1<3;c1++){
						for(int c2=0;c2<3;c2++)f[i][j][op(c1,c2)]=max(f[i][j][op(c1,c2)],f[i][k][c1]+f[k+1][j][c2]+(c1==c2));
					}
				}
			}
		}
		int ans=0;for(int c=0;c<3;c++)ans=max(ans,f[1][n][c]);
		return mp[a]=ans;
	}
	struct node{
		vector<int> sta;
		pii son[3];
		int val;
	}dfa[maxn*6];
	int pw[8]={1,3,9,27,81,243,729,6561};
	bool operator==(node u,node v){
		for(int s=0;s<pw[6];s++){
			vector<int> a=u.sta,b=v.sta;
			for(int i=0;i<6;i++)a.pb((s/pw[i])%3),b.pb((s/pw[i])%3);
			if(calc(a)-u.val!=calc(b)-v.val)return false;
		}
		return true;
	}
	int idx;
	void build(int T){
		int lst=0;
		while(T--){
			int tmp=idx;
			for(int i=lst;i<=tmp;i++){
				for(int j=0;j<3;j++){
					node nw=dfa[i];
					nw.sta.pb(j);nw.val=calc(nw.sta);
					int p=-1;
					for(int k=0;k<=idx;k++)if(nw==dfa[k]){p=k;break;}
					if(p==-1)dfa[++idx]=nw,p=idx;
					dfa[i].son[j]={p,nw.val-dfa[i].val};
				}
			}
			lst=tmp+1;
		}
	}
	int id(int i){
		if(i<=3)return i-1;
		return i+2;
	}
	void init(int N){
		for(int i=1;i<=3;i++)dfa[i-1]=dfa[i];
		for(int i=idx;i>=4;i--)dfa[i+2]=dfa[i];
		idx+=2;
		for(int i=0;i<=idx;i++){
			for(int j=0;j<3;j++)dfa[i].son[j].fi=id(dfa[i].son[j].fi);
		}
		// for(int i=0;i<=idx;i++)if(i<3||i>=6){
			// cout<<i<<" ";
			// for(int j=0;j<3;j++)cout<<dfa[i].son[j].fi<<" "<<dfa[i].son[j].se<<" ";cout<<"\n";
			// for(int v:dfa[i].sta)cout<<v;cout<<"\n";
		// }
		for(int i=30;i<=N;i++){
			dfa[i]=dfa[i-18];
			for(int j=0;j<3;j++)dfa[i].son[j].fi+=18;
		}
	}
}
```

#### [Q8646](https://qoj.ac/contest/1635/problem/8646)

> 给定一个序列和 $q$ 次询问，自动机转移的字符由询问给出的参数和序列对应位决定。问能不能表示出某个状态。

建出自动机，上数据结构，可能需要观察自动机性质。

[[joisc-ji-lu#^df6867|here]]。
