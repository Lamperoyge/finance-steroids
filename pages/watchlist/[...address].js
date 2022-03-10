import { useFirestore } from 'context/FirestoreContext';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowRestore } from '@fortawesome/free-regular-svg-icons';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Link from 'next/link';
import moment from 'moment';
import { useState, useEffect } from 'react';
import Tooltip from 'components/ui/Tooltip';
import CreateAlert from 'components/alerts/create';

const Card = ({ title, data }) => {
  return (
    <div className='flex items-left gap-x-3 flex-col '>
      <div className='text-lg tracking-wide text-gray-500'>{title}</div>
      <div className='text-xl font-semibold text-white'>
        {data ? data.toFixed(2) : '---'}
      </div>
    </div>
  );
};

const CardList = ({ collection }) => {
  const statsToDisplay = [
    {
      title: 'Average Price',
      data: collection.stats.average_price,
      additionalData: [
        {
          one_day_average_price: collection.stats.one_day_average_price,
          one_day_change: collection.stats.one_day_change,
          one_day_sales: collection.stats.one_day_sales,
        },
      ],
    },
    {
      title: 'Floor Price',
      data: collection.stats.floor_price,
    },
    {
      title: 'Market Cap',
      data: collection.stats.market_cap,
    },
    {
      title: 'Total Volume',
      data: collection.stats.total_volume,
    },
    {
      title: 'Supply',
      data: collection.stats.total_supply,
    },
    {
      title: 'Sales in 24h',
      data: collection.stats.one_day_sales,
    },
    {
      title: 'Owners',
      data: collection.stats.num_owners,
    },
    {
      title: 'Total sales',
      data: collection.stats.total_sales,
    },
  ];
  return (
    <div className='flex gap-6 flex-row w-full justify-between items-center flex-wrap'>
      {statsToDisplay.map((stat, idx) => {
        return (
          <div
            key={idx}
            style={{ width: '44%' }}
            className='p-4 bg-gray-900 rounded-lg gap-y-3'
          >
            <Card {...stat} />
          </div>
        );
      })}
    </div>
  );
};

