import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { addCollection, addAlert } from 'services/firestore';
import { useAuth } from 'context/AuthContext';
import { searchNFTsBySlug, searchNFTsByAddress } from 'utils/opensea';

const validationSchema = Yup.object({
  watchlist: Yup.string().min(2),
  openSea: Yup.string().min(30),
  alertType: Yup.string().required('Please select what kind of alert you want'),
  target: Yup.number().required(),
});

import { useFirestore } from 'context/FirestoreContext';
export default function CreateAlert() {
  const [isFormOpen, setFormOpen] = useState(false);
  const [error, setError] = useState('');
  const [collection, setCollection] = useState(null);
  const { firestoreUser } = useAuth();
  const { watchlist, addToWatchlist, addUserAlert } = useFirestore();

  const handleSubmit = (values) => {
    if (values.openSea) {
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
        addToWatchlist([...watchlist, collection]);
      } catch (error) {
        console.log(error);
        alert('Woops! Something went wrong');
      }
    }
    addAlert(
      { ...values, target: Number(values.target), slug: collection.name },
      firestoreUser
    );
    addUserAlert({
      ...values,
      slug: collection.name,
      target: Number(values.target),
      active: true,
    });
    setCollection(null);
    setFormOpen(false);
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
      type: 'select',
      name: 'watchlist',
      data: watchlist,
      label: 'Select from watchlist',
      onChangeAction: setCollection,
    },
    {
      type: 'input',
      label: 'OpenSea Link',
      placeholder: 'https://opensea.io/collection/boredapeyachtclub',
      name: 'openSea',
      action: searchByOpensea,
      actionTitle: 'Search',
    },
    {
      type: 'select',
      label: 'Select alert type',
      name: 'alertType',
      data: [
        { slug: 'market_cap', name: 'Market Cap' },
        { slug: 'floor_price', name: 'Floor price' },
        { slug: 'average_price', name: 'Avg Price' },
      ],
    },
    {
      type: 'input',
      label: 'Target',
      placeholder: '10',
      name: 'target',
    },
  ];

  return (
    <div className='w-full'>
      {isFormOpen && (
        <Formik
          validationSchema={validationSchema}
          initialValues={{ watchlist: '', openSea: '' }}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
            setFieldValue,
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
                                  item.name === 'watchlist'
                                    ? setCollection(
                                        watchlist.find(
                                          (i) =>
                                            i.token_address === e.target.value
                                        )
                                      ) && handleChange(e)
                                    : null;
                                  handleChange(e);
                                }}
                                value={values[item.name]}
                                onBlur={handleBlur}
                                className='block w-1/2 px-4 text-white py-2 mt-2 text-sm placeholder-gray-600 bg-transparent border border-gray-600 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50'
                              >
                                <option value=''>Select a collection</option>
                                {item.data.map((option, idx) => {
                                  return (
                                    <option
                                      value={
                                        option.token_address || option.slug
                                      }
                                      key={idx}
                                    >
                                      {option.name}
                                    </option>
                                  );
                                })}
                              </select>
                            ) : (
                              <input
                                {...item}
                                onChange={handleChange}
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
      <button
        onClick={() => {
          setFormOpen(!isFormOpen);
          setCollection(null);
        }}
        className={`${
          isFormOpen
            ? 'bg-transparent border border-indigo-600'
            : 'bg-indigo-600'
        } py-2 px-2 rounded-lg w-full my-4 hover:bg-indigo-400 text-white`}
      >
        {isFormOpen ? 'Close' : 'Add new'}
      </button>
    </div>
  );
}
