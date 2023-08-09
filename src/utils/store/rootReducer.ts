import { combineReducers } from '@reduxjs/toolkit';
import appReducer from '../appActions/reducer';
import createTeamReducer from '../../container/CreateTeam/reducer';
import loginReducer from '../../container/Login/reducer';
import createLeagueReducer from '../../container/ManageLeague/reducer';

const rootReducer = combineReducers({
    appReducer: appReducer,
    createTeamReducer: createTeamReducer,
    loginReducer: loginReducer,
    leagueReducer: createLeagueReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
