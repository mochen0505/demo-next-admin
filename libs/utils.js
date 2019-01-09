import { message } from 'antd';
import NProgress from 'nprogress';
import Cookies from 'js-cookie';
import Router from 'next/router';

export default {
  redirectTo: (destination, { res, status } = {}) => {
    if (res) {
      res.writeHead(status || 302, { Location: destination });
      res.end();
    } else {
      if (destination[0] === '/' && destination[1] !== '/') {
        Router.push(destination);
      } else {
        window.location = destination;
      }
    }
  },
  setToken: (token) => {
    Cookies.set('token', token, { expires: 1 });
  },
  getToken: () => {
    const token = Cookies.get('token');
    if (token) {
      return token;
    } else return false;
  },
  nMessage: (() => {
    message.config({
      top: 24,
      duration: 3,
      maxCount: 1
    });
    return {
      success: (param) => {
        message.success(param);
      },
      error: (param) => {
        message.error(param);
      }
    };
  })(),
  nProgress: (() => {
    NProgress.configure({ showSpinner: false });
    return {
      start: () => {
        NProgress.start();
      },
      done: () => {
        NProgress.done();
      }
    };
  })()
};
