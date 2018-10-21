import { StackNavigator } from 'react-navigation';
import StartScreen        from '../screens/StartScreen';
import VideoSelectScreen  from '../screens/VideoSelectScreen';
import IntroScreen        from '../screens/IntroScreen';

export default MainStackNavigator = StackNavigator(
    {
        IntroScreen:       { screen: IntroScreen },
        StartScreen:       { screen: StartScreen },
        VideoSelectScreen: { screen: VideoSelectScreen },
    }, {
        headerMode: 'none'
    }
);