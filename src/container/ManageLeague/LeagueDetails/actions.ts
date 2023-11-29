import { RulesDataInterface, UpdateRulesRequestBodyInterface } from './types'

export enum LEAGUE_DETAILS_ACTIONS {
  FETCH_LEAGUE_RULES = 'FETCH_LEAGUE_RULES',
  FETCH_LEAGUE_RULES_SUCCESS = 'FETCH_LEAGUE_RULES_SUCCESS',
  FETCH_LEAGUE_RULES_FAILURE = 'FETCH_LEAGUE_RULES_FAILURE',
  UPDATE_RULES = 'UPDATE_RULES',
  UPDATE_RULES_SUCCESS = 'UPDATE_RULES_SUCCESS',
  UPDATE_RULES_FAILURE = 'UPDATE_RULES_FAILURE',
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
export type LeagueDetailsActions =
  | FetchRulesInterface
  | FetchLeagueRulesByIdSuccessInterface
  | FetchLeagueRulesByIdFailureInterface
  | UpdateRulesInterface
  | UpdateRulesInterfaceSuccess
  | UpdateRulesInterfaceFailure
