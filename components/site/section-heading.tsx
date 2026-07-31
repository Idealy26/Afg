import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion/reveal'

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  invert = false,
  className,
}: {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  invert?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <Reveal>
        <span
          className={cn(
            'inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]',
            invert ? 'text-[color:var(--gold)]' : 'text-[color:var(--gold)]',
          )}
        >
          <span className="h-px w-6 bg-[color:var(--gold)]" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={1}>
        <h2
          className={cn(
            'mt-4 font-serif text-3xl font-medium leading-[1.12] text-balance sm:text-4xl lg:text-[2.75rem]',
            invert ? 'text-cream' : 'text-foreground',
          )}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle ? (
        <Reveal delay={2}>
          <p
            className={cn(
              'mt-5 text-base leading-relaxed',
              invert ? 'text-cream/75' : 'text-muted-foreground',
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
