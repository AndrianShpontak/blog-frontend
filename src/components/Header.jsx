import React from 'react';
import {Link} from 'react-router-dom';


const Header = function () {
    return (
        <nav className="header">
            <Link to="/">Home</Link>

            <ul>
                <li>
                    <Link to="/signIn">Sign In</Link>
                </li>
                <li>
                    <Link to='/signUp'>Sign Up </Link>
                </li>
            </ul>
        </nav>
    )
};

export default Header;