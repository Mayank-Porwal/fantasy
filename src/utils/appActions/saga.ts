import { all, call, put, takeLatest } from 'redux-saga/effects'
import * as actionTypes from './actions'
import { _request } from '../../utils/utils'
import { API_URLS, HTTPS_HEADERS, MESSAGES, REQUEST_TYPE, ResponseGenerator } from '../../utils/constants'

function* getTeams(action: actionTypes.FetchTeamsInterface) {
  try {
    const response: ResponseGenerator = yield call(_request, {
      url: API_URLS.FETCH_TEAMS,
      method: REQUEST_TYPE.GET,
      headers: HTTPS_HEADERS,
    })
    if (response.status && response.status >= 200 && response.status <= 299) {
      yield put(actionTypes.getAllTeamsSuccess(response?.data))
    } else {
      yield put(
        actionTypes.getAllTeamsFailure(response?.data.message ? response?.data.message : MESSAGES.SOMETHING_WENT_WRONG),
      )
    }
  } catch (e) {
    yield put(actionTypes.getAllTeamsFailure(MESSAGES.SOMETHING_WENT_WRONG))
    console.error(e)
  }
}
function* getCurrentMatch() {
  try {
    const response: ResponseGenerator = yield call(_request, {
      url: API_URLS.CURRENT_MATCH,
      method: REQUEST_TYPE.GET,
      headers: HTTPS_HEADERS,
    })
    if (response.status && response.status >= 200 && response.status <= 299) {
      yield put(actionTypes.getCurrentMatchSuccess(response?.data))
    } else {
      yield put(
        actionTypes.getCurrentMatchFailure(
          response?.data.message ? response?.data.message : MESSAGES.SOMETHING_WENT_WRONG,
        ),
      )
    }
  } catch (e) {
    yield put(actionTypes.getCurrentMatchFailure(MESSAGES.SOMETHING_WENT_WRONG))
    console.error(e)
  }
}

function* applicationSaga() {
  yield all([
    takeLatest(actionTypes.APP_ACTIONS.FETCH_USERS_TEAM, getTeams),
    takeLatest(actionTypes.APP_ACTIONS.FETCH_CURRENT_MATCH, getCurrentMatch),
  ])
}

export default applicationSaga
