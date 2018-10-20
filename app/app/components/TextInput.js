import autobind          from 'autobind-decorator';
import Icon              from 'react-native-vector-icons/FontAwesome';
import React             from 'react';
import Colors            from '../styles/Colors';
import { Text }          from 'react-native';
import { TextInput }     from 'react-native';
import { StyleSheet }    from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Theme             from '../helper/Theme';
import { View }          from 'react-native';
import PropTypes         from 'prop-types';

class TextInputInternal extends React.Component {

    styles = {};
    changeDebounce = null;

    buildStyles (props) {
        if (!props) {
            props = this.props;
        }

        this.styles = {
            form:    Theme.getTheme(
                styles.textInput
            ),
            text:    Theme.getTheme(
                styles.textInputLabel,
            ),
            icon:    Theme.getTheme(
                styles.textInputIcon
            ),
            wrapper: Theme.getTheme(
                styles.textInputWrapper,
            )
        };
    }

    @autobind
    componentWillReceiveProps (nextProps) {
        this.props.debug && console.log('TextInputInternal: componentWillReceiveProps', nextProps);

        if (nextProps.value) {
            this.setState({
                debounceText: null
            })
        }

        this.buildStyles(nextProps);
    };

    componentWillUnmount () {
        this.tryStopChangeDebounce();

    };

    constructor (props) {
        super(props);

        this.state = {
            debounceText: '',
            focussed:     false,
        };

        this.buildStyles();
    }

    @autobind
    debounceTimeout () {
        this.tryStopChangeDebounce();

        if (this.props.onChangeText) {
            this.props.onChangeText(this.state.debounceText);
        }
    }

    @autobind
    onChangeText (text) {
        console.log('TextInputInternal: onTextChange', text);

        this.setState({
            debounceText: text
        });

        if (text.length > 0) {
            this.startChangeDebounce();
        } else {
            this.tryStopChangeDebounce();

            if (this.props.onChangeText) {
                this.props.onChangeText(text);
            }
        }
    }

    @autobind
    onBlur () {
        console.log('TextInput: onBlur', this.state.debounceText);

        this.tryStopChangeDebounce();

        if (this.state.debounceText && this.state.debounceText.length > 0 && this.props.onChangeText) {
            this.props.onChangeText(this.state.debounceText);
        }
    }

