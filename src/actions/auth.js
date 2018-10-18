import {SET_USER} from "../reducers/auth";

const setUser = function (user) {
    return {type: SET_USER, user}
};

export {setUser};
export default {setUser};