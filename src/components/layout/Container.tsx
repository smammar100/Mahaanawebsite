import { ReactNode } from 'react'
import { cx } from '@/utils/cx'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div
      className={cx(
        "mx-auto w-full max-w-[1100px] px-16",
        className
      )}
    >
      {children}
    </div>
  )
}
