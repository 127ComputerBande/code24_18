import { all }               from 'redux-saga/effects';
import { put }               from 'redux-saga/effects';
import { select }            from 'redux-saga/effects';
import { takeLatest }        from 'redux-saga/effects';
// Types
import { UserTypes }         from '../actions/user';
// Actions
import { NavigationActions } from 'react-navigation';
// Sagas
import UserSagas             from './user';
import Screens               from '../../constants/Screens';

const root = function* () {
    yield all([
        // @formatter:off
        // LOGIN
        takeLatest(UserTypes.LOGIN,               UserSagas.login),
        takeLatest(UserTypes.LOGIN_SUCCESS,       UserSagas.loginSuccess),
        takeLatest(UserTypes.LOGOUT,              UserSagas.logout),
        takeLatest(UserTypes.UPDATE_USER,         UserSagas.updateUser),
        takeLatest(UserTypes.UPDATE_USER_SUCCESS, UserSagas.updateUserSuccess),
        // @formatter:on
    ]);
};

const startUp = function* () {
    yield tokenSaga();
};

const preLoading = function* () {
};

const tokenSaga = function* () {
    //const token = yield select(state => state.User.token);
    //
    //if (token) {
    //    yield preLoading();
    //    yield put(NavigationActions.reset({
    //        index:   0,
    //        actions: [
    //            NavigationActions.navigate({
    //                routeName: Screens.MAIN_SCREEN
    //            })
    //        ]
    //    }));
    //} else {
    //    yield put(NavigationActions.reset({
    //        index:   0,
    //        actions: [
    //            NavigationActions.navigate({
    //                routeName: Screens.LOGIN_SCREEN
    //            })
    //        ]
    //    }));
    //}
};

export default {
    root,
    startUp
};
