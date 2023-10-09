import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { SharedLayout, PrivateRoute, PublicRoute } from './components'

const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'))
const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'))

const UserRoutes = () => {
  return (
    <Suspense
    // fallback={<Loader />}
    >
      <Routes>
        <Route element={<PublicRoute />}>
          <Route index path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route end path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route index path="/contacts" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

export default UserRoutes
