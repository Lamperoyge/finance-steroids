import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function withAuth(Component) {
  return function WrappedComponent(props) {
    const { isAuthenticated, user, loading } = useAuth();
    const whitelistedPages = ['/sign-up', '/sign-in'];
    const router = useRouter();

    useEffect(() => {
      if (isAuthenticated && whitelistedPages.includes(router.asPath)) {
        router.push('/home');
      }
    }, [user]);

    return <Component {...props} />;
  };
}
