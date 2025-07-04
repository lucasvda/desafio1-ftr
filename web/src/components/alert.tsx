import type { ReactNode } from 'react'

interface AlertProps {
    children: ReactNode
    type?: 'info' | 'success' | 'error'
}

export function Alert({ children, type = 'info' }: AlertProps) {
    const colors = {
        info: 'bg-blue-50 text-blue-700 border-blue-200',
        success: 'bg-green-50 text-green-700 border-green-200',
        error: 'bg-red-50 text-red-700 border-red-200',
    }

    return (
        <div
            className={`
        border rounded-md p-3 text-sm
        ${colors[type]}
      `}
        >
            {children}
        </div>
    )
}
