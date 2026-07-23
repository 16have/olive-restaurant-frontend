import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function NavBar() {
  const { items } = useCart()
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b">
      <Link to="/" className="text-xl font-bold text-orange-600">
        Olive Restaurant
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/menu" className="hover:text-orange-600">Menu</Link>
        <Link to="/cart" className="relative hover:text-orange-600">
          Cart
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-orange-600 text-white text-xs rounded-full px-1.5">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}

export default NavBar