import React, {Component} from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import authService from '../services/auth';
import {connect} from 'react-redux';
import {toast} from "react-toastify";

class ForgotPassword extends Component {
    state = {
        email: ''
    };

    onButtonClick = () =>{
        this.props.onForgotClick();
        this.props.forgotPassword(this.state.email);
        toast.success('email sent');

    };

    onEmailChange = event => {
        const value = event.target.value;

        this.setState ({email: value})
    };
    render() {
        return (
            <div>
                <Input label='Email' value={this.state.email} onChange={this.onEmailChange}/>
                <Button  buttonText='Forgot password' onButtonClick={this.onButtonClick} />
            </div>
        )
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        forgotPassword: function (email) {
            return dispatch(authService.forgotPassword(email));
        }

    }
};

export default connect(null, mapDispatchToProps)(ForgotPassword);
