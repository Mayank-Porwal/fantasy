import { CREATE_LEAGUE_ACTIONS, CreateLeagueActions } from "./actions";

interface InitialState {
    createLeagueSuccess: {message: string} | null,
    createLeagueFailure: any
}
const initialState = {
    createLeagueSuccess: null,
    createLeagueFailure: null
};

const createLeagueReducer = (state: InitialState = initialState, action: CreateLeagueActions): InitialState => {
    switch (action.type) {
        case CREATE_LEAGUE_ACTIONS.CREATE_LEAGUE_SUCCESS:
            return { ...state, createLeagueSuccess: action.payload };
        case CREATE_LEAGUE_ACTIONS.CREATE_LEAGUE_FAILURE:
            return { ...state, createLeagueFailure: action.payload };
        default:
            return { ...state };
    }
};

export default createLeagueReducer;