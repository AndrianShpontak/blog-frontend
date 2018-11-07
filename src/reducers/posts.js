const SET_POSTS = 'POSTS/SET_POSTS';

const initialState = {
    posts:[],
    total:0
};

const postsReducer = function (state = initialState , action) {
    switch (action.type){
        case SET_POSTS:
            return {...state, posts: action.posts, total: action.total};
        default : return state;
    }
};


export {SET_POSTS};
export default postsReducer;