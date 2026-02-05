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

interface PageEntry {
  file: QuartzPluginData
  date: Date
  dateType: "created" | "modified"
}

function isValidDate(d: any): boolean {
  if (!d) return false
  if (!(d instanceof Date)) d = new Date(d)
  const time = d.getTime()
  return !isNaN(time) && time !== 0
}

export default ((userOpts?: Partial<Options>) => {
  const AllNotes: QuartzComponent = (props: QuartzComponentProps) => {
    const { allFiles, fileData, displayClass, cfg } = props
    const opts = { ...defaultOptions, ...userOpts }

    const filteredFiles = allFiles.filter((file) => file.slug !== fileData.slug)
    const entries: PageEntry[] = []
    
    for (const file of filteredFiles) {
      if (!file.dates) continue

      const createdDate = file.dates.created
      const modifiedDate = file.dates.modified

      // Add created date entry
      if (isValidDate(createdDate)) {
        entries.push({
          file,
          date: createdDate instanceof Date ? createdDate : new Date(createdDate),
          dateType: "created",
        })
      }

      // Add modified date entry (only if different from created)
      if (isValidDate(modifiedDate)) {
        const modDate = modifiedDate instanceof Date ? modifiedDate : new Date(modifiedDate)
        const createdTime = isValidDate(createdDate) ? (createdDate instanceof Date ? createdDate : new Date(createdDate)).getTime() : -1
        
        if (modDate.getTime() !== createdTime) {
          entries.push({
            file,
            date: modDate,
            dateType: "modified",
          })
        }
      }
    }

    // Sort by date descending
    entries.sort((a, b) => b.date.getTime() - a.date.getTime())

    return (
      <div class={classNames(displayClass, "all-notes")}>
        <h1>{opts.title}</h1>
        <div class="page-listing">
          <ul class="section-ul">
            {entries.map((entry) => {
              const { file, date, dateType } = entry
              const title = file.frontmatter?.title
              const tags = file.frontmatter?.tags ?? []
              const dateLabel = dateType === "created" ? "Created" : "Modified"

              return (
                <li class="section-li">
                  <div class="section">
                    <p class="meta">
                      <span class="date-label">{dateLabel}: </span>
                      <time datetime={date.toISOString()}>
                        {formatDate(date, cfg.locale)}
                      </time>
                    </p>
                    <div class="desc">
                      <h3>
                        <a href={resolveRelative(fileData.slug!, file.slug!)} class="internal">
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
