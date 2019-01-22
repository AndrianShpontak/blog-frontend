import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Button from '../components/Button';
import Input from '../components/Input';
import {changePassword} from '../services/users'
import { toast } from 'react-toastify'

class ChangeUserPassword extends Component {
    state = {
        newPass:'',
        repeatNewPass:'',

        error: null
    };

    changePassword = () => {
        const {
            props: {
                currentUser,
                changePassword
            },
            state: {
               newPass, repeatNewPass
            }
        } = this;

        if (newPass === repeatNewPass){
            return changePassword(currentUser._id, {
                newPass
            })
                .then(() => {
                    toast.success('User password is updated');
                    this.setState({ newPass: '', repeatNewPass: ''})
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
            newPass,
            repeatNewPass,
            error
        } = this.state;

        return (
            <div>
                <p>Change Password:</p>

                <label htmlFor="inputPassword">New password</label>
                <Input value = {newPass}
                       type="password"
                       onChange={this.onInputChange('newPass')}
                />

                <label htmlFor="inputPassword">Repeat new password</label>
                <Input value = {repeatNewPass}
                       type="password"
                       onChange={this.onInputChange('repeatNewPass')}
                />

                {
                    error && (
                        <p>{error}</p>
                    )
                }
                <Button buttonText="Save changes" onClick={this.changePassword}/>
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
        changePassword
    }, dispatch)
}

export default connect(mapStoreToProps, mapDispatchToProps)(ChangeUserPassword);
