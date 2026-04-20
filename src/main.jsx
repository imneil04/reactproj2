import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
//import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { HashRouter } from 'react-router-dom' //used for now since BrowserRouter is not fully supported when deploying in gh pages
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <HashRouter>  
          <CartProvider>
            <App />
          </CartProvider>
      </HashRouter>
    </AuthProvider>
  </StrictMode>,
)
