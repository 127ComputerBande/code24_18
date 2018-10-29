import Colors               from '../styles/Colors';
import React                from 'react';
import { StyleSheet }       from 'react-native';
import { View }             from 'react-native';
import { Text }             from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Linking }          from 'react-native';
import { ImageBackground }  from 'react-native';
import connect              from 'react-redux/es/connect/connect';
import autobind             from 'autobind-decorator';
import PropTypes            from 'prop-types';

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
class Tag extends React.Component {
    render () {
        return <View style={styles.tag}>
            <Text style={styles.tagText}>{this.props.name}</Text>
        </View>;
    }

}

class VideoItem extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        let duration       = this.props.duration !== undefined ? this.props.duration : 0;
        let minutes        = Math.floor(duration / 60);
        let minutesString  = minutes.toString().padStart(2, '0');
        let seconds        = duration - minutes * 60;
        let secondsString  = seconds.toString().padStart(2, '0');
        let durationString = `${minutesString}:${secondsString}`;
        let thumbnailUrl   = this.props.thumbnail ? this.props.thumbnail : "https://via.placeholder.com/300/ccc/ccc";

        return (
            <TouchableOpacity
                onPress={
                    () => {
                        let url = this.props.url;
                        Linking.canOpenURL(url).then(supported => {
                            if (!supported) {
                                console.log('Can\'t handle url: ' + url);
                            } else {
                                return Linking.openURL(url);
                            }
                        }).catch(err => console.error('An error occurred', err));
                    }
                }
                style={styles.container}>
                <View style={styles.thumbnailContainer}>
                    <ImageBackground
                        style={styles.imageBackground}
                        source={{ uri: thumbnailUrl }}>
                        <View style={styles.videoDurationTextContainer}>
                            <Text style={styles.videoDurationText}>
                                {durationString}
                            </Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.descriptionContainer}>
                    <View style={styles.videoTitleContainer}>
                        <Text
                            style={styles.videoTitle}
                            numberOfLines={2}
                            ellipsizeMode={'tail'}>
                            {this.props.title}
                        </Text>
                    </View>
                    <View style={styles.tags}>
                        {
                            this.props.categories.map(
                                (category, index) => {
                                    return <Tag key={'tag_' + index} name={category.name} />
                                }
                            )
                        }
                    </View>

                </View>
            </TouchableOpacity>
        );
    }

    @autobind
    renderItem () {

    }
}

VideoItem.defaultProps = {
    categories: []
};

VideoItem.propTypes = {
    tags: PropTypes.array
};

const styles = StyleSheet.create({
          thumbnailContainer:         {
              width: 130
          },
          tag:                        {
              backgroundColor:   Colors.purple,
              borderRadius:      15,
              marginHorizontal:  2,
              padding:           5,
              paddingHorizontal: 10
          },
          tagText:                    {
              color: Colors.white
          },
          tags:                       {
              flexDirection: 'row'
          },
          videoTitleContainer:        {
              flex: 1,
          },
          videoTitle:                 {
              fontWeight: 'bold',
              fontSize:   20,
              color:      Colors.darkGray
          },
          imageBackground:            {
              height:          68,
              width:           120,
              alignItems:      'flex-end',
              justifyContent:  'flex-end',
              backgroundColor: Colors.lightGray
          },
          videoDurationTextContainer: {
              backgroundColor: Colors.middleGray,
              width:           45,
              height:          25,
              justifyContent:  'center'
          },
          videoDurationText:          {
              textAlign: 'center'
          },
          container:                  {
              flex:              1,
              flexDirection:     'row',
              paddingVertical:   5,
              paddingHorizontal: 20,
              alignItems:        'center'
          },
          descriptionContainer:       {
              padding: 5,
              height:  90,
              flex:    1
          }
      })
;

module.exports = VideoItem;