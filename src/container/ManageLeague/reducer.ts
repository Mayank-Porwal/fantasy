import { SuccessMessageInterface } from '../../utils/types'
import { CREATE_LEAGUE_ACTIONS, CreateLeagueActions } from './actions'
import { FetchLeagueResponseInterface, LeagueDetailsInterface, PublicLeagueResponseInterface } from './types'

interface InitialState {
  createLeagueSuccess: SuccessMessageInterface | null
  createLeagueFailure: any
  joinLeagueSuccess: SuccessMessageInterface | null
  joinLeagueFailure: any
  leagueData: FetchLeagueResponseInterface | null
  leagueDataFailure: any
  leagueDetails: LeagueDetailsInterface | null
  leagueDetailsFailure: any
  publicLeagues: PublicLeagueResponseInterface | null
  publicLeaguesFailure: any
}
const initialState = {
  createLeagueSuccess: null,
  createLeagueFailure: null,
  joinLeagueSuccess: null,
  joinLeagueFailure: null,
  leagueData: null,
  leagueDataFailure: null,
  leagueDetails: null,
  leagueDetailsFailure: null,
  publicLeagues: null,
  publicLeaguesFailure: null,
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
    case CREATE_LEAGUE_ACTIONS.FETCH_LEAGUE_DETAILS_SUCCESS:
      return { ...state, leagueDetails: action.payload }
    case CREATE_LEAGUE_ACTIONS.FETCH_LEAGUE_DETAILS_FAILURE:
      return { ...state, leagueDetailsFailure: action.payload }
    case CREATE_LEAGUE_ACTIONS.FETCH_PUBLIC_LEAGUES_SUCCESS:
      return { ...state, publicLeagues: action.payload }
    case CREATE_LEAGUE_ACTIONS.FETCH_PUBLIC_LEAGUES_FAILURE:
      return { ...state, publicLeaguesFailure: action.payload }
    default:
      return { ...state }
  }
}

export default createLeagueReducer
