import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunkMiddleware from 'redux-thunk'
//import loggerMiddleware from 'redux-logger'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from "redux";
import idpApp from './reducers';
import { fetchIdps, fetchVersion } from './actions';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap3/dist/css/bootstrap.css';
import './index.css';

let store = createStore(
    idpApp,
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
//        loggerMiddleware // neat middleware that logs actions
    )
);

store.dispatch(fetchIdps())
store.dispatch(fetchVersion())

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
