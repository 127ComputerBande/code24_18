export const PRODUCTION_BACKEND_URL = 'https://entertrain-backend.de/';
export const STAGING_BACKEND_URL    = 'https://7hack.localtunnel.me/';
export const LOCAL_BACKEND_URL      = 'https://entertrain-backend.de/';
export const BACKEND_URL            = (
    STAGING_BACKEND_URL
    //PRODUCTION_BACKEND_URL
    //LOCAL_BACKEND_URL
);

export const VIDEO_BASE_URI = 'api/videos';

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