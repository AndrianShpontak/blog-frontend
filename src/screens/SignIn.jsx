import React, {Component} from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import authService from '../services/auth';
import {connect} from 'react-redux';
import  ForgotPassword from './ForgotPassword'

class SignIn extends Component {
    state = {
        email: '',
        password: '',
        forgotClick: false
    };

    onButtonClick = () => {
        this.props.signIn({email: this.state.email, pass: this.state.password})
            .then(() => this.props.history.push('/'))
            .catch((error) => {
                console.log(error)
            })

    };

    onEmailChange = event => {
        const value = event.target.value;

        this.setState({email: value})
    };

    onPasswordChange = event => {
        const value = event.target.value;

        this.setState({password: value})
    };

    onForgotPasswordClick = (value) => {
           this.setState({forgotClick: value})
    };

    render() {
        const {forgotClick} = this.state;
        return forgotClick ? (<ForgotPassword onForgotClick={()=>this.onForgotPasswordClick(false)}/>) : (
            <div>
                <Input label='Email' value={this.state.email} onChange={this.onEmailChange}/>
                <Input
                    label='Password'
                    type='password'
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                />
                <Button buttonText='Sign In' onButtonClick={this.onButtonClick}/>
                <br/>
                <Button buttonText='Forgot password' onButtonClick={() => this.onForgotPasswordClick(true)}/>
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