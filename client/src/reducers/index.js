import {combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import transferReducer from './transferReducer';


export default combineReducers ({
    auth : authReducer,
    errors : errorReducer,
    profile : profileReducer,
    transfer : transferReducer
});