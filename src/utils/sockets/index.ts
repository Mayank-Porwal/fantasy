import { io } from 'socket.io-client'
import { BASE_URL } from '../utils'
// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? BASE_URL : BASE_URL

export const socket = io(URL, {
  autoConnect: false,
})
