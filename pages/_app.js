import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { AuthProvider } from 'context/AuthContext';
import { useEffect } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import TagManager from 'react-gtm-module';
import { hotjar } from 'react-hotjar';
import Head from 'next/head';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import { FirestoreProvider } from 'context/FirestoreContext';
import SidebarLayout from 'components/layout/SidebarLayout';
import { useRouter } from 'next/router';
import { getDefaultProvider } from 'ethers';
import { NftProvider, useNft } from 'use-nft';

// We are using the "ethers" fetcher here.
const ethersConfig = {
  provider: getDefaultProvider('homestead'),
};

config.autoAddCss = false;

const tagManagerArgs = {
  gtmId: 'GTM-598NWQM',
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_NODE_ENV !== 'development') {
      hotjar.initialize(2829018, 6);
      TagManager.initialize(tagManagerArgs);
    }
  }, []);

  const noLayoutPages = ['/', '/plans', '/sign-in', '/sign-up'];
  const Element = () => {
    if (noLayoutPages.includes(router.pathname)) {
      return <Component {...pageProps} />;
    }
    return (
      <SidebarLayout>
        <NftProvider fetcher={['ethers', ethersConfig]}>
          <Component {...pageProps} />
        </NftProvider>
      </SidebarLayout>
    );
  };
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
      <FirestoreProvider>
        <Element />
      </FirestoreProvider>
    </AuthProvider>
  );
}

export default MyApp;
