import { CurrentMatch, NotificationInterface, PopupInterface, ToggleData, UsersTeamsInterface } from './types'

export enum APP_ACTIONS {
  SHOW_LOADER = `SHOW_LOADER`,
  SHOW_NOTIFICATION = 'SHOW_NOTIFICATION',
  SET_LOGGED_IN_STATUS = 'SET_LOGGED_IN_STATUS',
  SHOW_POPUP = 'SHOW_POPUP',
  FETCH_USERS_TEAM = 'FETCH_USERS_TEAM',
  FETCH_USERS_TEAM_SUCCESS = 'FETCH_USERS_TEAM_SUCCESS',
  FETCH_USERS_TEAM_FAILURE = 'FETCH_USERS_TEAM_FAILURE',
  SIDEBAR_TOGGLE_DATA = 'SIDEBAR_TOGGLE_DATA',
  FETCH_CURRENT_MATCH = 'FETCH_CURRENT_MATCH',
  FETCH_CURRENT_MATCH_SUCCESS = 'FETCH_CURRENT_MATCH_SUCCESS',
  FETCH_CURRENT_MATCH_FAILURE = 'FETCH_CURRENT_MATCH_FAILURE',
}
export interface UpdateLoaderInterface {
  type: APP_ACTIONS.SHOW_LOADER
  payload: boolean
}
export const updateLoaderState = (payload: boolean): UpdateLoaderInterface => {
  return {
    type: APP_ACTIONS.SHOW_LOADER,
    payload,
  }
}
export interface UpdateToastState {
  type: APP_ACTIONS.SHOW_NOTIFICATION
  payload: NotificationInterface | null
}
export const updateToastState = (payload: NotificationInterface | null): UpdateToastState => {
  return {
    type: APP_ACTIONS.SHOW_NOTIFICATION,
    payload,
  }
}

export interface UpdateLoggedInStatus {
  type: APP_ACTIONS.SET_LOGGED_IN_STATUS
  payload: boolean
}
export const updateLoggedInStatus = (payload: boolean): UpdateLoggedInStatus => {
  return {
    type: APP_ACTIONS.SET_LOGGED_IN_STATUS,
    payload,
  }
}

export interface UpdatePopupState {
  type: APP_ACTIONS.SHOW_POPUP
  payload: PopupInterface | null
}

export const updatePopupState = (payload: PopupInterface | null): UpdatePopupState => {
  return {
    type: APP_ACTIONS.SHOW_POPUP,
    payload,
  }
}

export interface FetchTeamsInterface {
  type: APP_ACTIONS.FETCH_USERS_TEAM
}

export const getAllTeams = (): FetchTeamsInterface => {
  return {
    type: APP_ACTIONS.FETCH_USERS_TEAM,
  }
}

export interface FetchTeamsInterfaceSuccess {
  type: APP_ACTIONS.FETCH_USERS_TEAM_SUCCESS
  payload: UsersTeamsInterface[]
}

export const getAllTeamsSuccess = (payload: UsersTeamsInterface[]): FetchTeamsInterfaceSuccess => {
  return {
    type: APP_ACTIONS.FETCH_USERS_TEAM_SUCCESS,
    payload,
  }
}

export interface FetchTeamsInterfaceFailure {
  type: APP_ACTIONS.FETCH_USERS_TEAM_FAILURE
  payload: any
}

export const getAllTeamsFailure = (payload: any): FetchTeamsInterfaceFailure => {
  return {
    type: APP_ACTIONS.FETCH_USERS_TEAM_FAILURE,
    payload,
  }
}

export interface UpdateToggleData {
  type: APP_ACTIONS.SIDEBAR_TOGGLE_DATA
  payload: ToggleData
}
export const updateToggleData = (payload: ToggleData): UpdateToggleData => {
  return {
    type: APP_ACTIONS.SIDEBAR_TOGGLE_DATA,
    payload,
  }
}

export interface FetchCurrentMatchInterface {
  type: APP_ACTIONS.FETCH_CURRENT_MATCH
}

export const getCurrentMatch = (): FetchCurrentMatchInterface => {
  return {
    type: APP_ACTIONS.FETCH_CURRENT_MATCH,
  }
}

export interface FetchCurrentMatchInterfaceSuccess {
  type: APP_ACTIONS.FETCH_CURRENT_MATCH_SUCCESS
  payload: CurrentMatch
}

export const getCurrentMatchSuccess = (payload: CurrentMatch): FetchCurrentMatchInterfaceSuccess => {
  return {
    type: APP_ACTIONS.FETCH_CURRENT_MATCH_SUCCESS,
    payload,
  }
}

export interface FetchCurrentMatchInterfaceFailure {
  type: APP_ACTIONS.FETCH_CURRENT_MATCH_FAILURE
  payload: any
}

export const getCurrentMatchFailure = (payload: any): FetchCurrentMatchInterfaceFailure => {
  return {
    type: APP_ACTIONS.FETCH_CURRENT_MATCH_FAILURE,
    payload,
  }
}

export type Actions =
  | UpdateLoaderInterface
  | UpdateToastState
  | UpdateLoggedInStatus
  | UpdatePopupState
  | FetchTeamsInterface
  | FetchTeamsInterfaceSuccess
  | FetchTeamsInterfaceFailure
  | UpdateToggleData
  | FetchCurrentMatchInterface
  | FetchCurrentMatchInterfaceSuccess
  | FetchCurrentMatchInterfaceFailure
