import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SOSProvider } from './context/SOSContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SOSProvider>
      <App />
    </SOSProvider>
  </StrictMode>,
)
