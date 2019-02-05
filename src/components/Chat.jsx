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
            receiverId
        } = this.props;

        console.log(room);
        createMessage({body: value, roomId: room._id, receiverId});
        this.setState({value:''})
    };

    render() {
        const {
            value
        } = this.state;
        const {
            messages,
            room
        } = this.props;

        return (
            <div>
                <h3> {room.name}</h3>
                <ul>
                    {
                        messages.map((message) => {
                            return (<li key={message._id}>{message.body}</li>)
                        })
                    }
                </ul>
                <Input
                    type='text'
                    label='Write message'
                    placeholder='write message'
                    onChange={this.onChangeChatText}
                    value={value}/>
                <Button buttonText='send message' onButtonClick={this.sendMessage}/>
            </div>
        )
    }

}

const mapDispatchToProps = function (dispatch) {
    return {
        getMessages: function (params) {
            return dispatch(getMessages(params));
        },
        createMessage:function (params) {
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
