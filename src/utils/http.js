import axios from 'axios';
import {removeCurrentToken} from "./tokens";

const httpClient = axios.create();
httpClient.defaults.timeout = 1200000;

const baseUrl = "http://localhost:8080/"

const _request = async (url, method, data, config = {}) => {
    const headers = isAuthenticated() || config.token ? {...config.headers, Authorization: `Bearer ${config.token ?? getToken()}`} : config.headers;

    return httpClient({
        url: baseUrl + url,
        method,
        data,
        headers, ...config.options
    }).then((res) => {
        if (res.status === 200 || res.status === 201 || res.status === 204) return res.data;
        else throw (res.data);
    }).catch(errorResponse => {
        // JWT expired: logout
        if (!config.noAuth && errorResponse.response?.status === 403) {
            removeCurrentToken();
            window.location.href = window.location.origin
        }
        else throw (errorResponse.response || {status: 500})
    })
}

export const get = (url, config) => _request(url, "GET", null, config);
export const post = (url, body, config = {}) => _request(url, "POST", body, config);
export const put = (url, body, config = {}) => _request(url, "PUT", body, config);
export const patch = (url, body, config = {}) => _request(url, "PATCH", body, config);
export const deleteRequest = (url, body, config = {}) => _request(url, "DELETE", body, config);

export const isAuthenticated = () => {
    return getToken() !== null;
}

export const getToken = () => {
    return window.localStorage.getItem(`token-${window.localStorage.getItem('selected-user')}`);
}
