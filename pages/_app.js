import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import dynamic from 'next/dynamic';

const AuthProvider = dynamic(() =>
  import('context/AuthContext').then((mod) => mod.AuthProvider)
);
import { useEffect } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import TagManager from 'react-gtm-module';
import { hotjar } from 'react-hotjar';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
const FirestoreProvider = dynamic(() =>
  import('context/FirestoreContext').then((mod) => mod.FirestoreProvider)
);
const SidebarLayout = dynamic(() => import('components/layout/SidebarLayout'));
import { useRouter } from 'next/router';
import { getDefaultProvider } from 'ethers';
import { NftProvider } from 'use-nft';

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
      hotjar.initialize(2883330, 6);
      TagManager.initialize(tagManagerArgs);
    }
  }, []);

  const noLayoutPages = [
    '/',
    '/plans',
    '/sign-in',
    '/sign-up',
    '/blog',
    '/blog/[...post]',
  ];
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
      <FirestoreProvider>
        <Element />
      </FirestoreProvider>
    </AuthProvider>
  );
}

export default MyApp;
