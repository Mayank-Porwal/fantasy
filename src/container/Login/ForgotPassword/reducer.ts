import { FORGOT_PASSWORD_ACTIONS, ForgotPasswordActions } from './actions'
interface InitialState {
  sendOtpSuccess: { message: string } | null
  sendOtpFailure: any
  verifyOtpSuccess: { message: string } | null
  verifyOtpFailure: any
  email: string
}
const initialState = {
  sendOtpSuccess: null,
  sendOtpFailure: null,
  verifyOtpSuccess: null,
  verifyOtpFailure: null,
  email: '',
}
const forgotPasswordReducer = (state: InitialState = initialState, action: ForgotPasswordActions): InitialState => {
  switch (action.type) {
    case FORGOT_PASSWORD_ACTIONS.SEND_OTP_SUCCESS:
      return { ...state, sendOtpSuccess: action.payload }
    case FORGOT_PASSWORD_ACTIONS.SEND_OTP_FAILURE:
      return { ...state, sendOtpFailure: action.payload }
    case FORGOT_PASSWORD_ACTIONS.VERIFY_OTP_SUCCESS:
      return { ...state, verifyOtpSuccess: action.payload }
    case FORGOT_PASSWORD_ACTIONS.VERIFY_OTP_FAILURE:
      return { ...state, verifyOtpFailure: action.payload }
    case FORGOT_PASSWORD_ACTIONS.SAVE_EMAIL_FOR_PASSWORD_UPDATE:
      return { ...state, email: action.payload }
    default:
      return { ...state }
  }
}

export default forgotPasswordReducer
