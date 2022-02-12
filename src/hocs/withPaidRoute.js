import useUserRole from 'hooks/useUserRole';
import { useAuth } from 'context/AuthContext';
import { useRouter } from 'next/router';
const whitelistedPages = ['/sign-up', '/sign-in'];
import Spinner from 'components/ui/Spinner';
export default function withPaidRoute(Component) {
  return function WrappedComponent(props) {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [isLoading, userStatus] = useUserRole(user);

    if (whitelistedPages.includes(router.route)) {
      return <Component {...props} />;
    }

    if (isLoading) {
      return <Spinner />;
    }
    if (
      !userStatus &&
      !isLoading &&
      isAuthenticated &&
      router.route !== '/plans'
    ) {
      router.push('/plans');
    }
    return <Component {...props} />;
  };
}
