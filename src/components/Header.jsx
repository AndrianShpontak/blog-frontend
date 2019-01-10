import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import authService from "../services/auth";

class Header extends React.Component {
    state = {
        isUsersShow: false
    };

    render() {
        const user = this.props.user;

        return (
            <nav className="header-container">
                <div className="logo">
                    <img src="../../Blog-Become-a-Book-Banner.jpg" responsive="true" alt='' />
                </div>
                {
                    user ? (
                        <ul className="nav header">
                            <div className="nav-container">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/users">Users</Link>
                                </li>
                            </div>
                            <div className="nav-container">
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger" onClick={this.props.logOut}>LogOut
                                    </button>
                                </li>
                                <a href={`/users/${user._id}`}>
                                    {user.firstName + ' ' + user.lastName}
                                </a>
                            </div>
                        </ul>
                    ) : (
                        <div>
                            <Link to="/signIn">Sign In</Link>
                            <Link to="/signUp">Sign Up</Link>
                        </div>
                    )
                }
            </nav>
        );
    }
}


const mapDispatchToProps = function (dispatch) {
    return {
        logOut: function () {
            return dispatch(authService.logOut())
        }
    }
};


const mapState = function (store) {
    return {
        user: store.auth.user
    }
};

export default connect(mapState, mapDispatchToProps)(Header);

