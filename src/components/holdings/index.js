import { useFirestore } from 'context/FirestoreContext';
import { useState, useEffect } from 'react';

export default function DefaultHoldings() {
  const { wallets } = useFirestore();
  const syncWallets = wallets.map((wallet) => [...wallet.portfolio]).flat();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(syncWallets.length / 8);

  useEffect(() => {
    setData(syncWallets.slice(page, page + 8));
  }, [page]);
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
    <div className='bg-white p-8 rounded-md w-full'>
      <div className='flex items-center justify-between pb-6'>
        <div>
          <h2 className='text-gray-600 font-semibold'>My assets</h2>
          <span className='text-xs'>All assets</span>
        </div>
      </div>
      <div>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
            <table className='min-w-full leading-normal'>
              <thead>
                <tr>
                  <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    Asset
                  </th>
                  <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    Name
                  </th>
                  <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    Address
                  </th>

                  <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                    Token Id
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => {
                  let img = '/favicon.png';
                  const metadata = JSON.parse(item.metadata);
                  if (metadata && metadata.image)
                    img =
                      'https://ipfs.io/ipfs/' +
                      metadata.image.split('ipfs://').pop();

                  return (
                    <tr key={idx} className={'hover:bg-slate-50 bg-white'}>
                      <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                        <div className='flex items-center'>
                          <div className='ml-3'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                              <img
                                src={img}
                                className='w-9 h-9 rounded-full object-cover object-center'
                              />
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap'>
                          {item.name}
                        </p>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                        <p className='text-gray-900 whitespace-no-wrap'>
                          {item.token_address.slice(0, 3)}
                          <span className='text-xs text-gray-400'>......</span>
                          {item.token_address.slice(-4)}
                        </p>
                      </td>

                      <td className='px-5 py-5 border-b border-gray-200 text-sm'>
                        <span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                          <span
                            aria-hidden
                            className='absolute inset-0 opacity-50 rounded-full'
                          />
                          <span className='relative'>#{item.token_id}</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className='px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          '>
              <span className='text-xs xs:text-sm text-gray-900'>
                Showing {page + 1} to {totalPages + 1} of {syncWallets.length}{' '}
                entries
              </span>
              <div className='flex justify-around w-full mt-2 xs:mt-0'>
                <button
                  onClick={() => handlePagination('prev')}
                  className='text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l'
                >
                  Prev
                </button>
                <button
                  onClick={() => handlePagination('next')}
                  className='text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r'
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
