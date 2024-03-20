import { LeagueDetailsActions, LEAGUE_DETAILS_ACTIONS } from './actions'
import { CompletedMatchesDataInterface, MatchLeaderBoardInterface, RulesDataInterface } from './types'

interface InitialState {
  rulesData: RulesDataInterface[] | null
  rulesDataFailure: any
  updateRulesSuccess: { message: string } | null
  updateRulesFailure: any
  completedMatches: CompletedMatchesDataInterface[] | null
  completedMatchesFailure: any
  leaderBoard: MatchLeaderBoardInterface[] | null
  leaderBoardFailure: any
}
const initialState = {
  rulesData: null,
  rulesDataFailure: null,
  updateRulesSuccess: null,
  updateRulesFailure: null,
  completedMatches: null,
  completedMatchesFailure: null,
  leaderBoard: null,
  leaderBoardFailure: null,
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
    case LEAGUE_DETAILS_ACTIONS.COMPLETED_MATCH_SUCCESS:
      return { ...state, completedMatches: action.payload }
    case LEAGUE_DETAILS_ACTIONS.COMPLETED_MATCH_FAILURE:
      return { ...state, completedMatchesFailure: action.payload }
    case LEAGUE_DETAILS_ACTIONS.MATCH_LEADER_BOARD_SUCCESS:
      return { ...state, leaderBoard: action.payload }
    case LEAGUE_DETAILS_ACTIONS.MATCH_LEADER_BOARD_FAILURE:
      return { ...state, leaderBoardFailure: action.payload }
    default:
      return { ...state }
  }
}

export default leagueDetailsReducer
