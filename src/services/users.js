import axios from 'axios';

const getUser = (userId) => {
  return axios.get('/users/' + userId).then(res => res.data);
};

export {getUser};
export default {getUser};