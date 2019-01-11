import React, {Component} from 'react';
import { toast } from 'react-toastify';

import Button from '../components/Button';
import authService from '../services/auth';
import {connect} from 'react-redux';
import  ForgotPassword from './ForgotPassword';
import { NavLink } from 'react-router-dom'


class SignIn extends Component {
    state = {
        email: '',
        password: '',
        forgotClick: false
    };

    onButtonClick = () => {
        this.props.signIn({email: this.state.email, pass: this.state.password})
            .then(() => {
                toast.success('Sign In  is success');
                this.props.history.push('/')
            })
            .catch((error) => {
                console.log(error);
                toast.error('Email or password is incorrect')
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
            <form>
                <div className='form-group'>
                    <label htmlFor="InputEmail">Email address</label>
                      <input type="email"
                             className="form-control"
                             id="exampleInputEmail1"
                             aria-describedby="emailHelp"
                             placeholder="Enter email"
                             value={this.state.email}
                             onChange={this.onEmailChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="InputPassword">Password</label>

                       <input type="password"
                              className={"form-control"}
                              id="exampleInputPassword1"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={this.onPasswordChange}
                        />
                </div>
                <Button type="button" className="btn btn-primary" buttonText='Sign In' onButtonClick={this.onButtonClick}/>

                <Button type="button" className="btn btn-danger" buttonText='Forgot password' onButtonClick={() => this.onForgotPasswordClick(true)}/>
                <NavLink to="/signUp">Don't have account?</NavLink>

            </form>
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
