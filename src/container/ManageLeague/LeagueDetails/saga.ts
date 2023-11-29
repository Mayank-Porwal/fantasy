import { all, call, put, takeLatest } from 'redux-saga/effects'
import * as actionTypes from './actions'
import { API_URLS, HTTPS_HEADERS, MESSAGES, REQUEST_TYPE, ResponseGenerator } from '../../../utils/constants'
import { _request } from '../../../utils/utils'

function* getRulesByLeagueId(action: actionTypes.FetchRulesInterface) {
  try {
    const response: ResponseGenerator = yield call(_request, {
      url: `${API_URLS.FETCH_RULES_BY_LEAGUE_ID}?league_id=${action.payload}`,
      method: REQUEST_TYPE.GET,
      headers: HTTPS_HEADERS,
    })
    if (response.status && response.status >= 200 && response.status <= 299) {
      yield put(actionTypes.fetchLeagueRulesByIdSuccess(response?.data))
    } else {
      yield put(
        actionTypes.fetchLeagueRulesByIdFailure(
          response?.response?.data.message
            ? { message: response?.response?.data.message }
            : { message: MESSAGES.SOMETHING_WENT_WRONG },
        ),
      )
    }
  } catch (e) {
    yield put(actionTypes.fetchLeagueRulesByIdFailure(MESSAGES.SOMETHING_WENT_WRONG))
    console.error(e)
  }
}
function* updateRulesByLeagueId(action: actionTypes.UpdateRulesInterface) {
  try {
    const response: ResponseGenerator = yield call(_request, {
      url: `${API_URLS.FETCH_RULES_BY_LEAGUE_ID}`,
      method: REQUEST_TYPE.PUT,
      headers: HTTPS_HEADERS,
      data: action.payload,
    })
    if (response.status && response.status >= 200 && response.status <= 299) {
      yield put(actionTypes.updateRulesSuccess(response?.data))
    } else {
      yield put(
        actionTypes.updateRulesFailure(
          response?.response?.data.message
            ? { message: response?.response?.data.message }
            : { message: MESSAGES.SOMETHING_WENT_WRONG },
        ),
      )
    }
  } catch (e) {
    yield put(actionTypes.updateRulesFailure(MESSAGES.SOMETHING_WENT_WRONG))
    console.error(e)
  }
}
function* leagueDetailsSaga() {
  yield all([
    takeLatest(actionTypes.LEAGUE_DETAILS_ACTIONS.FETCH_LEAGUE_RULES, getRulesByLeagueId),
    takeLatest(actionTypes.LEAGUE_DETAILS_ACTIONS.UPDATE_RULES, updateRulesByLeagueId),
  ])
}

export default leagueDetailsSaga
