import React from 'react';
import Head from 'next/head';
import '../assets/header.less';

export default (props) => {
  const { title = 'Next App' } = props;
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <link rel="shortcut icon" href="/static/favicon/favicon.ico" />
      </Head>
    </div>
  );
};
