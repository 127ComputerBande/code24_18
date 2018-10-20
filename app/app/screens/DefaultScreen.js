import AppStyles                from '../styles/AppStyles';
import Alert                    from '../helper/Alert';
import autobind                 from 'autobind-decorator';
import { connect }              from 'react-redux';
import NavigationOptionsBuilder from '../helper/NavigationOptionsBuilder';
import React                    from 'react';
import { StyleSheet }           from 'react-native';
import { Text }                 from 'react-native';
import { TouchableHighlight }   from 'react-native';
import { View }                 from 'react-native';
import I18n                     from 'react-native-i18n';
import NavigationHelper         from '../helper/Navigation';
import { NavigationActions }    from 'react-navigation';
import Screens                  from '../constants/Screens';
import Vibrate                  from '../helper/Vibrate';

@connect(
    (state) => (
        {
            Navigation: state.Navigation
        }
    ),
    (dispatch) => (
        {
            navigate: () => {
                dispatch(
                    NavigationActions.navigate({
                        routeName: Screens.IMPRINT_MODAL
                    })
                );
            }
        }
    )
)
class DefaultScreen extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => {
        return NavigationOptionsBuilder('defaultScreenTitle', {
            tabBarIcon: 'hand-spock-o'
        });
    };

    @autobind
    showDialog () {
        Alert.alertDialog(I18n.t('dialogAlertTitle'), I18n.t('dialogAlertBody'),
            [
                {
                    text:    I18n.t('dialogOptionOne'),
                    onPress: () => {
                        Alert.showSuccess('dialogOptionOne');
                    }
                },
                {
                    text:    I18n.t('dialogOptionTwo'),
                    onPress: () => {
                        Alert.showSuccess('dialogOptionTwo');
                    }
                },
                {
                    text:    I18n.t('cancel'),
                    onPress: () => {
                        Alert.showSuccess('cancel');
                    },
                    style:   'cancel'
                },
            ]
        );
    }

    @autobind
    showSuccessAlert () {
        Alert.showSuccess('successAlertSample')
    }

    @autobind
    showErrorAlert () {
        Alert.showError('errorAlertSample')
    }

    render () {
        let screenName = NavigationHelper.getCurrentRouteName(this.props.Navigation);

        return (
            <View style={AppStyles.flexView}>
                <Text>That's the {screenName}</Text>
                <TouchableHighlight
                    style={styles.touchableHighlight}
                    onPress={this.props.navigate}
                    {...Vibrate.buttonEffects}
                >
                    <Text>
                        {I18n.t('imprint')}
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.touchableHighlight}
                    onPress={this.showSuccessAlert}
                    {...Vibrate.buttonEffects}
                >
                    <Text>
                        {I18n.t('successAlertButtonLabel')}
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.touchableHighlight}
                    onPress={this.showErrorAlert}
                    {...Vibrate.buttonEffects}
                >
                    <Text>
                        {I18n.t('errorAlertButtonLabel')}
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.touchableHighlight}
                    onPress={this.showDialog}
                    {...Vibrate.buttonEffects}
                >
                    <Text>
                        {I18n.t('dialogAlertButtonLabel')}
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    touchableHighlight: {
        padding:     10,
        margin:      5,
        borderWidth: 1,
        borderColor: 'grey'
    }
});

module.exports = DefaultScreen;