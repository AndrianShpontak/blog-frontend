import {SET_LOADING_STATUS, SET_USER} from "../reducers/auth";

const setUser = function (user) {
    return {type: SET_USER, user}
};
const setLoadingStatus = function (status) {
    return {
        type: SET_LOADING_STATUS,
        status
    };
};


export {setUser, setLoadingStatus};
export default {setUser, setLoadingStatus};