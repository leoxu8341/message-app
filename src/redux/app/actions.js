const actions = {

    MESSAGE_LIST_REQUEST: 'MESSAGE_LIST_REQUEST',
    MESSAGE_LIST_SUCCESS: 'MESSAGE_LIST_SUCCESS',
    MESSAGE_LIST_FAILURE: 'MESSAGE_LIST_FAILURE',

    messageListRequest: (params) => ({
        type: actions.MESSAGE_LIST_REQUEST,
        params
    }),
    messageListSuccess: (messages) => ({
        type: actions.MESSAGE_LIST_SUCCESS,
        payload: messages
    }),
    messageListFailure: (error) => ({
        type: actions.MESSAGE_LIST_FAILURE,
        payload: [],
        error
    }),

    RESET_MESSAGE_STATE: 'RESET_MESSAGE_STATE',

    resetMessagestate: () => ({
        type: actions.RESET_MESSAGE_STATE
    }),

    MESSAGE_POST_REQUEST: 'MESSAGE_POST_REQUEST',
    MESSAGE_POST_FAILURE: 'MESSAGE_POST_FAILURE',

    messagePostRequest: (message) => ({
        type: actions.MESSAGE_POST_REQUEST,
        message
    }),
    messagePostFailure: (error) => ({
        type: actions.MESSAGE_POST_FAILURE,
        payload: [],
        error
    }),

    MESSAGE_DELETE_REQUEST: 'MESSAGE_DELETE_REQUEST',
    MESSAGE_DELETE_FAILURE: 'MESSAGE_DELETE_FAILURE',

    messageDeleteRequest: (id) => ({
        type: actions.MESSAGE_DELETE_REQUEST,
        id
    }),
    messageDeleteFailure: (error) => ({
        type: actions.MESSAGE_DELETE_FAILURE,
        payload: [],
        error
    })
};

export default actions;