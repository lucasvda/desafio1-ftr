import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="bg-card rounded-xl p-10 max-w-lg w-full text-center">
        <h1
          className="glitch-text text-7xl md:text-8xl font-bold text-link mb-4 select-none"
          data-text="404"
        >
          404
        </h1>
        <h2 className="text-xl font-bold text-text mb-3">Link não encontrado</h2>
        <p className="text-sm text-muted leading-relaxed">
          O link que você está tentando acessar não existe, foi removido ou é uma URL
          inválida. Saiba mais em{' '}
          <Link to="/" className="text-link hover:underline font-medium">
            brev.ly
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
