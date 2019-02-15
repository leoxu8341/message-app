const actions = {

    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',

    loginRequest: (email, password) => ({
        type: actions.LOGIN_REQUEST,
        email,
        password
    }),
    loginSuccess: (user, token) => ({
        type: actions.LOGIN_SUCCESS,
        user,
        token
    }),
    loginFailure: (error) => ({
        type: actions.LOGIN_FAILURE,
        payload: [],
        error
    }),

    REGISTER_REQUEST: 'REGISTER_REQUEST',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILURE: 'REGISTER_FAILURE',

    registerRequest: (email, username, password) => ({
        type: actions.REGISTER_REQUEST,
        email,
        username,
        password
    }),
    registerSuccess: (user) => ({
        type: actions.REGISTER_SUCCESS,
        payload: user
    }),
    registerFailure: (error) => ({
        type: actions.REGISTER_FAILURE,
        payload: [],
        error
    }),

    REMOVE_ERRORS: 'REMOVE_ERRORS',
    removeErrors: () => ({
        type: actions.REMOVE_ERRORS,
    }),

    LOGOUT_REQUEST: 'LOGOUT_REQUEST',
    logoutRequest: () => ({
        type: actions.LOGOUT_REQUEST,
    }),

    RESET_LOGIN_STATE: 'RESET_LOGIN_STATE',

    resetLoginState: () => ({
        type: actions.RESET_LOGIN_STATE
    }),
};

export default actions;