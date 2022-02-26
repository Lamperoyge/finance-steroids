import Link from 'next/link';
import { useFirestore } from 'context/FirestoreContext';
import Pie from 'components/graphs/Pie';
import { useEffect, useState } from 'react';
export default function PieCard() {
  const [pieData, setPieData] = useState({});
  const { wallets } = useFirestore();

  console.log(wallets);
  useEffect(() => {
    if (wallets.length) {
      const syncWallets = wallets.map((wallet) => [...wallet.portfolio]).flat();

      const count = {};

      for (const element of syncWallets) {
        if (count[element.name]) {
          count[element.name] = {
            value: count[element.name].value + 1,
          };
        } else {
          count[element.name] = {
            value: 1,
          };
        }
      }

      const pie = {
        labels: Object.keys(count),
        datasets: [
          {
            label: '# of collections',
            data: Object.values(count).map((i) => i.value),
            backgroundColor: [
              'rgba(79, 70, 229, 0.6)',
              'rgba(255, 181, 114, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(255, 124, 163, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
            ],
            borderColor: [
              'rgba(79, 70, 229, 1)',
              'rgba(255, 181, 114, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 124, 163, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
          },
        ],
      };
      setPieData(pie);
    }
  }, []);

  console.log(pieData);
  return (
    <div className='flex flex-col p-6 bg-gray-900 rounded-lg gap-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-semibold leading-loose text-white'>
          Overview
        </h2>
      </div>
      <hr className='border-gray-700' />
      <div className='flex gap-x-7'>
        {/* <img width="176" :src="`/img/chart.svg`" alt="" /> */}
        {Object.keys(pieData).length ? (
          <Pie pieData={pieData} />
        ) : (
          <h1 className='text-gray-400'>Overview over your NFT collections</h1>
        )}

        <div className='hidden flex flex-col gap-y-4'>
          <div className='flex gap-x-2 items-start'>
            <div className='w-4 h-4 mt-0.5 rounded-full bg-accent-red' />
            <div>
              <div className='text-sm font-medium text-white'>Dine in</div>
              <div className='text-xs text-gray-500'>200 customers</div>
            </div>
          </div>
          <div className='flex gap-x-2 items-start'>
            <div className='w-4 h-4 mt-0.5 rounded-full bg-accent-orange' />
            <div>
              <div className='text-sm font-medium text-white'>To go</div>
              <div className='text-xs text-gray-500'>122 customers</div>
            </div>
          </div>
          <div className='flex gap-x-2 items-start'>
            <div className='w-4 h-4 mt-0.5 rounded-full bg-accent-blue' />
            <div>
              <div className='text-sm font-medium text-white'>Delivery</div>
              <div className='text-xs text-gray-500'>264 customers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
