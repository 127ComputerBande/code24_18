'use strict';

export default class DebounceHelper {

    static timeouts = {};

    static registerTimeout (key, timeout, callback) {
        console.log('DebounceHelper: registerTimeout: ', key);

        DebounceHelper.stopTimeout(key);

        DebounceHelper.timeouts[key] = setTimeout(callback, timeout);
    }

    static stopTimeout (key) {
        if (DebounceHelper.timeouts[key]) {
            console.log('DebounceHelper: stopping timeout for key: ', key);

            clearTimeout(DebounceHelper.timeouts[key]);
            DebounceHelper.timeouts[key] = null;

        } else {
            console.log('DebounceHelper: no timeout running for key: ', key);
        }
    }
}