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
            // no need to dispatch an action
            utils.setToken(data.token);
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

const handleSignOut = () => {
  return (dispatch, getState, api) => {
    utils.nProgress.start();
    return new Promise((resolve, reject) => {
      api
        .signOut()
        .then((res) => {
          const data = res.data;
          if (data) {
            utils.setToken('');
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
        });
    });
  };
};

export { handleSignIn, handleSignOut };
