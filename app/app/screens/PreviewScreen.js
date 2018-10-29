import AppStyles                from '../styles/AppStyles';
import { connect }              from 'react-redux';
import NavigationOptionsBuilder from '../helper/NavigationOptionsBuilder';
import React                    from 'react';
import { StyleSheet }           from 'react-native';
import { Text }                 from 'react-native';
import { View }                 from 'react-native';
import I18n                     from 'react-native-i18n';
import { Image }                from 'react-native';
import TabView                  from '../components/TabView';
import Colors                   from '../styles/Colors';
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
class PreviewScreen extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => {
        return NavigationOptionsBuilder('', {
            hideHeader: true
        });
    };

    constructor (props) {
        super(props);

        let tagScanned = _.get(props, 'navigation.state.params.tagScanned', false);

        this.state = {
            duration:     10,
            initialIndex: tagScanned ? 0 : 1
        };
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
                                                <Webbrowser
                                                    url="https://your-url.com"
                                                    hideHomeButton={false}
                                                    hideToolbar={false}
                                                    hideAddressBar={false}
                                                    hideStatusBar={false}
                                                    foregroundColor={'#efefef'}
                                                    backgroundColor={'#333'}
                                                />
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