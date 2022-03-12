import withAuth from 'hocs/withAuth';
import StatsCard from 'components/cards/StatsCard';
import Reports from 'components/holdings/Reports';
export default function Home() {
  return (
    <>
      <StatsCard />
      <Reports />
    </>
  );
}
