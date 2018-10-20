import React                                                from 'react';
import { View as BaseView }                                 from 'react-native';
import { KeyboardAvoidingView as BaseKeyboardAvoidingView } from 'react-native';
import PropTypes                                            from 'prop-types';
import Platform                                             from '../helper/Platform';

class KeyboardAvoidingView extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        let View = BaseView;

        if (this.props.useOnAndroid || Platform.isIOS()) {
            View = BaseKeyboardAvoidingView;
        }

        return (
            <View
                {...this.props}>
                {this.props.children}
            </View>
        );
    }
}

KeyboardAvoidingView.propTypes = {
    useOnAndroid: PropTypes.bool,
    children:     PropTypes.array
};

KeyboardAvoidingView.defaultProps = {
    useOnAndroid: false,
    children:     []
};

export default KeyboardAvoidingView;