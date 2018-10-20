import { all }               from 'redux-saga/effects';
import { put }               from 'redux-saga/effects';
import { takeLatest }        from 'redux-saga/effects';
// Types
import { UserTypes }         from '../actions/user';
// Actions
import { NavigationActions } from 'react-navigation';
import { VideoActions }      from '../actions/video';
// Sagas
import UserSagas             from './user';
import VideoSagas            from './video';
import { VideoTypes }        from '../actions/video';

const root = function* () {
    yield all([
        // @formatter:off
        // LOGIN
        takeLatest(UserTypes.LOGIN,               UserSagas.login),
        takeLatest(UserTypes.LOGIN_SUCCESS,       UserSagas.loginSuccess),
        takeLatest(UserTypes.LOGOUT,              UserSagas.logout),
        takeLatest(UserTypes.UPDATE_USER,         UserSagas.updateUser),
        takeLatest(UserTypes.UPDATE_USER_SUCCESS, UserSagas.updateUserSuccess),
        takeLatest(VideoTypes.FETCH_VIDEOS,       VideoSagas.fetchVideos),
        // @formatter:on
    ]);
};

const startUp = function* () {
    yield put(VideoActions.fetchVideos());
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
