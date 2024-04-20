import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

import router from './router.tsx'

const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="todo-fullstack.au.auth0.com"
      clientId="wdn3JkF21kjba1Jsowysc0slK7g7D1D6"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://todo-fullstack.pushed.nz/',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Auth0Provider>,
  )
})
