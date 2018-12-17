import React from 'react';
import { Layout, Button } from 'antd';
import '../assets/layoutNoSidebar.less';

const { Header, Footer, Content } = Layout;

class LayoutWithoutSidebar extends React.Component {
    handleClick = () => {
        console.log('EN')
    };

    render() {
        return (
            <Layout className="no_sider_layout">
                <Header className="header">
                    <div className="logo_wrapper">
                        <div className="logo" />
                    </div>
                    <Button ghost size="small" onClick={this.handleClick}>
                        中文
                    </Button>
                </Header>
                <Content className="content_wrapper">{this.props.children}</Content>
                <Footer className="footer">
                    demo-next-admin @ https://github.com/mochen0505
                </Footer>
            </Layout>
        );
    }
}

export default LayoutWithoutSidebar
