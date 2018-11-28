import axios from 'axios';

const getUser = (userId) => {
    return axios
        .get('/users/' + userId)
        .then(res => res.data);
};

const getUserWithPosts = function ({userId, page = 0, countPerPage = 10} = {}) {
    return axios
        .get(`/users/showUserWithAllPosts/${userId}`)
        .then(res => res.data.data)
};

const getAllUsers = function () {
    return axios
        .get(/users/);
};

export {getUser, getAllUsers, getUserWithPosts};
export default {getUser, getAllUsers, getUserWithPosts};