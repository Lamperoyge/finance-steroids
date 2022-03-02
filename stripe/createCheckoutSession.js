import getStripe from './initializeStripe';
import { db } from 'utils/firebase-config';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

export async function createCheckoutSession(uid, price) {
  const checkoutSessionRef = await addDoc(
    collection(db, 'users', uid, 'checkout_sessions'),
    {
      price: price,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    }
  );

  onSnapshot(checkoutSessionRef, async (snap) => {
    const { sessionId } = snap.data();
    if (sessionId) {
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId });
    }
  });
}
