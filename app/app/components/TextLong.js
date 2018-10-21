import React          from 'react';
import Colors         from '../styles/Colors';
import FontWeight     from '../styles/FontWeight';
import { StyleSheet } from 'react-native';
import { Text }       from 'react-native';
import Theme          from '../helper/Theme';
import PropTypes      from 'prop-types';

class TextLong extends React.Component {

    styles = {};

    buildStyles (props) {
        if (!props) {
            props = this.props;
        }

        this.styles = {
            text: Theme.getTheme(
                styles.textLong,
                [
                    {
                        selectedValue: props.theme,
                        values:        {
                            bold: styles.textLongBold,
                        }
                    },
                ]
            )
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
            <Text style={this.styles.text}>
                {this.props.children}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    textLong:     {
        fontSize:     13,
        color:        Colors.darkGray,
        marginBottom: 20,
    },
    textLongBold: {
        fontWeight: FontWeight.bold,
    },
});

TextLong.propTypes = {
    theme:    PropTypes.string,
    children: PropTypes.array
};

TextLong.defaultProps = {
    theme:    '',
    children: []
};

module.exports = TextLong;