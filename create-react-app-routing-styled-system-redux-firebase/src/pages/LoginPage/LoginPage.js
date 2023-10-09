import { LoginForm, SocialLogin, RegisterForm } from 'components'

const LoginPage = () => {
  return (
    <section className="section">
      <div className="container">
        <SocialLogin />
        <LoginForm />
        <RegisterForm />
      </div>
    </section>
  )
}
export default LoginPage
