// @formatter:off
import german  from './german';
import english  from './english';
import I18n    from 'react-native-i18n'
// @formatter:on

I18n.fallbacks = true;

I18n.translations = {
    'de': german,
    'en': english
};