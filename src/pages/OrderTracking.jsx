import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOrder } from '../services/api'

const STATUS_STEPS = ['PENDING', 'PREPARING', 'READY', 'DISPATCHED', 'DELIVERED']

function OrderTracking() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    function fetchOrder() {
      getOrder(id).then(setOrder).catch((err) => setError(err.message))
    }

    fetchOrder()
    const interval = setInterval(fetchOrder, 5000) // poll every 5s for live status
    return () => clearInterval(interval)
  }, [id])

  if (error) return <div className="p-8 text-red-600">Error: {error}</div>
  if (!order) return <div className="p-8">Loading order...</div>

  const currentStepIndex = STATUS_STEPS.indexOf(order.status)

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-2">Order #{order.id}</h1>
      <p className="text-gray-500 mb-6">Thank you, {order.customer_name}!</p>

      <div className="flex justify-between mb-8">
        {STATUS_STEPS.map((step, i) => (
          <div key={step} className="flex-1 text-center">
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${
                i <= currentStepIndex
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {i + 1}
            </div>
            <p className="text-xs mt-1">{step}</p>
          </div>
        ))}
      </div>

      <div className="border rounded-lg p-4 space-y-2 text-sm">
        <p><span className="font-medium">Delivery to:</span> {order.delivery_address}</p>
        <p><span className="font-medium">Phone:</span> {order.phone_number}</p>
        <p><span className="font-medium">Payment:</span> {order.payment_method} ({order.payment_status})</p>
        <p className="text-lg font-semibold border-t pt-2">
          Total: KSh {order.total_amount}
        </p>
      </div>
    </div>
  )
}

export default OrderTracking