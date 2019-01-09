import React, {Component} from 'react';
import './App.css';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ForgotPassword from './screens/ForgotPassword';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Posts from "./screens/Posts";
import Header from './components/Header';
import authService from './services/auth';
import UserProfile from "./screens/UserProfile";
import GetAllUsers from "./screens/GetAllUsers";

import {withRouter} from 'react-router-dom'


class App extends Component {
    state = {
        isLoading: true
    };

    componentDidMount() {
        this.props
            .getCurrentUser()
            .then(() => {
                this.setState({ isLoading: false }, () => {
                    if (!this.props.user) {
                        this.props.history.push('/signIn');
                    }
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({ isLoading: false });
            });
    }


    render() {
        const {
            user
        } = this.props;

        return this.state.isLoading ? <div>loading...</div> : (
                <div className="app">
                    <Header />
                    <div className="content">
                        <Switch>
                            <Route path='/signIn' component={SignIn} />
                            <Route path='/signUp' component={SignUp} />
                            <Route path='/forgotPass' component={ForgotPassword} />
                            { user && <Route path='/' component={Posts} exact /> }
                            { user && <Route path='/users/' component={GetAllUsers} exact /> }
                            { user && <Route path='/users/:id' component={UserProfile} /> }
                        </Switch>
                    </div>
                </div>
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
