import AppStyles                from '../styles/AppStyles';
import Alert                    from '../helper/Alert';
import autobind                 from 'autobind-decorator';
import { connect }              from 'react-redux';
import NavigationOptionsBuilder from '../helper/NavigationOptionsBuilder';
import React                    from 'react';
import { StyleSheet }           from 'react-native';
import { Text }                 from 'react-native';
import { Linking }              from 'react-native';
import { View }                 from 'react-native';
import I18n                     from 'react-native-i18n';
import VideoList                from '../components/VideoList';
import Colors                   from '../styles/Colors';

@connect(
    (state) => (
        {
            Navigation: state.Navigation,
            Video:      state.Video
        }
    ),
    (dispatch) => (
        {}
    )
)
class VideoSelectScreen extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => {
        return NavigationOptionsBuilder('defaultScreenTitle', {
            hideHeader: true,
        });
    };

    render () {
        let duration       = this.props.Video.travelTime !== undefined ? this.props.Video.travelTime : 0;
        let minutes        = Math.floor(duration / 60);
        let minutesString  = minutes.toString().padStart(2, '0');
        let seconds        = duration - minutes * 60;
        let secondsString  = seconds.toString().padStart(2, '0');
        let durationString = `${minutesString}:${secondsString}`;

        return (
            <View style={[styles.container, AppStyles.flexView, AppStyles.whiteView]}>
                <Text style={styles.estimatedTravelTimeTitle}>
                    {
                        I18n.t('estimatedTravelTime')
                    }
                </Text>
                <Text style={styles.estimatedTravelTimeValue}>
                    {
                        `${durationString} ${I18n.t('minutes')}`
                    }
                </Text>
                <VideoList />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    estimatedTravelTimeTitle: {
        textAlign:  'center',
        fontSize:   24,
        fontWeight: 'bold',
        fontStyle:  'italic'
    },
    estimatedTravelTimeValue: {
        textAlign:  'center',
        fontSize:   30,
        fontWeight: 'bold',
        fontStyle:  'italic',
        margin:     10,
        color:      Colors.purple
    },
    touchableHighlight:       {
        padding:     10,
        margin:      5,
        borderWidth: 1,
        borderColor: 'grey'
    },
    container:                {
        paddingTop: 80
    }
});

module.exports = VideoSelectScreen;