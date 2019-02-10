import React from 'react';
import Button from "./Button";
import Input from "./Input";
import {connect} from "react-redux";
import {getMessages, createMessage} from '../services/messages'


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    componentDidMount() {

        this.props.getMessages(this.props.receiverId);
    }

    onChangeChatText = (event) => {
        const value = event.target.value;

        this.setState({value: value})

    };

    sendMessage = () => {
        const {
            value
        } = this.state;
        const {
            room,
            createMessage,
            receiverId,
            author
        } = this.props;

        console.log(room);
        createMessage({body: value, roomId: room._id, receiverId, author});
        this.setState({value: ''})
    };
/*
    loadMessages = () => {
        return this.sendMessage()
            .then(res => {
                this.setState({
                    messages: res.data.data ? res.data.data.messages : [],
                    hasMore: res.data.data.messages.length >= 5
                })
            })
    };

    toggleMessages = () => {

            return this.loadComments();


    };*/
/*
    loadMore = (page) => {
        this.sendMessage({
            page: page,
            perPage: 5
        })
            .then(message => {
                this.setState((prev) => ({
                    messages: [...prev.messages, ...res.data.data.messages],
                    hasMore: room.data.data.messages.length === 5
                }));
            });

    };*/

    render() {
        const {
            value
        } = this.state;
        const {
            messages,
            room
        } = this.props;

        return (

            <div className='container'>
                <div className='row'>
                    <div className='col-10'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='card-title'> {room.name}</div>
                                <hr/>
                                <div className='messages'>
                                    {
                                        messages.map((message) => {
                                            return (
                                                <div key={message._id}>{message.senderId.firstName}:{message.body}</div>
                                            )
                                        })
                                    }
                                </div>
                                <div className='footer'>
                                    <
                                        Input
                                        type='text'
                                        label='Write message'
                                        placeholder='write message'
                                        onChange={this.onChangeChatText
                                        }
                                        value={value}
                                    />
                                    <br/>
                                    <Button buttonText='send message' onButtonClick={this.sendMessage}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapDispatchToProps = function (dispatch) {
    return {
        getMessages: function (params) {
            return dispatch(getMessages(params));
        },
        createMessage: function (params) {
            return dispatch(createMessage(params));
        }

    }
};

const mapStoreToProps = function (store) {
    return {
        room: store.messages.room,
        messages: store.messages.messages
    }
};


export default connect(mapStoreToProps, mapDispatchToProps)(Chat);
