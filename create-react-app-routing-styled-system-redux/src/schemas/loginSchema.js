import * as yup from 'yup'

let loginSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'That doesnt looks like name')
    .typeError()
    .required(),
})

export default loginSchema
