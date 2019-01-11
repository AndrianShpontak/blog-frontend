import React, {Component} from 'react';
import Button from '../components/Button';
import authService from "../services/auth";
import connect from "react-redux/es/connect/connect";
import { NavLink } from 'react-router-dom'
import {toast} from "react-toastify";

class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        pass: ''
    };

    onChangeFirstName = event => {
        this.setState({firstName: event.target.value})
    };
    onChangeLastName = event => {
        this.setState({lastName: event.target.value})
    };
    onChangeEmail = event => {
        this.setState({email: event.target.value})
    };
    onChangePass = event => {
        this.setState({pass: event.target.value})
    };


    onButtonClick = () => {
        this.props.signUp({
            email: this.state.email,
            pass: this.state.pass,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
        })
            .then(() => this.props.history.push('/'))
            .catch((error) => {
                console.log(error);
                toast.error('You did not enter all data')
            })
    };


    render() {
        return (
            <form>
                <div className="form-row">
                    <div className="col">
                        <label htmlFor="inputFirstName">First Name</label>
                        <input type="text"
                               className="form-control"
                               placeholder="First Name"
                               value={this.state.firstName}
                               onChange={this.onChangeFirstName}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="inputLastName">Last Name</label>
                        <input type="text"
                               className="form-control"
                               placeholder="Last Name"
                               value={this.state.lastName}
                               onChange={this.onChangeLastName}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="col">
                        <label htmlFor="inputEmail4">Email</label>
                        <input type="email"
                               className="form-control"
                               id="inputEmail"
                               placeholder="Email"
                               value={this.state.email}
                               onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="col">
                        <label htmlFor="inputPassword4">Password</label>
                        <input type="password"
                               className="form-control"
                               id="inputPassword"
                               placeholder="Password"
                               value={this.state.pass}
                               onChange={this.onChangePass}
                        />
                    </div>
                </div>
                <br/>
                <br/>
                    <Button type="button" className="btn btn-primary" buttonText='Sign Up'
                            onButtonClick={this.onButtonClick}/>

                <NavLink to="/signIn">Already have account?</NavLink>

            </form>
        )
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        signUp: function (user) {
            return dispatch(authService.signUp(user));
        }

    }
};
export default connect(null, mapDispatchToProps)(SignUp);
