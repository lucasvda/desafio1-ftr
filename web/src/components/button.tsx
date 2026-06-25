import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  className?: string
}

export function Button({ children, variant = 'primary', className = '', ...props }: ButtonProps) {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-white text-muted border border-border hover:bg-gray-50',
    danger: 'text-muted hover:text-danger hover:bg-red-50',
  }

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg px-4 py-2.5
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors
        text-sm font-medium
        cursor-pointer
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
