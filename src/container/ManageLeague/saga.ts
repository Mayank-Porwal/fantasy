import { all, call, put, takeLatest } from 'redux-saga/effects'
import * as actionTypes from './actions'
import { _request } from '../../utils/utils'
import { API_URLS, HTTPS_HEADERS, MESSAGES, REQUEST_TYPE, ResponseGenerator } from '../../utils/constants'

function* makeLeague(action: actionTypes.CreateLeagueInterface) {
  try {
    const response: ResponseGenerator = yield call(_request, {
      url: `${API_URLS.CREATE_LEAGUE}${action.payload.teamName ? `?team_name=${action.payload.teamName}` : ''}`,
      method: REQUEST_TYPE.POST,
      headers: HTTPS_HEADERS,
      data: action.payload.leagueData,
    })
    if (response.status && response.status >= 200 && response.status <= 299) {
      yield put(actionTypes.createLeagueActionSuccess(response?.data))
    } else {
      yield put(
        actionTypes.createLeagueActionFailure(
          response?.response?.data.message
            ? { message: response?.response?.data.message }
            : { message: MESSAGES.SOMETHING_WENT_WRONG },
        ),
      )
    }
  } catch (e) {
    yield put(actionTypes.createLeagueActionFailure(MESSAGES.SOMETHING_WENT_WRONG))
    console.error(e)
  }
}

function* joinLeague(action: actionTypes.JoinLeagueInterface) {
  try {
    const response: ResponseGenerator = yield call(_request, {
      url: `${API_URLS.JOIN_LEAGUE}`,
      method: REQUEST_TYPE.POST,
      headers: HTTPS_HEADERS,
      data: action.payload,
    })
    if (response.status && response.status >= 200 && response.status <= 299) {
      yield put(actionTypes.joinLeagueActionSuccess(response?.data))
    } else {
      yield put(
        actionTypes.joinLeagueActionFailure(
          response?.response?.data.message
            ? { message: response?.response?.data.message }
            : { message: MESSAGES.SOMETHING_WENT_WRONG },
        ),
      )
    }
  } catch (e) {
    yield put(actionTypes.joinLeagueActionFailure(MESSAGES.SOMETHING_WENT_WRONG))
    console.error(e)
  }
}

function* createLeagueSaga() {
  yield all([
    takeLatest(actionTypes.CREATE_LEAGUE_ACTIONS.CREATE_LEAGUE, makeLeague),
    takeLatest(actionTypes.CREATE_LEAGUE_ACTIONS.JOIN_LEAGUE, joinLeague),
  ])
}

export default createLeagueSaga
