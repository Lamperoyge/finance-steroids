import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { wrapper } from 'redux/store';
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
    TagManager.initialize(tagManagerArgs);
    hotjar.initialize(2829018, 6);
  }, []);

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default wrapper.withRedux(MyApp);
