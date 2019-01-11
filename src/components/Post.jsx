import React from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroller from 'react-infinite-scroller';

import Button from "./Button";
import {createComment, deleteComment, deletePost, getPostWithComments} from "../services/posts";
import Input from "./Input";
import postsService from "../services/posts";
import {connect} from "react-redux";
import LikeDislike from './LikeDislike';
import {toast} from "react-toastify";

class Post extends React.Component {
    state = {
        isCommentsOpen: false,
        comments: [],
        commentText: '',
        hasMore: true
    };

    onKeyUp = event => {
        if (event.keyCode === 13) {
            this.addComment();
        }
    };

    loadComments = () => {
        return getPostWithComments({postId: this.props.id})
            .then(res => {
                this.setState({
                    comments: res.data.data ? res.data.data.comments : [],
                    isCommentsOpen: true,
                    hasMore: res.data.data.comments.length >= 5
                })
            })
    };

    toggleComments = () => {
        if (!this.state.isCommentsOpen) {
            return this.loadComments();
        }

        this.setState({
            isCommentsOpen: false,
            comments:[]
        })
    };

    addComment = () => {
        createComment(this.props.id, this.state.commentText)
            .then(() => {
                this.loadComments();
                this.setState({ commentText: '' })
            })
    };

    onChangeCommentText = (event) => {
        const value = event.target.value;

        this.setState({commentText: value})

    };

    clickDeletePost = () => {
        deletePost(this.props.id)
            .then(() => this.props.getAllPosts());
        toast.error('you do not have access to this action');
    };

    clickDeleteComment = (id) => {
        deleteComment(id )
            .then(() => postsService.getPostWithComments({ postId: this.props.id }))
            .then(res => {
                this.setState({
                    comments: res.data.data ? res.data.data.comments : [],
                });
            });
        toast.error('you do not have access to this action');
    };

    loadMore = (page) => {
        getPostWithComments({
            postId: this.props.id,
            page: page,
            perPage: 5
        })
            .then(post => {
                this.setState((prev) => ({
                    comments: [...prev.comments, ...post.data.data.comments],
                    hasMore: post.data.data.comments.length === 5
                }));
            });

    };

    toggleLike = () => {
        postsService.toggleLike(this.props.id);
    };

    render() {
        const {
            loadMore,
            toggleLike,
            props: {
                postAuthor: pa,
                title,
                body,
                description,
                date,
                likeDislike,
                showAddComments
            },
            state: {
                hasMore
            }
        } = this;

        return (
            <div className="UserProfile">
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

                <br/>
                <div className="author-info">
                    <LikeDislike likes={likeDislike} onLike={toggleLike} />
                    {
                        pa
                            ? <Link to={`/users/${pa._id}`} >
                                <span>by {`${pa.firstName} ${pa.lastName}`} at {date.substr(0, 10)}</span>
                              </Link>
                            : null
                    }
                </div>

                <br/>
                <br/>
                <Button buttonText="show comments" className="btn btn-info btn-lg btn-block btn-sm" onButtonClick={this.toggleComments}/>
                {
                    this.state.isCommentsOpen && (
                        <div style={{ height: 300, overflow: 'auto' }}>
                            <InfiniteScroller
                                pageStart={0}
                                hasMore={hasMore}
                                loadMore={loadMore}
                                loader={<div key="loader">loading...</div>}
                                threshold={50}
                                useWindow={false}
                            >
                                {
                                    this.state.comments.length ? this.state.comments.map(comment => (
                                        <div key={comment._id} style={{ height: 50 }}>
                                            <span>{`${comment.author.firstName} ${comment.author.lastName}:`}</span>
                                            <br/>
                                            <div className="delete-comment">
                                              <span>{comment.text}</span>
                                              <span className="btn-delete" onClick={() => this.clickDeleteComment(comment._id)} >X</span>
                                            </div>
                                        </div>
                                    )) : <span>no comments yet:(</span>
                                }
                            </InfiniteScroller>
                        </div>
                    )
                }

                { showAddComments }
                    <div className="add-comment">
                        <Input
                            value={this.state.commentText}
                            onChange={this.onChangeCommentText}
                            onKeyUp={this.onKeyUp}
                         />
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
