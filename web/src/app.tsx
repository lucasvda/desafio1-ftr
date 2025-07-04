import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Router } from './routes/router'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  )
}
