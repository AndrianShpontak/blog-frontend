import axios from 'axios';
import authActions from '../actions/auth';

const signIn = user => function (dispatch) {
    return axios.post('/users/signIn', user)
        .then(function (res) {
            dispatch(authActions.setUser(res.data));
        })
};

const signUp = user => function (dispatch) {
    return axios.post('/users/signUp', user).then(function (res) {
        dispatch(authActions.setUser(res.data));
    })
};

const getCurrentUser = () => dispatch => {
    return axios.get('/users/currentUser')
        .then(function (res) {
            dispatch(authActions.setUser(res.data));
            dispatch(authActions.setLoadingStatus(true))
        })
        .catch(() => dispatch(authActions.setUser(null)))
};

export {signIn, signUp, getCurrentUser};
export default {signIn, signUp, getCurrentUser};

