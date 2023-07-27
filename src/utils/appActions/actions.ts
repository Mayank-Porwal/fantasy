import { NotificationInterface } from "./types";

export enum APP_ACTIONS {
  SHOW_LOADER = `SHOW_LOADER`,
  SHOW_NOTIFICATION = "SHOW_NOTIFICATION",
  SET_LOGGED_IN_STATUS = 'SET_LOGGED_IN_STATUS'
}
export interface UpdateLoaderInterface {
  type: APP_ACTIONS.SHOW_LOADER;
  payload: boolean;
}
export const updateLoaderState = (payload: boolean): UpdateLoaderInterface => {
  return {
    type: APP_ACTIONS.SHOW_LOADER,
    payload,
  };
};
export interface UpdateToastState {
  type: APP_ACTIONS.SHOW_NOTIFICATION;
  payload: NotificationInterface | null;
}
export const updateToastState = (
  payload: NotificationInterface | null
): UpdateToastState => {
  return {
    type: APP_ACTIONS.SHOW_NOTIFICATION,
    payload,
  };
};

export interface UpdateLoggedInStatus {
  type: APP_ACTIONS.SET_LOGGED_IN_STATUS;
  payload: boolean;
}
export const updateLoggedInStatus = (
  payload: boolean
): UpdateLoggedInStatus => {
  return {
    type: APP_ACTIONS.SET_LOGGED_IN_STATUS,
    payload,
  };
};
export type Actions = UpdateLoaderInterface | UpdateToastState | UpdateLoggedInStatus;
