'use strict';

import { Alert }           from 'react-native';
import   I18n              from 'react-native-i18n';
import   MaterialDialog    from 'react-native-dialogs';
import   PlatformHelper    from './Platform';
import   Vibrate           from '../helper/Vibrate';

/**
 * A small helper to show errors.
 */
export default class AlertHelper {
    /**
     * Shows a alert with the passed text and title.
     *
     * @param title
     * @param text
     */
    static show (title, text) {
        Alert.alert(title, text);
    }

    /**
     * Will show an error. Takes the index in the language file as parameter. Optional takes options array.
     *
     * @param errorIndex
     * @param options
     */
    static showError (errorIndex, options) {

        AlertHelper.showErrorTranslated(I18n.t(errorIndex), options);
    }

    /**
     * Will show an error. Takes the final string as parameter. Optional takes options array.
     *
     * @param errorText
     * @param options
     */
    static showErrorTranslated (errorText, options) {
        Vibrate.error();

        Alert.alert(I18n.t('anErrorOccurred'), errorText, options);
    }

    /**
     * Will show a success message. Takes the index in the language file as parameter.
     *
     * @param successIndex
     */
    static showSuccess (successIndex) {
        AlertHelper.showSuccessTranslated(I18n.t(successIndex));
    }

    /**
     * Will show a success message. Takes the final string as parameter.
     *
     * @param successText
     */
    static showSuccessTranslated (successText) {
        Vibrate.success();

        Alert.alert(I18n.t('success'), successText);
    }

    /**
     *
     * @param titleText
     * @param contentText
     * @param buttons
     * @param forceStacking
     */
    static alertDialog (titleText, contentText, buttons, forceStacking) {
        if (PlatformHelper.isAndroid()) {
            let finalButtons = {
                cancel:   null,
                negative: null,
                neutral:  null,
                positive: null
            };

            for (let i in buttons) {
                let button = buttons[i];

                if (button.style === 'destructive' || button.style === 'cancel') {
                    if (button.style === 'destructive') {
                        finalButtons.negative = button;
                    } else if (button.style === 'cancel') {
                        finalButtons.cancel = button;
                    }

                    buttons.splice(i, 1)
                }
            }

            while (buttons.length > 0) {
                for (var key in finalButtons) {
                    if (key !== 'cancel' && finalButtons[key] === null) {
                        finalButtons[key] = buttons[0];

                        break;
                    }
                }

                buttons.splice(0, 1);
            }

            if (finalButtons.cancel) {
                for (let key in finalButtons) {
                    if (key !== 'cancel' && finalButtons[key] === null) {
                        finalButtons[key] = finalButtons.cancel;

                        break;
                    }
                }
            }

            let materialDialog = new MaterialDialog();

            const dialogOptions = {
                forceStacking: forceStacking,
                title:         titleText,
                content:       contentText
            };

            if (finalButtons.positive) {
                // @formatter:off
                dialogOptions.positiveText = finalButtons.positive.text;
                dialogOptions.onPositive   = finalButtons.positive.onPress;
                // @formatter:on
            }

            if (finalButtons.negative) {
                // @formatter:off
                dialogOptions.negativeText = finalButtons.negative.text;
                dialogOptions.onNegative   = finalButtons.negative.onPress;
                // @formatter:on
            }

            if (finalButtons.neutral) {
                // @formatter:off
                dialogOptions.neutralText = finalButtons.neutral.text;
                dialogOptions.onNeutral   = finalButtons.neutral.onPress;
                // @formatter:on
            }

            materialDialog.set(dialogOptions);
            materialDialog.show();

        } else {
            Alert.alert(titleText, contentText, buttons);
        }
    }
}