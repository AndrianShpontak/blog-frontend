import React, {Component} from 'react';
import  {getUser} from '../services/users';
import postsService from '../services/posts';
import connect from "react-redux/es/connect/connect";


class UserProfile extends Component {
    state = {
        user: null,
        isSubscribed: false,
    };

    componentDidMount() {
        getUser(this.props.match.params.id)
            .then(data => {
                console.log(data);
                this.setState({
                    isSubscribed: data && data.subscribers.some(subscriber => subscriber._id === this.props.currentUser._id),
                    user: data
                });
             });
    }

    toggleSubscriber = (authorId) => {
        postsService.toggleSubscribe(authorId)
            .then(() => this.setState(prev => ({ isSubscribed: !prev.isSubscribed })));
    };

    render() {
        const {
            state: {
                user
            }
        } = this;

        if (!user) {
            return (<div>Hello</div>);
        }

        return (
            <div>
                <h1>{user.firstName} {user.lastName}</h1>

                <button onClick={this.toggleSubscriber}>
                    {
                        this.state.isSubscribed ? 'Unsubscribe' : 'Subscribe'
                    }
                </button>
            </div>
        );
    }
}

const mapState = function (store) {
    return {
        currentUser: store.auth.user
    }
};

export default connect(mapState)(UserProfile);

