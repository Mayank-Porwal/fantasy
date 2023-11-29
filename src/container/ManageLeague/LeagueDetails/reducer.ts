import { LeagueDetailsActions, LEAGUE_DETAILS_ACTIONS } from './actions'
import { RulesDataInterface } from './types'

interface InitialState {
  rulesData: RulesDataInterface[] | null
  rulesDataFailure: any
  updateRulesSuccess: { message: string } | null
  updateRulesFailure: any
}
const initialState = {
  rulesData: null,
  rulesDataFailure: null,
  updateRulesSuccess: null,
  updateRulesFailure: null,
}
const leagueDetailsReducer = (state: InitialState = initialState, action: LeagueDetailsActions): InitialState => {
  switch (action.type) {
    case LEAGUE_DETAILS_ACTIONS.FETCH_LEAGUE_RULES_SUCCESS:
      return { ...state, rulesData: action.payload }
    case LEAGUE_DETAILS_ACTIONS.FETCH_LEAGUE_RULES_FAILURE:
      return { ...state, rulesDataFailure: action.payload }
    case LEAGUE_DETAILS_ACTIONS.UPDATE_RULES_SUCCESS:
      return { ...state, updateRulesSuccess: action.payload }
    case LEAGUE_DETAILS_ACTIONS.UPDATE_RULES_FAILURE:
      return { ...state, updateRulesFailure: action.payload }
    default:
      return { ...state }
  }
}

export default leagueDetailsReducer
