import { ActivityIndicator } from 'react-native';
import { connect }           from 'react-redux';
import Colors                from '../styles/Colors';
import Platform              from '../helper/Platform';
import React                 from 'react';
import { StyleSheet }        from 'react-native';
import { Text }              from 'react-native';
import Theme                 from '../helper/Theme';
import { View }              from 'react-native';
import PropTypes             from 'prop-types';

@connect(
    state => (
        {
            loading: state.Loading,
        }
    )
)
class LoadingOverlay extends React.Component {

    styles = {};

    buildStyles (props) {
        if (!props) {
            props = this.props;
        }

        this.styles = {
            hidden:    Theme.getTheme(
                styles.loadingOverlayHidden
            ),
            indicator: Theme.getTheme(
                styles.loadingOverlayActivityIndicator
            ),
            text:      Theme.getTheme(
                styles.loadingOverlayText
            ),
            view:      Theme.getTheme(
                styles.loadingOverlay
            ),
        };
    }

    constructor (props) {
        super(props);

        this.buildStyles();
    }

    componentWillReceiveProps (nextProps) {
        this.buildStyles(nextProps);
    }

    render () {
        return (
            this.props.loading.loading ?
                (
                    <View style={this.styles.view}>
                        <ActivityIndicator
                            animating={true}
                            style={this.styles.indicator}
                            size={'large'}
                            color={Colors.white}
                        />
                        <Text style={this.styles.text}>
                            {this.props.loading.text}
                        </Text>
                    </View>
                ) : (
                    Platform.isAndroid() ?
                        (
                            <View style={this.styles.hidden} />
                        ) : null
                )
        );
    }
}

const styles = StyleSheet.create({
    loadingOverlay:                  {
        position:        'absolute',
        top:             0,
        left:            0,
        width:           '100%',
        height:          '100%',
        flex:            1,
        zIndex:          1338,
        alignItems:      'center',
        justifyContent:  'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    loadingOverlayActivityIndicator: {
        margin: 10,
    },
    loadingOverlayHidden:            {
        position: 'absolute',
        top:      0,
        left:     0,
        width:    0,
        height:   0,
    },
    loadingOverlayText:              {
        color:    Colors.white,
        fontSize: 16,
        margin:   10
    }
});

LoadingOverlay.propTypes = {
    loading: PropTypes.object
};

LoadingOverlay.defaultProps = {
    loading: {
        level:   0,
        loading: false,
        text:    ''
    }
};

module.exports = LoadingOverlay;