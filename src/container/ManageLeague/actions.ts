import { SuccessMessageInterface } from '../../utils/types'
import { CreateLeaguePayloadInterface, JoinLeaguePayloadInterface } from './types'

export enum CREATE_LEAGUE_ACTIONS {
  CREATE_LEAGUE = 'CREATE_LEAGUE',
  CREATE_LEAGUE_SUCCESS = 'CREATE_LEAGUE_SUCCESS',
  CREATE_LEAGUE_FAILURE = 'CREATE_LEAGUE_FAILURE',
  JOIN_LEAGUE = 'JOIN_LEAGUE',
  JOIN_LEAGUE_SUCCESS = 'JOIN_LEAGUE_SUCCESS',
  JOIN_LEAGUE_FAILURE = 'JOIN_LEAGUE_FAILURE',
}

export interface CreateLeagueInterface {
  type: CREATE_LEAGUE_ACTIONS.CREATE_LEAGUE
  payload: CreateLeaguePayloadInterface
}

export const createLeagueAction = (payload: CreateLeaguePayloadInterface): CreateLeagueInterface => {
  return {
    type: CREATE_LEAGUE_ACTIONS.CREATE_LEAGUE,
    payload,
  }
}

export interface CreateLeagueInterfaceSuccess {
  type: CREATE_LEAGUE_ACTIONS.CREATE_LEAGUE_SUCCESS
  payload: SuccessMessageInterface | null
}
export const createLeagueActionSuccess = (payload: SuccessMessageInterface | null): CreateLeagueInterfaceSuccess => {
  return {
    type: CREATE_LEAGUE_ACTIONS.CREATE_LEAGUE_SUCCESS,
    payload,
  }
}

export interface CreateLeagueInterfaceFailure {
  type: CREATE_LEAGUE_ACTIONS.CREATE_LEAGUE_FAILURE
  payload: any
}

export const createLeagueActionFailure = (payload: any): CreateLeagueInterfaceFailure => {
  return {
    type: CREATE_LEAGUE_ACTIONS.CREATE_LEAGUE_FAILURE,
    payload,
  }
}
export interface JoinLeagueInterface {
  type: CREATE_LEAGUE_ACTIONS.JOIN_LEAGUE
  payload: JoinLeaguePayloadInterface
}

export const joinLeagueAction = (payload: JoinLeaguePayloadInterface): JoinLeagueInterface => {
  return {
    type: CREATE_LEAGUE_ACTIONS.JOIN_LEAGUE,
    payload,
  }
}

export interface JoinLeagueInterfaceSuccess {
  type: CREATE_LEAGUE_ACTIONS.JOIN_LEAGUE_SUCCESS
  payload: SuccessMessageInterface | null
}

export const joinLeagueActionSuccess = (payload: SuccessMessageInterface | null): JoinLeagueInterfaceSuccess => {
  return {
    type: CREATE_LEAGUE_ACTIONS.JOIN_LEAGUE_SUCCESS,
    payload,
  }
}

export interface JoinLeagueInterfaceFailure {
  type: CREATE_LEAGUE_ACTIONS.JOIN_LEAGUE_FAILURE
  payload: any
}

export const joinLeagueActionFailure = (payload: any): JoinLeagueInterfaceFailure => {
  return {
    type: CREATE_LEAGUE_ACTIONS.JOIN_LEAGUE_FAILURE,
    payload,
  }
}

export type CreateLeagueActions =
  | CreateLeagueInterface
  | CreateLeagueInterfaceSuccess
  | CreateLeagueInterfaceFailure
  | JoinLeagueInterfaceFailure
  | JoinLeagueInterfaceSuccess
  | JoinLeagueInterface
