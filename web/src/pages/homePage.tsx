import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Input } from '../components/input'
import { Button } from '../components/button'
import { Skeleton } from '../components/skeleton'
import { Alert } from '../components/alert'
import { Logo, LinkIcon } from '../components/logo'
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
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (shortURL: string) => {
      return api.delete('/deleteURL', {
        data: { shortURL },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shortURLs'] })
    },
    onError: () => {
      setError('Erro ao deletar link.')
    },
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

  const urls = data?.urls ?? []
  const hasLinks = urls.length > 0

  return (
    <div className="min-h-screen bg-bg">
      <header className="px-6 py-5 md:px-12">
        <Logo />
      </header>

      <main className="px-4 pb-8 md:px-12 max-w-[1120px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Novo link */}
          <section className="bg-card rounded-xl p-6 lg:w-[380px] shrink-0 self-start">
            <h2 className="text-lg font-bold text-text mb-5">Novo link</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Link original"
                placeholder="www.exemplo.com.br"
                {...register('originalURL')}
                error={formState.errors.originalURL?.message}
              />
              <Input
                label="Link encurtado"
                placeholder="brev.ly/"
                {...register('shortURL')}
                error={formState.errors.shortURL?.message}
              />
              <Button
                type="submit"
                disabled={formState.isSubmitting || createMutation.isPending}
                className="w-full py-3"
              >
                Salvar link
              </Button>
              {error && <Alert type="error">{error}</Alert>}
            </form>
          </section>

          {/* Meus links */}
          <section className="bg-card rounded-xl p-6 flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-text">Meus links</h2>
              <Button
                variant="secondary"
                onClick={handleDownloadCSV}
                disabled={downloading || !hasLinks}
                className="text-xs px-3 py-2"
              >
                <DownloadIcon />
                Baixar CSV
              </Button>
            </div>

            <div className="border-t border-border" />

            {isLoading ? (
              <div className="space-y-3 mt-5">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : !hasLinks ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <LinkIcon className="w-8 h-8 mb-3" />
                <p className="text-xs font-medium uppercase tracking-wider text-muted">
                  Ainda não existem links cadastrados
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {urls.map((url) => (
                  <li
                    key={url.shortURL}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <div className="min-w-0 flex-1">
                      <a
                        href={`/${url.shortURL.split('/').pop()}`}
                        className="text-sm font-medium text-link hover:underline block truncate"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        brev.ly/{url.shortURL.split('/').pop()}
                      </a>
                      <p className="text-xs text-muted truncate mt-0.5">
                        {url.originalURL}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-muted whitespace-nowrap">
                        {url.clicks} acessos
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${window.location.origin}/${url.shortURL.split('/').pop()}`
                          )
                        }}
                        className="p-1.5 rounded-md border border-border text-muted hover:bg-gray-50 transition-colors cursor-pointer"
                        title="Copiar link"
                      >
                        <CopyIcon />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          deleteMutation.mutate(url.shortURL.split('/').pop()!)
                        }
                        className="p-1.5 rounded-md border border-border text-muted hover:text-danger hover:bg-red-50 transition-colors cursor-pointer"
                        title="Deletar"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  )
}
