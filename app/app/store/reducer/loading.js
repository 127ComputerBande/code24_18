import I18n                    from 'react-native-i18n'
import Locale                  from '../../helper/Locale';
import { LoadingOverlayTypes } from '../actions/loading';

I18n.locale = Locale.getLocale();

const initialState = {
    level:   0,
    loading: false,
    text:    I18n.t('loading')
};

const LoadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LoadingOverlayTypes.LOADING_OVERLAY_HIDE:
            let newState = { ...state };

            newState.level   = Math.max(newState.level - 1, 0);
            newState.loading = !(
                newState.level === 0
            );

            if (!newState.loading) {
                newState.text = initialState.text
            }

            return newState;

        case LoadingOverlayTypes.LOADING_OVERLAY_SHOW:
            return {
                // @formatter:off
                ...state,
                level:   state.level + 1,
                loading: true,
                text:    (action.text || I18n.t('loading'))
                // @formatter:on
            };
    }

    return state;
};

module.exports = LoadingReducer;