import React from 'react';
import { connect } from 'react-redux';

class Likes extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            likes: props.likes,
            isUserLiked: props.likes.some(like => like.userId === props.user._id)
        };

    }

    updateLikes = () => {
        this.setState(prevState => {
            this.props.onLike();

            if (prevState.isUserLiked)  {
               return {
                   likes: prevState.likes.filter(like => like.userId !== this.props.user._id),
                   isUserLiked: false
               };
            } else {
               return {
                   likes: [...prevState.likes, { userId: this.props.user._id }],
                   isUserLiked: true
               }
            }
        });
    };

    render(){
        return(
            <div>
                <button onClick={this.updateLikes}>Like</button>
                <p>{this.state.likes.length} people like it</p>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
      user: store.auth.user
    };
};

export default connect(mapStateToProps)(Likes);