import { combineReducers } from 'redux';
import Loading             from './loading';
import Video               from './video';
import Navigation          from './navigation';
import User                from './user';

const AppReducer = combineReducers({
    Loading,
    Video,
    Navigation,
    User,
});

export default AppReducer;
