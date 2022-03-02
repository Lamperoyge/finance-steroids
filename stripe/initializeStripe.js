import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC);
  }
  return stripePromise;
};
export default initializeStripe;
