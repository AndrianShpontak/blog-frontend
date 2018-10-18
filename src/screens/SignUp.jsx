import React, {Component} from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

class SignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        pass: ''

    };

    onChangeFirstName = event => {
        this.setState({firstName: event.target.value})
    };
    onChangeLastName = event => {
        this.setState({LastName : event.target.value})
    };
    onChangeEmail = event => {
        this.setState({email: event.target.value})
    };
    onChangePass = event => {
        this.setState({pass : event.target.value})
    };


    render() {
        return (
            <div>
                <Input label='First Name' value={this.state.firstName} onChange={this.onChangeFirstName}/>
                <Input label = 'Last Name' value ={this.state.lastName} onChange={this.onChangeLastName}/>
                <Input label = 'Email' value = {this.state.email} onChange={this.onChangeEmail} />
                <Input label = 'Pass' value = {this.state.pass} onChange = {this.onChangePass}/>
                <Button buttonText = 'Sign up'/>
            </div>
        )
    }
}
export default SignUp;