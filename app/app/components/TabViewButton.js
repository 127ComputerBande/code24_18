import Colors               from '../styles/Colors';
import React                from 'react';
import { StyleSheet }       from 'react-native';
import { View }             from 'react-native';
import { Text }             from 'react-native';
import { Image }            from 'react-native';
import connect              from 'react-redux/es/connect/connect';
import autobind             from 'autobind-decorator';
import { TouchableOpacity } from 'react-native';
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
class TabViewButton extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            checked: this.props.checked
        };
    }

    render () {
        let buttonStyle = [styles.buttonStyle, this.props.buttonStyle];

        let labelStyle = [styles.label, this.props.labelStyle];

        if (this.props.active) {
            buttonStyle.push(styles.activeButtonStyle);
            buttonStyle.push(this.props.activeButtonStyle);
            labelStyle.push(styles.activeLabelStyle);
            labelStyle.push(this.props.activeLabelStyle);
        }

        if (this.props.firstButton) {
            buttonStyle.push(styles.firstButton);
        }

        if (this.props.lastButton) {
            buttonStyle.push(styles.lastButton);
        }

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={buttonStyle}
                onPress={this.props.onPress}>
                <Text style={labelStyle}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        );
    }

    @autobind
    renderItem () {

    }
}

const styles = StyleSheet.create({
    buttonStyle:       {
        height:            50,
        justifyContent:    'center',
        flex:              1,
        paddingHorizontal: 10,
        backgroundColor:   'white',
        alignItems:        'center'
    },
    firstButton:       {
        borderTopLeftRadius:    10,
        borderBottomLeftRadius: 10,
    },
    lastButton:        {
        borderTopRightRadius:    10,
        borderBottomRightRadius: 10,
    },
    activeButtonStyle: {
        height:            50,
        justifyContent:    'center',
        flex:              1,
        paddingHorizontal: 10,
        backgroundColor:   'grey'
    },
    activeLabelStyle:  {
        color: 'white'
    },
    activeLabel:       {
        color: 'black'
    }
});

TabViewButton.defaultProps = {
    firstButton:       true,
    lastButton:        false,
    buttonStyle:       {},
    activeButtonStyle: {},
    labelStyle:        {},
    activeLabelStyle:  {},
    active:            false
};

TabViewButton.propTypes = {
    active:      PropTypes.bool,
    firstButton: PropTypes.bool,
    lastButton:  PropTypes.bool
};

module.exports = TabViewButton;