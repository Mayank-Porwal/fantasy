import axios, { AxiosRequestConfig } from 'axios'
import { HTTPS_HEADERS, REQUEST_TYPE } from './constants'
import Cookies from 'js-cookie'

//export const BASE_URL = 'https://iplfantasy-maya.onrender.com'
export const BASE_URL = 'https://iplfantasy-refactor.onrender.com'
export const _request = async (config: AxiosRequestConfig) => {
  let authHeaders = config?.headers ? config.headers : HTTPS_HEADERS
  authHeaders = { ...authHeaders, Authorization: `Bearer ${Cookies.get('jwtToken')}` }
  try {
    const options: AxiosRequestConfig = {
      method: config ? config?.method : REQUEST_TYPE.GET,
      url: config ? `${BASE_URL}${config?.url}` : BASE_URL,
      headers: authHeaders,
      data: config ? config?.data : null,
    }
    const response = await axios(options)
    return response
  } catch (error: unknown) {
    return error
  }
}
