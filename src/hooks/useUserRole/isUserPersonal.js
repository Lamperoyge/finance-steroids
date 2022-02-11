import { auth } from 'utils/firebase-config';
export default async function isUserPersonal() {
  await auth.currentUser?.getIdToken(true);
  const decodedToken = await auth.currentUser?.getIdTokenResult();
  console.log(decodedToken);
  return decodedToken?.claims?.stripeRole ? true : false;
}
