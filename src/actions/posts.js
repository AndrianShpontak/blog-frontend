import {SET_POSTS} from '../reducers/posts';

const setPosts = function (posts) {
   return {type: SET_POSTS, posts};

};

export default {setPosts};
export {setPosts};
