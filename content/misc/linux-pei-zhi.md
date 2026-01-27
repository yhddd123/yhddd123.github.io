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

[[ji-yu-vscode-de-ai-pei-zhi|vscode 配置]]。

---

### 魔法

[https://github.com/wnlen/clash-for-linux](https://github.com/wnlen/clash-for-linux)。

把下载包弄下来。显示隐藏的文件。

把 ```.env``` 文件弄到 vscode 里编辑。

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