import { EMAIL_REGEX, VALIDATION_MESSAGES } from '../../../utils/constants'
import { ForgotPasswordFormInterface } from './types'
import { cloneDeep } from 'lodash'
export const updateForgotPasswordFormData = (value: string, id: string, formData: ForgotPasswordFormInterface) => {
  let updatedData = cloneDeep(formData)
  updatedData = {
    ...updatedData,
    [id]: value,
  }
  return updatedData
}

export const getForgotPasswordErrorState = (
  formDataErrors: { email: { error: boolean; message: string }; otp: { error: boolean; message: string } },
  value: string,
  id: string,
) => {
  let errorData = formDataErrors
  switch (id) {
    case 'email':
      if (value) {
        if (!EMAIL_REGEX.test(value)) {
          errorData = { ...errorData, [id]: { error: true, message: VALIDATION_MESSAGES.email } }
        } else {
          errorData = { ...errorData, [id]: { error: false, message: '' } }
        }
      } else {
        errorData = { ...errorData, [id]: { error: true, message: VALIDATION_MESSAGES.required } }
      }
      break
    case 'otp':
      if (!value) {
        errorData = { ...errorData, [id]: { error: true, message: VALIDATION_MESSAGES.required } }
      } else if (value.length < 6 || value.length > 6) {
        errorData = { ...errorData, [id]: { error: true, message: VALIDATION_MESSAGES.OTP_LENGTH_MESSAGE } }
      } else {
        errorData = { ...errorData, [id]: { error: false, message: '' } }
      }
      break
  }
  return errorData
}

export const getDisabledState = (
  formDataErrors: {
    email: { error: boolean; message: string }
    otp: { error: boolean; message: string }
  },
  isOtpSent: boolean,
  forgotPasswordFormData: ForgotPasswordFormInterface,
) => {
  if (!isOtpSent) {
    if (formDataErrors.email.error) {
      return true
    } else {
      if (!forgotPasswordFormData.email) {
        return true
      } else {
        return false
      }
    }
  } else {
    if (formDataErrors.email.error || formDataErrors.otp.error) {
      return true
    } else if (!forgotPasswordFormData.email || !forgotPasswordFormData.otp) {
      return true
    } else {
      return false
    }
  }
}
