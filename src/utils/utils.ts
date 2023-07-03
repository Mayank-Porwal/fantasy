import axios, { AxiosRequestConfig } from 'axios';
import { HTTPS_HEADERS, REQUEST_TYPE } from './constants';

export const BASE_URL = 'https://iplfantasy-maya.onrender.com';
export const _request = async (config: AxiosRequestConfig) => {
    try {
        const options: AxiosRequestConfig = {
            method: config ? config?.method : REQUEST_TYPE.GET,
            url: config ? `${BASE_URL}${config?.url}` : BASE_URL,
            headers: config ? config?.headers : HTTPS_HEADERS,
            data: config ? config?.data : null,
        };
        const response = await axios(options);
        return response;
    } catch (error: unknown) {
        return error;
    }
};
