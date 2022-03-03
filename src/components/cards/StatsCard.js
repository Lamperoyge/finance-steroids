import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartBar,
  faRotate,
  faCoins,
  faRectangleList,
  faBell,
  faFileLines,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useFirestore } from 'context/FirestoreContext';

export default function StatsCard() {
  const { watchlist } = useFirestore();

  return (
    <>
      <h1 className='text-3xl font-semibold leading-loose text-white'>Stats</h1>
      <div className='flex gap-6 flex-col sm:flex-row'>
        {!watchlist.length && (
          <div className='text-gray-400'>
            <span>
              Go to{' '}
              <Link href='/watchlist' passHref>
                <a className='text-gray-200 underline'>Watchlist</a>
              </Link>{' '}
              and add collections to follow
            </span>
          </div>
        )}
        {watchlist &&
          watchlist.slice(0, 3).map((stat, idx) => {
            return (
              <div
                key={idx}
                className='flex flex-col p-4 w-full bg-gray-900 rounded-lg gap-y-3'
              >
                <div className='flex items-center gap-x-3'>
                  <div className='p-2 bg-gray-800 flex justify-center items-center w-full rounded-lg'>
                    <img src={stat.image} />
                  </div>

                  <div className={`p-0.5 rounded-full bg-accent-green/20`}>
                    {/* {stat.status === 'up' ? (
                    <span className='fill-current text-accent-green'>up</span>
                  ) : (
                    <span className='fill-current text-accent-red'>dw</span>
                  )} */}
                  </div>
                </div>
                <div className='text-xl font-semibold text-white'>
                  {stat.name}
                </div>
                <div className='text-lg flex justify-between items-center tracking-wide text-gray-100'>
                  <span>Price floor</span>
                  <span className='font-bold'>{stat.stats.floor_price}</span>
                </div>
                <div className='text-lg flex justify-between items-center tracking-wide text-gray-100'>
                  <span>Market Cap</span>
                  <span className='font-bold'>
                    {(stat.stats.market_cap / 10000).toFixed(1)}
                  </span>
                </div>
                <div className='text-lg flex justify-between items-center tracking-wide text-gray-100'>
                  <span>Avg. Price</span>
                  <span className='font-bold'>
                    {stat.stats.average_price.toFixed(1)}
                  </span>
                </div>
                <div className='text-lg flex justify-between items-center tracking-wide text-gray-100'>
                  <span>Volume</span>
                  <span className='font-bold'>
                    {(stat.stats.total_volume / 1000).toFixed(1)}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
      <div className='w-full flex justify-center items-center'>
        <Link href={'/watchlist'}>
          <a className='bg-indigo-600 py-2 w-1/2 text-center hover:bg-indigo-500 rounded-lg text-white'>
            See all
          </a>
        </Link>
      </div>
    </>
  );
}
