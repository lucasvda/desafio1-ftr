import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Input } from '../components/input'
import { Button } from '../components/button'
import { Card } from '../components/card'
import { Skeleton } from '../components/skeleton'
import { Alert } from '../components/alert'
import { api } from '../api/client'
import { useState } from 'react'

const schema = z.object({
  originalURL: z.string().url({ message: 'URL inválida' }),
  shortURL: z.string().min(3, { message: 'Mínimo 3 caracteres' }),
})

type FormData = z.infer<typeof schema>

type ShortURL = {
  originalURL: string
  shortURL: string
  clicks: number
  createdAt: string
}

export function HomePage() {
  const queryClient = useQueryClient()
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const { data, isLoading } = useQuery<{ urls: ShortURL[] }>({
    queryKey: ['shortURLs'],
    queryFn: async () => {
      const res = await api.get('/listShortURLs')
      return res.data
    },
  })

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return api.post('/shortenURL', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shortURLs'] })
      reset()
    },
    onError: () => {
      setError('Erro ao criar link.')
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (shortURL: string) => {
      return api.delete('/deleteURL', {
        data: { shortURL }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shortURLs'] })
    },
    onError: () => {
      setError('Erro ao deletar link.')
    }
  })

  const handleDownloadCSV = async () => {
    setDownloading(true)
    try {
      const res = await api.get('/exportShortURLs')
      window.open(res.data.url, '_blank')
    } catch {
      setError('Erro ao gerar CSV')
    } finally {
      setDownloading(false)
    }
  }

  function onSubmit(data: FormData) {
    setError(null)
    createMutation.mutate(data)
  }

  return (
    <main className="p-4 max-w-2xl mx-auto space-y-6 font-sans">
      <h1 className="text-3xl font-bold text-center text-text">Brev.ly</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input placeholder="URL original" {...register('originalURL')} />
        <Input placeholder="URL encurtada" {...register('shortURL')} />
        <Button type="submit" disabled={formState.isSubmitting}>Criar link</Button>
        {error && <Alert type="error">{error}</Alert>}
      </form>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Links criados</h2>
        <Button onClick={handleDownloadCSV} disabled={downloading}>
          {downloading ? 'Gerando...' : 'Exportar CSV'}
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : !data || !data.urls || data.urls.length === 0
        ? (
          <p className="text-gray-500">Nenhum link criado ainda.</p>
        ) : (
          <ul className="space-y-2">
            {data.urls.map((url) => (
              <Card key={url.shortURL} className="flex justify-between items-start gap-4">
                <div className="text-sm">
                  <p className="text-gray-700 break-all">{url.originalURL}</p>
                  <a
                    href={url.shortURL}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {url.shortURL}
                  </a>
                  <p className="text-xs text-gray-500">Clicks: {url.clicks}</p>
                </div>
                <Button
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 text-sm"
                  onClick={() => deleteMutation.mutate(url.shortURL.split('/').pop()!)}
                >
                  Deletar
                </Button>
              </Card>
            ))}
          </ul>
        )}
    </main>
  )
}
