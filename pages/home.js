import Layout from 'components/layout';
import withAuth from 'hocs/withAuth';
import Chart from 'components/graphs/Chart';
function Home({ user }) {
  return (
    <Layout>
      <div className='px-24 grid grid-cols-1 gap-x-12 md:grid-cols-2'>
        <section>
          <Chart />
          <div>holdings</div>
        </section>
        <section>
          <div>portfolio</div>
          <div>wallets</div>
          <div>watchlists</div>
        </section>
      </div>
    </Layout>
  );
}

export default withAuth(Home);
