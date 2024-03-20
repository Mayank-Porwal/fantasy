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
function* getCompletedMatchesData(action: actionTypes.CompletedMatchesInterface) {
  try {
    const response: ResponseGenerator = yield call(_request, {
      url: `${API_URLS.COMPLETED_MATCHES}`,
      method: REQUEST_TYPE.GET,
      headers: HTTPS_HEADERS,
    })
    if (response.status && response.status >= 200 && response.status <= 299) {
      //yield put(actionTypes.completedMatchesSuccessAction(response?.data))
      yield put(
        actionTypes.completedMatchesSuccessAction([
          {
            match: 'KKR vs SRH',
            match_id: 58334,
            number: 2,
          },
          {
            match: 'CSK vs RCB',
            match_id: 58328,
            number: 1,
          },
        ]),
      )
    } else {
      yield put(
        actionTypes.completedMatchesFailureAction(
          response?.response?.data.message
            ? { message: response?.response?.data.message }
            : { message: MESSAGES.SOMETHING_WENT_WRONG },
        ),
      )
    }
  } catch (e) {
    yield put(actionTypes.completedMatchesFailureAction(MESSAGES.SOMETHING_WENT_WRONG))
    console.error(e)
  }
}

function* fetchLeaderBoard(action: actionTypes.LeaderBoardMatchesInterface) {
  try {
    const response: ResponseGenerator = yield call(_request, {
      url: `${API_URLS.FETCH_LEADER_BOARD}?match_id=${action.payload.match_id}&league_id=${action.payload.league_id}`,
      method: REQUEST_TYPE.GET,
      headers: HTTPS_HEADERS,
    })
    if (response.status && response.status >= 200 && response.status <= 299) {
      yield put(actionTypes.getLeaderBoardSuccessAction(response?.data))
    } else {
      yield put(
        actionTypes.getLeaderBoardFailureAction(
          response?.response?.data.message
            ? { message: response?.response?.data.message }
            : { message: MESSAGES.SOMETHING_WENT_WRONG },
        ),
      )
    }
  } catch (e) {
    yield put(actionTypes.getLeaderBoardFailureAction(MESSAGES.SOMETHING_WENT_WRONG))
    console.error(e)
  }
}

function* leagueDetailsSaga() {
  yield all([
    takeLatest(actionTypes.LEAGUE_DETAILS_ACTIONS.FETCH_LEAGUE_RULES, getRulesByLeagueId),
    takeLatest(actionTypes.LEAGUE_DETAILS_ACTIONS.UPDATE_RULES, updateRulesByLeagueId),
    takeLatest(actionTypes.LEAGUE_DETAILS_ACTIONS.COMPLETED_MATCH, getCompletedMatchesData),
    takeLatest(actionTypes.LEAGUE_DETAILS_ACTIONS.MATCH_LEADER_BOARD, fetchLeaderBoard),
  ])
}

export default leagueDetailsSaga
