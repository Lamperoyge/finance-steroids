import isUserPersonal from './isUserPersonal';
import { useState, useEffect } from 'react';

export default function usePremiumStatus(user, loading) {
  const [premiumStatus, setPremiumStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && !loading) {
      const checkPremiumStatus = async function () {
        setPremiumStatus(await isUserPersonal());
        setIsLoading(false);
      };
      checkPremiumStatus();
    }
    if (!user && !loading) setIsLoading(false);
  }, [user, loading]);

  return [isLoading, premiumStatus];
}
