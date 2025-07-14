// src/components/Nav.tsx
import { Link, useLocation } from 'react-router-dom'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { ShoppingCart } from 'lucide-react'
import CartDrawer from './CartDrawer'
import { useCart } from '@/context/CartContext'

export function Nav() {
  const location = useLocation()
  const { items } = useCart()

  const isActive = (path: string) =>
    location.pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-600'

  return (
    <header className="border-b py-4 px-6 flex justify-between items-center bg-white">
      <Link to="/" className="text-2xl font-bold text-gray-800">
        Picture This
      </Link>
      <nav className="flex gap-6 items-center">
        <Link to="/services" className={isActive('/services')}>
          Services
        </Link>
        <Link to="/orders" className={isActive('/orders')}>
          Orders
        </Link>
        <Sheet>
          <SheetTrigger className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {items.length > 9 ? '9+' : items.length}
              </span>
            )}
          </SheetTrigger>
          <SheetContent side="right" className="w-[320px] sm:w-[400px]">
            <CartDrawer />
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
