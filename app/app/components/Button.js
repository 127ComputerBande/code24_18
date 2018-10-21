import { connect }          from 'react-redux';
import React                from 'react';
import { StyleSheet }       from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text }             from 'react-native';
import PropTypes            from 'prop-types';
import Colors               from '../styles/Colors';

@connect(
    state => (
        {
            loading: state.Loading,
        }
    )
)
class Button extends React.Component {

    styles = {};

    render () {
        return (
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.props.onPress}>
                <Text style={styles.label}>
                    {this.props.label}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius:    50,
        height:          50,
        alignContent:    'center',
        justifyContent:  'center',
        width:           170,
        backgroundColor: Colors.purple,
    },
    label:           {
        color:     'white',
        textAlign: 'center',
        fontSize:  18
    }
});

Button.propTypes = {
    label:   PropTypes.string,
    onPress: PropTypes.func
};

// @formatter:off
Button.defaultProps = {
    label: '',
    onPress: ()=>{}
};
// @formatter:on

module.exports = Button;