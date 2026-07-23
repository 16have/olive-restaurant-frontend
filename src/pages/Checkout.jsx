import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { createOrder } from '../services/api'

function Checkout() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    customer_name: '',
    phone_number: '',
    delivery_address: '',
    payment_method: 'CASH',
  })
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const order = await createOrder({
        ...form,
        items: items.map((i) => ({
          food_item: i.food_item,
          quantity: i.quantity,
        })),
      })
      clearCart()
      navigate(`/order/${order.id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto p-6 text-center text-gray-500">
        Your cart is empty. Add items from the menu first.
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            name="customer_name"
            value={form.customer_name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            name="phone_number"
            value={form.phone_number}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Delivery Address</label>
          <textarea
            name="delivery_address"
            value={form.delivery_address}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Payment Method</label>
          <select
            name="payment_method"
            value={form.payment_method}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="CASH">Cash on Delivery</option>
            <option value="MPESA">M-Pesa</option>
          </select>
        </div>

        <div className="border-t pt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span>KSh {total.toFixed(2)}</span>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 disabled:opacity-50"
        >
          {isLoading ? 'Placing order...' : 'Place Order'}
        </button>
      </form>
    </div>
  )
}

export default Checkout