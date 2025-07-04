import type { ReactNode } from 'react'

interface CardProps {
    children: ReactNode
    className?: string
}

export function Card({ children, className = '' }: CardProps) {
    return (
        <div
            className={`
        bg-secondary
        border border-gray-200
        rounded-lg p-4
        shadow-sm
        ${className}
      `}
        >
            {children}
        </div>
    )
}
