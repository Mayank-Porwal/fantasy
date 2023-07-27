export const HTTPS_HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

export enum REQUEST_TYPE {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export enum API_URLS {
    LOGIN = '/login',
    REGISTER = '/register',
    LOG_OUT = '/logout',
    FETCH_ALL_PLAYERS = '/players',
    CREATE_TEAM = '/create-team',
}

export interface ResponseGenerator {
    config?: any;
    data?: any;
    headers?: any;
    request?: any;
    status?: number;
    statusText?: string;
    response?: any;
}

export enum CATEGORY_ENUM {
    batsman = 'Batsman',
    bowler = 'Bowler',
    ar = 'All Rounder',
    wk = 'Wicket Keeper',
    all = 'All',
}
export const CATEGORY_ENUM_BY_KEY = {
    Batsman: 'batsman',
    Bowler: 'bowler',
    'All Rounder': 'ar',
    'Wicket Keeper': 'wk',
    All: 'all',
};
export const MESSAGES = {
    SOMETHING_WENT_WRONG: 'Something went wrong, Please try again later!',
};

export enum MAXIMUM_ALLOWED_PLAYERS {
    CRICKET = 11,
}

export enum ButtonTypes {
    CONTAINED = 'contained',
    OUTLINED = 'outlined',
    TEXT = 'text',
}

export const EMAIL_REGEX = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,14})$/;
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{7,15}$/;
export const PHONE_NUMBER_REGEX = /^[0-9]{0,10}$/;
export const VALIDATION_MESSAGES = {
    required: 'Required',
    email: 'Enter a valid Email',
    password: 'Enter a valid Password (Min 8 characters, 1 Uppercase letter, 1 Lowercase letter, 1 Special Character)',
    phone: 'Enter a valid Phone Number (Max Length 10)',
    confirmPassword: "Confirm Password doesn't match your Password",
};
