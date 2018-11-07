import axios from 'axios';
import postsAction from '../actions/posts';


/*
router.get('/showPostWithComments/:id', postsHandler.getPostByIdWithComments);
router.get('/showPostsWithLike/:id', postsHandler.getPostsWithLike);
router.get('/sendMailAboutPost/:id', postsHandler.sendMail);
router.get('/', postsHandler.getAllPosts);

router.post('/update/:id', postsHandler.updatePost);
router.post('/', postsHandler.createPost);

router.delete('/:id', postsHandler.deletePost);
*/


const getAllPosts = function ({ page = 0, countPerPage = 10 } = {}) {
    return function (dispatch) {
        return axios
            .get(`/post/showPostsWithLike?page=${page}&countPerPage=${countPerPage}`)
            .then(function (res) {
                dispatch(postsAction.setPosts(res.data.data, res.data.total));
            })
            .catch(console.log)
    }
};


const getPostWithComments = function ({ postId, page = 0, countPerPage = 3 }) {
    return axios
        .get(`/post/showPostWithComments/${postId}?page=${page}&countPerPage=${countPerPage}`)
};

const createComment = function (postId, text) {
    return axios
        .post('/comment/' + postId, {text});
};

const createPost = function (title, body, description) {
    return axios
        .post('/post/', {title, body, description})
};

const deletePost = function (postId) {
  return axios
      .delete('/post/' + postId)
};

export {getAllPosts, getPostWithComments, createComment, createPost, deletePost};
export default {getAllPosts, getPostWithComments, createComment, createPost, deletePost};