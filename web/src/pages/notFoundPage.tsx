import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Página não encontrada</h1>
      <Link to="/" className="text-blue-500 underline">
        Voltar ao início
      </Link>
    </main>
  )
}
