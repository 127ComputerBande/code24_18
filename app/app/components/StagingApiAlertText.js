import Api            from '../constants/Api';
import Colors         from '../styles/Colors';
import I18n           from 'react-native-i18n';
import React          from 'react';
import { StyleSheet } from 'react-native';
import { Text }       from 'react-native';
import { View }       from 'react-native';

class StagingApiAlertText extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            checked: this.props.checked
        };
    }

    render () {
        if (Api.isStaging()) {
            return (
                <View>
                    <Text style={styles.alertText}>
                        {I18n.t('stagingApiAlertText')}
                    </Text>
                </View>
            );
        }

        return null;
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

module.exports = StagingApiAlertText;