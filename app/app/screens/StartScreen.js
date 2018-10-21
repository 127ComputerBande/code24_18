import AppStyles                from '../styles/AppStyles';
import Alert                    from '../helper/Alert';
import autobind                 from 'autobind-decorator';
import { connect }              from 'react-redux';
import NavigationOptionsBuilder from '../helper/NavigationOptionsBuilder';
import React                    from 'react';
import { StyleSheet }           from 'react-native';
import { Text }                 from 'react-native';
import { View }                 from 'react-native';
import { TextInput }            from 'react-native';
import I18n                     from 'react-native-i18n';
import { Image }                from 'react-native';
import TabView                  from '../components/TabView';
import Button                   from '../components/Button';
import Separator                from '../components/Separator';
import Colors                   from '../styles/Colors';
import CircularSlider           from '../components/CircularSlider';
import _                        from 'lodash';
import { VideoActions }         from '../store/actions/video';

@connect(
    (state) => (
        {
            Navigation: state.Navigation
        }
    ),
    (dispatch) => (
        {
            fetchVideosByDuration: (duration) => {
                dispatch(
                    VideoActions.fetchVideosByDuration(duration)
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

        let tagScanned = _.get(props, 'navigation.state.params.tagScanned', false);

        this.state = {
            duration:     15,
            initialIndex: tagScanned ? 0 : 1
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

    @autobind
    onSelectTimePressed () {
        let duration = parseInt(this.state.duration * 60, 10);
        this.props.fetchVideosByDuration(duration);
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
                        initialTab={this.state.initialTab}
                        tabs={
                            [
                                {
                                    content: () => {
                                        return (
                                            <View style={{ flex: 1 }}>
                                                <View style={{ marginBottom: 30 }}>
                                                    <Text
                                                        style={styles.descriptionText}>
                                                        {I18n.t('tellUsYourDestination')}
                                                    </Text>
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={styles.textInputLabel}>Start</Text>
                                                    <TextInput value={"Unterföhring"}
                                                               style={styles.textInput} />
                                                    <Text style={styles.textInputLabel}>Destination</Text>
                                                    <TextInput value={"München-Pasing"}
                                                               style={styles.textInput} />
                                                </View>

                                                <View style={{ alignItems: 'center' }}>
                                                    <Button onPress={this.onSelectTimePressed}
                                                            label={I18n.t('ok')} />
                                                </View>
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
                                                                        value={this.state.duration}
                                                                        onValueChange={(value) => this.setState({ duration: value })}
                                                        />
                                                    </View>
                                                </View>
                                                <View style={{ alignItems: 'center' }}>
                                                    <Button onPress={this.onSelectTimePressed}
                                                            label={I18n.t('ok')} />
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
    },
    textInput:           {
        height:            60,
        backgroundColor:   Colors.middleGray,
        borderRadius:      20,
        marginBottom:      20,
        paddingHorizontal: 20,
        fontSize:          20
    },
    textInputLabel:      {
        fontSize:     24,
        fontWeight:   'bold',
        marginBottom: 10,
        marginLeft:   20
    }
});

module.exports = StartScreen;