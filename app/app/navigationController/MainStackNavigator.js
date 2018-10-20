import { StackNavigator }  from 'react-navigation';
import DefaultScreen       from '../screens/DefaultScreen';

export default MainStackNavigator = StackNavigator(
    {
        DefaultScreen: { screen: DefaultScreen },
    }, {
        headerMode: 'none'
    }
);