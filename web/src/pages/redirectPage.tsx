import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LogoSymbol } from '../components/logo'
import { api } from '../api/client'

export function RedirectPage() {
  const { shortURL } = useParams()
  const navigate = useNavigate()
  const [originalURL, setOriginalURL] = useState<string | null>(null)

  useEffect(() => {
    if (!shortURL) {
      navigate('/not-found')
      return
    }
    ;(async () => {
      try {
        const { data } = await api.get(`/getOriginalURL/${shortURL}`)
        await api.patch(`/incrementClicks/${shortURL}`)
        setOriginalURL(data.originalURL)
        window.location.href = data.originalURL
      } catch {
        navigate('/not-found')
      }
    })()
  }, [shortURL, navigate])

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="bg-card rounded-xl p-10 max-w-lg w-full text-center">
        <div className="flex justify-center mb-5">
          <LogoSymbol className="w-12 h-12" />
        </div>
        <h1 className="text-2xl font-bold text-text mb-3">Redirecionando...</h1>
        <p className="text-sm text-muted leading-relaxed">
          O link será aberto automaticamente em alguns instantes.
          <br />
          Não foi redirecionado?{' '}
          {originalURL ? (
            <a href={originalURL} className="text-link hover:underline font-medium">
              Acesse aqui
            </a>
          ) : (
            <span className="text-link font-medium">Acesse aqui</span>
          )}
        </p>
      </div>
    </div>
  )
}
