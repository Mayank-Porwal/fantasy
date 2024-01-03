import { PASSWORD_REGEX, VALIDATION_MESSAGES } from '../../../../utils/constants'
import { UpdatePasswordFormDataInterface } from '../types'

export const getDisabledCheck = (
  formErrors: {
    password: { error: boolean; message: string }
    confirmPassword: { error: boolean; message: string }
  },
  formData: UpdatePasswordFormDataInterface,
) => {
  if (formErrors.password.error || formErrors.confirmPassword.error) {
    return true
  } else if (!formData.password || !formData.confirmPassword) {
    return true
  } else {
    return false
  }
}

export const getFormErrorState = (
  formErrors: {
    password: { error: boolean; message: string }
    confirmPassword: { error: boolean; message: string }
  },
  id: string,
  value: string,
  formData: UpdatePasswordFormDataInterface,
) => {
  let errorData = formErrors
  switch (id) {
    case 'password':
      if (value) {
        if (!PASSWORD_REGEX.test(value)) {
          errorData = { ...errorData, [id]: { error: true, message: VALIDATION_MESSAGES.password } }
        } else {
          errorData = { ...errorData, [id]: { error: false, message: '' } }
        }
      } else {
        errorData = { ...errorData, [id]: { error: true, message: VALIDATION_MESSAGES.required } }
      }
      break
    case 'confirmPassword':
      if (value) {
        if (!PASSWORD_REGEX.test(value)) {
          errorData = { ...errorData, [id]: { error: true, message: VALIDATION_MESSAGES.password } }
        } else {
          errorData = { ...errorData, [id]: { error: false, message: '' } }
        }
        if (formData.password !== value) {
          errorData = {
            ...errorData,
            [id]: { error: true, message: VALIDATION_MESSAGES.confirmPassword },
          }
        } else {
          errorData = { ...errorData, [id]: { error: false, message: '' } }
        }
      } else {
        errorData = { ...errorData, [id]: { error: true, message: VALIDATION_MESSAGES.required } }
      }
      break
  }
  return errorData
}
