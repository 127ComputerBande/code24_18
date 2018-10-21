import I18n                    from 'react-native-i18n'
import Locale                  from '../../helper/Locale';
import { LoadingOverlayTypes } from '../actions/loading';
import { NfcTypes }            from '../actions/nfc';

I18n.locale = Locale.getLocale();

const initialState = {
    tagScanned: false
};

const NfcReducer = (state = initialState, action) => {
    switch (action.type) {
        case NfcTypes.NFC_TAG_SCANNED:
            return {
                tagScanned: true
            };
    }

    return state;
};

module.exports = NfcReducer;