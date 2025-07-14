// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import Orders from './pages/Orders'
import { Nav } from './components/Nav'
import { CartProvider } from './context/CartContext'
import { StrictMode } from 'react'
import { Toaster } from 'sonner'

function App() {
  return (
    <StrictMode>
      <CartProvider>
        <Router>
          <Nav />
          <div className="container mx-auto mt-8 px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
          <Toaster
            position="top-left"
            richColors
            closeButton
            duration={10000}
          />
        </Router>
      </CartProvider>
    </StrictMode>
  )
}

export default App
