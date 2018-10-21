export const VideoTypes = {
    FETCH_VIDEOS_BY_DURATION: 'Video/FETCH_VIDEOS_BY_DURATION',
    FETCH_VIDEOS_SUCCESS:     'Video/FETCH_VIDEOS_SUCCESS',
    FETCH_VIDEOS_FAILURE:     'Video/FETCH_VIDEOS_FAILURE',
};

const fetchVideosByDuration = (duration) => (
    {
        type: VideoTypes.FETCH_VIDEOS_BY_DURATION,
        duration
    }
);

const fetchVideosSuccess = ({ videos, travelTime }) => (
    {
        type: VideoTypes.FETCH_VIDEOS_SUCCESS,
        videos,
        travelTime
    }
);

const fetchVideosFailure = ({ error }) => (
    {
        type: VideoTypes.FETCH_VIDEOS_FAILURE,
        error
    }
);

export const VideoActions = {
    fetchVideosByDuration,
    fetchVideosSuccess,
    fetchVideosFailure
};