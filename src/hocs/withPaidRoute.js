import useUserRole from 'hooks/useUserRole';
import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/router';
import Spinner from 'components/ui/Spinner';

const whitelistedPages = ['/sign-up', '/sign-in'];

//user can enter paid page only if he's logged in and subscribed

export default function withPaidRoute(Component) {
  return function WrappedComponent(props) {
    const { user, isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const [isLoading, userStatus] = useUserRole(user);

    // if (whitelistedPages.includes(router.route)) {
    //   return <Component {...props} />;
    // }

    // if (isLoading || loading) {
    //   return <Spinner />;
    // }
    // if (
    //   !userStatus &&
    //   !isLoading &&
    //   isAuthenticated &&
    //   !loading &&
    //   router.route !== '/plans'
    // ) {
    //   debugger;
    //   router.push('/plans');
    // }
    return <Component {...props} />;
  };
}
