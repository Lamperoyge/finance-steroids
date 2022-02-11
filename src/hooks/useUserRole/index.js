import isUserPersonal from './isUserPersonal';
import { useState, useEffect } from 'react';

export default function usePremiumStatus(user) {
  const [premiumStatus, setPremiumStatus] = useState(false);

  useEffect(() => {
    if (user) {
      const checkPremiumStatus = async function () {
        setPremiumStatus(await isUserPersonal());
      };
      checkPremiumStatus();
    }
  }, [user]);

  return premiumStatus;
}
