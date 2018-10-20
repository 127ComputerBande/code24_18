import Colors                from '../styles/Colors';
import React                 from 'react';
import { StyleSheet }        from 'react-native';
import { Text }              from 'react-native';
import { FlatList }          from 'react-native';
import connect               from 'react-redux/es/connect/connect';
import { NavigationActions } from 'react-navigation';
import autobind              from 'autobind-decorator';
import VideoItem             from './VideoItem';

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
class VideoSelectList extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            checked: this.props.checked
        };
    }

    render () {
        return (
            <FlatList
                data={this.props.videos}
                renderItem={({ item }) => <VideoItem key={item.id} url={item.url} />}
            />
        );

        return null;
    }

    @autobind
    renderItem () {

    }
}

const styles = StyleSheet.create({
    alertText: {
        textAlign: 'center',
        fontSize:  12,
        padding:   5,
        color:     Colors.red,
    }
});

module.exports = VideoSelectList;