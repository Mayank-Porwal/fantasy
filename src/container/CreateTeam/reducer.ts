import { SuccessMessageInterface } from '../../utils/types'
import { CREATE_TEAM_ACTIONS, CreateTeamActions } from './actions'
import { PLAYERS_INTERFACE, PreviousPredictedTeam, TeamDetailsInterface } from './types'
interface InitialState {
  allPlayers: PLAYERS_INTERFACE[] | []
  allPlayersFailure: any
  selectedPlayers: PLAYERS_INTERFACE[] | []
  createTeamSuccess: SuccessMessageInterface
  createTeamFailure: any
  selectedTeam: TeamDetailsInterface | null
  selectedTeamFailure: any
  prediction: string
  predictionFailure: any
  previousPrediction: PreviousPredictedTeam | null
  previousPredictionFailure: any
}
const initialState = {
  allPlayers: [],
  allPlayersFailure: null,
  selectedPlayers: [],
  createTeamSuccess: { message: '' },
  createTeamFailure: '',
  selectedTeam: null,
  selectedTeamFailure: null,
  prediction: '',
  predictionFailure: null,
  previousPrediction: null,
  previousPredictionFailure: null,
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
    case CREATE_TEAM_ACTIONS.PREDICTION_SUCCESS:
      return { ...state, prediction: action.payload }
    case CREATE_TEAM_ACTIONS.PREDICTION_FAILURE:
      return { ...state, predictionFailure: action.payload }
    case CREATE_TEAM_ACTIONS.GET_PREVIOUS_PREDICTION_SUCCESS:
      return { ...state, previousPrediction: action.payload }
    case CREATE_TEAM_ACTIONS.GET_PREVIOUS_PREDICTION_FAILURE:
      return { ...state, previousPredictionFailure: action.payload }
    default:
      return { ...state }
  }
}

export default createTeamReducer
