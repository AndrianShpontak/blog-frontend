const SET_USER = 'AUTH/SET_USER';

const initialState = {
    user: {}
};
const authReducer = function (state = initialState, action) {
    switch (action.type) {
        case SET_USER :
            return {...state, user: action.user};
        default :
            return state;
    }
};

export {SET_USER};
export default authReducer;