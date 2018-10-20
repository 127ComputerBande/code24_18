import { StackNavigator } from 'react-navigation';
import DefaultScreen      from '../screens/StartScreen';
import VideoSelectScreen  from '../screens/VideoSelectScreen';

export default MainStackNavigator = StackNavigator(
    {
        DefaultScreen:     { screen: DefaultScreen },
        VideoSelectScreen: { screen: VideoSelectScreen },
    }, {
        headerMode: 'none'
    }
);