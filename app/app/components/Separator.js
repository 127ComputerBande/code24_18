import React          from 'react';
import { StyleSheet } from 'react-native';
import { View }       from 'react-native';

class Separator extends React.Component {

    styles = {};

    render () {
        return (
            <View style={styles.separator} />
        );
    }
}

const styles = StyleSheet.create({
    separator: {
        borderBottomWidth: 1,
        borderColor:       'grey',
        marginVertical:    40,
        width:             '60%',
        alignSelf:         'center'
    },
});

module.exports = Separator;