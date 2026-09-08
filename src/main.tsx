import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LguApp } from './lgu/LguApp.tsx'

const isLgu = window.location.hash.startsWith('#lgu')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isLgu ? <LguApp /> : <App />}
  </StrictMode>,
)
