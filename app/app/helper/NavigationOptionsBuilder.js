import FontWeight     from '../styles/FontWeight';
import Icon           from 'react-native-vector-icons/FontAwesome';
import I18n           from 'react-native-i18n';
import Locale         from '../helper/Locale';
import React          from 'react';
import { StyleSheet } from 'react-native';

I18n.locale = Locale.getLocale();

const NavigationOptionsBuilder = (title, settings) => {
    const label = I18n.t(title, { defaultValue: title });

    const defaultOptions = {
        label:                       label,
        headerTitleAllowFontScaling: false,
        headerBackTitle:             null,
        headerTruncatedBackTitle:    null,
        headerStyle:                 styles.header,
        headerTitle:                 label,
        headerTitleStyle:            styles.headerText,
        title:                       label,
        ...settings
    };

    if (settings) {
        if (settings.hideHeader) {
            defaultOptions.header = null;
        }

        if (settings.noLabel) {
            defaultOptions.label       = ' ';
            defaultOptions.headerTitle = ' ';
            defaultOptions.title       = ' ';
        }

        if (settings.noBorder) {
            defaultOptions.headerStyle = [
                defaultOptions.headerStyle,
                styles.headerNoBorder
            ];
        }

        if (settings.transparent) {
            defaultOptions.headerStyle = styles.headerTransparent;
        }

        let tabBarIcon = settings.tabBarIcon;

        if (tabBarIcon) {
            if (typeof tabBarIcon === 'string') {
                defaultOptions.tabBarIcon = ({ tintColor }) => (
                    <Icon name={tabBarIcon} color={tintColor} size={19} />
                )
            } else if (typeof tabBarIcon === 'function') {
                defaultOptions.tabBarIcon = tabBarIcon;
            }
        }
    }
    return defaultOptions;
};

const styles = StyleSheet.create({
    header:            {},
    headerTransparent: {
        backgroundColor:   'transparent',
        borderBottomWidth: 0,
        elevation:         0,
        shadowOpacity:     0,
    },
    headerNoBorder:    {
        borderBottomWidth: 0,
        elevation:         0,
        shadowOpacity:     0,
    },
    headerText:        {
        fontSize:   17,
        fontWeight: FontWeight.bold
    }
});

module.exports = NavigationOptionsBuilder;