import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../store/useAuth'

export default function Protected({ children }: { children: React.ReactNode }) {
  const { token } = useAuth()
  const loc = useLocation()
  if (!token) return <Navigate to="/signin" state={{ from: loc }} replace />
  return <>{children}</>
}
