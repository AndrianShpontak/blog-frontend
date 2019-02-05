import axios from 'axios';
import messageAction from '../actions/message';

const getMessages = (receiverId) => function (dispatch) {
    return axios.post('/message/createRoom', { receiverId})
        .then(function (res) {
            dispatch(messageAction.getMessageRoom(res.data));
        })
};

const createMessage = (params) => function (dispatch) {
    return axios.post('/message/', params)
        .then(function (res) {
            dispatch(messageAction.createMessage(res.data));
        })
};

export {getMessages, createMessage}

export default {getMessages, createMessage}
