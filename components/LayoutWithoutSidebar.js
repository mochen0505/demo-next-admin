import React from 'react';
import { connect } from 'react-redux';
import { Layout, Button } from 'antd';
import '../assets/layoutNoSidebar.less';
import { i18n, withNamespaces } from '../i18n';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const { Header, Footer, Content } = Layout;

class LayoutWithoutSidebar extends React.Component {
  handleClick = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en');
  };

  render() {
    return (
      <Layout className="no_sider_layout">
        <Header className="header">
          <div className="logo_wrapper">
            <div className="logo" />
          </div>
          <Button ghost size="small" onClick={this.handleClick}>
            {this.props.t('lngButtonText')}
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

export default withNamespaces('layout')(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LayoutWithoutSidebar)
);
