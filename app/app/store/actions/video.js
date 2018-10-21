export const VideoTypes = {
    FETCH_VIDEOS:         'Video/FETCH_VIDEOS',
    FETCH_VIDEOS_SUCCESS: 'Video/FETCH_VIDEOS_SUCCESS',
    FETCH_VIDEOS_FAILURE: 'Video/FETCH_VIDEOS_FAILURE',
};

const fetchVideos = () => (
    {
        type: VideoTypes.FETCH_VIDEOS
    }
);

const fetchVideosSuccess = ({ videos }) => (
    {
        type: VideoTypes.FETCH_VIDEOS_SUCCESS,
        videos
    }
);

const fetchVideosFailure = ({ error }) => (
    {
        type: VideoTypes.FETCH_VIDEOS_FAILURE,
        error
    }
);

export const VideoActions = {
    fetchVideos,
    fetchVideosSuccess,
    fetchVideosFailure
};