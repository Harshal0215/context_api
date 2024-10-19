import { StrictMode } from 'react'
import { CartProvider } from './context/Cart.jsx'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
  <App />
</CartProvider>
  </StrictMode>,
)
