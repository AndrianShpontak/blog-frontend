import React, {Component} from 'react';
import './App.css';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/ForgotPassword';
import {Router, Switch, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {Provider} from 'react-redux';
import store from './store';
import Posts from "./screens/Posts";

const history = createBrowserHistory();


class App extends Component {
    render() {
        return (
            <Provider store={store}>
            <Router history={history}>
                <div className="App">
                    <Switch>
                        <Route path = '/' component = {Posts}/>
                        <Route path = '/signIn' component = {SignIn}/>
                        <Route path = '/signUp' component = {SignUp}/>
                        <Route path = '/forgotPass' component = {ForgotPassword}/>
                    </Switch>
                </div>
            </Router>
            </Provider>
        );
    }
}

export default App;
