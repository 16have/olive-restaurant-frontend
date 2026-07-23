import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import NavBar from './components/NavBar'

const Home = lazy(() => import('./pages/Home'))
const Menu = lazy(() => import('./pages/Menu'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Payment = lazy(() => import('./pages/Payment'))
const OrderTracking = lazy(() => import('./pages/OrderTracking'))

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <p className="text-orange-600 text-lg">Loading...</p>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/order/:id" element={<OrderTracking />} />
            </Routes>
          </Suspense>
        </NavBar>    
      </BrowserRouter>
    </CartProvider>
  )
}

export default App