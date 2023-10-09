import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../../../hooks'

const PrivateRoute = () => {
  const isLogin = useAuth()

  if (!isLogin) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default PrivateRoute
