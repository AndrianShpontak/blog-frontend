import axios from 'axios';
import authActions from '../actions/auth';

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

const editUser = (userId, body) => function (dispatch) {
    return axios
        .patch(`/users/${userId}`, body)
        .then(function (res) {
             dispatch(authActions.setUser(res.data.updated))
        })
};

const changePassword = (userId, body) => function (dispatch) {
    return axios
        .patch(`/users/changePassword/${userId}`, body)
        .then(function (res) {
            // dispatch(authActions.setUser(res.data.data))
        })
};
const verificationEmail = function(body){
    return axios
        .post('/users/verificateEmail', body)
} ;

export {getUser, getAllUsers, getUserWithPosts, editUser, deleteUser, changePassword, verificationEmail};
export default {getUser, getAllUsers, getUserWithPosts, editUser, deleteUser, changePassword, verificationEmail}
