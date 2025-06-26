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

缺省源：```User snippets```，```cpp.json```。

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

快捷键编译：```.vscode/tasks.json```。

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            //给task起的一个名称
            "label": "build",
            //我们要执行shell命令
            "type": "shell",
            //shell命令
            "command": "gcc",
            //shell命令参数
            "args": [
                "./test.cpp",
                "-o./test"
            ],
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "presentation": {
                //shell命令输出的内容并不弹出来提醒
                "reveal": "silent"
            }
        },
        {
            "label": "run",
            "type": "shell",
            "command": "./test",
            //依赖build task(刚刚创建的那个)，执行该task之前先执行build
            "dependsOn": [
                "build"
            ],
            "presentation": {
                "echo": true,
                "reveal": "always",
                //自动聚焦
                "focus": true,
                //共享控制台，利用之前的控制台，并不重新创建
                "panel": "shared",
                "showReuseMessage": true,
                //启动之前清理控制台输出
                "clear": true
            }
        }
    ]
}
```

```open keyboard shortcut```：

```json
    {
        "key": "ctrl+shift+r",
        "command": "workbench.action.tasks.runTask",
        "args": "run"
    }
```

### [cursor](https://www.cursor.com/ja)

实则是 fork 了 vscode 的 AI。

非常好用！

免费两周，开点挂即可。