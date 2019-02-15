import axios from 'axios';
import config from '../config/config';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const apiUrl = config.apiUrl;
const GET_MESSAGE_LIST = '/messages';
const POST_MESSAGE = '/messages';
const DELETE_MESSAGE = '/messages/:id';
const GET_MY_MESSAGE_LIST = '/messages/my';

export const getMessageList = (params) => {
    let url = apiUrl + GET_MESSAGE_LIST;

    if (params.show === 'my') {
        url = apiUrl + GET_MY_MESSAGE_LIST;
    }
    
    url += '?page_limit=' + params.pageLimit;
    url += '&page_index=' + params.pageIndex;
    url += '&sorting=' + params.sort;

    return (
        axios.get(url, {headers: {'Authorization': 'Bearer ' + cookies.get('message_token')}})
    );
};

export const postMessage = (message) => {
    const url = apiUrl + POST_MESSAGE;

    const value = {
        message_body: message
    };

    return axios.post(url, value, {headers: {'Authorization': 'Bearer ' + cookies.get('message_token')}});
};

export const deleteMessage = (id) => {
    const baseUrl = apiUrl + DELETE_MESSAGE;
    let url = baseUrl.replace(':id', id);
    
    return axios.delete(url, {headers: {'Authorization': 'Bearer ' + cookies.get('message_token')}});
};