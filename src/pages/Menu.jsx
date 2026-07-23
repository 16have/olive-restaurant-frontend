import { useEffect, useState } from 'react'
import { getCategories, getFoodItems } from '../services/api'
import { useCart } from '../context/CartContext'

function Menu() {
  const [categories, setCategories] = useState([])
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)
  const { addItem } = useCart()

  useEffect(() => {
    Promise.all([getCategories(), getFoodItems()])
      .then(([cats, foods]) => {
        setCategories(cats)
        setItems(foods)
      })
      .catch((err) => setError(err.message))
  }, [])

  if (error) return <div className="p-8 text-red-600">Error: {error}</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Menu</h1>

      {categories.map((category) => {
        const categoryItems = items.filter((i) => i.category === category.id)
        if (categoryItems.length === 0) return null

        return (
          <div key={category.id} className="mb-8">
            <h2 className="text-xl font-semibold mb-3">{category.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categoryItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-orange-600 font-semibold mt-1">
                      KSh {item.price}
                    </p>
                  </div>
                  <button
                    onClick={() => addItem(item)}
                    className="bg-orange-600 text-white px-3 py-1.5 rounded hover:bg-orange-700"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Menu