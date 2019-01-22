import React from 'react';
import { withNamespaces } from '../i18n';

class ProductDetails extends React.Component {
  static getInitialProps({ query: { id } }) {
    return {
      namespacesRequired: ['home', 'layout'],
      productId: id
    };
  }

  render() {
    return (
      <div>
        <h1>{this.props.productId}</h1>
      </div>
    );
  }
}

export default withNamespaces('home')(ProductDetails);
