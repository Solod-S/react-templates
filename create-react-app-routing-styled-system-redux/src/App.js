import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import UserRoutes from './UserRoutes'
import { fetchCurrentUser } from './redux/auth/authOperation'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  return (
    <>
      <UserRoutes />
    </>
  )
}
export default App
