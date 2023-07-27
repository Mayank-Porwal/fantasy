import { combineReducers } from '@reduxjs/toolkit';
import appReducer from '../appActions/reducer';
import createTeamReducer from '../../container/CreateTeam/reducer';
import loginReducer from '../../container/Login/reducer';

const rootReducer = combineReducers({
    appReducer: appReducer,
    createTeamReducer: createTeamReducer,
    loginReducer: loginReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
