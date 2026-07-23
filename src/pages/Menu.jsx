import { useEffect, useState } from 'react'
import { getFoodItems } from '../services/api'

function Menu() {
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getFoodItems()
      .then(setItems)
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <div className="p-8 text-red-600">Error: {error}</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <pre className="bg-gray-100 p-4 rounded text-sm">
        {JSON.stringify(items, null, 2)}
      </pre>
    </div>
  )
}

export default Menu