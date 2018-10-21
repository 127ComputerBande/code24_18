import { create }   from 'apisauce';
import * as ApiUrls from '../constants/Api';
import HydraCleanUp from '../helper/Hydra';

const createInstance = (host, apiPath) => {
    let api = null;

    api = create({
        baseURL: `${host}${apiPath}`,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/ld+json',
            'accept':       'application/ld+json'
        }
    });

    api.host = host;

    api.addResponseTransform((response) => {
        if (response.ok) {
            response.data = HydraCleanUp(response.data);
        }

        return response;
    });

    api.addMonitor((response) => {
        console.log('API response', response)
    });

    return api;
};

const Api = createInstance(ApiUrls.BACKEND_URL, '/');

const fetchVideos = () => {
    return Api.get(
        `${ApiUrls.VIDEO_BASE_URI}`
    );
};

export {
    Api,

    fetchVideos
};

