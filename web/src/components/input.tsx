import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`
        w-full px-4 py-2
        border border-gray-300
        rounded-md
        focus:outline-none focus:ring-2 focus:ring-primary
        text-sm
        ${className}
      `}
      {...props}
    />
  )
}
