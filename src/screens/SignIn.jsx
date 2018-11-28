import React, {Component} from 'react';
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
            <form>
                <div className='form-group'>
                    <label htmlFor="exampleInputEmail1">Email address</label>
                      <input type="email"
                             className="form-control"
                             id="exampleInputEmail1"
                             aria-describedby="emailHelp"
                             placeholder="Enter email"
                             value={this.state.email}
                             onChange={this.onEmailChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>

                       <input type="password"
                              className={"form-control"}
                              id="exampleInputPassword1"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={this.onPasswordChange}
                        />
                </div>
                <Button type="submit" class="btn btn-primary" buttonText='Sign In' onButtonClick={this.onButtonClick}/>
                <br/>
                <Button buttonText='Forgot password' onButtonClick={() => this.onForgotPasswordClick(true)}/>
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