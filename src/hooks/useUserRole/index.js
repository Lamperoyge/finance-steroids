import isUserPersonal from './isUserPersonal';
import { useState, useEffect } from 'react';

export default function usePremiumStatus(user) {
  const [premiumStatus, setPremiumStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const checkPremiumStatus = async function () {
        setPremiumStatus(await isUserPersonal());
        setIsLoading(false);
      };
      checkPremiumStatus();
    }
    if (!user) setIsLoading(false);
  }, [user]);

  return [isLoading, premiumStatus];
}
