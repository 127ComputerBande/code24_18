import { combineReducers } from 'redux';
import Loading             from './loading';
import Video               from './video';
import Navigation          from './navigation';
import NFC                 from './nfc';

const AppReducer = combineReducers({
    Loading,
    Video,
    Navigation,
    NFC
});

export default AppReducer;
