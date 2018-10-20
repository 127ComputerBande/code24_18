export const PRODUCTION_BACKEND_URL = 'https://symfony.skeleton.de/';
export const STAGING_BACKEND_URL    = 'https://symfony.staging.skeleton.de/';
export const LOCAL_BACKEND_URL      = 'https://symfony.skeleton.dev/';
export const BACKEND_URL            = (
    STAGING_BACKEND_URL
    //PRODUCTION_BACKEND_URL
    //LOCAL_BACKEND_URL
);

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