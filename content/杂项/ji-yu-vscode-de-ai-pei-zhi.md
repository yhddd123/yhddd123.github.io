---
title: '基于 vscode 的 AI 配置'
date: 2025-06-23 18:45:34
tags: []
published: true
hideInList: false
feature: 
isTop: false
---
### [vscode](https://code.visualstudio.com/)

下载插件 ```Chinese (Simplified) (简体中文)```。```display language```。

crtl + ```+``` 调整个页面大小。

ctrl + 滚轮 调代码页面大小：设置，```enable mouse zoom```。

缺省源：```snippets```，```cpp.json```。

```"prefix"``` 指打出前缀后 ```enter``` 调用缺省源。代码部分用 ```"...",``` 括起来，缺省源里原来的 ```"``` 改为 ```\"```。```$1``` 表示鼠标的位置。

```json
{
    "#include": {
        "prefix": "#include",
        "body": [
			"#include<bits/stdc++.h>",
			"#define int long long",
			"#define mod 998244353ll",
			"#define pii pair<int,int>",
			"#define fi first",
			"#define se second",
			"#define pb push_back",
			"using namespace std;",
			"inline int read(){",
			"	int x=0,fl=1;char ch=getchar();",
			"	while(ch<'0'||ch>'9'){if(ch=='-')fl=-1;ch=getchar();}",
			"	while(ch>='0'&&ch<='9'){x=x*10+ch-'0';ch=getchar();}",
			"	return x*fl;",
			"}",
			"const int maxn=200010;",
			"",
			"int n;",
			"void work(){",
			"	n=read();$1",
			"}",
			"",
			"int T;",
			"signed main(){",
			"	// freopen(\".in\",\"r\",stdin);",
			"	// freopen(\".out\",\"w\",stdout);",
			"	",
			"	T=1;",
			"	while(T--)work();",
			"}",
        ]
    }
}
```

编译直接终端命令。ctrl + shift + ``` ` ``` 新建终端，ctrl + shift + ```5``` 分屏，ctrl + ```C``` 终止命令。

### [cursor](https://www.cursor.com/ja)

实则是 fork 了 vscode 的 AI。

免费两周，开点挂。