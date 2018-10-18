import React, {Component} from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

class ForgotPassword extends Component {
    state = {
        email: ''
    };

    onEmailChange = event => {
        const value = event.target.value;

        this.setState ({email: value})
    };
    render() {
        return (
            <div>
                <Input label='Email' value={this.state.email} onChange={this.onEmailChange}/>
                <Button buttonText = 'Forgot password'/>
            </div>
        )
}
}
export default ForgotPassword;
