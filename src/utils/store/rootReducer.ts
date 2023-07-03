import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "../appActions/reducer";
import createTeamReducer from "../../container/CreateTeam/reducer";

const rootReducer = combineReducers({
  appReducer: appReducer,
  createTeamReducer: createTeamReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
