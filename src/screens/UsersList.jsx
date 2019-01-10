import React from 'react';
import usersService from "../services/users";
import {deleteUser} from "../services/users";
import {connect} from 'react-redux'


class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: []
        }

    }

    componentDidMount() {
        this.loadUsers();
    }

    loadUsers = () => {
        usersService
            .getAllUsers()
            .then(res => this.setState({
                isLoading: false,
                data: res.data.data.sort((a, b) => a.role - b.role)
            }));
    };

    clickDeleteUser = (id) => {
        deleteUser(id)
            .then(() => this.loadUsers());
    };

    render() {
        const {
            props: {
                user
            }
        } = this;

        if (this.state.isLoading) {
            return <p>Loading...</p>
        }

        const canDeleteUser = user.role === '1' || user.role === '2';

        return (
            <div className='list-group-item'>
                <ul className="list-group">
                    {
                        this.state.data.map((user) => (
                                <li className="list-group-item" key={user._id}>
                                    <a href={`/users/${user._id}`}>
                                        {user.firstName + ' ' + user.lastName}
                                    </a>
                                    {
                                        canDeleteUser && (
                                            <span className="btn-delete"
                                                  onClick={() => this.clickDeleteUser(user._id)}>X</span>
                                        )
                                    }
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
        )
    }
}

const mapState = function (store) {
    return {
        user: store.auth.user
    }
};

export default connect(mapState)(UsersList);
