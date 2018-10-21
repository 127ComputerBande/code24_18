import AppStyles                from '../styles/AppStyles';
import autobind                 from 'autobind-decorator';
import { connect }              from 'react-redux';
import NavigationOptionsBuilder from '../helper/NavigationOptionsBuilder';
import React                    from 'react';
import { StyleSheet }           from 'react-native';
import { Text }                 from 'react-native';
import { View }                 from 'react-native';
import I18n                     from 'react-native-i18n';
import { NavigationActions }    from 'react-navigation';
import Screens                  from '../constants/Screens';
import { Image }                from 'react-native';
import NfcManager, { Ndef }     from 'react-native-nfc-manager';
import Button                   from '../components/Button';

@connect(
    (state) => (
        {
            Navigation: state.Navigation
        }
    ),
    (dispatch) => (
        {
            navigateToStartScreen: () => {
                dispatch(
                    NavigationActions.navigate({
                        routeName: Screens.START_SCREEN
                    })
                );
            }
        }
    )
)
class IntroScreen extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => {
        return NavigationOptionsBuilder('', {
            hideHeader: true
        });
    };

    constructor (props) {
        super(props);
    }

    render () {
        return (
            <View style={
                [
                    AppStyles.flexView,
                    AppStyles.whiteView,
                    AppStyles.horizontalCentered,
                    styles.container
                ]}>

                <View style={styles.topContainer}>
                    <Image
                        style={styles.logo}
                        resizeMode={'contain'}
                        source={require('../assets/images/logo.png')} />
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.checkInMessageContainer}>
                        <Text style={styles.checkInTitle}>
                            {I18n.t('checkIntoTitle')}
                        </Text>
                        <Image
                            style={styles.checkInImage}
                            resizeMode={'contain'}
                            source={require('../assets/images/checkIn.png')} />
                        <Button
                            label={I18n.t('dismiss')}
                            onPress={this.props.navigateToStartScreen} />
                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    logo:                    {
        height: 100
    },
    checkInTitle:            {
        fontSize:   24,
        fontStyle:  'italic',
        fontWeight: 'bold'
    },
    checkInImage:            {
        width: 100
    },
    bottomContainer:         {
        flex:      3,
        padding:   30,
        alignSelf: 'stretch',
    },
    topContainer:            {
        flex:       1,
        paddingTop: 50
    },
    checkInMessageContainer: {
        alignItems:      'center',
        padding:         30,
        borderRadius:    20,
        shadowColor:     '#ccc',
        shadowOffset:    { width: 0, height: 5 },
        shadowOpacity:   1,
        shadowRadius:    20,
        backgroundColor: 'white',
        alignSelf:       'stretch',
    },
    container:               {
        paddingTop:    20,
        paddingBottom: 30,
        flex:          1
    }
});

module.exports = IntroScreen;