// pages/_app.js
import * as React from 'react';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../src/theme';
import { SessionProvider } from 'next-auth/react';

const cache = createCache({ key: 'css', prepend: true });

export default function MyApp(props) {
    const { Component, pageProps } = props;

    return (
        <SessionProvider session={pageProps.session}>
            <CacheProvider value={cache}>
                <Head>
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                </Head>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </CacheProvider>
        </SessionProvider>
    );
}
