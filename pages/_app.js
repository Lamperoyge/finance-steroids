import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import { wrapper } from 'redux/store';
import { AuthProvider } from 'context/AuthContext';
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default wrapper.withRedux(MyApp);
