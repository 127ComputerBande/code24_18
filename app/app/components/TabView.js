import Colors               from '../styles/Colors';
import React                from 'react';
import { StyleSheet }       from 'react-native';
import { View }             from 'react-native';
import { Text }             from 'react-native';
import { Image }            from 'react-native';
import connect              from 'react-redux/es/connect/connect';
import autobind             from 'autobind-decorator';
import TabViewButton        from './TabViewButton';
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
class TabView extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            activeIndex: props.initialIndex
        };
    }

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    {
                        this.props.tabs.map(
                            (tab, index) => {
                                let active      = this.state.activeIndex === index;
                                let firstButton = index === 0;
                                let lastButton  = index === this.props.tabs.length - 1;
                                return (
                                    <TabViewButton
                                        {...tab}
                                        firstButton={firstButton}
                                        lastButton={lastButton}
                                        style={this.props.tabButtonStyle}
                                        buttonStyle={[this.props.buttonStyle, tab.buttonStyle]}
                                        activeButtonStyle={[this.props.activeButtonStyle, tab.activeButtonStyle]}
                                        labelStyle={[this.props.labelStyle, tab.labelStyle]}
                                        activeLabelStyle={[this.props.activeLabelStyle, tab.activeLabelStyle]}
                                        active={active}
                                        key={'tab_' + index}
                                        onPress={
                                            () => {
                                                this.setState({ activeIndex: index })
                                            }
                                        }
                                    />
                                );
                            }
                        )
                    }
                </View>

                <View style={styles.contentContainer}>
                    {
                        this.props.tabs[this.state.activeIndex].content()
                    }
                </View>
            </View>
        );
    }

    @autobind
    renderItem () {

    }
}

const styles = StyleSheet.create({
    container:           {
        padding: 10,
        flex:    1
    },
    tabButtonStyle:      {
        backgroundColor: 'green'
    },
    tabButtonLabelStyle: {
        color: 'white'
    },
    buttonStyle:         {},
    activeButtonStyle:   {},
    labelStyle:          {},
    activeLabelStyle:    {},
    buttonContainer:     {
        width:         '100%',
        flexDirection: 'row',
        borderColor:   'grey',
        shadowColor:   '#ccc',
        shadowOffset:  { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius:  20,
        marginBottom:  20
    },
    contentContainer:    {
        paddingHorizontal: 10,
        flex:              1
    }
});

TabView.defaultProps = {
    style:        {},
    tabs:         [],
    initialIndex: 0
};

TabView.propTypes = {
    tabs:         PropTypes.arrayOf(
        PropTypes.shape(
            {
                title:             PropTypes.string.required,
                content:           PropTypes.func.required,
                buttonStyle:       PropTypes.object,
                activeButtonStyle: PropTypes.object,
                labelStyle:        PropTypes.object,
                activeLabelStyle:  PropTypes.object
            }
        )),
    initialIndex: PropTypes.number
};

module.exports = TabView;