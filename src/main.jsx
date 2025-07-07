import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import Navbar from './Navbar.jsx';
import AppRouter from './AppRouter.jsx';
import { CartProvider } from './context/CartContext.jsx';
import Footer from './Footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <AppRouter />
          <Footer/>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)