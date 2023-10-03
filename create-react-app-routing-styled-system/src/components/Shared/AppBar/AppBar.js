import {
  Header,
  Navigation,
  MenuLink,
  MenuList,
  MenuItem,
} from "./AppBar.styled";

const AppBar = () => {
  return (
    <Header>
      <Navigation className="container">
        <MenuList>
          <MenuItem>
            <MenuLink end="true" to="/">
              Home
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/contacts">Contacts</MenuLink>
          </MenuItem>
        </MenuList>
      </Navigation>
    </Header>
  );
};

export default AppBar;
