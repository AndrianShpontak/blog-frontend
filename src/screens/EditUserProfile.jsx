import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Button from '../components/Button';
import Input from '../components/Input';
import {editUser} from '../services/users'

class EditUserProfile extends Component {
    state = {
        mail: this.props.currentUser.email,
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
                firstName, lastName, mail, pass, newPass, repeatNewPass
            }
        } = this;

        if (newPass === repeatNewPass){
        editUser(currentUser._id, {firstName, lastName, mail, pass, newPass});
    }
    };

    onInputChange = (key) => e => {
        this.setState({
            [key]: e.target.value
        });
    };

    render() {
        const {firstName,
            lastName,
            mail,
            pass,
            newPass,
            repeatNewPass} = this.state;

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
                <Input label="Email"
                       value={mail}
                       onChange={this.onInputChange('mail')}
                />

                <p>Change Password:</p>
                <Input label = "Password"
                       value=''
                       type="pass"
                       onChange={this.onInputChange('pass')}
                />
                <Input label = "New password"
                       value=''
                       type="password"
                       onChange={this.onInputChange('newPass')}
                />
                <Input label = "Repeat new password"
                       value=''
                       type="password"
                       onChange={this.onInputChange('repeatNewPass')}
                />

                {
                    error && (
                        <p>{error}</p>
                    )
                }
                <Button title="Save changes" onClick={() => this.editUser(firstName,lastName, mail, pass, newPass)}/>
                {newPass === repeatNewPass
                ? <Button title="Save changes"
                onClick={this.editUser(firstName,lastName, mail, pass, newPass)}/>
                : <span>Repeat new password</span>
                }
            </div>);
    }
}

function mapStoreToProps(store) {
    return {
        currentUser: store.users.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        editUser
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(EditUserProfile);
