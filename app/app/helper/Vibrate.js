/**
 * Android:
 *
 * arg 0: duration to wait before turning the vibrator on.
 * arg with odd: vibration length.
 * arg with even: duration to wait before next vibration.
 *
 * iOS:
 *
 * vibration length on iOS is fixed.
 * pattern controls durations BETWEEN each vibration only.
 *
 * arg 0: duration to wait before turning the vibrator on.
 * subsequent args: duration to wait before next vibration.
 */
import Platform                  from './Platform';
import { Vibration }             from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export default class Vibrate {
    static buttonEffects = {
        onPressOut: () => {
            Vibrate.impactMedium(false)
        },
        onPressIn:  () => {
            if (Platform.isIOS()) {
                Vibrate.impactMedium(false)
            }
        }
    };

    static error () {
        if (Platform.isIOS()) {
            Vibrate.notificationError();
        } else {
            Vibrate.custom([0, 500, 250, 50]);
        }
    }

    static custom (pattern) {
        Vibration.vibrate(pattern);
    }

    static success () {
        if (Platform.isIOS()) {
            Vibrate.notificationSuccess();
        } else {
            Vibrate.custom([0, 250]);
        }
    }

    static selection (fallback = false) {
        ReactNativeHapticFeedback.trigger('selection', fallback);
    }

    static impactLight (fallback = false) {
        ReactNativeHapticFeedback.trigger('impactLight', fallback);
    }

    static impactMedium (fallback = false) {
        ReactNativeHapticFeedback.trigger('impactMedium', fallback);
    }

    static impactHeavy (fallback = false) {
        ReactNativeHapticFeedback.trigger('impactHeavy', fallback);
    }

    static notificationSuccess (fallback = true) {
        ReactNativeHapticFeedback.trigger('notificationSuccess', fallback);
    }

    static notificationWarning (fallback = true) {
        ReactNativeHapticFeedback.trigger('notificationWarning', fallback);
    }

    static notificationError (fallback = true) {
        ReactNativeHapticFeedback.trigger('notificationError', fallback);
    }
}