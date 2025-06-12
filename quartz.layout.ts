import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// import { Options } from "./quartz/components/Explorer"
 
// export const mapFn: Options["mapFn"] = (node) => {
//   return node
// }
// export const filterFn: Options["filterFn"] = (node) => {
//   return node.slugSegment !== "tags"
// }
// export const sortFn: Options["sortFn"] = (a, b) => {
//   // mod: sort folders and files based on folderOrder and noteOrder
//   //      to find ways to retrieve folderOrder and noteOrder from frontmatter
//   //      we now have to include frontmatter in ContentDetails and linkIndex.set()
 
//   // extract order from frontmatter
//   const orderA = a.isFolder
//     ? a.data?.frontmatter?.folderOrder  as number | undefined
//     : new Date(a.data?.frontmatter?.created).getTime()  as number | undefined
//   const orderB = b.isFolder
//   ? b.data?.frontmatter?.folderOrder  as number | undefined
//   : new Date(b.data?.frontmatter?.created).getTime()  as number | undefined
 
//   // method I: folders first, then files, sort folders and files separately
//   // compare orderA and orderB, those undefined will be placed at the end
//   if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
//     if (orderA !== undefined && orderB !== undefined) {
//       // compare based on the order
//       if(a.isFolder)return orderA-orderB;
//       else return orderB - orderA;
//     } else if (orderA !== undefined) {
//       // move B to the back
//       return -1;
//     } else if (orderB !== undefined) {
//       // move A to the back
//       return 1;
//     } else {
//       // fall back to alphabetical order
//       return a.displayName.localeCompare(b.displayName);
//     }
//   }
//   // keep folders in front
//   if (!a.isFolder && b.isFolder) {
//     return 1
//   } else {
//     return -1
//   }
 
//   // method II: sort folders together with files, treat folders as files
//   // compare orderA and orderB, those undefined will be placed at the end
//   // if (orderA !== undefined && orderB !== undefined) {
//   //   return orderA - orderB
//   // } else if (orderA !== undefined) {
//   //   return -1
//   // } else if (orderB !== undefined) {
//   //   return 1
//   // } else {
//   //   return a.displayName.localeCompare(b.displayName)
//   // }
// }

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: 'giscus',
      options: {
        // from data-repo
        repo: 'yhddd123/yhddd123.github.io',
        // from data-repo-id
        repoId: 'R_kgDOO1OLMA',
        // from data-category
        category: 'Announcements',
        // from data-category-id
        categoryId: 'DIC_kwDOO1OLMM4CrAzF',
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

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      // mapFn,
      // filterFn,
      // sortFn,
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.RecentNotes({ limit: 5 }),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      // mapFn,
      // filterFn,
      // sortFn,
    }),
  ],
  right: [],
}
