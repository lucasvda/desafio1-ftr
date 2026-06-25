export function LogoIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 4C10.477 4 6 8.477 6 14c0 3.19 1.5 6.03 3.84 7.86L8.4 26.4a1 1 0 001.6.8l3.2-2.4c.9.26 1.84.4 2.8.4 5.523 0 10-4.477 10-10S21.523 4 16 4z"
        fill="#3B49DA"
      />
      <path
        d="M13.5 13a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18.5 13a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        fill="white"
      />
      <path
        d="M12 16c0 0 1.5 2 4 2s4-2 4-2"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="12" stroke="#3B49DA" strokeWidth="2.5" fill="none" />
        <path
          d="M11 16c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5"
          stroke="#3B49DA"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M16 11c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5"
          stroke="#3B49DA"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span className="text-xl font-bold text-text tracking-tight">brev.ly</span>
    </div>
  )
}

export function LogoSymbol({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="16" stroke="#3B49DA" strokeWidth="3" fill="none" />
      <path
        d="M15 24c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9"
        stroke="#3B49DA"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M24 15c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9"
        stroke="#3B49DA"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export function LinkIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  )
}
