import React, {Component} from 'react';
import {Link} from 'react-router-dom'

import usersService from '../services/users';
import postsService from '../services/posts';
import messagesService from '../services/messages';
import Chat from '../components/Chat'
import connect from "react-redux/es/connect/connect";
import Post from "../components/Post";
import Pag from "../components/Pagination";
import Button from "../components/Button";

import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

const ROLES = {
    1: 'admin',
    2: 'moderator',
    3: 'user'
};

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            posts: [],
            isSubscribed: false,
            page: 0,
            dropdownOpen: false,
            showChat: false
        };
    }

    componentDidMount() {
        usersService.getUserWithPosts({userId: this.props.match.params.id, page: 0, countPerPage: 10})
            .then(data => {
                this.setState({
                    isSubscribed: data.subscribers ? data.subscribers.some(subscriber => subscriber.subscriberId === this.props.currentUser._id) : false,
                    posts: data.posts || [],
                    user: data
                });
            });

    }

    changeContent = (page) => {
        usersService
            .getUserWithPosts({userId: this.props.match.params.id, page: 0, countPerPage: 10})
            .then(data => this.setState({posts: data}));

        this.setState({
            page
        });
    };

    toggleSubscriber = (authorId) => {
        postsService.toggleSubscribe(authorId)
            .then(() => this.setState(prev => ({isSubscribed: !prev.isSubscribed})));
    };

    getMessages = ( receiverId) => {
        messagesService
            .getMessages(    receiverId);
        this.setState({showChat: !this.state.showChat})
    };

    render() {
        const {
            props: {
                currentUser,
            },
            state: {
                posts,
                user,
                showChat
            }
        } = this;

        console.log(posts);


        if (!user) {
            return (<div>Hello</div>);
        }

        const canSubscribe = user.role === '3' && currentUser._id !== user._id;

        const sendMessage = currentUser._id !== user._id;


        const canChangeUserInformation = currentUser._id === user._id;


        return (
            <div className='user-profile'>
                {showChat && <Chat  receiverId={ user._id}/>}
                <div className='card'>
                    <div className="card-header">
                        User profile
                    </div>
                    {canChangeUserInformation && (

                        <UncontrolledDropdown>
                            <DropdownToggle caret>
                                Edit Profile
                            </DropdownToggle>
                            <DropdownMenu>

                                <Link to="/profile/edit">
                                    <Button className='btn btn-primary btn-sm' buttonText='Edit profile'/>
                                </Link>
                                <br/>
                                <Link to="/profile/changePassword">
                                    <Button className='btn btn-primary btn-sm' buttonText='Change password'/>
                                </Link>

                            </DropdownMenu>
                        </UncontrolledDropdown>
                    )}

                    <div className="card-body">

                        <h1>{user.firstName} {user.lastName}</h1>
                        <h4>{user.email}</h4>
                        <h6>{user._id}</h6>
                        <h5>{ROLES[user.role]}</h5>
                    </div>

                    {
                        canSubscribe && (
                            <button className='btn btn-primary' onClick={() => this.toggleSubscriber(user._id)}>
                                {
                                    this.state.isSubscribed ? 'Unsubscribe' : 'Subscribe'
                                }
                            </button>
                        )
                    }
                    {
                        sendMessage && (
                            <button className='btn btn-primary' onClick={() => this.getMessages()}>
                                {
                                    showChat ? 'Close Chat' : 'Open Chat'
                                }
                            </button>
                        )
                    }


                </div>
                <div>
                    {posts.map(post => {
                        return post._id ? (
                            <Post
                                key={post._id}
                                id={post._id}
                                title={post.title}
                                body={post.body}
                                description={post.description}
                                date={post.date}
                                likeDislike={post.likes}
                                postAuthor={user}
                                showAddComments={false}
                            />
                        ) : null
                    })
                    }
                </div>
                {
                    posts.length > 10 && (
                        <Pag
                            page={this.state.page}
                            total={this.props.total}
                            changeContent={this.changeContent}
                        />
                    )
                }
            </div>


        );
    }
}


const mapState = function (store) {
    return {
        currentUser: store.auth.user, posts: store.posts.posts,
        total: store.posts.total,
        user: store.auth.user
    }
};

export default connect(mapState)(UserProfile);
