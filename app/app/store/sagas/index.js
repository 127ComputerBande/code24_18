import { all }               from 'redux-saga/effects';
import { put }               from 'redux-saga/effects';
import { takeLatest }        from 'redux-saga/effects';
// Types
import { NfcTypes }          from '../actions/nfc';
// Actions
import { NavigationActions } from 'react-navigation';
import { VideoActions }      from '../actions/video';
// Sagas
import VideoSagas            from './video';
import NfcSagas              from '../sagas/nfc';
import { VideoTypes }        from '../actions/video';

const root = function* () {
    yield all([
        // @formatter:off
        takeLatest(NfcTypes.NFC_SCAN_TAG,    NfcSagas.scanTag),
        takeLatest(NfcTypes.NFC_TAG_SCANNED, NfcSagas.tagScanned),
        takeLatest(VideoTypes.FETCH_VIDEOS_BY_DURATION, VideoSagas.fetchVideosByDuration)
        // @formatter:on
    ]);
};

const startUp = function* () {
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
