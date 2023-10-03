import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Header = styled.header`
  @media screen and (max-width: ${(p) => p.theme.breakpoints.beeforeTablet}) {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  @media screen and (min-width: ${(p) => p.theme.breakpoints.tablet}) {
    padding-top: 21px;
    padding-bottom: 21px;
  }

  @media screen and (min-width: ${(p) => p.theme.breakpoints.desktop}) {
    padding-top: 25px;
    padding-bottom: 25px;
  }
  border-bottom: 1px solid #ececec;
`;

export const Navigation = styled.div`
  display: flex;
  align-items: center;
`;
export const MenuList = styled.ul`
  @media screen and (max-width: ${(p) => p.theme.breakpoints.tablet}) {
    flex-direction: column;
  }

  @media screen and (min-width: ${(p) => p.theme.breakpoints.desktop}) {
    display: flex;
    align-items: center;
  }
  display: flex;
`;

export const MenuItem = styled.li`
  @media screen and (max-width: ${(p) => p.theme.breakpoints.tablet}) {
    :not(:last-child) {
      margin-bottom: 32px;
    }
  }
  @media screen and (min-width: ${(p) => p.theme.breakpoints.tablet}) {
    position: relative;
    :not(:last-child) {
      margin-right: 50px;
    }
  }
`;
export const MenuLink = styled(NavLink)`
  :focus {
    color: ${(p) => p.theme.colors.primaryAccentColor};
    fill: ${(p) => p.theme.colors.primaryAccentColor};
  }
  :hover {
    color: ${(p) => p.theme.colors.primaryAccentColor};

    fill: ${(p) => p.theme.colors.primaryAccentColor};
  }
  &.active {
    color: ${(p) => p.theme.colors.primaryAccentColor};

    fill: ${(p) => p.theme.colors.primaryAccentColor};
  }
  font-weight: ${(p) => p.theme.fontWeight.normal};
  line-height: 1.1;
  text-align: center;
  letter-spacing: 0.02em;
  color: ${(p) => p.theme.colors.primaryTitleColor};
  transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1);

  @media screen and (max-width: ${(p) => p.theme.breakpoints.beeforeTell}) {
    font-size: ${(p) => p.theme.fontSizes.xxxxl};
  }

  @media screen and (min-width: ${(p) => p.theme.breakpoints.tablet}) {
    font-size: ${(p) => p.theme.fontSizes.xxs};
  }
  @media screen and (min-width: ${(p) => p.theme.breakpoints.desktop}) {
    font-size: ${(p) => p.theme.fontSizes.xxs};
    padding: 30px 0;
  }
`;
