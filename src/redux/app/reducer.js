import {fromJS} from 'immutable';
import actions from './actions';

const initState = new fromJS({
    loading: false,
    messages: null,
    error: null,
    params: {
        pageLimit: 10,
        pageIndex: 1,
        sort: 'DESC'
    },
});

export default function messageReducer(state = initState, action) {
    switch (action.type) {
        case actions.MESSAGE_LIST_REQUEST:
            return state.set('loading', true)
                .setIn(['params', 'pageLimit'], action.params.pageLimit)
                .setIn(['params', 'pageIndex'], action.params.pageIndex)
                .setIn(['params', 'sort'], action.params.sort);
      
        case actions.MESSAGE_LIST_SUCCESS:
            return state
                .set('loading', false)
                .set('messages', action.payload);

        case actions.MESSAGE_LIST_FAILURE:
            return state
                .set('loading', false)
                .set('error', action.error);

        case actions.RESET_MESSAGE_STATE:
            return state = initState;

        default:
            return state;
    }
}
