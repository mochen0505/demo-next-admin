import Head from 'next/head'
import React from "react";

export default ({children}) =>
    <div>
        <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1'/>
            <meta charSet='utf-8'/>
            <title>Next App</title>
        </Head>
        <style jsx global>
            {`body {}`}
        </style>
        {children}
    </div>;