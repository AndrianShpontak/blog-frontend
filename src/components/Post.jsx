import React from 'react';
import Button from "./Button";
import {createComment, getPostWithComments} from "../services/posts";
import Input from "./Input";

class Post extends React.Component {
    state = {
        isCommentsOpen: false,
        comments: [],
        commentText: ''
    };

    toggleComments = () => {
        if (!this.state.isCommentsOpen) {
            getPostWithComments(this.props.id)
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
            .then(() => getPostWithComments(this.props.id))
            .then(res => {
                this.setState({
                    comments: res.data.data.comments,
                    commentText: ''
                })
            })
    };

    onChangeCommentText = (event) =>{
        const value = event.target.value;

        this.setState({commentText: value})

    };

    render() {
        const {
            props: {
                postAuthor: {
                    firstName,
                    lastName,
                },
                title,
                body,
                description,
                date,
                likeDislikes
            }
        } = this;

        return (
            <div>
                <h2>
                    {title}
                </h2>
                <p>
                    {body}
                </p>
                <p>
                    {description}
                </p>
                <span>
                   {date.substr(0, 10)}
                </span>
                <br />

                <span>by {`${firstName} ${lastName}`}</span>
                <br/>
                <span>
                    {likeDislikes} people like it
                </span>
                <br/>
                <Button buttonText="show comments"  onButtonClick={this.toggleComments}/>
                {
                    this.state.isCommentsOpen && (
                        <div>
                            {
                                this.state.comments.length ? this.state.comments.map(comment => (
                                    <div key={comment._id}>
                                        <span>{`${comment.author.firstName} ${comment.author.lastName}:`}</span>
                                        <br />
                                        <span>{comment.text}</span>
                                    </div>
                                )) : <span>no comments yet:(</span>
                            }
                        </div>
                    )
                }
                <Input value={this.state.commentText} onChange={this.onChangeCommentText}/>
                <Button onButtonClick={this.addComment} buttonText='Add comment' disabled={!this.state.commentText}/>

            </div>

        )
    }
};
export default Post