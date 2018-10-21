'use strict';

import Dimensions   from 'Dimensions';
import { Platform } from 'react-native';

// @formatter:off
const PLATFORM_ANDROID = 'android';
const PLATFORM_IOS     = 'ios';

const windowDimensions = Dimensions.get('window');
const screenHeight     = windowDimensions.height;
const screenWidth      = windowDimensions.width;

const IOS_TAB_BAR_HEIGHT         = 49;
const IPHONE_X_HOME_INDICATOR    = 34;
const ANDROID_TAB_BAR_HEIGHT     = 49;
const IPHONE_X_NOTCH_HEIGHT      = 30;
const IOS_STATUS_BAR_HEIGHT      = 15;
// @formatter:on

/**
 *
 */
export default class PlatformHelper {
    /**
     *
     * @returns {boolean|*}
     */
    static hasIOSNotch () {
        return (
            PlatformHelper.isIPhoneX() ||
            PlatformHelper.isIPhoneXSMax()
        );
    }

    /**
     *
     * @returns {boolean}
     */
    static isAndroid () {
        return Platform.OS === PLATFORM_ANDROID;
    }

    /**
     *
     * @returns {boolean}
     */
    static isIOS () {
        return Platform.OS === PLATFORM_IOS;
    }

    /**
     *
     * @returns {boolean}
     */
    static isIPhoneX () {
        return (
            PlatformHelper.isIOS() &&
            !Platform.isPad &&
            !Platform.isTVOS &&
            (
                screenHeight === 812 ||
                screenWidth === 812
            )
        );
    }

    static isIPhoneXSMax () {
        return (
            PlatformHelper.isIOS() &&
            !Platform.isPad &&
            !Platform.isTVOS &&
            (
                screenHeight === 896 ||
                screenWidth === 896
            )
        );
    }

    /**
     *
     * @returns {boolean}
     */
    static isSmallScreen () {
        return screenHeight <= 568;
    }

    /**
     *
     * @returns {number}
     */
    static getTabBarHeight () {

        if (this.isIOS()) {
            if (this.isIPhoneX()) {
                return IOS_TAB_BAR_HEIGHT + IPHONE_X_HOME_INDICATOR;
            }

            return IOS_TAB_BAR_HEIGHT;
        }

        return ANDROID_TAB_BAR_HEIGHT;
    }

    /**
     *
     * @returns {*}
     */
    static getStatusBarHeight () {

        if (this.isIOS()) {
            if (this.isIPhoneX()) {
                return IOS_STATUS_BAR_HEIGHT + IPHONE_X_NOTCH_HEIGHT;
            }

            return IOS_STATUS_BAR_HEIGHT;
        }

        return 0;
    }

    /**
     *
     * @returns {*}
     */
    static getString () {
        if (this.isIOS()) {
            return PLATFORM_IOS;
        }

        return PLATFORM_ANDROID;
    }
}