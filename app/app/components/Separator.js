import React          from 'react';
import { StyleSheet } from 'react-native';
import { View }       from 'react-native';
import Colors         from '../styles/Colors';

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
        borderBottomWidth: 2,
        borderColor:       Colors.middleGray,
        marginTop:         30,
        marginBottom:      20,
        width:             '70%',
        alignSelf:         'center'
    },
});

module.exports = Separator;