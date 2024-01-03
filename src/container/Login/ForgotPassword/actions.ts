import { SendOtpRequestBodyInterface, VerifyOtpRequestBodyInterface } from './types'

export enum FORGOT_PASSWORD_ACTIONS {
  SEND_OTP = 'SEND_OTP',
  SEND_OTP_SUCCESS = 'SEND_OTP_SUCCESS',
  SEND_OTP_FAILURE = 'SEND_OTP_FAILURE',
  VERIFY_OTP = 'VERIFY_OTP',
  VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS',
  VERIFY_OTP_FAILURE = 'VERIFY_OTP_FAILURE',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS',
  UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE',
  SAVE_EMAIL_FOR_PASSWORD_UPDATE = 'SAVE_EMAIL_FOR_PASSWORD_UPDATE',
}

export interface SendOtpInterface {
  type: FORGOT_PASSWORD_ACTIONS.SEND_OTP
  payload: SendOtpRequestBodyInterface
}

export const sendOtp = (payload: SendOtpRequestBodyInterface): SendOtpInterface => {
  return {
    type: FORGOT_PASSWORD_ACTIONS.SEND_OTP,
    payload,
  }
}

export interface SendOtpSuccessInterface {
  type: FORGOT_PASSWORD_ACTIONS.SEND_OTP_SUCCESS
  payload: { message: string } | null
}

export const sendOtpSuccess = (payload: { message: string } | null): SendOtpSuccessInterface => {
  return {
    type: FORGOT_PASSWORD_ACTIONS.SEND_OTP_SUCCESS,
    payload,
  }
}
export interface SendOtpFailureInterface {
  type: FORGOT_PASSWORD_ACTIONS.SEND_OTP_FAILURE
  payload: any
}

export const sendOtpFailure = (payload: any): SendOtpFailureInterface => {
  return {
    type: FORGOT_PASSWORD_ACTIONS.SEND_OTP_FAILURE,
    payload,
  }
}

export interface VerifyOtpInterface {
  type: FORGOT_PASSWORD_ACTIONS.VERIFY_OTP
  payload: VerifyOtpRequestBodyInterface
}

export const verifyOtp = (payload: VerifyOtpRequestBodyInterface): VerifyOtpInterface => {
  return {
    type: FORGOT_PASSWORD_ACTIONS.VERIFY_OTP,
    payload,
  }
}

export interface VerifyOtpSuccessInterface {
  type: FORGOT_PASSWORD_ACTIONS.VERIFY_OTP_SUCCESS
  payload: { message: string } | null
}

export const verifyOtpSuccess = (payload: { message: string }): VerifyOtpSuccessInterface => {
  return {
    type: FORGOT_PASSWORD_ACTIONS.VERIFY_OTP_SUCCESS,
    payload,
  }
}
export interface VerifyOtpFailureInterface {
  type: FORGOT_PASSWORD_ACTIONS.VERIFY_OTP_FAILURE
  payload: any
}

export const verifyOtpFailure = (payload: any): VerifyOtpFailureInterface => {
  return {
    type: FORGOT_PASSWORD_ACTIONS.VERIFY_OTP_FAILURE,
    payload,
  }
}
export interface SaveEmailForPasswordInterface {
  type: FORGOT_PASSWORD_ACTIONS.SAVE_EMAIL_FOR_PASSWORD_UPDATE
  payload: string
}
export const saveEmailForPassword = (payload: string): SaveEmailForPasswordInterface => {
  return {
    type: FORGOT_PASSWORD_ACTIONS.SAVE_EMAIL_FOR_PASSWORD_UPDATE,
    payload,
  }
}
export type ForgotPasswordActions =
  | SendOtpInterface
  | SendOtpSuccessInterface
  | SendOtpFailureInterface
  | VerifyOtpInterface
  | VerifyOtpSuccessInterface
  | VerifyOtpFailureInterface
  | SaveEmailForPasswordInterface
