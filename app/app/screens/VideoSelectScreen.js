import AppStyles                from '../styles/AppStyles';
import Alert                    from '../helper/Alert';
import autobind                 from 'autobind-decorator';
import { connect }              from 'react-redux';
import NavigationOptionsBuilder from '../helper/NavigationOptionsBuilder';
import React                    from 'react';
import { StyleSheet }           from 'react-native';
import { Text }                 from 'react-native';
import { View }                 from 'react-native';
import I18n                     from 'react-native-i18n';
import NavigationHelper         from '../helper/Navigation';
import { NavigationActions }    from 'react-navigation';
import Screens                  from '../constants/Screens';
import VideoList                from '../components/VideoList';

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
                        routeName: Screens.CONTENT_SELECT_SCREEN
                    })
                );
            }
        }
    )
)
class VideoSelectScreen extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => {
        return NavigationOptionsBuilder('defaultScreenTitle', {
            tabBarIcon: 'hand-spock-o'
        });
    };

    render () {
        let screenName = NavigationHelper.getCurrentRouteName(this.props.Navigation);

        return (
            <View style={AppStyles.flexView}>
                <VideoList />
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

module.exports = VideoSelectScreen;