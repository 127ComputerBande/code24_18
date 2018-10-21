import React                    from 'react';
import PropTypes                from 'prop-types';
import { connect }              from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import autobind                 from 'autobind-decorator';
import { addListener }          from '../store/utils/redux';
import { StackNavigator }       from 'react-navigation';
import Platform                 from '../helper/Platform';
import { BackHandler }          from 'react-native';

// Navigator
import MainStackNavigator from './MainStackNavigator';

export const AppNavigator = StackNavigator(
    {
        MainStack: { screen: MainStackNavigator },
    }, {
        mode: 'modal'
    }
);

@connect(
    (state) => (
        {
            nav: state.Navigation
        }
    )
)
class AppWithNavigationState extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        nav:      PropTypes.object.isRequired,
    };

    componentWillMount () {
        if (Platform.isAndroid()) {
            BackHandler.addEventListener('hardwareBackPress', this.handleHardwareBackPress);
        }
    }

    componentWillUnmount () {
        if (Platform.isAndroid()) {
            BackHandler.removeEventListener('hardwareBackPress');
        }
    }

    @autobind
    handleHardwareBackPress () {
        const { dispatch, navigation, nav } = this.props;

        if (nav.routes.length > 1 || nav.routes[0].routes.length > 1) {
            dispatch({ type: 'Navigation/BACK' });

            return true;
        }

        // Return "false" to close the app
        return false;
    }

    render () {
        const { dispatch, nav } = this.props;
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch,
                    state: nav,
                    addListener,
                })}
            />
        );
    }
}

export default AppWithNavigationState;
