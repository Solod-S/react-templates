import styled from 'styled-components'
import { IoIosMailOpen } from 'react-icons/io'
import { RiLockPasswordFill } from 'react-icons/ri'
import { Form, Field, ErrorMessage } from 'formik'

export const Error = styled(ErrorMessage)`
  color: red;
`
export const ErrorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`

export const EmailIcon = styled(IoIosMailOpen)`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(80%, -50%);
  transition: fill 250ms linear;
`

export const PasswordIcon = styled(RiLockPasswordFill)`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(80%, -50%);
  transition: fill 250ms linear;
`

export const Title = styled.h2`
  margin-bottom: 12px;
  font-size: ${p => p.theme.fontSizes.s};
  line-height: calc(23 / 20);
  text-align: center;
  letter-spacing: 0.03em;
`

export const ForM = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: 100%;
`

export const InputLabel = styled.label`
  margin-bottom: 4px;
  font-size: ${p => p.theme.fontSizes.xxxs};
  font-weight: ${p => p.theme.fontWeight.regular};
  line-height: calc(14 / 12);
  letter-spacing: 0.01em;
  color: rgba(0, 0, 0, 0.6);
`

export const Wrapper = styled.div`
  position: relative;
`

export const Input = styled(Field)`
  box-sizing: border-box;
  padding-left: 42px;
  padding-bottom: 12px;
  padding-top: 12px;
  height: 40px;
  width: 100%;
  cursor: pointer;
  border: 1px solid rgba(33, 33, 33, 0.2);
  transition: outline 250ms cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: ${p => p.theme.radii.normal};
`

export const Button = styled.button`
  width: 135px;
  height: 44px;
  margin-left: 5px;
  text-decoration: none;
  box-shadow: inset 0 0 0 1px ${p => p.theme.colors.secondTextColor};
  border-radius: ${p => p.theme.radii.quarter};
  transition-duration: 167ms;
  font-size: 16px;
  ${p => p.theme.fontWeight.regular};
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    text-decoration: none;
  }

  @media (max-width: ${p => p.theme.breakpoints.tablet}) {
    padding: 3px 5px;
  }
`
