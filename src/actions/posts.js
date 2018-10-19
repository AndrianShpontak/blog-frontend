import {SET_POSTS} from '../reducers/posts';
import {SET_LOADING_STATUS} from "../reducers/auth";

const setPosts = function (posts) {
   return {type: SET_POSTS, posts};
};

const setLoadingStatus = function (loadingStatus) {
    return {type:SET_LOADING_STATUS, loadingStatus}
};

export default {setPosts,setLoadingStatus};
export {setPosts,setLoadingStatus};
