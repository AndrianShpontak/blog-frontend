import React from 'react';
import postsService from '../services/posts';
import {connect} from 'react-redux';
import Post from "../components/Post";
import Pag from "../components/Pagination";
import AddPost from "../components/AddPost";

class Posts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0
        };
    }
    componentDidMount() {
        this.props.getAllPosts({page:0, countPerPage:10});
    }

    changeContent = (page) => {
        console.log(page);
        this.props.getAllPosts({page, countPerPage:10});

        this.setState({
            page
        });

    };


    render() {
        const user = this.props.user;

        return (
            <div>
                {
                    user ? <AddPost/> : null
                }

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
                <Pag
                    page={this.state.page}
                    total={this.props.total}
                    changeContent={this.changeContent}
                />
            </div>
        );
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        getAllPosts: function (params) {
            return dispatch(postsService.getAllPosts(params))
        }

    }
};
const mapState = function (store) {
    return {
        posts: store.posts.posts,
        total: store.posts.total,
        user: store.auth.user
    }
};

export default connect(mapState, mapDispatchToProps)(Posts);