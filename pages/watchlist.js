import withAuth from 'hocs/withAuth';

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

const stats = [
  {
    title: 'Total Revenue',
    percentage: '+32.40%',
    value: '$10,243.00',
    status: 'up',
    icon: faCoins,
  },
  {
    title: 'Total Dish Ordered',
    percentage: '-12.40%',
    value: '23,456',
    status: 'down',
    icon: faFileLines,
  },
  {
    title: 'Total Customer',
    percentage: '+2.40%',
    value: '1,234',
    status: 'up',
    icon: faRotate,
  },
];
export default function Watchlist({ user }) {
  return (
    <>
      <button className='bg-indigo-600 py-2 px-2 rounded-lg hover:bg-indigo-400 text-white'>
        Add new
      </button>
      <div className='flex gap-6 grid-cols-3 grid grid-row-1'>
        {[...stats, ...stats, ...stats, ...stats, ...stats].map((stat, idx) => {
          return (
            <div
              key={idx}
              className='flex flex-col p-4 w-full bg-gray-900 rounded-lg gap-y-3'
            >
              <div className='flex items-center gap-x-3'>
                <div className='p-2 bg-gray-800 rounded-lg'>
                  <FontAwesomeIcon icon={stat.icon} />
                </div>
                <span
                  className={`text-xs font-medium ${
                    stat.status === 'up'
                      ? 'text-accent-green'
                      : 'text-accent-red'
                  }`}
                >
                  {stat.percentage}
                </span>
                <div
                  className={`p-0.5 rounded-full ${
                    stat.status === 'up'
                      ? 'bg-accent-green/20'
                      : 'bg-accent-red/20'
                  }`}
                >
                  {stat.status === 'up' ? (
                    <span className='fill-current text-accent-green'>up</span>
                  ) : (
                    <span className='fill-current text-accent-red'>dw</span>
                  )}
                </div>
              </div>
              <div className='text-3xl font-semibold text-white'>
                {stat.value}
              </div>
              <div className='text-sm tracking-wide text-gray-500'>
                {stat.title}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
