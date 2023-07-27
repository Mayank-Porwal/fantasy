import { FormErrors } from '../../utils/types';

export interface LoginPayloadInterface {
    email: string;
    password: string;
}

export interface LoginSuccessInterface {
    access_token: string;
    refresh_token: string;
}

export interface RegisterPayloadInterface {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone_number: string;
}

export interface RegisterSuccessInterface {
    message: string;
}

export interface LoginFormErrorsInterface {
    email: FormErrors;
    password: FormErrors;
}
