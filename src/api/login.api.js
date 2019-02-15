import axios from 'axios';
import config from '../config/config';

const loginUrl = config.loginUrl;
const apiUrl = config.apiUrl;
const LOGIN = '/login';
const REGISTER = '/users';

export const login = (email, password) => {
    const url = loginUrl + LOGIN;

    const value = {
        email: email,
        password: password
    };

    return axios.post(url, value);
};

export const register = (email, username, password) => {
    const url = apiUrl + REGISTER;

    const value = {
        email: email,
        username: username,
        password: password
    };

    return axios.post(url, value);
};