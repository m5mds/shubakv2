import { cn } from '@/lib/utils'

interface WindowFrameProps {
  variant?: 'default' | 'glass'
  className?: string
  children: React.ReactNode
}

export function WindowFrame({ variant = 'default', className, children }: WindowFrameProps) {
  return (
    <div
      className={cn(
        'rounded-[2px] border',
        variant === 'glass'
          ? 'border-white/[0.08] bg-white/[0.03] backdrop-blur-md'
          : 'border-white/[0.10] bg-[#111118]',
        className
      )}
    >
      {children}
    </div>
  )
}
