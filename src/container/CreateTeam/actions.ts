import { PLAYERS_INTERFACE } from './types';

export enum CREATE_TEAM_ACTIONS {
    GET_ALL_PLAYERS = `GET_ALL_PLAYERS`,
    GET_ALL_PLAYERS_SUCCESS = `GET_ALL_PLAYERS_SUCCESS`,
    GET_ALL_PLAYERS_FAILURE = `GET_ALL_PLAYERS_FAILURE`,
    UPDATE_SELECTED_PLAYERS = 'UPDATE_SELECTED_PLAYERS',
}
export interface GetAllPlayersInterface {
    type: string;
}
export const getAllPlayers = (): GetAllPlayersInterface => {
    return {
        type: CREATE_TEAM_ACTIONS.GET_ALL_PLAYERS,
    };
};
export interface GetAllPlayersSuccessInterface {
    type: CREATE_TEAM_ACTIONS.GET_ALL_PLAYERS_SUCCESS;
    payload: PLAYERS_INTERFACE[];
}
export const getAllPlayersSuccess = (payload: PLAYERS_INTERFACE[]): GetAllPlayersSuccessInterface => {
    return {
        type: CREATE_TEAM_ACTIONS.GET_ALL_PLAYERS_SUCCESS,
        payload,
    };
};

export interface GetAllPlayersFailureInterface {
    type: CREATE_TEAM_ACTIONS.GET_ALL_PLAYERS_FAILURE;
    payload: any;
}
export const getAllPlayersFailure = (payload: any): GetAllPlayersFailureInterface => {
    return {
        type: CREATE_TEAM_ACTIONS.GET_ALL_PLAYERS_FAILURE,
        payload,
    };
};

export interface UpdateSelectedPlayersInterface {
    type: CREATE_TEAM_ACTIONS.UPDATE_SELECTED_PLAYERS;
    payload: PLAYERS_INTERFACE[] | [];
}
export const updateSelectedPlayers = (payload: PLAYERS_INTERFACE[] | []): UpdateSelectedPlayersInterface => {
    return {
        type: CREATE_TEAM_ACTIONS.UPDATE_SELECTED_PLAYERS,
        payload,
    };
};
export type CreateTeamActions =
    | GetAllPlayersSuccessInterface
    | GetAllPlayersFailureInterface
    | UpdateSelectedPlayersInterface;
