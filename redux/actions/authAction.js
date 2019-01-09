import { LOADING } from '../constants/actionTypes';
import utils from '../../libs/utils';

const handleLoading = (isLoading) => ({
  type: LOADING,
  isLoading
});

const handleSignIn = (params) => {
  return (dispatch, getState, api) => {
    utils.nProgress.start();
    dispatch(handleLoading(true));
    return new Promise((resolve, reject) => {
      api
        .signIn(params)
        .then((res) => {
          const data = res.data;
          if (data && data.token) {
            if (data.token) {
              utils.setToken(data.token);
            } else {
              utils.setToken('');
            }
            resolve(data);
          } else {
            resolve(-1);
          }
        })
        .catch((err) => {
          reject(err);
        })
        .finally((res) => {
          utils.nProgress.done();
          dispatch(handleLoading(false));
        });
    });
  };
};

export { handleSignIn };
