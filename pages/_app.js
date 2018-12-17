import React from "react";
import App, {Container} from 'next/app'
import { withRouter } from 'next/router'
import LayoutWithSidebar from '../components/LayoutWithSidebar'
import LayoutWithoutSidebar from '../components/LayoutWithoutSidebar'
import Layout404 from '../components/Layout404'

const configsNeedAuth = ['/', '/products', '/products/productDetails'];
const configsNoAuth = ['/login', '/signup'];

class MyApp extends App {
    static async getInitialProps ({Component, ctx}) {
        return {
            pageProps: (Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
        }
    }

    componentDidCatch (error, errorInfo) {
        console.log('CUSTOM ERROR HANDLING', error);
        // This is needed to render errors correctly in development / production
        super.componentDidCatch(error, errorInfo)
    }

    render () {
        const {Component, pageProps, router} = this.props;
        return (
            <Container>
                {
                    configsNeedAuth.includes(router.pathname) &&
                    <LayoutWithSidebar>
                        <Component {...pageProps} />
                    </LayoutWithSidebar>
                }
                {
                    configsNoAuth.includes(router.pathname) &&
                    <LayoutWithoutSidebar>
                        <Component {...pageProps} />
                    </LayoutWithoutSidebar>
                }
                {
                    !configsNeedAuth.includes(router.pathname) && !configsNoAuth.includes(router.pathname) &&
                    <Layout404>
                        <Component {...pageProps} />
                    </Layout404>
                }
            </Container>
        )
    }
}

export default withRouter(MyApp)