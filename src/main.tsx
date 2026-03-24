import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import queryClient from './constant/queryclient.ts'
import { QueryClientProvider } from '@tanstack/react-query'
import ToasterProvider from './constant/ToasterProvider.tsx'
import { UserProvider } from './constant/UserProvider.tsx'
import { Provider } from "react-redux";
import { store } from './store/store.ts'
import router from './constant/router.tsx'
import GoogleTranslateLoader from './components/GoogleTranslateLoader.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <RouterProvider router={router} />
         <GoogleTranslateLoader />
        <ToasterProvider />
      </UserProvider>
    </QueryClientProvider>
  </Provider>
  </StrictMode>
)
