import AppStyles                from '../styles/AppStyles';
import Alert                    from '../helper/Alert';
import autobind                 from 'autobind-decorator';
import { connect }              from 'react-redux';
import NavigationOptionsBuilder from '../helper/NavigationOptionsBuilder';
import React                    from 'react';
import { StyleSheet }           from 'react-native';
import { Text }                 from 'react-native';
import { View }                 from 'react-native';
import { TouchableOpacity }     from 'react-native';
import I18n                     from 'react-native-i18n';
import NavigationHelper         from '../helper/Navigation';
import { NavigationActions }    from 'react-navigation';
import Screens                  from '../constants/Screens';
import { Image }                from 'react-native';
import TabView                  from '../components/TabView';

@connect(
    (state) => (
        {
            Navigation: state.Navigation
        }
    ),
    (dispatch) => (
        {
            navigateToVideoSelectScreen: () => {
                dispatch(
                    NavigationActions.navigate({
                        routeName: Screens.VIDEO_SELECT_SCREEN
                    })
                );
            }
        }
    )
)
class StartScreen extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => {
        return NavigationOptionsBuilder('', {
            hideHeader: true
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

    render () {
        return (
            <View style={
                [
                    AppStyles.flexView,
                    AppStyles.whiteView,
                    AppStyles.horizontalCentered,
                    styles.container
                ]}>
                <View
                    style={styles.titleImageContainer}
                >
                    <Image
                        style={styles.titleImage}
                        source={require('../assets/images/location.png')} />
                </View>
                <View style={styles.tabViewContainer}>
                    <TabView
                        activeButtonStyle={{ backgroundColor: 'rgb(168,149,247)' }}
                        initialIndex={1}
                        tabs={
                            [
                                {
                                    content: () => {
                                        return (
                                            <View>
                                                <Text>asdf</Text>
                                            </View>
                                        );
                                    },
                                    title:   'asdf'
                                },
                                {
                                    content: () => {
                                        return (
                                            <View style={{ flex: 1 }}>
                                                <View style={{ flex: 1 }}>
                                                    <Text>bsdf</Text>
                                                </View>

                                                <View>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            alert("adasd");
                                                        }}
                                                    >
                                                        <Text>{I18n.t('ok')}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        );
                                    },
                                    title:   'bsdf'
                                }
                            ]} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabViewContainer:    {
        width:    '100%',
        flexGrow: 10
    },
    titleImageContainer: {
        flexGrow:       1,
        justifyContent: 'center',
        marginBottom:   -20
    },
    container:           {
        paddingTop: 20
    },
    selectedButton:      {
        backgroundColor: 'red',
    },
    touchableHighlight:  {
        padding:     10,
        margin:      5,
        borderWidth: 1,
        borderColor: 'grey'
    },
    titleImage:          {
        width:  130,
        height: 130
    }
});

module.exports = StartScreen;