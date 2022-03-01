import { useFirestore } from 'context/FirestoreContext';
import { useState, useEffect } from 'react';

export default function Reports() {
  const { wallets } = useFirestore();
  const syncWallets = wallets.map((wallet) => [...wallet.portfolio]).flat();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(syncWallets.length / 8);

  // useEffect(() => {
  //   setData(syncWallets.slice(page, page + 8));
  // }, [page]);

  const handlePagination = (type) => {
    switch (type) {
      case 'prev':
        page > 0 && setPage(page - 1);
        break;
      case 'next':
        page < totalPages && setPage(page + 1);
    }
  };

  return (
    <div className='p-6 bg-gray-900 rounded-lg'>
      <div className='flex justify-between items-center pb-4'>
        <h2 className='text-xl font-semibold leading-loose text-white'>
          Assets
        </h2>
        {/* <button class="flex py-3 px-4 rounded-lg border border-gray-700 gap-x-2.5">
            <OptionsIcon />
            <span class="text-sm text-white">Filter order</span>
          </button> */}
      </div>
      <table className='w-full'>
        <thead>
          <tr className='text-sm font-semibold text-white'>
            <td className='py-4 border-b border-gray-700'>Asset</td>
            <td className='py-4 border-b border-gray-700'>Name</td>
            <td className='py-4 border-b border-gray-700'>Address</td>
            <td className='py-4 border-b border-gray-700'>Token ID</td>
          </tr>
        </thead>
        <tbody>
          {syncWallets.map((order, idx) => {
            let img = '/favicon.png';
            const metadata = JSON.parse(order.metadata);
            if (metadata && metadata.image)
              img =
                'https://ipfs.io/ipfs/' + metadata.image.split('ipfs://').pop();
            return (
              <tr key={idx} className='text-sm text-gray-500'>
                <td className='py-4 w-1/4'>
                  <div className='flex gap-4 items-center'>
                    <img width='48' src={img} alt='' />
                  </div>
                </td>
                <td className='py-4 w-1/4'>{order.name}</td>

                <td className='py-4 w-1/4'>
                  {order.token_address.slice(0, 8)}
                  <span>...</span>
                  {order.token_address.slice(-4)}
                </td>
                <td className='py-4 w-1/4'>#{order.token_id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
