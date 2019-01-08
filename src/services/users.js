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

const deleteUser = function (userId) {
    return axios
        .delete(/users/ + userId);
};

const updateUserInformation = function (userId) {
    return axios
        .patch(`/users/${userId}`)
        .then(res => res.data.data)
};

export {getUser, getAllUsers, getUserWithPosts, updateUserInformation, deleteUser};
export default {getUser, getAllUsers, getUserWithPosts, updateUserInformation, deleteUser}
