import { VideoTypes } from '../actions/video';

const initialState = {
    videos: [
        {
            id:          '',
            categories:
                         [
                             '/api/categories/asdasd-aff83or23-fw23r-d2'
                         ],
            url:         'https://www.youtube.com/watch?v=7B2QEyGkzvo',
            priority:    0,
            duration:    '',
            source:      '',
            title:       'Süße Katzenbabys',
            description: 'Süße Katzenbabys beim spielen'
        },
    ],
};

const VideoReducer = (state = initialState, action) => {
    switch (action.type) {
        case VideoTypes.FETCH_VIDEOS_SUCCESS:
            return {
                ...state,
                videos: action.videos
            };
    }

    return state;
};

module.exports = VideoReducer;