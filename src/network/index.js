import axios from 'axios'

export const baseURL = 'http://192.168.1.6:8080'

export const baseAxios = axios.create(
  {
    baseURL
  }
)

export const httpGet = (url, params) => {
  return baseAxios.get(url, { params })
}