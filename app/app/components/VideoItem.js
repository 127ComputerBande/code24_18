import Colors         from '../styles/Colors';
import React          from 'react';
import { StyleSheet } from 'react-native';
import { View }       from 'react-native';
import { Text }       from 'react-native';
import { Image }      from 'react-native';
import connect        from 'react-redux/es/connect/connect';
import autobind       from 'autobind-decorator';

@connect(
    (state) => (
        {
            videos: state.Video.videos
        }
    ),
    (dispatch) => (
        {}
    )
)
class VideoItem extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            checked: this.props.checked
        };
    }

    render () {
        return (
            <View
                style={styles.container}>
                <Image
                    style={{ height: 100, width: 100 }}
                    source={{ uri: 'https://via.placeholder.com/200x200' }} />
                <View style={styles.descriptionContainer}>
                    <Text>aaa</Text>
                </View>
            </View>
        );
    }

    @autobind
    renderItem () {

    }
}

const styles = StyleSheet.create({
    container:            {
        flex:            1,
        flexDirection:   'row',
        paddingVertical: 10,
    },
    descriptionContainer: {
        padding: 5
    }
});

module.exports = VideoItem;