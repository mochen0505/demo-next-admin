import React from 'react';
import '../assets/layout404.less';

class Layout404 extends React.Component {
  render() {
    return <div className="not_found">{this.props.children}</div>;
  }
}

export default Layout404;
