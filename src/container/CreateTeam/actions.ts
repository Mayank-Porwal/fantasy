import { SuccessMessageInterface } from '../../utils/types';
import { CreateTeamInterface, PLAYERS_INTERFACE } from './types';

export enum CREATE_TEAM_ACTIONS {
    GET_ALL_PLAYERS = `GET_ALL_PLAYERS`,
    GET_ALL_PLAYERS_SUCCESS = `GET_ALL_PLAYERS_SUCCESS`,
    GET_ALL_PLAYERS_FAILURE = `GET_ALL_PLAYERS_FAILURE`,
    UPDATE_SELECTED_PLAYERS = 'UPDATE_SELECTED_PLAYERS',
    CREATE_TEAM = 'CREATE_TEAM',
    CREATE_TEAM_SUCCESS = 'CREATE_TEAM_SUCCESS',
    CREATE_TEAM_FAILURE = 'CREATE_TEAM_FAILURE',
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

export interface CreateTeamActionInterface {
    type: CREATE_TEAM_ACTIONS.CREATE_TEAM;
    payload: CreateTeamInterface;
}
export const createTeam = (payload: CreateTeamInterface): CreateTeamActionInterface => {
    return {
        type: CREATE_TEAM_ACTIONS.CREATE_TEAM,
        payload,
    };
};

export interface CreateTeamActionInterfaceSuccess {
    type: CREATE_TEAM_ACTIONS.CREATE_TEAM_SUCCESS;
    payload: SuccessMessageInterface;
}
export const createTeamSuccess = (payload: SuccessMessageInterface): CreateTeamActionInterfaceSuccess => {
    return {
        type: CREATE_TEAM_ACTIONS.CREATE_TEAM_SUCCESS,
        payload,
    };
};
export interface CreateTeamActionInterfaceFailure {
    type: CREATE_TEAM_ACTIONS.CREATE_TEAM_FAILURE;
    payload: any;
}
export const createTeamFailure = (payload: any): CreateTeamActionInterfaceFailure => {
    return {
        type: CREATE_TEAM_ACTIONS.CREATE_TEAM_FAILURE,
        payload,
    };
};
export type CreateTeamActions =
    | GetAllPlayersSuccessInterface
    | GetAllPlayersFailureInterface
    | UpdateSelectedPlayersInterface
    | CreateTeamActionInterface
    | CreateTeamActionInterfaceSuccess
    | CreateTeamActionInterfaceFailure;
