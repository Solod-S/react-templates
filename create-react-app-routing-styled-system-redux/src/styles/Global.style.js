import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

h1,
h2,
h3,
h4,
p,
ul {
  margin-top: 0;
  margin-bottom: 0;
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
  padding-left: 0;
}

button {
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
}

body {
  margin: 0;
  background-color:  ${p => p.theme.colors.primaryBgColor};
  color: ${p => p.theme.colors.primaryTextColor};
  font-family: ${p => p.theme.fontFamily.roboto};
  scroll-behavior: smooth;
}

.img {
  display: block;
  max-width: 100%;
  height: auto;
}
.container {
  padding-left: ${p => p.theme.space[4]}px;
  padding-right: ${p => p.theme.space[4]}px;
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-width: ${p => p.theme.breakpoints.tell}) {
    width: ${p => p.theme.breakpoints.tell};
  }
  @media screen and (min-width: ${p => p.theme.breakpoints.tablet}) {
    width: ${p => p.theme.breakpoints.tablet};
  }
  @media screen and (min-width: ${p => p.theme.breakpoints.desktop}) {
    width: ${p => p.theme.breakpoints.desktop};
  }
}

.section {
  padding-top: ${p => p.theme.space[6]}px;
  padding-bottom: ${p => p.theme.space[6]}px;
  @media screen and (min-width: ${p => p.theme.breakpoints.tablet}) {
    padding-top: ${p => p.theme.space[6]}px;
    padding-bottom: ${p => p.theme.space[6]}px;
  }
  @media screen and (min-width: ${p => p.theme.breakpoints.desktop}) {
    padding-top: ${p => p.theme.space[7]}px;
    padding-bottom: ${p => p.theme.space[7]}px;
  }
}

.accentColor {
    color: ${p => p.theme.colors.primaryAccentColor};
  }



`

export default GlobalStyle
