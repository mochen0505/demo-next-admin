import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import HeaderM from './Header'
import { connect } from 'react-redux'
import {
    selectLocale,
    selectLocaleMsgs
} from '../redux/selector';
import { localeEN, localeZH } from '../redux/actions/localeAction';
import { Layout, Menu, Icon, Dropdown, Breadcrumb, Button, Avatar } from 'antd';
import '../assets/layoutSidebar.less'

const mapStateToProps = (state) => {
    return {
        locale: selectLocale(state),
        msgs: selectLocaleMsgs(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        localeZH: () => dispatch(localeZH()),
        localeEN: () => dispatch(localeEN())
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
        if (this.props.locale === 'zh-CN') {
            this.props.localeEN();
        } else if (this.props.locale === 'en-US') {
            this.props.localeZH();
        }
    };

    handleSignOut = () => {
        console.log('signed out')
    };

    componentDidMount() {
        if (typeof localStorage !== 'undefined' && typeof navigator !== 'undefined') {
            if ( localStorage.getItem('language') ) {
                localStorage.getItem('language') === 'zh-CN' ? this.props.localeZH() : this.props.localeEN();
            } else {
                navigator.language === 'zh-CN' ? this.props.localeZH() : this.props.localeEN();
            }
        }
    }

    render () {
        const {router} = this.props;
        const { navItem, userMenu } = this.props.msgs;
        const menu = (
            <Menu className="header_menu">
                <Menu.Item key="0">
                    {userMenu.profile}
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1" onClick={this.handleSignOut}>
                    {userMenu.signout}
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
                                            <span>{item.name}</span>
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
                                    中文
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
                                    <Breadcrumb.Item key='home'>home</Breadcrumb.Item>
                                }
                                {router.pathname.split('/').map((str, index) => (
                                    <Breadcrumb.Item key={index}>{str}</Breadcrumb.Item>
                                ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LayoutWithSidebar))