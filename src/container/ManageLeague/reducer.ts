import { SuccessMessageInterface } from '../../utils/types'
import { CREATE_LEAGUE_ACTIONS, CreateLeagueActions } from './actions'

interface InitialState {
  createLeagueSuccess: SuccessMessageInterface | null
  createLeagueFailure: any
  joinLeagueSuccess: SuccessMessageInterface | null
  joinLeagueFailure: any
}
const initialState = {
  createLeagueSuccess: null,
  createLeagueFailure: null,
  joinLeagueSuccess: null,
  joinLeagueFailure: null,
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
    default:
      return { ...state }
  }
}

export default createLeagueReducer
