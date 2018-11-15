import React, {Component} from 'react';
import './App.css';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/ForgotPassword';
import {Router, Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import {createBrowserHistory} from 'history';
import Posts from "./screens/Posts";
import Header from './components/Header';
import authService from './services/auth';

const history = createBrowserHistory();


class App extends Component {
    componentDidMount() {
        this.props.getCurrentUser();
    }


    render() {
        return (
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
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getCurrentUser: () => dispatch(authService.getCurrentUser())
});

export default connect(null, mapDispatchToProps)(App);
