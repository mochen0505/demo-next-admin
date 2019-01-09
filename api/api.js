import axios from '../libs/api.request';

export default {
  signIn: (params) => {
    return axios.request({
      url: 'users/signin',
      data: params,
      method: 'post'
    });
  }
};
