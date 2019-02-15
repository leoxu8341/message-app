import {all, call, put, takeEvery} from 'redux-saga/effects';
import actions from './actions';
import {
    getMessageList,
    postMessage,
    deleteMessage
} from '../../api/message.api';


export function* getMessagesSaga(action) {
    try {
        const response = yield call(getMessageList, action.params);
        yield put(actions.messageListSuccess(response.data));
    } catch (e) {
        yield put(actions.messageListFailure(e));
    }
}

export function* postMessageSaga(action) {
    try {
        yield call(postMessage, action.message);
    } catch (e) {
        yield put(actions.messagePostFailure(e));
    }
}

export function* deleteMessageSaga(action) {
    try {
        yield call(deleteMessage, action.id);
    } catch (e) {
        yield put(actions.messagePostFailure(e));
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actions.MESSAGE_LIST_REQUEST, getMessagesSaga),
        takeEvery(actions.MESSAGE_POST_REQUEST, postMessageSaga),
        takeEvery(actions.MESSAGE_DELETE_REQUEST, deleteMessageSaga)
    ]);
};