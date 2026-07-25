import type { ReactNode } from "react"
import Image from "next/image"
import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"
import { slugifyHeading } from "@/lib/writeups"
import { WriteupRuneClue } from "@/components/ctf-evidence"

function textFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children)
  if (Array.isArray(children)) return children.map(textFromChildren).join("")
  if (children && typeof children === "object" && "props" in children) {
    return textFromChildren((children as { props: { children?: ReactNode } }).props.children)
  }
  return ""
}

const components: Components = {
  h2: ({ children }) => {
    const text = textFromChildren(children)
    return <h2 id={slugifyHeading(text)} className="scroll-mt-24 border-b border-primary/20 pb-3 pt-8 text-2xl font-bold text-primary">{children}</h2>
  },
  h3: ({ children }) => {
    const text = textFromChildren(children)
    return <h3 id={slugifyHeading(text)} className="scroll-mt-24 pt-5 text-xl font-bold text-secondary">{children}</h3>
  },
  h4: ({ children }) => <h4 className="pt-4 text-lg font-semibold text-foreground">{children}</h4>,
  p: ({ children }) => <p className="leading-7 text-muted-foreground">{children}</p>,
  a: ({ href = "", children }) => {
    const external = href.startsWith("http://") || href.startsWith("https://")
    return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className="text-secondary underline decoration-secondary/40 underline-offset-4 transition hover:text-primary">{children}</a>
  },
  ul: ({ children }) => <ul className="ml-5 list-disc space-y-2 text-muted-foreground marker:text-primary">{children}</ul>,
  ol: ({ children }) => <ol className="ml-5 list-decimal space-y-2 text-muted-foreground marker:text-primary">{children}</ol>,
  blockquote: ({ children }) => <blockquote className="rounded-r-md border-l-2 border-secondary bg-secondary/5 px-5 py-3 text-muted-foreground">{children}</blockquote>,
  table: ({ children }) => <div className="overflow-x-auto rounded-md border border-primary/25"><table className="w-full min-w-[36rem] border-collapse text-left text-sm">{children}</table></div>,
  thead: ({ children }) => <thead className="bg-primary/10 text-primary">{children}</thead>,
  th: ({ children }) => <th className="border-b border-primary/25 px-4 py-3 font-semibold">{children}</th>,
  td: ({ children }) => <td className="border-b border-primary/10 px-4 py-3 align-top text-muted-foreground">{children}</td>,
  pre: ({ children }) => (
    <pre className="overflow-hidden rounded-lg border border-slate-700/80 bg-[#080b11] text-sm leading-6 text-slate-200 shadow-[0_14px_35px_rgba(0,0,0,0.28)]">
      <span aria-hidden="true" className="flex h-9 items-center gap-1.5 border-b border-slate-700/70 bg-[#10141d] px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[10px] uppercase tracking-[0.18em] text-slate-500">code</span>
      </span>
      <span className="block overflow-x-auto p-5">{children}</span>
    </pre>
  ),
  code: ({ className, children }) => className ? <code className={`${className} font-mono text-slate-200`}>{children}</code> : <code className="rounded border border-secondary/20 bg-secondary/8 px-1.5 py-0.5 text-[0.9em] text-secondary">{children}</code>,
  hr: () => <hr className="my-8 border-primary/20" />,
  img: ({ src = "", alt = "" }) => {
    const imageSource = typeof src === "string" ? src : ""
    if (!imageSource) return null
    return (
      <a href={imageSource} target="_blank" rel="noreferrer" className="my-6 block overflow-hidden rounded-lg border border-primary/25 bg-black/40 p-2 transition hover:border-secondary">
        <Image src={imageSource} alt={alt || "Writeup evidence screenshot"} width={1600} height={900} sizes="(min-width: 1024px) 850px, 100vw" className="h-auto w-full rounded object-contain" />
      </a>
    )
  },
}

export function MarkdownArticle({ content, slug }: { content: string; slug?: string }) {
  const articleComponents: Components = {
    ...components,
    p: ({ children }) => {
      const text = textFromChildren(children)
      return (
        <>
          <p className="leading-7 text-muted-foreground">{children}</p>
          {slug === "ecb-oracle" && text.startsWith("Here’s the clever part:") && <WriteupRuneClue />}
        </>
      )
    },
  }
  return (
    <div className="writeup-article space-y-5">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={articleComponents} skipHtml>
        {content}
      </ReactMarkdown>
    </div>
  )
}
