import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";
const history = createBrowserHistory();


ReactDOM.render((
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>
), document.getElementById('root'));
