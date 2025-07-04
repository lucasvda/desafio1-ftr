import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../api/client'

export function RedirectPage() {
  const { shortURL } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!shortURL) {
      navigate('/not-found')
      return
    }
    ;(async () => {
      try {
        const { data } = await api.get(`/getOriginalURL/${shortURL}`)
        await api.patch(`/incrementClicks/${shortURL}`)
        window.location.href = data.originalURL
      } catch {
        navigate('/not-found')
      }
    })()
  }, [shortURL, navigate])

  return <p className="p-4">Redirecionando...</p>
}
