import { SuccessMessageInterface } from '../../utils/types'
import {
  CreateTeamInterface,
  PLAYERS_INTERFACE,
  PlayerStatsDataInterface,
  PlayerStatsRequestBodyInterface,
  PredictWinnerRequestBody,
  PreviousPredictedTeam,
  PreviousPredictionRequestBody,
  TeamDetailsInterface,
} from './types'

export enum CREATE_TEAM_ACTIONS {
  GET_ALL_PLAYERS = `GET_ALL_PLAYERS`,
  GET_ALL_PLAYERS_SUCCESS = `GET_ALL_PLAYERS_SUCCESS`,
  GET_ALL_PLAYERS_FAILURE = `GET_ALL_PLAYERS_FAILURE`,
  UPDATE_SELECTED_PLAYERS = 'UPDATE_SELECTED_PLAYERS',
  CREATE_TEAM = 'CREATE_TEAM',
  CREATE_TEAM_SUCCESS = 'CREATE_TEAM_SUCCESS',
  CREATE_TEAM_FAILURE = 'CREATE_TEAM_FAILURE',
  GET_SELECTED_TEAM = 'GET_SELECTED_TEAM',
  GET_SELECTED_TEAM_SUCCESS = 'GET_SELECTED_TEAM_SUCCESS',
  GET_SELECTED_TEAM_FAILURE = 'GET_SELECTED_TEAM_FAILURE',
  PREDICTION = 'PREDICTION',
  PREDICTION_SUCCESS = 'PREDICTION_SUCCESS',
  PREDICTION_FAILURE = 'PREDICTION_FAILURE',
  GET_PREVIOUS_PREDICTION = 'GET_PREVIOUS_PREDICTION',
  GET_PREVIOUS_PREDICTION_SUCCESS = 'GET_PREVIOUS_PREDICTION_SUCCESS',
  GET_PREVIOUS_PREDICTION_FAILURE = 'GET_PREVIOUS_PREDICTION_FAILURE',
  FETCH_PLAYER_STATS = 'FETCH_PLAYER_STATS',
  FETCH_PLAYER_STATS_SUCCESS = 'FETCH_PLAYER_STATS_SUCCESS',
  FETCH_PLAYER_STATS_FAILURE = 'FETCH_PLAYER_STATS_FAILURE',
}
export interface GetAllPlayersInterface {
  type: string
}
export const getAllPlayers = (): GetAllPlayersInterface => {
  return {
    type: CREATE_TEAM_ACTIONS.GET_ALL_PLAYERS,
  }
}
export interface GetAllPlayersSuccessInterface {
  type: CREATE_TEAM_ACTIONS.GET_ALL_PLAYERS_SUCCESS
  payload: PLAYERS_INTERFACE[]
}
export const getAllPlayersSuccess = (payload: PLAYERS_INTERFACE[]): GetAllPlayersSuccessInterface => {
  return {
    type: CREATE_TEAM_ACTIONS.GET_ALL_PLAYERS_SUCCESS,
    payload,
  }
}

export interface GetAllPlayersFailureInterface {
  type: CREATE_TEAM_ACTIONS.GET_ALL_PLAYERS_FAILURE
  payload: any
}
export const getAllPlayersFailure = (payload: any): GetAllPlayersFailureInterface => {
  return {
    type: CREATE_TEAM_ACTIONS.GET_ALL_PLAYERS_FAILURE,
    payload,
  }
}

export interface UpdateSelectedPlayersInterface {
  type: CREATE_TEAM_ACTIONS.UPDATE_SELECTED_PLAYERS
  payload: PLAYERS_INTERFACE[] | []
}
export const updateSelectedPlayers = (payload: PLAYERS_INTERFACE[] | []): UpdateSelectedPlayersInterface => {
  return {
    type: CREATE_TEAM_ACTIONS.UPDATE_SELECTED_PLAYERS,
    payload,
  }
}

export interface CreateTeamActionInterface {
  type: CREATE_TEAM_ACTIONS.CREATE_TEAM
  payload: CreateTeamInterface
}
export const createTeam = (payload: CreateTeamInterface): CreateTeamActionInterface => {
  return {
    type: CREATE_TEAM_ACTIONS.CREATE_TEAM,
    payload,
  }
}

export interface CreateTeamActionInterfaceSuccess {
  type: CREATE_TEAM_ACTIONS.CREATE_TEAM_SUCCESS
  payload: SuccessMessageInterface
}
export const createTeamSuccess = (payload: SuccessMessageInterface): CreateTeamActionInterfaceSuccess => {
  return {
    type: CREATE_TEAM_ACTIONS.CREATE_TEAM_SUCCESS,
    payload,
  }
}
export interface CreateTeamActionInterfaceFailure {
  type: CREATE_TEAM_ACTIONS.CREATE_TEAM_FAILURE
  payload: any
}
export const createTeamFailure = (payload: any): CreateTeamActionInterfaceFailure => {
  return {
    type: CREATE_TEAM_ACTIONS.CREATE_TEAM_FAILURE,
    payload,
  }
}

export interface FetchTeamByIdInterface {
  type: CREATE_TEAM_ACTIONS.GET_SELECTED_TEAM
  payload: { team_id: number; isMember: boolean }
}
export const getTeamByIdAction = (payload: { team_id: number; isMember: boolean }): FetchTeamByIdInterface => {
  return {
    type: CREATE_TEAM_ACTIONS.GET_SELECTED_TEAM,
    payload,
  }
}

