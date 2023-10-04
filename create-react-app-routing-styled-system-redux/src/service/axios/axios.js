import axios from 'axios'

const { REACT_APP_BAKEND_BASE_URL } = process.env

const axiosInstance = axios.create({
  baseURL: REACT_APP_BAKEND_BASE_URL,
})

const tokenOperation = {
  set(token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
  },
  unset() {
    axiosInstance.defaults.headers.common.Authorization = ''
  },
}

export { axiosInstance, tokenOperation }
