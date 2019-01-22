import React from 'react';
import { Card } from 'antd';
import { withNamespaces } from '../../i18n';

class Index extends React.Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['home', 'layout']
    };
  }

  render() {
    return (
      <Card bordered={false} className="products">
        Products
      </Card>
    );
  }
}

export default withNamespaces('home')(Index);
