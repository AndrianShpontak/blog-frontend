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


const getAllPosts = function () {
    return function (dispatch) {
        return axios
            .get('/post/showPostsWithLike')
            .then(function (res) {
              dispatch(postsAction.setPosts(res.data.data));
            })
            .catch(console.log)
    }
};

export {getAllPosts};
export default {getAllPosts};


