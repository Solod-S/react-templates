import { useDispatch } from 'react-redux'

import { googleLogIn } from 'redux/auth/authOperation.js'

import { Form, SocialBtn, google } from './SocialLogin.styled'

function SocialLogin() {
  const dispatch = useDispatch()

  const handleLogIn = async socialLogin => {
    switch (socialLogin) {
      case socialLogin === 'google':
        dispatch(googleLogIn())
        break

      default:
        dispatch(googleLogIn())
        break
    }
  }

  return (
    <Form id="social_login">
      <SocialBtn onClick={() => handleLogIn('google')}>
        <img src={google} alt="google" /> Login with Google
      </SocialBtn>
    </Form>
  )
}

export default SocialLogin
