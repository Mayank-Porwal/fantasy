export interface ForgotPasswordFormInterface {
  email: string
  otp: string
}

export interface SendOtpRequestBodyInterface {
  email: string
}

export interface VerifyOtpRequestBodyInterface {
  email: string
  otp: number
}

export interface UpdatePasswordFormDataInterface {
  password: string
  confirmPassword: string
}
