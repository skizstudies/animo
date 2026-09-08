interface PagePlaceholderProps {
  eyebrow: string;
  title: string;
  description: string;
}

/** Stand-in for pages that later phases build out — keeps the shell honest
 * about what's wired vs. what's still a stub. */
export function PagePlaceholder({ eyebrow, title, description }: PagePlaceholderProps) {
  return (
    <div className="panel-corners flex flex-1 flex-col items-center justify-center gap-2 rounded-[6px] border border-border bg-card px-8 text-center shadow-[var(--shadow-sm)]">
      <span className="font-mono text-[10px] font-bold tracking-[1.2px] text-ink-soft uppercase">{eyebrow}</span>
      <h2 className="text-[19px] font-extrabold text-ink">{title}</h2>
      <p className="max-w-[46ch] text-[13px] text-ink-soft">{description}</p>
    </div>
  );
}
