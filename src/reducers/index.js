import {combineReducers} from 'redux'
import posts from '../components/Posts/reducer'
import auth from '../components/Auth/reducer'
import error from '../components/Toster/reducer'


export default combineReducers({
    posts,
    auth,
    error
})
