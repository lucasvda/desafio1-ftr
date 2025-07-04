import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center
        rounded-md px-4 py-2
        bg-primary text-white
        hover:bg-accent
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors
        font-medium
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
