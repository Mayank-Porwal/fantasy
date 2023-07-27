import { all } from "redux-saga/effects";
import { appSaga } from "../appActions/saga";
import createTeamSaga from "../../container/CreateTeam/saga";
import loginSaga from "../../container/Login/saga";

export default function* rootSaga() {
  yield all([appSaga(), createTeamSaga(), loginSaga()]);
}
