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
import UserProfile from "./screens/UserProfile";

import {withRouter} from 'react-router-dom'


const history = createBrowserHistory();


class App extends Component {
    componentDidMount() {
        this.props.getCurrentUser();
    }


    render() {
        const {
            user
        }=this.props;

        return (
            <Router history={history}>
                <div className="app">
                    <Header/>
                    {user && user._id &&
                    <div className="content">
                        <Switch>
                            <Route path='/' component={Posts} exact/>
                            <Route path='/signIn' component={SignIn}/>
                            <Route path='/signUp' component={SignUp}/>
                            <Route path='/forgotPass' component={ForgotPassword}/>
                            <Route path='/users/:id' component={UserProfile}/>

                            {/*// route path = '/users/:id' component UserProfile
                            // in UserProfile this.props.match.params.id*/}
                        </Switch>
                    </div>
                    }
                </div>
            </Router>
        );
    }
}const mapState = function (store) {
    return {
        user: store.auth.user
    }
};



const mapDispatchToProps = dispatch => ({
    getCurrentUser: () => dispatch(authService.getCurrentUser())
});

export default withRouter(connect(mapState, mapDispatchToProps)(App));
