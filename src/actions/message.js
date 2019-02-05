import {SET_LOADING_STATUS, GET_MESSAGE, CREATE_MESSAGE} from "../reducers/message";

const getMessageRoom = function ({room, messages}
) {
    return {type: GET_MESSAGE, room, messages}
};
const setLoadingStatus = function (status) {
    return {
        type: SET_LOADING_STATUS,
        status
    };
};

const createMessage = function (message) {
    return {type: CREATE_MESSAGE, message}
};

export {getMessageRoom, setLoadingStatus, createMessage};
export default {getMessageRoom, setLoadingStatus, createMessage};
