import axios from 'axios';
import config from '../config/config';

const apiUrl = config.apiUrl;
const GET_MESSAGE_LIST = '/messages';
const POST_MESSAGE = '/messages';
const DELETE_MESSAGE = '/messages/:id';

export const getMessageList = (params) => {
    let url = apiUrl + GET_MESSAGE_LIST;

    url += '?page_limit=' + params.pageLimit;
    url += '&page_index=' + params.pageIndex;
    url += '&sorting=' + params.sort;

    return (
        axios.get(url)
    );
};

export const postMessage = (name, email, message) => {
    const url = apiUrl + POST_MESSAGE;

    const value = {
        name: name,
        email: email,
        message: message
    };

    return axios.post(url, value);
};

export const deleteMessage = (id) => {
    const baseUrl = apiUrl + DELETE_MESSAGE;
    let url = baseUrl.replace(':id', id);
    
    return axios.delete(url);
};