import {
  CompletedMatchesDataInterface,
  MatchLeaderBoardInterface,
  MatchLeaderBoardRequestInterface,
  RulesDataInterface,
  UpdateRulesRequestBodyInterface,
} from './types'

export enum LEAGUE_DETAILS_ACTIONS {
  FETCH_LEAGUE_RULES = 'FETCH_LEAGUE_RULES',
  FETCH_LEAGUE_RULES_SUCCESS = 'FETCH_LEAGUE_RULES_SUCCESS',
  FETCH_LEAGUE_RULES_FAILURE = 'FETCH_LEAGUE_RULES_FAILURE',
  UPDATE_RULES = 'UPDATE_RULES',
  UPDATE_RULES_SUCCESS = 'UPDATE_RULES_SUCCESS',
  UPDATE_RULES_FAILURE = 'UPDATE_RULES_FAILURE',
  COMPLETED_MATCH = 'COMPLETED_MATCH',
  COMPLETED_MATCH_SUCCESS = 'COMPLETED_MATCH_SUCCESS',
  COMPLETED_MATCH_FAILURE = 'COMPLETED_MATCH_FAILURE',
  MATCH_LEADER_BOARD = 'MATCH_LEADER_BOARD',
  MATCH_LEADER_BOARD_SUCCESS = 'MATCH_LEADER_BOARD_SUCCESS',
  MATCH_LEADER_BOARD_FAILURE = 'MATCH_LEADER_BOARD_FAILURE',
}
export interface FetchRulesInterface {
  type: LEAGUE_DETAILS_ACTIONS.FETCH_LEAGUE_RULES
  payload: string
}

export const fetchLeagueRulesById = (payload: string): FetchRulesInterface => {
  return {
    type: LEAGUE_DETAILS_ACTIONS.FETCH_LEAGUE_RULES,
    payload,
  }
}
export interface FetchLeagueRulesByIdSuccessInterface {
  type: LEAGUE_DETAILS_ACTIONS.FETCH_LEAGUE_RULES_SUCCESS
  payload: RulesDataInterface[] | null
}
export const fetchLeagueRulesByIdSuccess = (
  payload: RulesDataInterface[] | null,
): FetchLeagueRulesByIdSuccessInterface => {
  return {
    type: LEAGUE_DETAILS_ACTIONS.FETCH_LEAGUE_RULES_SUCCESS,
    payload,
  }
}

export interface FetchLeagueRulesByIdFailureInterface {
  type: LEAGUE_DETAILS_ACTIONS.FETCH_LEAGUE_RULES_FAILURE
  payload: any
}
export const fetchLeagueRulesByIdFailure = (payload: any): FetchLeagueRulesByIdFailureInterface => {
  return {
    type: LEAGUE_DETAILS_ACTIONS.FETCH_LEAGUE_RULES_FAILURE,
    payload,
  }
}

export interface UpdateRulesInterface {
  type: LEAGUE_DETAILS_ACTIONS.UPDATE_RULES
  payload: UpdateRulesRequestBodyInterface
}

export const updateRules = (payload: UpdateRulesRequestBodyInterface): UpdateRulesInterface => {
  return {
    type: LEAGUE_DETAILS_ACTIONS.UPDATE_RULES,
    payload,
  }
}
export interface UpdateRulesInterfaceSuccess {
  type: LEAGUE_DETAILS_ACTIONS.UPDATE_RULES_SUCCESS
  payload: { message: string } | null
}

export const updateRulesSuccess = (payload: { message: string } | null): UpdateRulesInterfaceSuccess => {
  return {
    type: LEAGUE_DETAILS_ACTIONS.UPDATE_RULES_SUCCESS,
    payload,
  }
}
export interface UpdateRulesInterfaceFailure {
  type: LEAGUE_DETAILS_ACTIONS.UPDATE_RULES_FAILURE
  payload: any
}
export const updateRulesFailure = (payload: any): UpdateRulesInterfaceFailure => {
  return {
    type: LEAGUE_DETAILS_ACTIONS.UPDATE_RULES_FAILURE,
    payload,
  }
}

export interface CompletedMatchesInterface {
  type: LEAGUE_DETAILS_ACTIONS.COMPLETED_MATCH
}

export const completedMatchesAction = (): CompletedMatchesInterface => {
  return {
    type: LEAGUE_DETAILS_ACTIONS.COMPLETED_MATCH,
  }
}

export interface CompletedMatchesSuccessInterface {
  type: LEAGUE_DETAILS_ACTIONS.COMPLETED_MATCH_SUCCESS
  payload: CompletedMatchesDataInterface[] | null
}

export const completedMatchesSuccessAction = (
  payload: CompletedMatchesDataInterface[] | null,
): CompletedMatchesSuccessInterface => {
  return {
    type: LEAGUE_DETAILS_ACTIONS.COMPLETED_MATCH_SUCCESS,
    payload,
  }
}

export interface CompletedMatchesFailureInterface {
  type: LEAGUE_DETAILS_ACTIONS.COMPLETED_MATCH_FAILURE
  payload: any
}

export const completedMatchesFailureAction = (payload: any): CompletedMatchesFailureInterface => {
  return {
    type: LEAGUE_DETAILS_ACTIONS.COMPLETED_MATCH_FAILURE,
    payload,
  }
}

export interface LeaderBoardMatchesInterface {
  type: LEAGUE_DETAILS_ACTIONS.MATCH_LEADER_BOARD
  payload: MatchLeaderBoardRequestInterface
}

export const getLeaderBoardAction = (payload: MatchLeaderBoardRequestInterface): LeaderBoardMatchesInterface => {
  return {
    type: LEAGUE_DETAILS_ACTIONS.MATCH_LEADER_BOARD,
    payload,
  }
}

export interface LeaderBoardMatchesSuccessInterface {
  type: LEAGUE_DETAILS_ACTIONS.MATCH_LEADER_BOARD_SUCCESS
  payload: MatchLeaderBoardInterface[] | null
}

export const getLeaderBoardSuccessAction = (
  payload: MatchLeaderBoardInterface[] | null,
): LeaderBoardMatchesSuccessInterface => {
  return {
    type: LEAGUE_DETAILS_ACTIONS.MATCH_LEADER_BOARD_SUCCESS,
    payload,
  }
}

export interface LeaderBoardMatchesFailureInterface {
  type: LEAGUE_DETAILS_ACTIONS.MATCH_LEADER_BOARD_FAILURE
  payload: any
}

export const getLeaderBoardFailureAction = (payload: any): LeaderBoardMatchesFailureInterface => {
  return {
    type: LEAGUE_DETAILS_ACTIONS.MATCH_LEADER_BOARD_FAILURE,
    payload,
  }
}

export type LeagueDetailsActions =
  | FetchRulesInterface
  | FetchLeagueRulesByIdSuccessInterface
  | FetchLeagueRulesByIdFailureInterface
  | UpdateRulesInterface
  | UpdateRulesInterfaceSuccess
  | UpdateRulesInterfaceFailure
  | CompletedMatchesInterface
  | CompletedMatchesSuccessInterface
  | CompletedMatchesFailureInterface
  | LeaderBoardMatchesInterface
  | LeaderBoardMatchesSuccessInterface
  | LeaderBoardMatchesFailureInterface
