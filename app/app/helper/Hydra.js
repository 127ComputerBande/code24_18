'use strict';

import _ from 'lodash';

export default function (response) {
    return cleanupObject(response);
};

/**
 *
 * @param key
 * @param objectToClean
 */
function removeLeadingHydraFromKey (key, objectToClean) {
    if (key.indexOf('hydra:') === 0) {
        objectToClean[key.substr(6)] = objectToClean[key];
        delete objectToClean[key];
        key = key.substr(6);
    }

    if (typeof objectToClean[key] === 'string' && objectToClean[key].indexOf('hydra:') === 0) {
        objectToClean[key] = objectToClean[key].substr(6);
    }

    return key;
}

/**
 * @param objectToClean
 * @returns {*}
 */
function cleanupObject (objectToClean) {
    const keys = Object.keys(objectToClean || {});

    for (let key of keys) {
        if (!objectToClean.hasOwnProperty(key)) {
            continue;
        }

        key = removeLeadingHydraFromKey(key, objectToClean);
        removeHydraSearch(key, objectToClean);
        cleanupChild(key, objectToClean);
        cleanupIds(key, objectToClean);
    }

    return objectToClean;
}

/**
 *
 * @param key
 * @param objectToClean
 */
function removeHydraSearch (key, objectToClean) {
    if (key === 'search' || key === 'context') {
        delete objectToClean[key];
    }
}

/**
 * @param key
 * @param objectToClean
 */
function cleanupChild (key, objectToClean) {
    if (_.isArray(objectToClean[key])) {
        _.each(objectToClean[key], cleanupObject);
    } else if (_.isObject(objectToClean[key])) {
        cleanupObject(objectToClean[key]);
    }
}

/**
 * @param key
 * @param objectToClean
 */
function cleanupIds (key, objectToClean) {
    if (key === '@id') {
        objectToClean.iri = objectToClean['@id'];
    }
}
