import styled from 'styled-components'

export const Footer = styled.footer`
  background-color: ${p => p.theme.colors.secondaryBgColor};
  padding-top: 60px;
  padding-bottom: 60px;
  @media screen and (max-width: ${p => p.theme.breakpoints.beeforeTablet}) {
    text-align: center;
  }
  @media screen and (min-width: ${p => p.theme.breakpoints.desktop}) {
    margin: 0 auto;
    font-style: normal;
    padding-top: 60px;
    padding-bottom: 60px;
  }
`

export const FooterWrapper = styled.div`
  @media screen and (min-width: ${p => p.theme.breakpoints.desktop}) {
    display: flex;
  }
`
