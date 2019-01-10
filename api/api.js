import axios from '../libs/api.request';

export default {
  signIn: (params) => {
    return axios.request({
      url: 'users/signin',
      data: params,
      method: 'post'
    });
  },
  signOut: () => {
    return axios.request({
      url: 'users/signout',
      method: 'post'
    });
  }
};
