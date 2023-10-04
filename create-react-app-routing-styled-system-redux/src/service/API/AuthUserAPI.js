const tokenGenerator = () => {
  const randomToken = Math.floor(Math.random())

  return randomToken
}

async function logIn(credentials) {
  const { name } = credentials
  const simulateServerResponse = name => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const token = tokenGenerator()
        resolve({ data: { token, name } })
      }, 1000)
    })
  }

  try {
    const response = await simulateServerResponse(name)
    return response.data
  } catch (error) {
    throw new Error('Failed to log in')
  }
}

async function logOut() {
  const simulateServerResponse = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }

  try {
    await simulateServerResponse()
  } catch (error) {
    throw new Error('Failed to log out')
  }
}

async function fetchCurrentUser(credentials) {
  const { name } = credentials
  const simulateServerResponse = name => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const token = tokenGenerator()
        resolve({ data: { token, name } })
      }, 1000)
    })
  }

  try {
    const response = await simulateServerResponse(name)
    return response.data
  } catch (error) {
    throw new Error('Failed to log in')
  }
}

export { logIn, logOut, fetchCurrentUser }

// import { axiosInstance, tokenOperation } from '../axios/axios'

// async function logIn(credentials) {
//   const { mail, password } = credentials
//   const { data } = await axiosInstance.post(`/auth/login`, {
//     email: mail,
//     password,
//   })
//   tokenOperation.set(tokenGenerator())
//   return data
// }

// async function logOut() {
//   await axiosInstance.get(`/auth/logout`)
//   tokenOperation.unset()
// }
