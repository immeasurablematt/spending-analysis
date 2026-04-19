type NarrativePanelProps = {
  eyebrow?: string
  title: string
  body: string
}

export function NarrativePanel({ eyebrow, title, body }: NarrativePanelProps) {
  return (
    <div className="border-l-2 border-stone-900 pl-6 py-2 my-10">
      {eyebrow && (
        <p className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-serif font-medium text-stone-900 mb-3 leading-snug">
        {title}
      </h2>
      <p className="text-base text-stone-600 leading-relaxed max-w-2xl">
        {body}
      </p>
    </div>
  )
}
