import {combineReducers} from 'redux';
import auth from './auth';
import posts from './posts';
import messages from './message';


export default combineReducers({
    auth: auth,
    posts: posts,
    messages: messages
})
