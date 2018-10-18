const SET_POSTS = 'POSTS/SET_POSTS';

const initialState = {
    posts:[]
};

const postsReducer = function (state = initialState , action) {
    switch (action.type){
        case SET_POSTS:
            return {...state, posts: action.posts};
        default : return state;
    }
};


export {SET_POSTS};
export default postsReducer;