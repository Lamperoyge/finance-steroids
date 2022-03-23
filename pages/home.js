import withAuth from 'hocs/withAuth';
import StatsCard from 'components/cards/StatsCard';
import Reports from 'components/holdings/Reports';
import { useTour } from '@reactour/tour';
import { useEffect } from 'react';

export default function Home() {
  const { setIsOpen } = useTour();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <StatsCard />
      <Reports />
    </>
  );
}
