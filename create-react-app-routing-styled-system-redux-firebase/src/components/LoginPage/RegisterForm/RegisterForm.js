import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import { registrationByEmail } from 'redux/auth/authOperation.js'
import { AuthSchema } from 'components/schemas'

import {
  EmailIcon,
  PasswordIcon,
  Title,
  ForM,
  FormField,
  InputLabel,
  Wrapper,
  Input,
  Button,
  ErrorWrapper,
  Error,
} from './RegisterForm.styled.js'

const initialValues = {
  email: '',
  password: '',
}

function RegisterForm() {
  const dispatch = useDispatch()

  const handleSubmit = async (values, actions) => {
    dispatch(registrationByEmail(values))
    actions.setSubmitting(false)
    actions.resetForm()
  }

  return (
    <Formik
      validationSchema={AuthSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <div
          style={{
            marginBottom: '30px',
            border: '1px solid black',
            padding: '20px',
          }}
        >
          <Title>Register your account</Title>
          <ForM>
            <FormField>
              <ErrorWrapper>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Error name="email" component="div" />
              </ErrorWrapper>
              <Wrapper>
                <Input type="text" name="email" id="email" placeholder=" " />
                <EmailIcon size={19} aria-label="Email icon" />
              </Wrapper>
            </FormField>
            <FormField>
              <ErrorWrapper>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Error name="password" component="div" />
              </ErrorWrapper>
              <Wrapper>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder=" "
                />
                <PasswordIcon size={19} aria-label="Password icon" />
              </Wrapper>
            </FormField>
            <Button
              type="submit"
              aria-label="submit button"
              disabled={isSubmitting}
            >
              Login
            </Button>
          </ForM>
        </div>
      )}
    </Formik>
  )
}

export default RegisterForm
