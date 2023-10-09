import * as yup from 'yup'

let AuthSchema = yup.object().shape({
  email: yup
    .string()
    .min(5, 'Minimum 5 characters are required')
    .matches(/^[A-Za-z0-9+_.-]+@(.+)$/, 'Invalid email format')
    .typeError()
    .required(),
  password: yup
    .string()
    .min(6, 'Minimum 6 characters are required')
    .typeError()
    .required(),
})

export default AuthSchema
