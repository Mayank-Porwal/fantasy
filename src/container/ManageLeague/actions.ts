import { CreateLeaguePayloadInterface } from './types'

export enum CREATE_LEAGUE_ACTIONS {
  CREATE_LEAGUE = 'CREATE_LEAGUE',
  CREATE_LEAGUE_SUCCESS = 'CREATE_LEAGUE_SUCCESS',
  CREATE_LEAGUE_FAILURE = 'CREATE_LEAGUE_FAILURE',
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
  payload: { message: string } | null
}
export const createLeagueActionSuccess = (payload: { message: string } | null): CreateLeagueInterfaceSuccess => {
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

export type CreateLeagueActions = CreateLeagueInterface | CreateLeagueInterfaceSuccess | CreateLeagueInterfaceFailure
