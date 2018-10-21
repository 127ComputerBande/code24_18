import { call, put }         from 'redux-saga/effects';
import { VideoActions }      from '../actions/video';
import * as Api              from '../../api';
import Screens               from '../../constants/Screens';
import { NavigationActions } from 'react-navigation';

const fetchVideosByDuration = function* ({ duration }) {

    let response = yield call(Api.fetchVideosByDuration, duration);

    if (response.ok && response.data) {
        let videos = response.data.member;

        if (videos) {
            yield put(VideoActions.fetchVideosSuccess({ videos, travelTime: duration }));
            yield put(NavigationActions.navigate({ routeName: Screens.VIDEO_SELECT_SCREEN }));
        }
    } else {
        yield put(VideoActions.fetchVideosFailure({ error: response.error }));
    }
};

export default {
    fetchVideosByDuration
};
