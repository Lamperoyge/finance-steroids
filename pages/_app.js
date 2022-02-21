import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { AuthProvider } from 'context/AuthContext';
import { useEffect } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import TagManager from 'react-gtm-module';
import { hotjar } from 'react-hotjar';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import { FirestoreProvider } from 'context/FirestoreContext';
import SidebarLayout from 'components/layout/SidebarLayout';
import { useRouter } from 'next/router';
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
        <Component {...pageProps} />
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
