import axios from 'axios'
import { CONFIG } from '../../config/config'

export const instance = axios.create({
  baseURL: CONFIG.BASE_URL,
})

instance.interceptors.request.use(
  config => {
    const accessToken = CONFIG.ACESS_TOKEN

    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)
