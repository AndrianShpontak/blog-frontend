const SET_USER = 'AUTH/SET_USER';
const SET_LOADING_STATUS= 'AUTH/SET_LOADING_STATUS';

const initialState = {
    user: {},
    isLoaded: false
};

const authReducer = function (state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case SET_USER :
            return {...state, user: action.user};
        case SET_LOADING_STATUS:
            return {...state, isLoaded: action.loadingStatus};
        default :
            return state;
    }
};

export {SET_USER, SET_LOADING_STATUS};
export default authReducer;
