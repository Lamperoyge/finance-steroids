import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/router';
import Spinner from 'components/ui/Spinner';
import useUserRole from 'hooks/useUserRole';

const whitelistedPages = ['/sign-up', '/sign-in'];

export default function withAuth(Component) {
  function WrappedComponent(props) {
    const { isAuthenticated, user, loading, firestoreUser, logout } = useAuth();
    const router = useRouter();
    const [isRoleLoading, userStatus] = useUserRole();

    const activeLoaders = loading || isRoleLoading;
    if (activeLoaders) {
      return <Spinner />;
    }

    const isInWhitelist = whitelistedPages.includes(router.route);

    if (isAuthenticated && !activeLoaders && isInWhitelist) {
      router.replace('/home');
      return null;
    }
    if (!isAuthenticated && !activeLoaders && !isInWhitelist) {
      router.replace('/sign-in');
      return null;
    }
    // if (
    //   !userStatus &&
    //   !activeLoaders &&
    //   isAuthenticated &&
    //   router.route !== '/plans'
    // ) {
    //   router.replace('/plans');
    //   return null;
    // }

    return <Component user={user} firestoreUser={firestoreUser} {...props} />;
  }
  return WrappedComponent;
}
