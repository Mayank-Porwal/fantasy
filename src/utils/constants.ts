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
    FETCH_ALL_PLAYERS = '/players',
}

export interface ResponseGenerator {
    config?: any;
    data?: any;
    headers?: any;
    request?: any;
    status?: number;
    statusText?: string;
}

export enum CATEGORY_ENUM {
    batsman = 'Batsman',
    bowler = 'Bowler',
    ar = 'All Rounder',
    wk = 'Wicket Keeper',
    all = 'All',
}

export const MESSAGES = {
    SOMETHING_WENT_WRONG: 'Something went wrong, Please try again later!',
};

export enum MAXIMUM_ALLOWED_PLAYERS {
    CRICKET = 11,
}
