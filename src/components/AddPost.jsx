import React from 'react';
import Button from "./Button";
import Input from "./Input";
import postsService from "../services/posts";
import {connect} from "react-redux";

class AddPost extends React.Component {
    state = {
        title: '',
        body: '',
        description: ''
    };


    onChangeTitle = (event) => {
        const value = event.target.value;

        this.setState({title: value})

    };

    onChangeBody = (event) => {
        const value = event.target.value;

        this.setState({body: value})

    };

    onChangeDescription = (event) => {
        const value = event.target.value;

        this.setState({description: value})

    };

    addPost = () => {
        postsService.createPost(this.state.title, this.state.body, this.state.description)
            .then(() => this.props.getAllPosts())
            .then(() => {
                this.setState({
                    title: '',
                    body: '',
                    description: ''
                })
            })
    };

    render() {
        return (
            <div className="add-post">
                <Input label='Post Title'
                       placeholder="Post Title"
                       value={this.state.title}
                       onChange={this.onChangeTitle}/>
                <Input label='Post body'
                       placeholder="Post body"
                       value={this.state.body}
                       onChange={this.onChangeBody}/>
                <Input label='Post description'
                       placeholder="Post description"
                       value={this.state.description}
                       onChange={this.onChangeDescription}/>

                <Button onButtonClick={this.addPost} buttonText='Add Post'
                        disabled={!this.state.title && !this.state.body && !this.state.description}/>
            </div>
        )
    }
};

const mapDispatchToProps = function (dispatch) {
    return {
        getAllPosts: function (params) {
            return dispatch(postsService.getAllPosts(params));
        }

    }
};


export default connect(null,mapDispatchToProps)(AddPost);
