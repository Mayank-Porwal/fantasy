import axios, { AxiosRequestConfig } from 'axios';
import { HTTPS_HEADERS, REQUEST_TYPE } from './constants';

export const _request = (config: AxiosRequestConfig) => {
    const options: AxiosRequestConfig = {
        method: config ? config?.method: REQUEST_TYPE.GET,
        url: config ? config?.url: '',
        headers: config ? config?.headers : HTTPS_HEADERS,
        data: config ? config?.data: null,
      };
    return axios(options);
}