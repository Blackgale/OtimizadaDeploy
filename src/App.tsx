import { Route, Routes, Navigate } from 'react-router-dom'
import TopBar from './components/TopBar'
import Products from './pages/Products'
import Wishlist from './pages/Wishlist'
import ProductDetails from './pages/ProductDetails'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { useAuth } from './store/useAuth'

export default function App() {
  const { token } = useAuth()

  // MODO NÃO LOGADO: só telas de auth
  if (!token) {
    return (
      <div className="min-h-screen">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* qualquer outra rota redireciona pro login */}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </div>
    )
  }

  // MODO LOGADO: app completo
  return (
    <div className="min-h-screen">
      <TopBar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
