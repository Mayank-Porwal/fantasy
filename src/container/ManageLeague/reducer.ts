import { SuccessMessageInterface } from '../../utils/types'
import { CREATE_LEAGUE_ACTIONS, CreateLeagueActions } from './actions'
import { FetchLeagueResponseInterface } from './types'

interface InitialState {
  createLeagueSuccess: SuccessMessageInterface | null
  createLeagueFailure: any
  joinLeagueSuccess: SuccessMessageInterface | null
  joinLeagueFailure: any
  leagueData: FetchLeagueResponseInterface | null
  leagueDataFailure: any
}
const initialState = {
  createLeagueSuccess: null,
  createLeagueFailure: null,
  joinLeagueSuccess: null,
  joinLeagueFailure: null,
  leagueData: null,
  leagueDataFailure: null,
}

const createLeagueReducer = (state: InitialState = initialState, action: CreateLeagueActions): InitialState => {
  switch (action.type) {
    case CREATE_LEAGUE_ACTIONS.CREATE_LEAGUE_SUCCESS:
      return { ...state, createLeagueSuccess: action.payload }
    case CREATE_LEAGUE_ACTIONS.CREATE_LEAGUE_FAILURE:
      return { ...state, createLeagueFailure: action.payload }
    case CREATE_LEAGUE_ACTIONS.JOIN_LEAGUE_SUCCESS:
      return { ...state, joinLeagueSuccess: action.payload }
    case CREATE_LEAGUE_ACTIONS.JOIN_LEAGUE_FAILURE:
      return { ...state, joinLeagueFailure: action.payload }
    case CREATE_LEAGUE_ACTIONS.FETCH_LEAGUE_SUCCESS:
      return { ...state, leagueData: action.payload }
    case CREATE_LEAGUE_ACTIONS.FETCH_LEAGUE_FAILURE:
      return { ...state, leagueDataFailure: action.payload }
    default:
      return { ...state }
  }
}

export default createLeagueReducer
