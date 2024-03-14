import { all, call, put, takeLatest } from 'redux-saga/effects'
import { API_URLS, HTTPS_HEADERS, MESSAGES, REQUEST_TYPE, ResponseGenerator } from '../../utils/constants'
import { _request } from '../../utils/utils'
import * as actionTypes from './actions'

function* fetchAllPlayers(action: actionTypes.GetAllPlayersInterface) {
  try {
    const response: ResponseGenerator = yield call(_request, {
      url: API_URLS.FETCH_ALL_PLAYERS,
      method: REQUEST_TYPE.GET,
      headers: HTTPS_HEADERS,
    })
    if (response.status && response.status >= 200 && response.status <= 299) {
      yield put(actionTypes.getAllPlayersSuccess(response?.data))
    } else {
      yield put(
        actionTypes.getAllPlayersFailure(
          response?.data.message ? response?.data.message : MESSAGES.SOMETHING_WENT_WRONG,
        ),
      )
    }
  } catch (e) {
    yield put(actionTypes.getAllPlayersFailure(MESSAGES.SOMETHING_WENT_WRONG))
    console.error(e)
  }
}
function* makeTeam(action: actionTypes.CreateTeamActionInterface) {
  try {
    const response: ResponseGenerator = yield call(_request, {
      url: API_URLS.CREATE_TEAM,
      method: REQUEST_TYPE.PUT,
      data: action.payload,
      headers: HTTPS_HEADERS,
    })
    if (response.status && response.status >= 200 && response.status <= 299) {
      yield put(actionTypes.createTeamSuccess(response?.data))
    } else {
      yield put(
        actionTypes.createTeamFailure(response?.data.message ? response?.data.message : MESSAGES.SOMETHING_WENT_WRONG),
      )
    }
  } catch (e) {
    yield put(actionTypes.createTeamFailure(MESSAGES.SOMETHING_WENT_WRONG))
    console.error(e)
  }
}
function* selectedTeamById(action: actionTypes.FetchTeamByIdInterface) {
  try {
    const response: ResponseGenerator = yield call(_request, {
      url: `${API_URLS.CREATE_TEAM}?team_id=${action.payload}`,
      method: REQUEST_TYPE.GET,
      headers: HTTPS_HEADERS,
    })
    if (response.status && response.status >= 200 && response.status <= 299) {
      yield put(actionTypes.getTeamByIdActionSuccess(response?.data))
    } else {
      yield put(
        actionTypes.getTeamByIdActionFailure(
          response?.data.message ? response?.data.message : MESSAGES.SOMETHING_WENT_WRONG,
        ),
      )
    }
  } catch (e) {
    yield put(actionTypes.getTeamByIdActionFailure(MESSAGES.SOMETHING_WENT_WRONG))
    console.error(e)
  }
}

function* savePrediction(action: actionTypes.PredictWinnerAction) {
  try {
    const response: ResponseGenerator = yield call(_request, {
      url: `${API_URLS.PREDICTION}`,
      method: REQUEST_TYPE.POST,
      headers: HTTPS_HEADERS,
      data: action.payload,
    })
    if (response.status && response.status >= 200 && response.status <= 299) {
      yield put(actionTypes.predictWinnerSuccessAction(response?.data))
    } else {
      yield put(
        actionTypes.predictWinnerFailureAction(
          response?.data.message ? response?.data.message : MESSAGES.SOMETHING_WENT_WRONG,
        ),
      )
    }
  } catch (e) {
    yield put(actionTypes.predictWinnerFailureAction(MESSAGES.SOMETHING_WENT_WRONG))
    console.error(e)
  }
}

function* getPredictions(action: actionTypes.PreviousPredictionAction) {
  try {
    const response: ResponseGenerator = yield call(_request, {
      url: `${API_URLS.PREDICTION}?team_id=${action.payload.team_id}&league_id=${action.payload.league_id}`,
      method: REQUEST_TYPE.GET,
      headers: HTTPS_HEADERS,
    })
    if (response.status && response.status >= 200 && response.status <= 299) {
      yield put(actionTypes.fetchPreviousPredictionSuccess(response?.data))
    } else {
      yield put(
        actionTypes.fetchPreviousPredictionFailure(
          response?.data.message ? response?.data.message : MESSAGES.SOMETHING_WENT_WRONG,
        ),
      )
    }
  } catch (e) {
    yield put(actionTypes.fetchPreviousPredictionFailure(MESSAGES.SOMETHING_WENT_WRONG))
    console.error(e)
  }
}

function* createTeamSaga() {
  yield all([
    takeLatest(actionTypes.CREATE_TEAM_ACTIONS.GET_ALL_PLAYERS, fetchAllPlayers),
    takeLatest(actionTypes.CREATE_TEAM_ACTIONS.CREATE_TEAM, makeTeam),
    takeLatest(actionTypes.CREATE_TEAM_ACTIONS.GET_SELECTED_TEAM, selectedTeamById),
    takeLatest(actionTypes.CREATE_TEAM_ACTIONS.PREDICTION, savePrediction),
    takeLatest(actionTypes.CREATE_TEAM_ACTIONS.GET_PREVIOUS_PREDICTION, getPredictions),
  ])
}

export default createTeamSaga
