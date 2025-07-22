import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/index.css'
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext.jsx'
import Navbar from './Navbar.jsx';
import AppRouter from './AppRouter.jsx';
import { CartProvider } from '../context/CartContext.jsx';
import Footer from './Footer.jsx'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
          <Navbar />
          <AppRouter />
          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)