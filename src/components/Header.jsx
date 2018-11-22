import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import authService from "../services/auth";
import RegisterCard from "./RegisterCard";

const Header = function (props) {
    const user = props.user;
    return (
        <nav className="header">
            {
                user ? (
                    <div>
                        <Link to="/">Home</Link>

                        {user.firstName + ' ' + user.lastName}
                        <br/>
                        <button className='logout' onClick={props.logOut}>LogOut</button>
                    </div>

                ) : (
                   <RegisterCard user={user}/>
                )}

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

