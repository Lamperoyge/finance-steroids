import Layout from 'components/layout';
import withAuth from 'hocs/withAuth';
import Chart from 'components/graphs/Chart';
import {
  PortfolioActionCard,
  WalletsActionCard,
  WatchlistActionCard,
} from 'components/action-cards';

function Home({ user }) {
  return (
    <Layout>
      <div className='px-24 grid grid-cols-1 gap-x-12 md:grid-cols-2'>
        <section>
          <Chart />
          <div>holdings</div>
        </section>
        <section>
          <WalletsActionCard />
          <PortfolioActionCard />
          <WatchlistActionCard />
        </section>
      </div>
    </Layout>
  );
}

export default withAuth(Home);
