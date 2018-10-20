import { call, put }         from 'redux-saga/effects';
import { UserActions }       from '../actions/user';
import { NavigationActions } from 'react-navigation';
import { AsyncStorage }      from 'react-native';
import Screens               from '../../constants/Screens';

const login = function* ({ credentials }) {

    // Fake an API call to get an timeout and showing the loading overlay
    let apiFaker = () => {
        return new Promise((resolve, reject) => {

            let responseData = {
                ok: false
            };

            if (
                credentials &&
                credentials.username &&
                credentials.password
            ) {
                responseData = {
                    ok:   true,
                    data: { token: 'LoremIpsumToken' }
                }
            }

            setTimeout(() => {
                resolve(responseData);
            }, 1200);
        })
    };

    let response = yield call(apiFaker);

    if (response.ok && response.data) {
        let { token } = response.data;

        if (token) {
            yield put(UserActions.loginSuccess(token));
        }
    } else {
        yield put(UserActions.loginFailed());
    }

};

const logout = function* () {
    AsyncStorage.clear();
    yield put(NavigationActions.reset({
        index:   0,
        actions: [
            NavigationActions.navigate({
                routeName: Screens.LOGIN_SCREEN
            })
        ]
    }));
};

const loginSuccess = function* () {
    yield put(NavigationActions.reset({
        index:   0,
        actions: [
            NavigationActions.navigate({
                routeName: Screens.MAIN_SCREEN
            })
        ]
    }));
};

const updateUser = function* ({ user }) {
    yield put(UserActions.updateUserSuccess(user));
};

const updateUserSuccess = function* () {
};

export default {
    login,
    loginSuccess,
    logout,
    updateUser,
    updateUserSuccess
};
