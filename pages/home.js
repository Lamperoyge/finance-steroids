import StatsCard from 'components/cards/StatsCard';
import Reports from 'components/holdings/Reports';
import { useTour } from '@reactour/tour';
import { useEffect } from 'react';
import { useAuth } from 'context/AuthContext';

export default function Home() {
  const { setIsOpen } = useTour();
  const { firestoreUser } = useAuth();

  useEffect(() => {
    if (firestoreUser && !firestoreUser.hasFinishedOnboarding) {
      setIsOpen(true);
    }
  }, [firestoreUser]);

  return (
    <>
      <StatsCard />
      <Reports />
    </>
  );
}
