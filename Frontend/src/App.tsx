// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import Orders from './pages/Orders'
import { Nav } from './components/Nav'
import { CartProvider } from './context/CartContext'
import { StrictMode } from 'react'

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
        </Router>
      </CartProvider>
    </StrictMode>
  )
}

export default App
