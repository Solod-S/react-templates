import { useDispatch, useSelector } from 'react-redux'
import { logOut } from 'redux/auth/authOperation'
import { getUserData } from 'redux/auth/authSelectors'

import {
  Header,
  Navigation,
  MenuLink,
  MenuList,
  MenuItem,
  SignOut,
} from './AppBar.styled'

const AppBar = () => {
  const userData = useSelector(getUserData)
  const dispatch = useDispatch()
  return (
    <Header className="header">
      <Navigation className="container">
        <MenuList>
          <MenuItem>
            <MenuLink to="/">Home</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/contacts">Contacts</MenuLink>
          </MenuItem>
        </MenuList>
        <SignOut onClick={() => dispatch(logOut())}>Sign Out</SignOut>
      </Navigation>
    </Header>
  )
}

export default AppBar
