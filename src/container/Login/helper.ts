import { jwtDecode } from 'jwt-decode'
import { EMAIL_REGEX, PASSWORD_REGEX, VALIDATION_MESSAGES } from '../../utils/constants'
import { LoginFormErrorsInterface, LoginPayloadInterface } from './types'
import Cookies from 'js-cookie'

export const validationCheck = (data: LoginPayloadInterface, errors: LoginFormErrorsInterface) => {
  let errorData = { ...errors }
  if (!EMAIL_REGEX.test(data.email)) {
    errorData = { ...errorData, email: { error: true, message: VALIDATION_MESSAGES.email } }
  } else {
    errorData = { ...errorData, email: { error: false, message: '' } }
  }
  if (!PASSWORD_REGEX.test(data.password)) {
    errorData = {
      ...errorData,
      password: {
        error: true,
        message: VALIDATION_MESSAGES.password,
      },
    }
  } else {
    errorData = { ...errorData, password: { error: false, message: '' } }
  }
  return errorData
}

export const validationCheckDisabled = (errors: {
  email: { error: boolean; message: string }
  password: { error: boolean; message: string }
}) => {
  if (errors.email.error) {
    return true
  }
  if (errors.password.error) {
    return true
  }
  return false
}

export const setUserDataToCookies = (token: string) => {
  if (token) {
    const decoded = jwtDecode(token)
    if (decoded && decoded.sub) {
      for (const [key, value] of Object.entries(decoded.sub)) {
        Cookies.set(key, value)
      }
    }
  }
}

export const requiredFieldsCheck = (formData: LoginPayloadInterface) => {
  if (!formData.email || !formData.password) {
    return true
  }
  return false
}
