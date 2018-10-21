import Colors         from './Colors';
import { StyleSheet } from 'react-native';
import PlatformHelper from '../helper/Platform';

const styles = StyleSheet.create({
    flexView:           {
        flex:          1,
        paddingBottom: PlatformHelper.isIPhoneX() ? 20 : 0
    },
    flexScrollView:     {
        flex: 1,
    },
    whiteView:          {
        backgroundColor: Colors.white,
    },
    horizontalCentered: {
        alignItems: 'center'
    }
});

module.exports = styles;