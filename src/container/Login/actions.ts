import { LoginPayloadInterface, LoginSuccessInterface, RegisterPayloadInterface, RegisterSuccessInterface } from './types';

export enum LOGIN_ACTIONS {
    SIGN_IN = 'SIGN_IN',
    SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
    SIGN_IN_FAILURE = 'SIGN_IN_FAILURE',
    REGISTER = 'REGISTER',
    REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    REGISTER_FAILURE = 'REGISTER_FAILURE',
}

export interface SignInInterFace {
    type: LOGIN_ACTIONS.SIGN_IN;
    payload: LoginPayloadInterface;
}

export const signIn = (payload: LoginPayloadInterface): SignInInterFace => {
    return {
        type: LOGIN_ACTIONS.SIGN_IN,
        payload,
    };
};

export interface SignInSuccessInterface {
    type: LOGIN_ACTIONS.SIGN_IN_SUCCESS;
    payload: LoginSuccessInterface | null;
}

export const signInSuccess = (payload: LoginSuccessInterface | null): SignInSuccessInterface => {
    return {
        type: LOGIN_ACTIONS.SIGN_IN_SUCCESS,
        payload,
    };
};

export interface SignInFailureInterface {
    type: LOGIN_ACTIONS.SIGN_IN_FAILURE;
    payload: any;
}

export const signInFailure = (payload: any): SignInFailureInterface => {
    return {
        type: LOGIN_ACTIONS.SIGN_IN_FAILURE,
        payload,
    };
};

export interface RegisterInterFace {
    type: LOGIN_ACTIONS.REGISTER;
    payload: RegisterPayloadInterface;
}

export const signUp = (payload: RegisterPayloadInterface): RegisterInterFace => {
    return {
        type: LOGIN_ACTIONS.REGISTER,
        payload,
    };
};

export interface RegisterSuccessFullInterface {
    type: LOGIN_ACTIONS.REGISTER_SUCCESS;
    payload: RegisterSuccessInterface | null;
}

export const registerSuccess = (payload: RegisterSuccessInterface | null): RegisterSuccessFullInterface => {
    return {
        type: LOGIN_ACTIONS.REGISTER_SUCCESS,
        payload,
    };
};

export interface RegisterFailureInterface {
    type: LOGIN_ACTIONS.REGISTER_FAILURE;
    payload: any;
}

export const registerFailure = (payload: any): RegisterFailureInterface => {
    return {
        type: LOGIN_ACTIONS.REGISTER_FAILURE,
        payload,
    };
};
export type LoginActions =
    | SignInInterFace
    | SignInSuccessInterface
    | SignInFailureInterface
    | RegisterInterFace
    | RegisterSuccessFullInterface
    | RegisterFailureInterface;
