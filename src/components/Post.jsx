import React from 'react';
import InfiniteScroller from 'react-infinite-scroller';

import Button from "./Button";
import {createComment, deletePost, getPostWithComments} from "../services/posts";
import Input from "./Input";
import postsService from "../services/posts";
import {connect} from "react-redux";

class Post extends React.Component {
    state = {
        isCommentsOpen: false,
        comments: [],
        commentText: '',
        hasMore: true
    };

    toggleComments = () => {
        if (!this.state.isCommentsOpen) {
            getPostWithComments({postId: this.props.id})
                .then(res => {
                    this.setState({
                        comments: res.data.data ? res.data.data.comments : [],
                        isCommentsOpen: true
                    })
                })
        }
        this.setState({
            isCommentsOpen: false
        })
    };

    addComment = () => {
        createComment(this.props.id, this.state.commentText)
            .then(() => getPostWithComments({ postId: this.props.id }))
            .then(res => {
                this.setState({
                    comments: res.data.data.comments,
                    commentText: ''
                })
            })
    };

    onChangeCommentText = (event) => {
        const value = event.target.value;

        this.setState({commentText: value})

    };

    clickDeletePost = () => {
        deletePost(this.props.id)
            .then(() => this.props.getAllPosts())
    };

    loadMore = (page) => {
        getPostWithComments({
            postId: this.props.id,
            page: page,
            perPage: 3
        })
            .then(post => {
                console.log(post)
                this.setState((prev) => ({
                    comments: [...prev.comments, ...post.data.data.comments],
                    hasMore: post.data.data.comments.length === 3
                }));
            });
    };

    render() {
        const {
            loadMore,
            props: {
                postAuthor: {
                    firstName,
                    lastName
                },
                title,
                body,
                description,
                date,
                likeDislikes
            },
            state: {
                hasMore
            }
        } = this;

        return (
            <div className="post">
                <h2 className="title">
                    {title}
                    <span className="btn-delete" onClick={this.clickDeletePost}>X</span>
                </h2>
                <p>
                    {body}
                </p>
                <p>
                    {description}
                </p>
                <br/>

                <div className="author-info">
                    <span>
                        {likeDislikes} people like it
                    </span>
                    <span>by {`${firstName} ${lastName}`} at {date.substr(0, 10)}</span>
                </div>

                <br/>
                <Button buttonText="show comments" onButtonClick={this.toggleComments}/>
                {
                    this.state.isCommentsOpen && (
                        <div style={{ height: 100, overflow: 'auto' }}>
                            <InfiniteScroller
                                pageStart={0}
                                hasMore={hasMore}
                                loadMore={loadMore}
                                loader={<div key="loader">loading...</div>}
                            >
                                {
                                    this.state.comments.length ? this.state.comments.map(comment => (
                                        <div key={comment._id}>
                                            <span>{`${comment.author.firstName} ${comment.author.lastName}:`}</span>
                                            <br/>
                                            <span>{comment.text}</span>
                                        </div>
                                    )) : <span>no comments yet:(</span>
                                }
                            </InfiniteScroller>
                        </div>
                    )
                }

                <div className="add-comment">
                    <Input value={this.state.commentText} onChange={this.onChangeCommentText}/>
                    <Button onButtonClick={this.addComment} buttonText='Add comment'
                            disabled={!this.state.commentText}/>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = function (dispatch) {
    return {
        getAllPosts: function (params) {
            return dispatch(postsService.getAllPosts(params));
        }

    }
};


export default connect(null, mapDispatchToProps)(Post);
