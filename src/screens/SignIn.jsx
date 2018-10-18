import React, {Component} from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import authService from '../services/auth';
import {connect} from 'react-redux';

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    };

    onButtonClick = () => {
        this.props.signIn({email: this.state.email, pass: this.state.password})
    };

    onEmailChange = event => {
        const value = event.target.value;

        this.setState({email: value})
    };

    onPasswordChange = event => {
        const value = event.target.value;

        this.setState({password: value})
    };

    render() {
        return (
            <div>
                <Input label='Email' value={this.state.email} onChange={this.onEmailChange}/>
                <Input
                    label='Password'
                    type='password'
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                />
                <Button buttonText='Sign In' onButtonClick={this.onButtonClick}/>

            </div>
        )
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        signIn: function (user) {
            return dispatch(authService.signIn(user));
        }

    }
};

export default connect(null, mapDispatchToProps)(SignIn);