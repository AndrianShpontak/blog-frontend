import React from 'react';
import SignUp from '../screens/SignUp'
import SignIn from '../screens/SignIn'

const RegisterCard = function (props) {
    const user = props.user;
    return (
        <div className="register-card">
            <div className="logo">
                <img src="../../Blog-Become-a-Book-Banner.jpg" responsive="true" alt='' />
            </div>
            {
                user ? (
                    <div>
                        {user.firstName + ' ' + user.lastName}
                        <br/>
                        <button className='logout' onClick={props.logOut}>LogOut</button>
                    </div>

                ) : (
                   <SignIn/>
                )

            }
           <div>
               <SignUp/>
           </div>
        </div>

    );

};


export default RegisterCard;
