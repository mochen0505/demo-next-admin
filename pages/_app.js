import React from 'react';
import App, { Container } from 'next/app';
import { withRouter } from 'next/router';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import store from '../redux/configureStore';
import LayoutWithSidebar from '../components/LayoutWithSidebar';
import LayoutWithoutSidebar from '../components/LayoutWithoutSidebar';
import Layout404 from '../components/Layout404';
import { appWithTranslation } from '../i18n';
import utils from '../libs/utils';
import Router from 'next/router';
import cookies from 'next-cookies';

// TODO: issue: https://github.com/zeit/next-plugins/issues/282

const configsWithSider = [
  '/',
  '/profile',
  '/products',
  '/products/productDetails'
];
const configsNoSider = ['/login', '/signup'];

Router.events.on('routeChangeStart', (url) => {
  utils.nProgress.start();
});
Router.events.on('routeChangeComplete', () => utils.nProgress.done());
Router.events.on('routeChangeError', () => utils.nProgress.done());

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    const c = cookies(ctx);
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // if token is not found
    if (typeof c.token === 'undefined' || c.token === '') {
      // don't do anything if we are on a page that doesn't require credentials
      if (ctx.pathname === '/login') {
        return { pageProps };
      } else {
        utils.redirectTo('/login', { res: ctx.res, status: 301 });
      }
    } else {
      if (ctx.pathname === '/login') {
        utils.redirectTo('/', { res: ctx.res, status: 301 });
      } else {
        return { pageProps };
      }
    }

    return { pageProps };
  }

  componentDidCatch(error, errorInfo) {
    console.log('CUSTOM ERROR HANDLING', error);
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps, router, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          {configsWithSider.includes(router.pathname) && (
            <LayoutWithSidebar>
              <Component {...pageProps} />
            </LayoutWithSidebar>
          )}
          {configsNoSider.includes(router.pathname) && (
            <LayoutWithoutSidebar>
              <Component {...pageProps} />
            </LayoutWithoutSidebar>
          )}
          {!configsWithSider.includes(router.pathname) &&
            !configsNoSider.includes(router.pathname) && (
              <Layout404>
                <Component {...pageProps} />
              </Layout404>
            )}
        </Provider>
      </Container>
    );
  }
}

export default appWithTranslation(withRedux(store)(withRouter(MyApp)));
