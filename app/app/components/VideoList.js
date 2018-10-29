import Colors                from '../styles/Colors';
import React                 from 'react';
import { StyleSheet }        from 'react-native';
import { View }              from 'react-native';
import { Image }             from 'react-native';
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

    getIriForItem (item, index) {
        return item.id;
    }

    render () {
        return (
            <FlatList
                data={this.props.videos}
                keyExtractor={this.getIriForItem}
                renderItem={
                    ({ item, index }) => (

                        <View>
                            <VideoItem
                                duration={item.duration}
                                categories={item.categories}
                                thumbnail={item.thumbnail}
                                key={item.id}
                                title={item.title}
                                url={item.url} />

                            {
                                index === 2 && (
                                    <View>
                                        <Image style={{ width: "100%", height: 150 }}
                                               resizeMode={'cover'}
                                               source={require('../assets/images/gntm.jpg')} />
                                    </View>
                                )
                            }
                        </View>
                    )}
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