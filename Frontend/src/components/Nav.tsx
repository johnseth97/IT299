// src/components/Nav.tsx
import { Link, useLocation } from 'react-router-dom'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { ShoppingCart } from 'lucide-react'
import CartDrawer from './CartDrawer'

export function Nav() {
  const location = useLocation()

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
          </SheetTrigger>
          <SheetContent side="right" className="w-[320px] sm:w-[400px]">
            <CartDrawer />
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
