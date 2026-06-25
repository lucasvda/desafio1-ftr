import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-xs font-medium uppercase tracking-wider text-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3
            border border-border
            rounded-lg
            bg-white
            focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
            text-sm text-text
            placeholder:text-label
            ${error ? 'border-danger' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-xs text-danger">{error}</p>}
      </div>
    )
  }
)
