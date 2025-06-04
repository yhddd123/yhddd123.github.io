---
title: 'linux 配置'
date: 2025-05-04 11:48:54
tags: []
published: true
hideInList: false
feature: 
isTop: false
---
### 下载软件

下载 ```.deb``` 文件。```sudo apt install '/home/noi/下载/xxx.deb'```。输入密码。

唐氏打开方式：在 ```/usr/bin/``` 中找到文件，```'/usr/bin/xxx' --no-sandbox```。

正确打开方式：在应用中找到图标。

---

### vscode

crtl + ```+``` 调整个页面大小。

ctrl + 滚轮 调代码页面大小：ctrl + ```,``` 打开设置，输入 ```mouse zoom```，选开启。

缺省源：左下角设置，User snippets，```cpp.json```。

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

---

### 魔法

[https://github.com/wnlen/clash-for-linux](https://github.com/wnlen/clash-for-linux)。

把下载包弄下来。显示隐藏的文件。

把 ```.env``` 文件弄到 vscode 里编辑。或者终端 ```vim .env```，vim 中 ```:w``` 保存，```:q``` 退出。```CLASH_URL``` 填链接。

```.env
# Clash 订阅地址
export CLASH_URL=''
export CLASH_SECRET=''
```

启动！```sudo bash start.sh```。输入电脑密码。

```bash
Clash Dashboard 访问地址：http://<ip>:9090/ui
Secret：xxxxxxxxxxxxx
```

开启：```proxy_on```。关闭： ```proxy_off```。

打开 [https://clash.razord.top](https://clash.razord.top)，输入密钥。在网页中测速和选节点。

左上角打开电脑设置，网络，网络代理，手动，```http```  和 ```https``` 都填 ```127.0.0.1:7890```，```socks``` 填 ```127.0.0.1:7891```。

#### greasyfork

如果没有魔法要上 [greasyfork](https://greasyfork.org/zh-CN)。浏览器，设置，隐私与安全，安全，高级，选择 DNS 提供商，改为 cloudflare。

但此时其他一些网站会爆炸，用完改回默认。