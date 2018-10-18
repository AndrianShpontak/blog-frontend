import axios from 'axios';
import authActions from '../actions/auth';

const signIn = user => function (dispatch) {
     return axios.post('/users/signIn', user).then(function (res) {
        dispatch(authActions.setUser(res.data));
      })
};

const signUp = user => function (dispatch) {
    return axios.post('/users/signUp', user).then(function (res) {
        dispatch(authActions.setUser(res.data));
    })
};

export {signIn,signUp};
export default {signIn,signUp};

