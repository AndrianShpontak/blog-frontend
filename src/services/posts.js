import axios from 'axios';
import postsAction from '../actions/posts';
import authActions from "../actions/auth";


/*
router.get('/showPostWithComments/:id', postsHandler.getPostByIdWithComments);
router.get('/showPostsWithLike/:id', postsHandler.getPostsWithLike);
router.get('/sendMailAboutPost/:id', postsHandler.sendMail);
router.get('/', postsHandler.getAllPosts);

router.post('/update/:id', postsHandler.updatePost);
router.post('/', postsHandler.createPost);

router.delete('/:id', postsHandler.deletePost);
*/


const getAllPosts = function ({page = 0, countPerPage = 10} = {}) {
    return function (dispatch) {
        return axios
            .get(`/post/showPostsWithLike?page=${page}&countPerPage=${countPerPage}`)
            .then(function (res) {
                console.log(res);
                if(!res) return;
                dispatch(postsAction.setPosts(res.data.data, res.data.total));
            })
            .catch(console.log)
    }
};


const getPostWithComments = function ({postId, page = 0, countPerPage = 5}) {
    return axios
        .get(`/post/showPostWithComments/${postId}?page=${page}&countPerPage=${countPerPage}`)
};

const createComment = function (postId, text) {
    return axios
        .post('/comment/' + postId, {text});
};


const getAllComments = function () {
    return axios
        .get('/comment/')
};

const createPost = function (title, body, description) {
    return axios
        .post('/post/', {title, body, description})
};

const deletePost = function (postId) {
    return axios
        .delete('/post/' + postId)
};

const deleteComment = function (commentId) {
    return axios
        .delete('/comment/' + commentId)
};

const toggleLike = function (postId) {
    return axios
        .post('/likeDislike/' + postId);
};

const toggleSubscribe = function (authorId) {
    return axios
        .post('/subscription/' + authorId)
};

const editPost = (postId, body) => function (dispatch) {
    return axios
        .patch(`/post/update/${postId}`, body)
        .then(function (res) {
            dispatch(authActions.setPosts(res.data.updated))
        })
};

const getPostsByUserWithLikesAndComments = function ({userId, page = 0, countPerPage = 10} = {}) {
    return axios
        .get(`/post/showPostByUserWithComAndLikes/${userId}?page=${page}&countPerPage=${countPerPage}`)
        .then(res => res.data.data)
};
export {
    getAllPosts,
    getPostWithComments,
    createComment,
    createPost,
    deletePost,
    deleteComment,
    toggleLike,
    getAllComments,
    toggleSubscribe,
    getPostsByUserWithLikesAndComments,
    editPost

};
export default {
    getAllPosts,
    getPostWithComments,
    createComment,
    createPost,
    deletePost,
    deleteComment,
    toggleLike,
    getAllComments,
    toggleSubscribe,
    getPostsByUserWithLikesAndComments,
    editPost

};
