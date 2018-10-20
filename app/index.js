import autobind               from 'autobind-decorator';
import AppWithNavigationState from './app/navigationController';
import configureStore         from './app/store/configureStore';
import LoadingOverlay         from './app/components/LoadingOverlay';
import React                  from 'react';
import SplashScreen           from 'react-native-splash-screen'
import { AppRegistry }        from 'react-native';
import { AppState }           from 'react-native';
import { AppStateActions }    from './app/store/actions/appstate';
import { PersistGate }        from 'redux-persist/integration/react';
import { Provider }           from 'react-redux';
import StagingApiAlertText    from './app/components/StagingApiAlertText';
import { Text }               from 'react-native';
import { YellowBox }          from 'react-native';
import './app/language/Language';

// Disables font scaling. Will be reactivated if needed
Text.defaultProps.allowFontScaling = false;

// Removes deprecation warnings from App. They are still shown in the debugger
YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Warning: componentWillUpdate is deprecated',
    'Module RCTImageLoader requires'
]);

const { persistor, store } = configureStore({});

class App extends React.Component {

    state = {
        appState: AppState.currentState
    };

    constructor (props) {
        super(props);
    }

    @autobind
    handleAppStateChange (nextAppState) {
        // App state on startup is 'active'
        // @see https://facebook.github.io/react-native/docs/appstate
        const currentAppStateIsNotActive = this.state.appState.match(/inactive|background/);
        const nextAppStateIsActive       = nextAppState === 'active';

        if (currentAppStateIsNotActive && nextAppStateIsActive) {
            store.dispatch(
                AppStateActions.becameActive()
            );
        } else if (!currentAppStateIsNotActive && !nextAppStateIsActive) {
            store.dispatch(
                AppStateActions.becameInactive()
            );
        }

        this.setState({ appState: nextAppState });
    }

    componentDidMount () {
        AppState.addEventListener('change', this.handleAppStateChange);
        SplashScreen.hide();
    }

    componentWillUnmount () {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    render () {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <StagingApiAlertText />
                    <AppWithNavigationState />
                    <LoadingOverlay />
                </PersistGate>
            </Provider>
        );
    }
}

AppRegistry.registerComponent('EntertrainApp', () => App);