import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import throttle from 'lodash.throttle';
import logger from 'redux-logger';

import { loadState, saveState } from './tools.react';
import RedactorReducer from "./redactor";
import AuthReducer from './auth';


const reducers = combineReducers({ auth: AuthReducer, redactor: RedactorReducer });
const persistedState = loadState();


const store = createStore(
    reducers,
    persistedState,
    process.env.NODE_ENV === 'production'
        ? applyMiddleware(thunkMiddleware, /*axiosMiddleware(client),*/ )
        : composeWithDevTools(applyMiddleware(thunkMiddleware, /*axiosMiddleware(client),*/ logger))
);


store.subscribe(
    throttle(() => {
        saveState({
            auth: store.getState().auth
        });
    }, 1000)
);

export default store;