import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <Image
        src="/images/logo.png"
        alt="Agrofrancegasy"
        width={44}
        height={44}
        className="shrink-0 rounded-full ring-2 ring-white/80 shadow-md"
        priority
      />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg font-semibold tracking-tight text-white">
          Agrofrancegasy
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/70">
          Madagascar Exports
        </span>
      </span>
    </span>
  )
}