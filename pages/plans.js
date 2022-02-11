import { createCheckoutSession } from '../stripe/createCheckoutSession';
import { useAuth } from 'context/AuthContext';
export default function Plans() {
  const { firestoreUser } = useAuth();
  console.log(firestoreUser);
  return (
    <button
      onClick={() => createCheckoutSession(firestoreUser.id)}
      className='bg-blue-600'
      type='button'
    >
      update to personal plan
    </button>
  );
}
