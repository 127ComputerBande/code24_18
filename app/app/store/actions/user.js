export const UserTypes = {
    LOGIN:               'User/LOGIN',
    LOGIN_SUCCESS:       'User/LOGIN_SUCCESS',
    LOGIN_FAILED:        'User/LOGIN_FAILED',
    LOGOUT:              'User/LOGOUT',
    UPDATE_USER:         'User/UPDATE_USER',
    UPDATE_USER_SUCCESS: 'User/UPDATE_USER_SUCCESS',
};

const login = (credentials) => (
    {
        type: UserTypes.LOGIN,
        credentials
    }
);

const loginSuccess = (token) => (
    {
        type: UserTypes.LOGIN_SUCCESS,
        token
    }
);

const loginFailed = () => (
    {
        type: UserTypes.LOGIN_FAILED
    }
);

const logout = () => (
    {
        type: UserTypes.LOGOUT
    }
);

const updateUser = (user) => (
    {
        type: UserTypes.UPDATE_USER,
        user
    }
);

const updateUserSuccess = (user) => (
    {
        type: UserTypes.UPDATE_USER_SUCCESS,
        user
    }
);

export const UserActions = {
    login,
    loginSuccess,
    loginFailed,
    logout,
    updateUser,
    updateUserSuccess
};