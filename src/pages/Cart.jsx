import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Cart() {
  const { items, removeItem, updateQuantity, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <p className="text-gray-500 mb-4">Your cart is empty.</p>
        <Link to="/menu" className="text-orange-600 font-medium hover:underline">
          Browse the menu
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.food_item}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                KSh {item.price} × {item.quantity}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.food_item, item.quantity - 1)}
                className="w-8 h-8 border rounded hover:bg-gray-100"
              >
                −
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.food_item, item.quantity + 1)}
                className="w-8 h-8 border rounded hover:bg-gray-100"
              >
                +
              </button>
              <button
                onClick={() => removeItem(item.food_item)}
                className="text-red-500 text-sm ml-2 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <p className="text-lg font-semibold">Total: KSh {total.toFixed(2)}</p>
        <Link
          to="/checkout"
          className="bg-orange-600 text-white px-5 py-2 rounded hover:bg-orange-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}

export default Cart