    render () {
        let autoCapitalize         = 'sentences';
        let autoCorrect            = true;
        let autoFocus              = false;
        let clearButtonMode        = this.props.clearButtonMode;
        let keyboardType           = 'default';
        let returnKeyType          = 'next';
        let secureTextEntry        = false;
        const placeholderTextColor = this.props.placeholderTextColor;
        const self                 = this;
        const value                = this.state.debounceText || this.props.value;

        if (this.props.mode) {
            if (this.props.mode === 'password') {
                autoCapitalize  = 'none';
                autoCorrect     = false;
                secureTextEntry = true;
            } else if (this.props.mode === 'email') {
                autoCapitalize = 'none';
                autoCorrect    = false;
                keyboardType   = 'email-address';
            } else if (this.props.mode === 'number' || this.props.mode === 'money') {
                autoCapitalize = 'none';
                autoCorrect    = false;
                keyboardType   = 'numbers-and-punctuation';
            } else if (this.props.mode === 'noHelp') {
                autoCapitalize = 'none';
                autoCorrect    = false;
            }
        }

        if (this.props.isLast) {
            returnKeyType = 'done';
        }

        return (
            <View style={this.styles.wrapper}>
                {
                    this.props.icon ? (
                        <Icon name={this.props.icon}
                              size={18}
                              style={this.styles.icon}
                        />
                    ) : null
                }
                {
                    this.props.text ? (
                        <Text style={this.styles.text}>
                            {this.props.text}
                        </Text>
                    ) : null
                }
                {
                    this.props.mode && this.props.mode === 'money' ?
                        (
                            <TextInputMask style={this.styles.form}
                                           placeholder={this.props.placeholder || this.props.text}
                                           autoCapitalize={autoCapitalize}
                                           autoCorrect={autoCorrect}
                                           autoFocus={autoFocus}
                                           clearButtonMode={clearButtonMode}
                                           onChangeText={this.onChangeText}
                                           onSubmitEditing={this.props.doneButtonPressed}
                                           keyboardType={keyboardType}
                                           secureTextEntry={secureTextEntry}
                                           returnKeyType={returnKeyType}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           value={value}
                                           placeholderTextColor={placeholderTextColor}
                                           ref={'textInput'}
                                           type={'money'}
                                           options={{
                                               suffixUnit: (
                                                               this.state.focussed ? '' : '€'
                                                           ),
                                               unit:       '',
                                           }}
                                           onFocus={() => {
                                               this.setState({ focussed: true });

                                               if (self.props.onFocus) {
                                                   self.props.onFocus();
                                               }
                                           }}
                                           onBlur={() => {
                                               this.onBlur();

                                               this.setState({ focussed: false });
                                           }}
                            >

                            </TextInputMask>
                        ) :
                        (
                            <TextInput style={this.styles.form}
                                       placeholder={this.props.placeholder || this.props.text}
                                       autoCapitalize={autoCapitalize}
                                       autoCorrect={autoCorrect}
                                       autoFocus={autoFocus}
                                       clearButtonMode={clearButtonMode}
                                       underlineColorAndroid='rgba(0,0,0,0)'
                                       onChangeText={this.onChangeText}
                                       onBlur={this.onBlur}
                                       onFocus={() => {
                                           if (self.props.onFocus) {
                                               self.props.onFocus();
                                           }
                                       }}
                                       onSubmitEditing={this.props.doneButtonPressed}
                                       keyboardType={keyboardType}
                                       secureTextEntry={secureTextEntry}
                                       placeholderTextColor={placeholderTextColor}
                                       returnKeyType={returnKeyType}
                                       value={value}
                                       ref={'textInput'}
                            >

                            </TextInput>
                        )
                }
            </View>
        );
    }

    @autobind
    startChangeDebounce () {
        this.tryStopChangeDebounce();

        this.changeDebounce = setTimeout(this.debounceTimeout, 50);
    }

    @autobind
    stopChangeDebounce () {
        this.props.debug && console.log('TextInputInternal: stopChangeDebounce');

        clearTimeout(this.changeDebounce);

        this.changeDebounce = null;
    }

    @autobind
    tryStopChangeDebounce () {
        this.props.debug && console.log('TextInputInternal: tryStopScrollDebounce');

        if (this.changeDebounce) {
            this.stopChangeDebounce();
        }
    }
}

const styles = StyleSheet.create({
    textInput:        {
        marginVertical:  4,
        padding:         8,
        paddingLeft:     25,
        borderWidth:     1,
        borderRadius:    5,
        borderColor:     Colors.lightGray,
        backgroundColor: Colors.white,
    },
    textInputLabel:   {}
    ,
    textInputWrapper: {
        position:       'relative',
        marginVertical: 5,
    }
    ,
    textInputIcon:    {
        position: 'absolute',
        bottom:   13,
        left:     8,
        zIndex:   1337,
        color:    Colors.darkGray,
    }
});

TextInputInternal.propTypes = {
    debug:             PropTypes.bool,
    delay:             PropTypes.number,
    icon:              PropTypes.string,
    isLast:            PropTypes.bool,
    onChangeText:      PropTypes.func,
    text:              PropTypes.string,
    value:             PropTypes.string,
    clearButtonMode:   PropTypes.string,
    debounceText:      PropTypes.string,
    mode:              PropTypes.string,
    placeholder:       PropTypes.string,
    doneButtonPressed: PropTypes.func
};

// @formatter:off
TextInputInternal.defaultProps = {
    debug:             false,
    delay:             200,
    icon:              '',
    isLast:            false,
    onChangeText:      () => {},
    text:              '',
    value:             '',
    clearButtonMode:   'while-editing',
    mode:              'noHelp',
    doneButtonPressed: () => {}
};
// @formatter:on


module.exports = TextInputInternal;