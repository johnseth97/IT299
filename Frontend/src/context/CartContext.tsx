// src/context/CartContext.tsx
import { createContext, useContext, useState } from 'react'
import { submitOrder } from '@/lib/api'
import type { CustomerInput, ServiceInput } from '@/lib/api'

type CartItem = ServiceInput

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (index: number) => void
  clearCart: () => void
  submit: (customer: CustomerInput) => Promise<{ orderId: string }>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (item: CartItem) => {
    setItems((prev) => [...prev, item])
  }

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  const clearCart = () => {
    setItems([])
  }

  const submit = async (customer: CustomerInput) => {
    const response = await submitOrder({ customer, services: items })
    clearCart()
    return response
  }

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, submit }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
