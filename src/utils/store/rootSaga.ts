import { all } from 'redux-saga/effects'
import applicationSaga from '../appActions/saga'
import createTeamSaga from '../../container/CreateTeam/saga'
import loginSaga from '../../container/Login/saga'
import createLeagueSaga from '../../container/ManageLeague/saga'
import leagueDetailsSaga from '../../container/ManageLeague/LeagueDetails/saga'
import forgotPasswordSaga from '../../container/Login/ForgotPassword/saga'

export default function* rootSaga() {
  yield all([
    applicationSaga(),
    createTeamSaga(),
    loginSaga(),
    createLeagueSaga(),
    leagueDetailsSaga(),
    forgotPasswordSaga(),
  ])
}
