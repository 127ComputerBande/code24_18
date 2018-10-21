import { call, put }    from 'redux-saga/effects';
import { VideoActions } from '../actions/video';
import * as Api         from '../../api';

const fetchVideos = function* ({ credentials }) {

    let response = yield call(Api.fetchVideos);

    if (response.ok && response.data) {
        let videos = response.data.member;

        if (videos) {
            yield put(VideoActions.fetchVideosSuccess({ videos }));
        }
    } else {
        yield put(VideoActions.fetchVideosFailure({ error: response.error }));
    }

};

export default {
    fetchVideos
};
