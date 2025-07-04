import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/homePage'
import { NotFoundPage } from '../pages/notFoundPage'
import { RedirectPage } from '../pages/redirectPage'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:shortURL" element={<RedirectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
