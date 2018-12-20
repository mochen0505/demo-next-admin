import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import HeaderM from './Header'
import { connect } from 'react-redux'
import { Layout, Menu, Icon, Dropdown, Breadcrumb, Button, Avatar } from 'antd';
import '../assets/layoutSidebar.less'
import { i18n, withNamespaces } from '../i18n';

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

const { Header, Content, Sider, Footer } = Layout;

const navBar = [
    { linkTo: '/', name: 'home', icon: 'home' },
    { linkTo: '/products', name: 'products', icon: 'book' }
];

class LayoutWithSidebar extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            collapsed: false
        };
    }

    handleToggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    handleClick = () => {
        i18n.changeLanguage(i18n.language === 'en_US' ? 'zh_CN' : 'en_US')
    };

    handleSignOut = () => {
        console.log('signed out')
    };

    render () {
        const {router} = this.props;
        const menu = (
            <Menu className="header_menu">
                <Menu.Item key="0">
                    {this.props.t('userMenu.profile')}
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1" onClick={this.handleSignOut}>
                    {this.props.t('userMenu.signout')}
                </Menu.Item>
            </Menu>
        );
        return (
            <div className='layout'>
                <HeaderM />
                <Layout className="outer_layout">
                    <Sider
                        theme="dark"
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                        className="nav_bar"
                    >
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            selectedKeys={navBar.map((item) => {
                                if (router.pathname === item.linkTo) {
                                    return item.name;
                                }
                                return null;
                            })}
                            mode="inline"
                            className="menu_items"
                        >
                            {navBar.map((item, index) => (
                                <Menu.Item key={item.name}>
                                    <Link href={`${item.linkTo}`}>
                                        <div>
                                            <Icon type={item.icon} />
                                            <span>
                                                {this.props.t(`navItem.${item.name}`)}
                                            </span>
                                        </div>
                                    </Link>
                                </Menu.Item>
                            ))}
                        </Menu>
                    </Sider>
                    <Layout className="inner_layout">
                        <Header className="header_bar">
                            <div className="toggle_wrapper">
                                <Icon
                                    className="trigger"
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.handleToggle}
                                />
                                <Button type="default" size="small" onClick={this.handleClick}>
                                    {this.props.t('lngButtonText')}
                                </Button>
                            </div>
                            <div className="header_right">
                                <Dropdown overlay={menu} trigger={['hover']}>
                                    <div className="user">
                                        <div className="name">Mo Chen</div>
                                        <Avatar className="avatar">Mo</Avatar>
                                    </div>
                                </Dropdown>
                            </div>
                        </Header>
                        <Content className="content_wrapper">
                            <Breadcrumb className="breadcrumb">
                                {
                                    router.pathname.split('/')[1] === '' &&
                                    <Breadcrumb.Item key='home'> {this.props.t(`navItem.home`)}</Breadcrumb.Item>
                                }
                                {
                                    router.pathname.split('/').map((str, index) => {
                                        if (str !== '') {
                                            return (
                                                <Breadcrumb.Item key={index}> {str !== '' && this.props.t(`navItem.${str}`)}</Breadcrumb.Item>
                                            )
                                        }})}
                            </Breadcrumb>
                            <div className="content">{this.props.children}</div>
                        </Content>
                        <Footer className="footer">
                            demo-next-admin @ https://github.com/mochen0505
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default withNamespaces('layout')(connect(mapStateToProps, mapDispatchToProps)(withRouter(LayoutWithSidebar)))