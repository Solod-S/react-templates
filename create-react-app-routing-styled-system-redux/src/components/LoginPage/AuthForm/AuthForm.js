import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { logIn } from 'redux/auth/authOperation.js'

import {
  NameIcon,
  Title,
  ForM,
  FormField,
  InputLabel,
  Wrapper,
  Input,
  Button,
  ErrorWrapper,
  Error,
} from './AuthForm.styled.js'

import { loginSchema } from 'schemas'

const initialValues = {
  name: '',
}

function AuthForm() {
  const dispatch = useDispatch()

  const handleSubmit = async (values, actions) => {
    dispatch(logIn(values))
    console.log(values)
    actions.setSubmitting(false)
    actions.resetForm()
  }

  return (
    <Formik
      validationSchema={loginSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <>
          <Title>Sign in your account</Title>
          <ForM>
            <FormField>
              <ErrorWrapper>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Error name="name" component="div" />
              </ErrorWrapper>
              <Wrapper>
                <Input type="text" name="name" id="name" placeholder=" " />
                <NameIcon size={19} aria-label="Name icon" />
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
        </>
      )}
    </Formik>
  )
}

export default AuthForm
