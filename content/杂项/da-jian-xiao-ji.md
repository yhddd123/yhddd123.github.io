---
title: '搭建小记'
date: 2024-11-29 21:51:39
tags: []
published: true
hideInList: false
feature: 
isTop: false
---
### 搭建

[https://quartz.jzhao.xyz/](https://quartz.jzhao.xyz/)。

选 ```Empty Quartz```。或直接导入已有的 content 文件夹。

仓库 ```setting``` 里的 ```Pages``` 选 ```Github Actions```。

加 ```\.github\workflows\deploy.yml``` 文件。缺这个可以上传，无法更新到网站上。

上传到仓库。先 ```npx quartz sync --no-pull``` 再 ```npx quartz sync```。

```\quartz\static``` 里换 ```icon.png``` 改头像。

使用 [https://obsidian.md/](https://obsidian.md/) 写作。

可以直接用 Github Desktop 进行 clone 和 push。*待解决的问题：神秘原因无法完全从 upsteam 处更新*。 

### 同步时报错

```** Please tell me who you are.``` 报错。```.git/config```  最后加：

```
[user]
	email = gdfyhmyhm@gmail.com	
	user = yhddd123
```

```unable to access 'https://github.com//.git/': recv failure: connection was reset```。cmd 输入  ```git config --global http.proxy http://127.0.0.1:7890```。

```error: ebusy: resource busy or locked, rmdir```，不会解决，可以使用 GitHub Desktop 代替。

### 特殊语法

创建链接显示指定文本 ```[[real|text]]```。

```#Tag``` 指向 tag。

```![[]]``` 支持嵌入 pdf 文件。

非 markdown 标准 [分段](https://quartz.jzhao.xyz/plugins/HardLineBreaks)：两行紧贴着为半行。quartz.config.ts 的 ``` transformers``` 部分加 ```Plugin.HardLineBreaks(),```。

### 配置

[https://quartz.jzhao.xyz/](https://quartz.jzhao.xyz/)。

#### [Component：评论](https://quartz.jzhao.xyz/features/comments)

使用 giscus。quartz.layout.ts 的 ```afterBody``` 部分加获得的 ID 和密钥。

```quartzlayout.ts
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: 'giscus',
      options: {
        // from data-repo
        repo: 'yhddd123/qwerty',
        // from data-repo-id
        repoId: 'R_kgDONWbD1Q',
        // from data-category
        category: 'Announcements',
        // from data-category-id
        categoryId: 'DIC_kwDONWbD1c4Cl5bK',
      }
    }),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}
```

#### [frontmatter](https://draftz.felixnie.com/Digital-Garden/Sorting-Objects-in-Explorer#add-frontmatter-back)

文件属性。```title/date/...```。需要重新添加入 ```type ContentDetails``` 中。

```\quartz\plugins\emitters\contentIndex.tsx``` 内修改三处。

#### [sort!!!](https://draftz.felixnie.com/Digital-Garden/Sorting-Objects-in-Explorer#define-sortfn)

所有你所需要的：[Discord Community](https://discord.com/invite/cRFFHYye7t)。

对 Explorer 排序。文件夹字典序，文件按时间倒序，文件夹在文件之前。

```quartz.layout.ts
// mod: define Explorer functions
import { Options } from "./quartz/components/Explorer"
 
export const mapFn: Options["mapFn"] = (node) => {
  return node
}
export const filterFn: Options["filterFn"] = (node) => {
  return node.slugSegment !== "tags"
}
export const sortFn: Options["sortFn"] = (a, b) => {
  // mod: sort folders and files based on folderOrder and noteOrder
  //      to find ways to retrieve folderOrder and noteOrder from frontmatter
  //      we now have to include frontmatter in ContentDetails and linkIndex.set()
 
  // extract order from frontmatter
  const orderA = a.isFolder
    ? a.data?.frontmatter?.folderOrder  as number | undefined
    : new Date(a.data?.frontmatter?.created).getTime()  as number | undefined
  const orderB = b.isFolder
  ? b.data?.frontmatter?.folderOrder  as number | undefined
  : new Date(b.data?.frontmatter?.created).getTime()  as number | undefined
 
  // method I: folders first, then files, sort folders and files separately
  // compare orderA and orderB, those undefined will be placed at the end
  if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
    if (orderA !== undefined && orderB !== undefined) {
      // compare based on the order
      if(a.isFolder)return orderA-orderB;
      else return orderB - orderA;
    } else if (orderA !== undefined) {
      // move B to the back
      return -1;
    } else if (orderB !== undefined) {
      // move A to the back
      return 1;
    } else {
      // fall back to alphabetical order
      return a.displayName.localeCompare(b.displayName);
    }
  }
  // keep folders in front
  if (!a.isFolder && b.isFolder) {
    return 1
  } else {
    return -1
  }
 
  // method II: sort folders together with files, treat folders as files
  // compare orderA and orderB, those undefined will be placed at the end
  // if (orderA !== undefined && orderB !== undefined) {
  //   return orderA - orderB
  // } else if (orderA !== undefined) {
  //   return -1
  // } else if (orderB !== undefined) {
  //   return 1
  // } else {
  //   return a.displayName.localeCompare(b.displayName)
  // }
}
```

#### [RecentNotes](https://quartz.jzhao.xyz/features/recent-notes)

近期文章。可以放在 ```defaultContentPageLayout``` 的 ```right``` 中。```  Component.RecentNotes({ limit: 5 }),``` ，参数为最近几篇。