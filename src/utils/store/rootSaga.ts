import { all } from 'redux-saga/effects'
import applicationSaga from '../appActions/saga'
import createTeamSaga from '../../container/CreateTeam/saga'
import loginSaga from '../../container/Login/saga'
import createLeagueSaga from '../../container/ManageLeague/saga'

export default function* rootSaga() {
  yield all([applicationSaga(), createTeamSaga(), loginSaga(), createLeagueSaga()])
}