export default function CollectionItem() {
  const [transfers, setTransfers] = useState([]);
  const [collection, setCollection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAlertCreated, setAlertIsCreated] = useState(false);
  const router = useRouter();
  const { watchlist } = useFirestore();

  useEffect(() => {
    if (isAlertCreated) {
      setTimeout(() => {
        setAlertIsCreated(false);
      }, 2500);
    }
  }, [isAlertCreated]);

  useEffect(() => {
    if ((collection || watchlist.length > 0) && isLoading) setIsLoading(false);
  }, [collection, watchlist]);

  useEffect(() => {
    if (watchlist && !collection) {
      const collectionFromWatchlist = watchlist.find(
        (i) => i.token_address === router.query.address[0]
      );
      if (collectionFromWatchlist) {
        setCollection(collectionFromWatchlist);
      }
    }
  }, [watchlist]);

  const fetchTransfers = async (col) => {
    if (col && col.token_address) {
      try {
        const { data } = await axios.post('/api/get-owners', {
          address: col.token_address,
        });
        if (data.response) setTransfers(data.response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchTransfers(collection);
  }, [collection]);

  if (isLoading) {
    return (
      <div className='w-full h-1/4 block z-50'>
        <span className='w-full flex justify-center text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-20 h-20'>
          <FontAwesomeIcon
            className='fa-spin text-indigo-400'
            style={{ fontSize: '8vh' }}
            icon={faCircleNotch}
          />
        </span>
      </div>
    );
  }
  if (!collection && !isLoading) {
    return (
      <section>
        <div className='bg-gray-900 p-6 rounded-lg'>
          <h1 className='text-4xl text-white text-center w-full'>
            Woops! No collection found
          </h1>
        </div>
      </section>
    );
  }

  console.log(collection);
  return (
    <section>
      <div className='relative'>
        <div className='bg-gray-900 p-6 rounded-lg'>
          {collection.banner_image_url ? (
            <img
              className='max-h-52	w-full object-cover object-center rounded-lg max-w-6'
              src={collection.banner_image_url}
            />
          ) : null}
        </div>
      </div>
      <div>
        <div className='flex flex-col text-xl text-white w-full text-center p-4 font-bold'>
          {collection.name}

          <a
            href={`https://opensea.io/collection/${collection.slug}`}
            target='_blank'
            rel='noreferrer'
            className='py-2 cursor-pointer text-sm underline text-gray-400 font-normal'
          >
            View on OpenSea
          </a>
          <div className='w-full flex justify-center items-center'>
            {collection.discord_url ? (
              <Link passHref href={collection.discord_url}>
                <a target='__blank' rel='noreferrer'>
                  <svg
                    fill={'white'}
                    className='m-2 w-full block h-full w-9 hover:fill-indigo-200'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 640 512'
                  >
                    <path d='M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z' />
                  </svg>
                </a>
              </Link>
            ) : null}
            {collection.twitter_username ? (
              <Link
                passHref
                href={`https://twitter.com/${collection.twitter_username}`}
              >
                <a target='__blank' rel='noreferrer'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                    fill={'white'}
                    className='m-2 w-full block h-full w-9 hover:fill-indigo-200'
                  >
                    {/*! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}
                    <path d='M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z' />
                  </svg>
                </a>
              </Link>
            ) : null}
            {collection.external_url ? (
              <a
                target='_blank'
                href={collection.external_url}
                rel='noreferrer'
              >
                <FontAwesomeIcon
                  icon={faWindowRestore}
                  className='m-2 hover:text-indigo-200'
                  size={'lg'}
                />
              </a>
            ) : null}
          </div>
        </div>
        {/* <img src={collectio}/> */}
        {collection.description ? (
          <div
            className='text-white text-sm w-full flex justify-center md:text-md text-center flex'
            dangerouslySetInnerHTML={{ __html: collection.description }}
          />
        ) : null}
        <div className='px-24'>
          {isAlertCreated ? (
            <h1 className='text-slate-200 text-sm text-center mt-4'>
              Done! Successfully created an alert
            </h1>
          ) : (
            <CreateAlert
              defaultCollection={collection}
              btnWidth='1/2'
              callback={() => setAlertIsCreated(true)}
              title='Create alert'
              formStyles='flex justify-center items-center flex-col'
            />
          )}
        </div>
      </div>
      <div className='py-6'>
        <CardList collection={collection} />
      </div>
      <div className='bg-gray-900 p-6 rounded-lg'>
        <h1 className='text-white text-xl font-semibold'>Transfers</h1>
        <table className='w-full'>
          <thead>
            <tr className='text-sm font-semibold text-white'>
              <td className='py-4 border-b border-gray-700'>Time</td>

              <td className='py-4 border-b border-gray-700'>Token ID</td>
              <td className='py-4 border-b border-gray-700'>Block Hash</td>
              <td className='py-4 border-b border-gray-700'>Block Number</td>
              <td className='py-4 border-b border-gray-700'>From</td>
              <td className='py-4 border-b border-gray-700'>To</td>
            </tr>
          </thead>
          <tbody>
            {!!transfers &&
              transfers.result?.map((transfer, idx) => {
                const timestamp = moment(transfer.block_timestamp);
                const currentDate = moment();
                let diff = currentDate.diff(timestamp, 'minutes');
                return (
                  <tr key={idx} className='text-sm text-gray-500'>
                    <td className='py-4'>{diff} minutes ago</td>

                    <td className='py-4 relative'>
                      {transfer.token_id.slice(0, 12)}
                      <Tooltip content={transfer.token_id} />
                    </td>
                    <td className='py-4 relative'>
                      {transfer.block_hash.slice(0, 12)}
                      <Tooltip content={transfer.block_hash} />
                    </td>
                    <td className='py-4 relative'>
                      {transfer.block_number.slice(0, 12)}
                      <Tooltip content={transfer.block_number} />
                    </td>
                    <td className='py-4 relative'>
                      {transfer.from_address.slice(0, 12)}
                      <Tooltip content={transfer.from_address} />
                    </td>
                    <td className='py-4 relative'>
                      {transfer.to_address.slice(0, 12)}

                      <Tooltip content={transfer.to_address} />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
