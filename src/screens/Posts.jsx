import React from 'react';
import postsService from '../services/posts';
import {connect} from 'react-redux';
import Post from "../components/Post";
import AddPost from "../components/AddPost";

class Posts extends React.Component {
    componentDidMount() {
        this.props.getAllPosts();
    }


    render() {
        return (
            <div>
                <AddPost/>
                <div>
                    {
                        this.props.posts.map(post => (
                            <Post
                                key={post._id}
                                id={post._id}
                                title={ post.title}
                                body={post.body}
                                description = {post.description}
                                date={post.date}
                                postAuthor={post.postAuthor}
                                likeDislikes={post.likeDislikes}
                            />
                        ))
                    }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        getAllPosts: function () {
            return dispatch(postsService.getAllPosts());
        }

    }
};
const mapState = function (store) {
    return {
        posts: store.posts.posts
    }
};

export default connect(mapState, mapDispatchToProps)(Posts);