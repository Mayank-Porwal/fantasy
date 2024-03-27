import { io } from 'socket.io-client'
import { BASE_URL_PROD, BASE_URL_UAT } from '../utils'
// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? BASE_URL_PROD : BASE_URL_UAT

export const socket = io(URL, {
  autoConnect: false,
})
