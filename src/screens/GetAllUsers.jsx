import React from 'react';
import usersService from "../services/users";

class GetAllUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: []
        }

    }

    componentDidMount() {
        usersService
            .getAllUsers()
            .then(res => this.setState({isLoading: false, data: res.data.data}));
    }


    render() {
        if (this.state.isLoading) {
            return <p>Loading...</p>
        }

        return (
            <div className='list-group-item'>
                <ul className="list-group">
                    {
                        this.state.data.map((user) => (
                                <li className="list-group-item" key={user._id}>
                                    <a href={`/users/${user._id}`}>
                                        {user.firstName + ' ' + user.lastName}
                                    </a>
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
        )
    }
}


export default GetAllUsers;