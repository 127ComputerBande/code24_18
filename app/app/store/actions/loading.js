export const LoadingOverlayTypes = {
    LOADING_OVERLAY_HIDE: 'Loading/LOADING_OVERLAY_HIDE',
    LOADING_OVERLAY_SHOW: 'Loading/LOADING_OVERLAY_SHOW'
};

const loadingOverlayHide = () => (
    {
        type: LoadingOverlayTypes.LOADING_OVERLAY_HIDE
    }
);

const loadingOverlayShow = () => (
    {
        type: LoadingOverlayTypes.LOADING_OVERLAY_SHOW
    }
);

export const LoadingOverlayActions = {
    loadingOverlayHide,
    loadingOverlayShow
};

