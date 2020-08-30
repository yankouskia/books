import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import NextApp from 'next/app';
import Head from 'next/head';
import fetch from 'isomorphic-fetch';
import { parseCookies } from 'nookies';
import { Header } from '../components/Header';
import { AuthContext } from '../helpers/AuthContext';

export default function App(props) {
  const { Component, pageProps, authorization, user: userData } = props;

  const [user, updateUser] = useState(userData);
  const router = useRouter();

  useEffect(() => {
    updateUser(userData);
  }, [userData]);

  useEffect(() => {
    router.replace(router.pathname);
  }, []);

  return (
    <>
      <Head>
        <title>Books</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <AuthContext.Provider value={{ authorization, user, updateUser }}>
        <Header />
        <Component {...pageProps} />
      </AuthContext.Provider>
    </>
  );
}

App.getInitialProps = async ctx => {
  const appProps = await NextApp.getInitialProps(ctx);

  const { authorization } = parseCookies(ctx);
  const { token } = ctx.query || {};
  if (!token && !authorization) return { ...appProps };

  const res = await fetch('http://localhost:3000/api/v1/user', { headers: { authorization: authorization || token } });

  if (res.status === 200) {
    const user = await res.json();
    return { authorization, user, ...appProps };
  }

  return { authorization, ...appProps };
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};
