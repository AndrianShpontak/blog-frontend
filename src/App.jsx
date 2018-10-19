import React, {Component} from 'react';
import {Provider} from 'react-redux';
import './App.css';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/ForgotPassword';
import {Router, Switch, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Posts from "./screens/Posts";
import Header from './components/Header';
import store from './store';


const history = createBrowserHistory();


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <div className="app">
                        <Header/>
                        <div className="content">
                            <Switch>
                                <Route path='/' component={Posts} exact/>
                                <Route path='/signIn' component={SignIn}/>
                                <Route path='/signUp' component={SignUp}/>
                                <Route path='/forgotPass' component={ForgotPassword}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
