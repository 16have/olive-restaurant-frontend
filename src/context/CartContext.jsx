import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // [{ food_item, name, price, quantity }]

  function addItem(foodItem) {
    setItems((prev) => {
      const existing = prev.find((i) => i.food_item === foodItem.id)
      if (existing) {
        return prev.map((i) =>
          i.food_item === foodItem.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [
        ...prev,
        {
          food_item: foodItem.id,
          name: foodItem.name,
          price: parseFloat(foodItem.price),
          quantity: 1,
        },
      ]
    })
  }

  function removeItem(foodItemId) {
    setItems((prev) => prev.filter((i) => i.food_item !== foodItemId))
  }

  function updateQuantity(foodItemId, quantity) {
    if (quantity < 1) return removeItem(foodItemId)
    setItems((prev) =>
      prev.map((i) => (i.food_item === foodItemId ? { ...i, quantity } : i))
    )
  }

  function clearCart() {
    setItems([])
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}