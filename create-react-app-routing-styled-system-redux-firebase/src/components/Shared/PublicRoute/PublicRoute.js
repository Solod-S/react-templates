import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../../../hooks'

const PublicRoute = () => {
  const isLogin = useAuth()

  if (isLogin) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export default PublicRoute
