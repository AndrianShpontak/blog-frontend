import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import authService from "../services/auth";
import RegisterCard from "./RegisterCard";

class Header extends React.Component {
    state = {
        isUsersShow: false
    };

    render() {
        const user = this.props.user;

        return (
            <nav className="header-container">
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
                                    <button className="btn btn-outline-danger" onClick={this.props.logOut}>LogOut</button>
                                </li>
                                <span>{user.firstName + ' ' + user.lastName}</span>
                            </div>

                        </ul>
                    ) : (
                        <RegisterCard user={user}/>
                    )}

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

