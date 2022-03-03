import { useState } from 'react';
import { useAuth } from 'context/AuthContext';
import { useFirestore } from 'context/FirestoreContext';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import {
  addCollection,
  deleteCollectionFromUserWatchlist,
} from 'services/firestore';
import { searchNFTsBySlug, searchNFTsByAddress } from 'utils/opensea';
import useUserRole from 'hooks/useUserRole';
import Link from 'next/link';

const validationSchema = Yup.object({
  collection: Yup.string().min(2),
  contract: Yup.string().min(20),
  openSea: Yup.string().min(30),
});

export default function Watchlist({ user }) {
  const [isFormOpen, setFormOpen] = useState(false);
  const [error, setError] = useState('');
  const [collection, setCollection] = useState(null);
  const { firestoreUser } = useAuth();
  const { watchlist, addToWatchlist } = useFirestore();
  const [_, userStatus] = useUserRole();

  const handleSubmit = (values) => {
    const valuesLength = Object.values(values).filter((i) => i).length;
    if (valuesLength === 0) {
      setError('You need to choose at least one option');
      return;
    }
    if (valuesLength > 1) {
      setError('You need to choose only one option');
      return;
    }
    try {
      addCollection(collection, firestoreUser.id);
      setFormOpen(false);
      setCollection(null);
      addToWatchlist([...watchlist, collection]);
    } catch (error) {
      console.log(error);
      alert('Woops! Something went wrong');
    }
  };

  const searchByContract = async (contract) => {
    try {
      const data = await searchNFTsByAddress(contract);
      if (data.collection) {
        setCollection({
          image: data.collection.image_url,
          token_address: data.address,
          market_cap: data.stats.market_cap,
          average_price: data.stats.average_price,
          floor_price: data.stats.floor_price,
          stats: data.stats,
          ...data.collection,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchByOpensea = async (value) => {
    try {
      const data = await searchNFTsBySlug(value.split('/collection/').pop());
      if (data.data) {
        setCollection({
          image: data.data.collection.image_url,
          token_address:
            data.data.collection.primary_asset_contracts[0].address,
          name: data.data.collection.primary_asset_contracts[0].name,
          ...data.data.collection,
          market_cap: data.data.collection.stats.market_cap,
          average_price: data.data.collection.stats.average_price,
          floor_price: data.data.collection.stats.floor_price,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formConfig = [
    {
      type: 'input',
      label: 'Enter contract address ( Ethereum chain only )',
      placeholder: '0x....',
      name: 'contract',
      action: searchByContract,
      actionTitle: 'Search',
    },
    {
      type: 'input',
      label: 'OpenSea Link',
      placeholder: 'https://opensea.io/collection/boredapeyachtclub',
      name: 'openSea',
      action: searchByOpensea,
      actionTitle: 'Search',
    },
  ];
  const handleInputChange = (e, handleChange) => {
    handleChange(e);
  };

  const deleteCollectionFromWatchlist = async (id) => {
    console.log(id);
    deleteCollectionFromUserWatchlist(id, firestoreUser.id);
    addToWatchlist(watchlist.filter((i) => i.token_address !== id));
  };
  return (
    <>
      {isFormOpen && (
        <Formik
          validationSchema={validationSchema}
          initialValues={{ collection: '', openSea: '', contract: '' }}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div className='flex items-center'>
                  <div className='w-full'>
                    {formConfig.map((item, idx) => {
                      return (
                        <div key={idx} className='py-2'>
                          <label className='font-medium text-gray-200'>
                            {item.label}
                          </label>
                          <div className='flex items-center'>
                            {item.type === 'select' ? (
                              <select
                                {...item}
                                onChange={(e) => {
                                  handleInputChange(e, handleChange);
                                }}
                                onBlur={handleBlur}
                                value={values[item.name]}
                                className='block w-1/2 px-4 text-white py-2 mt-2 text-sm placeholder-gray-600 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50'
                              ></select>
                            ) : (
                              <input
                                {...item}
                                onChange={(e) => {
                                  handleInputChange(e, handleChange);
                                }}
                                onBlur={handleBlur}
                                value={values[item.name]}
                                className='block w-1/2 px-4 text-white py-2 mt-2 text-sm placeholder-gray-600 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50'
                              />
                            )}
                            {item.action ? (
                              <button
                                type='button'
                                onClick={() => item.action(values[item.name])}
                                className='ml-4 text-white py-2 mt-2 px-4 hover:bg-indigo-400 text-sm rounded-xl bg-indigo-600'
                              >
                                {item.actionTitle}
                              </button>
                            ) : null}
                          </div>
                          {errors[item.name] && touched[item.name] && (
                            <span className='text-lg text-red-400'>
                              {errors[item.name]}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {collection ? (
                    <div className='my-4 w-1/2 flex flex-col justify-center items-center'>
                      <div className='flex h-1/3 w-1/3 justify-center items-center'>
                        <img
                          src={collection.image}
                          className='h-full w-full object-cover object-center'
                        />
                      </div>
                      <div className='flex justify-center items-center flex-col text-white w-full mt-4'>
                        <h1>{collection.name}</h1>
                        <h1 className='text-sm'>{collection.token_address}</h1>
                      </div>
                    </div>
                  ) : null}
                </div>
                {!!error && (
                  <span className='text-lg text-red-400'>{error}</span>
                )}
                <button
                  type='submit'
                  className='bg-indigo-600 w-full py-2 px-2 rounded-lg hover:bg-indigo-400 text-white'
                >
                  Submit
                </button>
              </form>
            );
          }}
        </Formik>
      )}
      {!userStatus && watchlist && watchlist.length > 2 ? (
        <Link href='/plans' passHref>
          <a
            className={`text-center font-semibold bg-indigo-600 py-2 px-2 rounded-lg hover:bg-indigo-400 text-white`}
          >
            Upgrade to add more collections
          </a>
        </Link>
      ) : (
        <button
          onClick={() => {
            setFormOpen(!isFormOpen);
            setCollection(null);
          }}
          className={`${
            isFormOpen
              ? 'bg-transparent border border-indigo-600'
              : 'bg-indigo-600'
          } py-2 px-2 rounded-lg hover:bg-indigo-400 text-white`}
        >
          {isFormOpen ? 'Close' : 'Add new'}
        </button>
      )}
      <div className='flex gap-6 grid-cols-1 sm:grid-cols-3 grid grid-row-1'>
        {watchlist &&
          watchlist.map((stat, idx) => {
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
                  <span>Floor price</span>
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
                <button
                  type='button'
                  onClick={() =>
                    deleteCollectionFromWatchlist(stat.token_address)
                  }
                  className='bg-indigo-600 text-white border-indigo-600 border py-1 px-2 rounded-lg hover:bg-transparent hover:border-red-400 hover:text-red-400'
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}
