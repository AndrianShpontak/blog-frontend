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
        pass: '',
        newPass:'',
        repeatNewPass:'',
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
                firstName, lastName, pass, newPass, repeatNewPass
            }
        } = this;

        if (newPass === repeatNewPass){
            return editUser(currentUser._id, {
                firstName,
                lastName,
                pass: pass || currentUser.pass,
                newPass
            })
                .then(() => {
                    toast.success('User information is updated');
                    this.setState({ pass: '', newPass: '', repeatNewPass: ''})
                })
        }
        return toast.error('pass and repeat pass do not match')
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
            pass,
            newPass,
            repeatNewPass,
            error
        } = this.state;

        return (
            <div>
                <Input
                    label="First Name"
                    value={firstName}
                    onChange={this.onInputChange('firstName')}
                />

                <Input label="Last Name"
                       value={lastName}
                       onChange={this.onInputChange('lastName')}
                />

                <p>Change Password:</p>
                <Input label = "Password"
                       value = {pass}
                       type="password"
                       onChange={this.onInputChange('pass')}
                />
                <Input label = "New password"
                       value = {newPass}
                       type="password"
                       onChange={this.onInputChange('newPass')}
                />
                <Input label = "Repeat new password"
                       value = {repeatNewPass}
                       type="password"
                       onChange={this.onInputChange('repeatNewPass')}
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
