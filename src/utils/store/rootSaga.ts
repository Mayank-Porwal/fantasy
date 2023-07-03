import { all } from "redux-saga/effects";
import { appSaga } from "../appActions/saga";
import createTeamSaga from "../../container/CreateTeam/saga";

export default function* rootSaga() {
  yield all([appSaga(), createTeamSaga()]);
}
