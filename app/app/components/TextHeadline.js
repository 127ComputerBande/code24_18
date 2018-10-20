import React      from 'react';
import FontWeight from '../styles/FontWeight';
import Colors     from '../styles/Colors';
import { Text }   from 'react-native';
import Theme      from '../helper/Theme';
import PropTypes  from 'prop-types';

class TextHeadline extends React.Component {

    styles = {};

    buildStyles (props) {
        if (!props) {
            props = this.props;
        }

        this.styles = {
            headline: Theme.getTheme(
                styles.textHeadline,
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
            <Text style={[styles.headline]}>
                {this.props.children}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    textHeadline: {
        fontSize:     15,
        fontWeight:   FontWeight.bold,
        color:        Colors.middleDarkGray,
        marginBottom: 10,
    }
});

TextHeadline.propTypes = {
    children: PropTypes.array
};

TextHeadline.defaultProps = {
    children: []
};

module.exports = TextHeadline;