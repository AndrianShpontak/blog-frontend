import React from 'react';
import usersService from '../services/users';
import {connect} from 'react-redux';
import Post from "../components/Post";

class UserInform extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                {
                    this.props.users.map(user => (
                        <User
                            id={user._id}
                            body={user.body}
                            firstName={user.firstName}
                            lastName={user.lastName}
                            subscription={user.subscription}
                        />
                    ))
                }
            </div>

        );
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        updateUserInformation: function (params) {
            return dispatch(usersService.updateUserInformation(params))
        }

    }
};
const mapState = function (store) {
    return {
        user: store.auth.user
    }
};

export default connect(mapState, mapDispatchToProps)(UserInform);
