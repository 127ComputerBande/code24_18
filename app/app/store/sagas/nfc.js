import { call, put }         from 'redux-saga/effects';
import { NfcActions }        from '../actions/nfc';
import * as Api              from '../../api';
import Ndef                  from 'react-native-nfc-manager/ndef-lib';
import NfcManager            from 'react-native-nfc-manager';
import Screens               from '../../constants/Screens';
import { NavigationActions } from 'react-navigation';

const scanTag = function* () {
    let tag = yield new Promise(
        (resolve, reject) => {
            NfcManager.registerTagEvent(
                (tag) => {
                    resolve(tag);
                })
                .then(result => {
                    console.log('registerTagEvent OK', result)
                })
                .catch(error => {
                    _stopDetection();
                });
        }
    );

    if (tag) {
        yield put(NfcActions.nfcTagScanned({ tag }));
    } else {
        yield put(NfcActions.scanTagFailure());
    }
};

const tagScanned = function* ({ tag }) {
    let url = _parseUri(tag);
    if (url) {
        url        = "entertrain://s/jfo3jfo-f23f23-f2323f";
        let stopId = getStopIdFromUrl(url);

        if (stopId) {
            yield put(NavigationActions.navigate({ routeName: Screens.START_SCREEN, params: { tagScanned: true } }));
            _stopDetection();
        }
    }
};

const getStopIdFromUrl = (url) => {
    if (url.indexOf('/s/') > -1) {
        const splittedUrl  = url.split('/r/');
        const urlPartCount = splittedUrl.length;
        const stopId       = '/api/stops/' + splittedUrl[urlPartCount - 1];

        return stopId;
    }

    return false;
};

const _parseUri = (tag) => {
    try {
        if (Ndef.isType(tag.ndefMessage[0], Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
            return Ndef.uri.decodePayload(tag.ndefMessage[0].payload);
        }
    } catch (e) {
        console.log(e);
    }
    return null;
};

const _stopDetection = () => {
    NfcManager.unregisterTagEvent()
        .then(result => {
            console.log('unregisterTagEvent OK', result)
        })
        .catch(error => {
            console.warn('unregisterTagEvent fail', error)
        })
};

export default {
    scanTag,
    tagScanned
};
