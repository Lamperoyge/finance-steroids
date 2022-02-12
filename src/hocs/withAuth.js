import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/router';
import withPaidRoute from 'hocs/withPaidRoute';
import Spinner from 'components/ui/Spinner';

const whitelistedPages = ['/sign-up', '/sign-in'];

export default function withAuth(Component) {
  function WrappedComponent(props) {
    const { isAuthenticated, user, loading, firestoreUser, logout } = useAuth();
    const router = useRouter();

    if (isAuthenticated && whitelistedPages.includes(router.route)) {
      router.push('/home');
      return null;
    }

    if (!isAuthenticated && !whitelistedPages.includes(router.route)) {
      router.push('/sign-in');
      return null;
    }
    if (loading) {
      return <Spinner />;
    }

    return <Component user={user} firestoreUser={firestoreUser} {...props} />;
  }
  return withPaidRoute(WrappedComponent);
}
