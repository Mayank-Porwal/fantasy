import { NotificationInterface } from "./types";

export enum APP_ACTIONS {
  SHOW_LOADER = `SHOW_LOADER`,
  SHOW_NOTIFICATION = "SHOW_NOTIFICATION",
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
export type Actions = UpdateLoaderInterface | UpdateToastState;