export interface FetchTeamByIdInterfaceSuccess {
  type: CREATE_TEAM_ACTIONS.GET_SELECTED_TEAM_SUCCESS
  payload: TeamDetailsInterface | null
}
export const getTeamByIdActionSuccess = (payload: TeamDetailsInterface | null): FetchTeamByIdInterfaceSuccess => {
  return {
    type: CREATE_TEAM_ACTIONS.GET_SELECTED_TEAM_SUCCESS,
    payload,
  }
}
export interface FetchTeamByIdInterfaceFailure {
  type: CREATE_TEAM_ACTIONS.GET_SELECTED_TEAM_FAILURE
  payload: any
}
export const getTeamByIdActionFailure = (payload: any): FetchTeamByIdInterfaceFailure => {
  return {
    type: CREATE_TEAM_ACTIONS.GET_SELECTED_TEAM_FAILURE,
    payload,
  }
}

export interface PredictWinnerAction {
  type: CREATE_TEAM_ACTIONS.PREDICTION
  payload: PredictWinnerRequestBody
}
export const predictWinnerAction = (payload: PredictWinnerRequestBody): PredictWinnerAction => {
  return {
    type: CREATE_TEAM_ACTIONS.PREDICTION,
    payload,
  }
}
export interface PredictWinnerActionSuccess {
  type: CREATE_TEAM_ACTIONS.PREDICTION_SUCCESS
  payload: string
}
export const predictWinnerSuccessAction = (payload: string): PredictWinnerActionSuccess => {
  return {
    type: CREATE_TEAM_ACTIONS.PREDICTION_SUCCESS,
    payload,
  }
}

export interface PredictWinnerActionFailure {
  type: CREATE_TEAM_ACTIONS.PREDICTION_FAILURE
  payload: any
}
export const predictWinnerFailureAction = (payload: any): PredictWinnerActionFailure => {
  return {
    type: CREATE_TEAM_ACTIONS.PREDICTION_FAILURE,
    payload,
  }
}
export interface PreviousPredictionAction {
  type: CREATE_TEAM_ACTIONS.GET_PREVIOUS_PREDICTION
  payload: PreviousPredictionRequestBody
}
export const fetchPreviousPrediction = (payload: PreviousPredictionRequestBody): PreviousPredictionAction => {
  return {
    type: CREATE_TEAM_ACTIONS.GET_PREVIOUS_PREDICTION,
    payload,
  }
}

export interface PreviousPredictionSuccessAction {
  type: CREATE_TEAM_ACTIONS.GET_PREVIOUS_PREDICTION_SUCCESS
  payload: PreviousPredictedTeam
}
export const fetchPreviousPredictionSuccess = (payload: PreviousPredictedTeam): PreviousPredictionSuccessAction => {
  return {
    type: CREATE_TEAM_ACTIONS.GET_PREVIOUS_PREDICTION_SUCCESS,
    payload,
  }
}

export interface PreviousPredictionFailureAction {
  type: CREATE_TEAM_ACTIONS.GET_PREVIOUS_PREDICTION_FAILURE
  payload: any
}
export const fetchPreviousPredictionFailure = (payload: any): PreviousPredictionFailureAction => {
  return {
    type: CREATE_TEAM_ACTIONS.GET_PREVIOUS_PREDICTION_FAILURE,
    payload,
  }
}

export interface PlayerStatsInterface {
  type: CREATE_TEAM_ACTIONS.FETCH_PLAYER_STATS
  payload: PlayerStatsRequestBodyInterface
}
export const fetchPlayerStats = (payload: PlayerStatsRequestBodyInterface): PlayerStatsInterface => {
  return {
    type: CREATE_TEAM_ACTIONS.FETCH_PLAYER_STATS,
    payload,
  }
}

export interface PlayerStatsSuccessInterface {
  type: CREATE_TEAM_ACTIONS.FETCH_PLAYER_STATS_SUCCESS
  payload: PlayerStatsDataInterface[] | null
}
export const fetchPlayerStatsSuccess = (payload: PlayerStatsDataInterface[] | null): PlayerStatsSuccessInterface => {
  return {
    type: CREATE_TEAM_ACTIONS.FETCH_PLAYER_STATS_SUCCESS,
    payload,
  }
}

export interface PlayerStatsFailureInterface {
  type: CREATE_TEAM_ACTIONS.FETCH_PLAYER_STATS_FAILURE
  payload: any
}
export const fetchPlayerStatsFailure = (payload: any): PlayerStatsFailureInterface => {
  return {
    type: CREATE_TEAM_ACTIONS.FETCH_PLAYER_STATS_FAILURE,
    payload,
  }
}

export type CreateTeamActions =
  | GetAllPlayersSuccessInterface
  | GetAllPlayersFailureInterface
  | UpdateSelectedPlayersInterface
  | CreateTeamActionInterface
  | CreateTeamActionInterfaceSuccess
  | CreateTeamActionInterfaceFailure
  | FetchTeamByIdInterface
  | FetchTeamByIdInterfaceSuccess
  | FetchTeamByIdInterfaceFailure
  | PredictWinnerAction
  | PredictWinnerActionSuccess
  | PredictWinnerActionFailure
  | PreviousPredictionAction
  | PreviousPredictionSuccessAction
  | PreviousPredictionFailureAction
  | PlayerStatsInterface
  | PlayerStatsSuccessInterface
  | PlayerStatsFailureInterface
