import axios, { AxiosRequestConfig } from 'axios'
import { HTTPS_HEADERS, REQUEST_TYPE } from './constants'
import Cookies from 'js-cookie'
console.log(window.location)
export const BASE_URL_UAT = 'https://iplfantasy-maya.onrender.com'
export const BASE_URL_PROD = 'https://iplfantasy-refactor.onrender.com'
export const _request = async (config: AxiosRequestConfig) => {
  let authHeaders = config?.headers ? config.headers : HTTPS_HEADERS
  authHeaders = { ...authHeaders, Authorization: `Bearer ${Cookies.get('jwtToken')}` }
  const baseUrl = getBaseUrl()
  try {
    const options: AxiosRequestConfig = {
      method: config ? config?.method : REQUEST_TYPE.GET,
      url: config ? `${baseUrl}${config?.url}` : baseUrl,
      headers: authHeaders,
      data: config ? config?.data : null,
    }
    const response = await axios(options)
    return response
  } catch (error: unknown) {
    return error
  }
}

const getBaseUrl = () => {
  let baseUrl = ''
  switch (window.location.origin) {
    case 'http://localhost:3000':
      baseUrl = BASE_URL_UAT
      break
    case 'https://www.fantasybaazi.in':
      baseUrl = BASE_URL_PROD
      break
    case 'https://fantasy-ipfz.onrender.com/':
      baseUrl = BASE_URL_UAT
      break
    default:
      baseUrl = BASE_URL_UAT
  }
  return baseUrl
}
