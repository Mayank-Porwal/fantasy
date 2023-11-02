import { SuccessMessageInterface } from '../../utils/types'
import {
  CreateLeaguePayloadInterface,
  FetchLeagueDetailsPayloadInterface,
  FetchLeaguePayloadInterface,
  FetchLeagueResponseInterface,
  JoinLeaguePayloadInterface,
  LeagueDetailsInterface,
} from './types'

export enum CREATE_LEAGUE_ACTIONS {
  CREATE_LEAGUE = 'CREATE_LEAGUE',
  CREATE_LEAGUE_SUCCESS = 'CREATE_LEAGUE_SUCCESS',
  CREATE_LEAGUE_FAILURE = 'CREATE_LEAGUE_FAILURE',
  JOIN_LEAGUE = 'JOIN_LEAGUE',
  JOIN_LEAGUE_SUCCESS = 'JOIN_LEAGUE_SUCCESS',
  JOIN_LEAGUE_FAILURE = 'JOIN_LEAGUE_FAILURE',
  FETCH_LEAGUE = 'FETCH_LEAGUE',
  FETCH_LEAGUE_SUCCESS = 'FETCH_LEAGUE_SUCCESS',
  FETCH_LEAGUE_FAILURE = 'FETCH_LEAGUE_FAILURE',
  FETCH_LEAGUE_DETAILS = 'FETCH_LEAGUE_DETAILS',
  FETCH_LEAGUE_DETAILS_SUCCESS = 'FETCH_LEAGUE_DETAILS_SUCCESS',
  FETCH_LEAGUE_DETAILS_FAILURE = 'FETCH_LEAGUE_DETAILS_FAILURE',
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
export interface fetchLeagueInterface {
  type: CREATE_LEAGUE_ACTIONS.FETCH_LEAGUE
  payload: FetchLeaguePayloadInterface
}

export const fetchLeagueAction = (payload: FetchLeaguePayloadInterface): fetchLeagueInterface => {
  return {
    type: CREATE_LEAGUE_ACTIONS.FETCH_LEAGUE,
    payload,
  }
}

export interface fetchLeagueInterfaceSuccess {
  type: CREATE_LEAGUE_ACTIONS.FETCH_LEAGUE_SUCCESS
  payload: FetchLeagueResponseInterface
}

export const fetchLeagueActionSuccess = (payload: FetchLeagueResponseInterface): fetchLeagueInterfaceSuccess => {
  return {
    type: CREATE_LEAGUE_ACTIONS.FETCH_LEAGUE_SUCCESS,
    payload,
  }
}
export interface fetchLeagueInterfaceFailure {
  type: CREATE_LEAGUE_ACTIONS.FETCH_LEAGUE_FAILURE
  payload: any
}

export const fetchLeagueActionFailure = (payload: any): fetchLeagueInterfaceFailure => {
  return {
    type: CREATE_LEAGUE_ACTIONS.FETCH_LEAGUE_FAILURE,
    payload,
  }
}

export interface fetchLeagueDetailsInterface {
  type: CREATE_LEAGUE_ACTIONS.FETCH_LEAGUE_DETAILS
  payload: FetchLeagueDetailsPayloadInterface
}

export const fetchLeagueDetailsAction = (payload: FetchLeagueDetailsPayloadInterface): fetchLeagueDetailsInterface => {
  return {
    type: CREATE_LEAGUE_ACTIONS.FETCH_LEAGUE_DETAILS,
    payload,
  }
}

export interface fetchLeagueDetailsInterfaceSuccess {
  type: CREATE_LEAGUE_ACTIONS.FETCH_LEAGUE_DETAILS_SUCCESS
  payload: LeagueDetailsInterface | null
}

export const fetchLeagueDetailsActionSuccess = (
  payload: LeagueDetailsInterface | null,
): fetchLeagueDetailsInterfaceSuccess => {
  return {
    type: CREATE_LEAGUE_ACTIONS.FETCH_LEAGUE_DETAILS_SUCCESS,
    payload,
  }
}
export interface fetchLeagueDetailsInterfaceFailure {
  type: CREATE_LEAGUE_ACTIONS.FETCH_LEAGUE_DETAILS_FAILURE
  payload: any
}

export const fetchLeagueDetailsActionFailure = (payload: any): fetchLeagueDetailsInterfaceFailure => {
  return {
    type: CREATE_LEAGUE_ACTIONS.FETCH_LEAGUE_DETAILS_FAILURE,
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
  | fetchLeagueInterface
  | fetchLeagueInterfaceSuccess
  | fetchLeagueInterfaceFailure
  | fetchLeagueDetailsInterface
  | fetchLeagueDetailsInterfaceSuccess
  | fetchLeagueDetailsInterfaceFailure
