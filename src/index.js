//IE 11 polyfill, must be loaded before react
import "core-js/stable";
//IE11 fetch polyfill
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from "redux";
import rootReducer from './reducers';
import {unregister} from './registerServiceWorker';
import './index.css';
import { log_debug, log_info } from './logging';

//import 'bootstrap/dist/css/bootstrap.min.css';
import 'clarin-bootstrap/clarin-bootstrap.css';

const DEBUG_DEFAULT_VALUE = false;
const REDIRECT_DEFAULT_VALUE = true;
const VERSION_DEFAULT_VALUE = "0.0.1-default";
const ENDPOINT_DEFAULT_VALUE = "/identity_providers_clarin.json";

/*
 * Initialize configuration, use values if they exist, otherwise initialize with defaults
 */
setDefaulConfigValueIfNotSet("debug", DEBUG_DEFAULT_VALUE)
setDefaulConfigValueIfNotSet("redirect", REDIRECT_DEFAULT_VALUE)
setDefaulConfigValueIfNotSet("version", VERSION_DEFAULT_VALUE)
setDefaulConfigValueIfNotSet("endpoint", ENDPOINT_DEFAULT_VALUE)

function setDefaulConfigValueIfNotSet(prop_name, prop_value) {
    if(!window.config) {
        log_debug("Initializing new config object.");
        window["config"] = {};
    }
    if(!window.config[prop_name]) {
        log_debug(prop_name+" not found, setting default value ("+prop_value+").");
        window.config[prop_name] = prop_value;
    }
}

//Override debug settings from config if custom value is supplied as query parameter
const searchParams = new URLSearchParams(window.location.search);
if(searchParams.has("debug")) {
    log_info("Overriding default debug value ("+window.config.debug+") = " + searchParams.get("debug") + " from query parameter.");
    window.config["debug"] = searchParams.get("debug") === "true";
}
if(searchParams.has("noredirect")) {
    log_info("Setting redirect value = " + (searchParams.get("noredirect") !== "true") + " from query parameter.");
    window.config["redirect"] = searchParams.get("noredirect") !== "true";
}

/*
 * Create redux store with reducers and all required middleware
 */
let store = null;
if (window.config.debug) {
    store = createStore(
        rootReducer,
        applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
            loggerMiddleware // neat middleware that logs actions
        )
    );
} else {
    store = createStore(
        rootReducer,
        applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
        )
    );
}

/*
 * Run applicaion
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

//registerServiceWorker();
unregister();