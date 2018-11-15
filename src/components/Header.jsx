import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import authService from "../services/auth";



const Header = function (props) {
    const user = props.user;
    return (
        <nav className="header">
            <Link to="/">Home</Link>
            {
                user ? (
                    <div>
                        {user.firstName + ' ' + user.lastName}
                        <br/>
                        <button className='logout' onClick={props.logOut}>LogOut</button>
                    </div>

                ) : (
                    <ul>
                        <li>
                            <Link to="/signIn">Sign In</Link>
                        </li>
                        <li>
                            <Link to='/signUp'>Sign Up </Link>
                        </li>


                    </ul>
                )
            }

        </nav>
    )
};

const mapDispatchToProps =function (dispatch) {
    return{
        logOut:function () {
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

