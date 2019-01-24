import React from 'react';
import queryString from 'query-string'
import  userService from '../services/users'

class Verification extends React.Component {
    state = {
        error: null
    };

    componentDidMount() {
       const body = queryString.parse(this.props.location.search);

       userService
           .verificationEmail(body)
           .then(() => this.props.history.push('/signIn'))
           .catch(error => this.setState({ error }));
    }


    render () {
        if (this.state.error) {
            return (
                <div>Something went wrong</div>
            )
        }

        return <div>Loading...</div>
    }
}
export default Verification
