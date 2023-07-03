import { CREATE_TEAM_ACTIONS, CreateTeamActions } from './actions';
import { PLAYERS_INTERFACE } from './types';
interface InitialState {
    allPlayers: PLAYERS_INTERFACE[] | [];
    allPlayersFailure: any;
    selectedPlayers: PLAYERS_INTERFACE[] | [];
}
const initialState = {
    allPlayers: [],
    allPlayersFailure: null,
    selectedPlayers: [],
};
const createTeamReducer = (state: InitialState = initialState, action: CreateTeamActions): InitialState => {
    switch (action.type) {
        case CREATE_TEAM_ACTIONS.GET_ALL_PLAYERS_SUCCESS:
            return { ...state, allPlayers: action.payload };
        case CREATE_TEAM_ACTIONS.GET_ALL_PLAYERS_FAILURE:
            return { ...state, allPlayersFailure: action.payload };
        case CREATE_TEAM_ACTIONS.UPDATE_SELECTED_PLAYERS:
            return { ...state, selectedPlayers: action.payload };
        default:
            return { ...state };
    }
};

export default createTeamReducer;
