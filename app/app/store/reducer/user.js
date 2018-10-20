import { UserTypes } from '../actions/user';

const initialState = {
    token: '',
    user: {
        name: ''
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UserTypes.SHOW_USER_PROFILE:
            return {
                ...state,
                user: 'test'
            };
        case UserTypes.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.token
            };
        case UserTypes.UPDATE_USER_SUCCESS:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
};

export default reducer;