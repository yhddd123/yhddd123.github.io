import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { PageList, byDateAndAlphabetical } from "./PageList"
import { classNames } from "../util/lang"

interface Options {
  title?: string
}

const defaultOptions: Options = {
  title: "所有笔记",
}

export default ((userOpts?: Partial<Options>) => {
  const AllNotes: QuartzComponent = (props: QuartzComponentProps) => {
    const { allFiles, fileData, displayClass, cfg } = props
    const opts = { ...defaultOptions, ...userOpts }

    // Filter out the current page itself and sort by date
    const filteredFiles = allFiles.filter((file) => file.slug !== fileData.slug)
    const pages = filteredFiles.sort(byDateAndAlphabetical(cfg))

    const modifiedProps = {
      ...props,
      allFiles: pages,
    }

    return (
      <div class={classNames(displayClass, "all-notes")}>
        <h1>{opts.title}</h1>
        <div class="page-listing">
          <PageList {...modifiedProps} sort={byDateAndAlphabetical(cfg)} />
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
`

  return AllNotes
}) satisfies QuartzComponentConstructor
