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
import Button                   from '../components/Button';
import Separator                from '../components/Separator';
import Colors                   from '../styles/Colors';
import CircularSlider           from '../components/CircularSlider'

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

    constructor (props) {
        super(props);

        this.state = {
            time: 270
        };
    }

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
                        activeButtonStyle={{ backgroundColor: Colors.purple }}
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
                                    title:   I18n.t('location')
                                },
                                {
                                    content: () => {
                                        return (
                                            <View style={{ flex: 1 }}>
                                                <View style={{ flex: 1 }}>
                                                    <Text
                                                        style={styles.descriptionText}>
                                                        {I18n.t('howLongShouldEntertain')}
                                                    </Text>
                                                    <Separator />
                                                    <View
                                                        style={{
                                                            alignItems: 'center',
                                                        }}>
                                                        <CircularSlider width={230}
                                                                        height={230}
                                                                        meterColor={Colors.purple}
                                                                        pinColor={Colors.darkPurple}
                                                                        value={this.state.time}
                                                                        onValueChange={(value) => this.setState({ time: value })} />
                                                    </View>
                                                </View>
                                                <View style={{ alignItems: 'center' }}>
                                                    <Button label={I18n.t('ok')} />
                                                </View>
                                            </View>
                                        );
                                    },
                                    title:   I18n.t('time')
                                }
                            ]} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    descriptionText:     {
        fontStyle:  'italic',
        fontWeight: 'bold',
        fontSize:   23
    },
    tabViewContainer:    {
        width:    '100%',
        flexGrow: 10
    },
    titleImageContainer: {
        flexGrow:       1,
        justifyContent: 'center',
        marginBottom:   -50
    },
    container:           {
        paddingTop:    20,
        paddingBottom: 30
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
        width:  150,
        height: 150
    }
});

module.exports = StartScreen;