import { SuccessMessageInterface } from '../../utils/types'
import { CREATE_TEAM_ACTIONS, CreateTeamActions, createTeamSuccess } from './actions'
import { PLAYERS_INTERFACE, TeamDetailsInterface } from './types'
interface InitialState {
  allPlayers: PLAYERS_INTERFACE[] | []
  allPlayersFailure: any
  selectedPlayers: PLAYERS_INTERFACE[] | []
  createTeamSuccess: SuccessMessageInterface
  createTeamFailure: any
  selectedTeam: TeamDetailsInterface | null
  selectedTeamFailure: any
}
const initialState = {
  allPlayers: [],
  allPlayersFailure: null,
  selectedPlayers: [],
  createTeamSuccess: { message: '' },
  createTeamFailure: '',
  selectedTeam: null,
  selectedTeamFailure: null,
}
const createTeamReducer = (state: InitialState = initialState, action: CreateTeamActions): InitialState => {
  switch (action.type) {
    case CREATE_TEAM_ACTIONS.GET_ALL_PLAYERS_SUCCESS:
      return { ...state, allPlayers: action.payload }
    case CREATE_TEAM_ACTIONS.GET_ALL_PLAYERS_FAILURE:
      return { ...state, allPlayersFailure: action.payload }
    case CREATE_TEAM_ACTIONS.UPDATE_SELECTED_PLAYERS:
      return { ...state, selectedPlayers: action.payload }
    case CREATE_TEAM_ACTIONS.CREATE_TEAM_SUCCESS:
      return { ...state, createTeamSuccess: action.payload }
    case CREATE_TEAM_ACTIONS.CREATE_TEAM_FAILURE:
      return { ...state, createTeamFailure: action.payload }
    case CREATE_TEAM_ACTIONS.GET_SELECTED_TEAM_SUCCESS:
      return { ...state, selectedTeam: action.payload }
    case CREATE_TEAM_ACTIONS.GET_SELECTED_TEAM_FAILURE:
      return { ...state, selectedTeamFailure: action.payload }
    default:
      return { ...state }
  }
}

export default createTeamReducer
