import Layout from 'components/layout';
import withAuth from 'hocs/withAuth';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import Chart from 'components/graphs/Chart';
import {
  PortfolioActionCard,
  WalletsActionCard,
  WatchlistActionCard,
} from 'components/action-cards';
import Web3 from 'web3';

function Home({ user }) {
  function getLibrary(provider) {
    return new Web3(provider);
  }

  return (
    <Layout>
      <Web3ReactProvider getLibrary={getLibrary}>
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
      </Web3ReactProvider>
    </Layout>
  );
}

export default withAuth(Home);
