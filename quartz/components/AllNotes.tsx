import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { resolveRelative, FullSlug } from "../util/path"
import { formatDate } from "./Date"
import { QuartzPluginData } from "../plugins/vfile"

interface Options {
  title?: string
}

const defaultOptions: Options = {
  title: "所有笔记",
}

interface PageWithDateType extends QuartzPluginData {
  dateType?: "created" | "modified"
}

export default ((userOpts?: Partial<Options>) => {
  const AllNotes: QuartzComponent = (props: QuartzComponentProps) => {
    const { allFiles, fileData, displayClass, cfg } = props
    const opts = { ...defaultOptions, ...userOpts }

    // Filter out the current page itself
    const filteredFiles = allFiles.filter((file) => file.slug !== fileData.slug)

    // Create array with separate entries for created and modified dates
    const pagesWithDates: PageWithDateType[] = []
    for (const file of filteredFiles) {
      if (file.dates) {
        const createdDate = file.dates?.created as Date | undefined
        const modifiedDate = file.dates?.modified as Date | undefined

        // Add entry for created date
        if (createdDate && createdDate.getTime() !== 0) {
          pagesWithDates.push({
            ...file,
            dateType: "created",
          })
        }

        // Add entry for modified date (only if different from created)
        if (
          modifiedDate &&
          modifiedDate.getTime() !== 0 &&
          createdDate &&
          modifiedDate.getTime() !== createdDate.getTime()
        ) {
          pagesWithDates.push({
            ...file,
            dateType: "modified",
          })
        } else if (modifiedDate && modifiedDate.getTime() !== 0 && !createdDate) {
          pagesWithDates.push({
            ...file,
            dateType: "modified",
          })
        }
      } else {
        pagesWithDates.push(file)
      }
    }

    // Sort by date (modified or created, whichever is applicable)
    pagesWithDates.sort((f1, f2) => {
      const getRelevantDate = (f: PageWithDateType) => {
        if (f.dateType === "created") {
          return f.dates?.created as Date | undefined
        } else if (f.dateType === "modified") {
          return f.dates?.modified as Date | undefined
        }
        return (f.dates?.modified as Date | undefined) ?? (f.dates?.created as Date | undefined)
      }

      const date1 = getRelevantDate(f1)
      const date2 = getRelevantDate(f2)

      if (date1 && date2) {
        return date2.getTime() - date1.getTime()
      } else if (date1) {
        return -1
      } else if (date2) {
        return 1
      }

      // Fallback to alphabetical
      const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
      const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
      return f1Title.localeCompare(f2Title)
    })

    return (
      <div class={classNames(displayClass, "all-notes")}>
        <h1>{opts.title}</h1>
        <div class="page-listing">
          <ul class="section-ul">
            {pagesWithDates.map((page) => {
              const title = page.frontmatter?.title
              const tags = page.frontmatter?.tags ?? []
              const dateType = (page as PageWithDateType).dateType
              const relevantDate =
                dateType === "created"
                  ? (page.dates?.created as Date | undefined)
                  : (page.dates?.modified as Date | undefined)
              const dateLabel = dateType === "created" ? "Created" : "Modified"

              return (
                <li class="section-li">
                  <div class="section">
                    <p class="meta">
                      {relevantDate && (
                        <>
                          <span class="date-label">{dateLabel}: </span>
                          <time datetime={relevantDate.toISOString()}>
                            {formatDate(relevantDate, cfg.locale)}
                          </time>
                        </>
                      )}
                    </p>
                    <div class="desc">
                      <h3>
                        <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                          {title}
                        </a>
                      </h3>
                    </div>
                    <ul class="tags">
                      {tags.map((tag) => (
                        <li>
                          <a
                            class="internal tag-link"
                            href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                          >
                            {tag}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  AllNotes.css = `
.all-notes {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.all-notes h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.all-notes .page-listing {
  margin-top: 2rem;
}

.all-notes .date-label {
  font-weight: 600;
  color: var(--secondary);
  margin-right: 0.25rem;
}

.all-notes .meta {
  margin: 0.5rem 0;
  font-size: 0.9rem;
}
`

  return AllNotes
}) satisfies QuartzComponentConstructor
