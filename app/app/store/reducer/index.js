import { combineReducers } from 'redux';
import Loading             from './loading';
import Navigation          from './navigation';
import User                from './user';

const AppReducer = combineReducers({
    Loading,
    Navigation,
    User,
});

export default AppReducer;
