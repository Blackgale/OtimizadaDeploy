import { Route, Routes, Navigate } from 'react-router-dom'
import TopBar from './components/TopBar'
import Products from './pages/Products'
import Wishlist from './pages/Wishlist'
import ProductDetails from './pages/ProductDetails'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Protected from './components/Protected'

export default function App() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Routes>
        <Route path="/" element={<Products/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/wishlist" element={<Protected><Wishlist/></Protected>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
