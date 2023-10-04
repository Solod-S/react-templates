import styled from 'styled-components';
import {
  color,
  space,
  layout,
  flexbox,
  background,
  border,
  position,
  shadow,
} from 'styled-system';
//https: styled-system.com/table
export const Box = styled.div`
  ${color}
  ${space}
  ${layout}
  ${flexbox}
  ${background}
  ${border}
  ${position}
  ${shadow}
`;

export const BoxVerTwo = styled('div')(color, space, layout);
// по другому
