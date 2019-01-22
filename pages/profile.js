import React from 'react';
import { Card } from 'antd';
import { withNamespaces } from '../i18n';

class Profile extends React.Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['home', 'layout']
    };
  }

  render() {
    return (
      <Card bordered={false} className="profile">
        Profile
      </Card>
    );
  }
}

export default withNamespaces('home')(Profile);
