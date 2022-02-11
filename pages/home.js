import useUserRole from 'hooks/useUserRole';
import { useAuth } from 'context/AuthContext';
export default function Home() {
  const { user } = useAuth();
  const userHasRole = useUserRole(user);

  console.log(userHasRole);
  return <div>home page</div>;
}
