import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { AuthProvider } from 'context/AuthContext';
import { useEffect } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import TagManager from 'react-gtm-module';
import { hotjar } from 'react-hotjar';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
config.autoAddCss = false;

const tagManagerArgs = {
  gtmId: 'GTM-598NWQM',
};

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_NODE_ENV);
    if (process.env.NEXT_PUBLIC_NODE_ENV !== 'development') {
      hotjar.initialize(2829018, 6);
      TagManager.initialize(tagManagerArgs);
    }
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
