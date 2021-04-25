import { AppProps } from 'next/app';
import { ReactElement } from 'react';
import { Header } from '../components/Header';
import { Player } from '../components/Player';
import { PlayerContextProvider } from '../contexts/PlayerContext';
import { ThemeContextProvider } from '../contexts/ThemeContext';
import Head from 'next/head';
import styles from '../styles/app.module.scss';
import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ThemeContextProvider>
      <PlayerContextProvider>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="HandheldFriendly" content="true" />
          <meta name="description" content="An app to listen to tech podcasts" />
          <meta name="keywords" content="Tech,Pocasts,Programming" />
          {/*Android */}
          <meta name="theme-color" content="#9f75ff" />
          <meta name="mobile-web-app-capable" content="yes" />
          {/*iOS*/}
          <meta name="apple-mobile-web-app-title" content="Podcastr" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          {/*Windows */}
          <meta name="msapplication-navbutton-color" content="#fff" />
          <meta name="msapplication-TileColor" content="#9f75ff" />
          <meta name="msapplication-TileImage" content="ms-icon-144x144.png" />
          <meta name="msapplication-config" content="browserconfig.xml" />
          {/*Pinned Sites */}
          <meta name="application-name" content="Podcastr" />
          <meta name="msapplication-tooltip" content="An app to listen to tech podcasts" />
          <meta name="msapplication-starturl" content="/" />
          {/*Tap highlighting */}
          <meta name="msapplication-tap-highlight" content="no" />
          {/*UC Mobile Browser */}
          <meta name="full-screen" content="yes" />
          <meta name="browsermode" content="application" />
          {/*Disable night mode for this page */}
          <meta name="nightmode" content="enable/disable" />
          {/*Fitscreen */}
          <meta name="viewport" content="uc-fitscreen=yes" />
          {/*Layout mode*/}
          <meta name="layoutmode" content="fitscreen/standard" />
          {/*imagemode - show image even in text only mode */}
          <meta name="imagemode" content="force" />
          {/*Orientation */}
          <meta name="screen-orientation" content="portrait" />
          {/*iOS*/}
          <link href="/apple-touch-icon.png" rel="apple-touch-icon" />
          {/*Pinned Tab*/}
          <link href="/safari-pinned-tab.svg" rel="mask-icon" sizes="any" />
          {/*Android*/}
          <link href="/icon-192x192.png" rel="icon" sizes="192x192" />
          {/*Manifest.json*/}
          <link href="/manifest.json" rel="manifest" />
        </Head>
        <div className={styles.appWrapper}>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          <Player />
        </div>
      </PlayerContextProvider>
    </ThemeContextProvider>
  );
}

export default MyApp;
