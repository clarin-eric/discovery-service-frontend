import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from "redux";
import idpApp from './reducers';
import { fetchIdps } from './actions';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { log_info } from './logging';

const DEBUG_DEFAULT_VALUE = false;
const VERSION_DEFAULT_VALUE = "0.0.1-default";
const ENDPOINT_DEFAULT_VALUE = "/identity_providers.json";

/*
 * Initialize configuration, use values if they exist, otherwise initialize with defaults
 */
setDefaulConfigValueIfNotSet("debug", DEBUG_DEFAULT_VALUE)
setDefaulConfigValueIfNotSet("version", VERSION_DEFAULT_VALUE)
setDefaulConfigValueIfNotSet("endpoint", ENDPOINT_DEFAULT_VALUE)

function setDefaulConfigValueIfNotSet(prop_name, prop_value) {
    if(!window.config) {
        log_info("Initializing new config object.");
        window["config"] = {};
    }
    if(!window.config[prop_name]) {
        log_info(prop_name+" not found, setting default value ("+prop_value+").");
        window.config[prop_name] = prop_value;
    }
}

/*
 * Create redux store with reducers and all required middleware
 */
let store = null;
if (window.config.debug) {
    store = createStore(
        idpApp,
        applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
            loggerMiddleware // neat middleware that logs actions
        )
    );
} else {
    store = createStore(
        idpApp,
        applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
        )
    );
}

/*
 * Fetch initial data
 */
store.dispatch(fetchIdps())

/*
 * Run applicaion
 */
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();