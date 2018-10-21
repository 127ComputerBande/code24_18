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

const fetchVideosByDuration = (duration) => {
    duration = duration === 900 ? 901 : duration;
    return Api.get(
        `${ApiUrls.VIDEOS_BY_DURATION_BASE_URI}/${parseInt(duration, 10)}`
    );
};

export {
    Api,

    fetchVideosByDuration
};

