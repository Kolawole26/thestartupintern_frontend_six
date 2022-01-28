import React from 'react';
import Head from 'next/head';

function Meta({title}) {
  return (
  
    <Head>
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta name='description' content='Moment web site that consist of CRUD operation' />
    <meta charSet='utf-8' />
    <link rel='icon' href='/favicon.ico' />
    <title>{title}</title>
    <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
    </Head>

)};

export default Meta;
