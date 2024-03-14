import { all, call, put, takeLatest } from 'redux-saga/effects'
import * as actionTypes from './actions'
import { API_URLS, HTTPS_HEADERS, MESSAGES, REQUEST_TYPE, ResponseGenerator } from '../../../utils/constants'
import { _request } from '../../../utils/utils'

function* sendOtp(action: actionTypes.SendOtpInterface) {
  try {
    const response: ResponseGenerator = yield call(_request, {
      url: API_URLS.SEND_OTP,
      method: REQUEST_TYPE.POST,
      headers: HTTPS_HEADERS,
      data: action.payload,
    })
    if (response.status && response.status >= 200 && response.status <= 299) {
      yield put(actionTypes.sendOtpSuccess(response?.data))
    } else {
      yield put(
        actionTypes.sendOtpFailure(
          response?.response?.data.message
            ? { message: response?.response?.data.message }
            : { message: MESSAGES.SOMETHING_WENT_WRONG },
        ),
      )
    }
  } catch (e) {
    yield put(actionTypes.sendOtpFailure({ message: MESSAGES.SOMETHING_WENT_WRONG }))
    console.error(e)
  }
}

function* verifyOtp(action: actionTypes.VerifyOtpInterface) {
  try {
    const response: ResponseGenerator = yield call(_request, {
      url: API_URLS.VERIFY_OTP,
      method: REQUEST_TYPE.POST,
      headers: HTTPS_HEADERS,
      data: action.payload,
    })
    if (response.status && response.status >= 200 && response.status <= 299) {
      yield put(actionTypes.verifyOtpSuccess(response?.data))
    } else {
      yield put(
        actionTypes.verifyOtpFailure(
          response?.response?.data ? response?.response?.data : { message: MESSAGES.SOMETHING_WENT_WRONG },
        ),
      )
    }
  } catch (e) {
    yield put(actionTypes.verifyOtpFailure({ message: MESSAGES.SOMETHING_WENT_WRONG }))
    console.error(e)
  }
}

function* forgotPasswordSaga() {
  yield all([
    takeLatest(actionTypes.FORGOT_PASSWORD_ACTIONS.SEND_OTP, sendOtp),
    takeLatest(actionTypes.FORGOT_PASSWORD_ACTIONS.VERIFY_OTP, verifyOtp),
  ])
}

export default forgotPasswordSaga
