import axios from 'axios'
import { Message } from 'view-design-plus'

const http = axios.create({
  baseURL: '/api',
  timeout: 15000
})

http.interceptors.request.use(
  (config) => {
    const user = JSON.parse(sessionStorage.getItem('user') || 'null')
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    Message.error(error.message || '网络异常')
    return Promise.reject(error)
  }
)

export default http
