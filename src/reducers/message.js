const GET_MESSAGE = 'GET_MESSAGE';
const CREATE_MESSAGE = 'CREATE_MESSAGE';
const SET_LOADING_STATUS= 'AUTH/SET_LOADING_STATUS';

const initialState = {
    room: {},
    messages:[],
    isLoaded: false
};

const messageReducer = function (state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case GET_MESSAGE :
            return {...state, room: action.room, messages: action.messages};
        case SET_LOADING_STATUS:
            return {...state, isLoaded: action.loadingStatus};
        case CREATE_MESSAGE :
            return {...state,messages: [...state.messages, action.message]};
        default :
            return state;
    }
};

export {GET_MESSAGE, SET_LOADING_STATUS, CREATE_MESSAGE};
export default messageReducer;
