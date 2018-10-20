import Platform          from './Platform';
import { NativeModules } from 'react-native';

/**
 * Use this helper to get around locales
 */
export default class Locale {

    /**
     *
     * Returns the user locale like de-DE or en-GB
     *
     * @returns {string}
     */
    static getLocale () {
        let locale;

        if (Platform.isAndroid()) {
            locale = NativeModules.I18nManager.localeIdentifier;
        } else {
            locale = NativeModules.SettingsManager.settings.AppleLocale;
        }

        return locale.replace(/_/, '-');
    }
}