import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';




const Header = function (props) {
    const user = props.user;
    return (
        <nav className="header">
            <Link to="/">Home</Link>
            {
                user ? (
                    <div>
                        {user.firstName + ' ' + user.lastName}
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

const mapState = function (store) {
    return {
        user: store.auth.user
    }
};

export default connect(mapState)(Header);

