import isUserPersonal from './isUserPersonal';
import { useState, useEffect } from 'react';
import { useAuth } from 'context/AuthContext';

export default function usePremiumStatus() {
  const { user, loading } = useAuth();

  const [premiumStatus, setPremiumStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(loading);

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
