import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Button from '../components/Button';
import Input from '../components/Input';
import {editUser} from '../services/users'
import { toast } from 'react-toastify'

class EditUserProfile extends Component {
    state = {
        email: this.props.currentUser.email,
        firstName: this.props.currentUser.firstName,
        lastName: this.props.currentUser.lastName,

        error: null
    };

    editUser = () => {
        const {
            props: {
                currentUser,
                editUser
            },
            state: {
                firstName, lastName
            }
        } = this;

        editUser(currentUser._id,{
            firstName,
            lastName,
            currentUser
        })
            .then(() => {
                toast.success('User information is updated');
            })

    };

    onInputChange = (key) => e => {
        this.setState({
            [key]: e.target.value
        });
    };

    render() {
        const {
            firstName,
            lastName,
            error
        } = this.state;

        return (
            <div>
                <label htmlFor="inputFirstName">First Name</label>
                <Input
                    label="First Name"
                    value={firstName}
                    onChange={this.onInputChange('firstName')}
                />

                <label htmlFor="inputLastName">Last Name</label>
                <Input value={lastName}
                       onChange={this.onInputChange('lastName')}
                />

                {
                    error && (
                        <p>{error}</p>
                    )
                }
                <Button buttonText="Save changes" onClick={this.editUser}/>
            </div>);
    }
}

function mapStoreToProps(store) {
    return {
        currentUser: store.auth.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        editUser
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(EditUserProfile);
