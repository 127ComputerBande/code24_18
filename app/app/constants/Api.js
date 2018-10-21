export const PRODUCTION_BACKEND_URL = 'http://entertrain.127computerban.de/';
export const STAGING_BACKEND_URL    = 'https://9hack.localtunnel.me/';
export const LOCAL_BACKEND_URL      = 'https://entertrain-backend.de/';
export const BACKEND_URL            = (
           //STAGING_BACKEND_URL
           PRODUCTION_BACKEND_URL
           //LOCAL_BACKEND_URL
       )
;

export const VIDEO_BASE_URI              = 'api/videos';
export const VIDEOS_BY_DURATION_BASE_URI = 'api/get-videos';

if (BACKEND_URL !== PRODUCTION_BACKEND_URL) {
    console.warn('⚠️⚠️⚠️ Warning: App is not in production mode! ⚠️⚠️⚠️');
}

/**
 *
 */
export default class Api {
    /**
     * @returns {boolean}
     */
    static isStaging () {
        return (
            BACKEND_URL === STAGING_BACKEND_URL
        );
    }
}