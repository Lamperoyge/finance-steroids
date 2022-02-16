import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { wrapper } from 'redux/store';
import { AuthProvider } from 'context/AuthContext';
import { useEffect } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import TagManager from 'react-gtm-module';
import { hotjar } from 'react-hotjar';
import Head from 'next/head';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
config.autoAddCss = false;

const tagManagerArgs = {
  gtmId: 'GTM-598NWQM',
};

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
    hotjar.initialize(2829018, 6);
  }, []);

  return (
    <AuthProvider>
      <Head>
        <title>Floordle - NFT Analytics</title>
        <meta property='og:title' content='Floordle - NFT Analytics' />
        <meta name='twitter:title' content='Floordle - NFT Analytics' />
        <meta
          name='description'
          content='Track NFT collections price floors, create watchlists, sync your wallets and analyze metrics to gain valuable insights on your NFT portfolio with Floordle.'
        />
        <meta
          property='og:description'
          content='Track NFT collections price floors, create watchlists, sync your wallets and analyze metrics to gain valuable insights on your NFT portfolio with Floordle.'
        />
        <meta
          name='twitter:description'
          content='Track NFT collections price floors, create watchlists, sync your wallets and analyze metrics to gain valuable insights on your NFT portfolio with Floordle.'
        />
        <meta property='og:image' content={'/test1.svg'} />
        <meta name='twitter:image' content={'/test1.svg'} />
        <meta name='image' content={'/test1.svg'} />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default wrapper.withRedux(MyApp);
