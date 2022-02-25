import { createCheckoutSession } from '../stripe/createCheckoutSession';
import withAuth from 'hocs/withAuth';
import { useState } from 'react';
import { useAuth } from 'context/AuthContext';

function Plans({ firestoreUser }) {
  const plans = [
    {
      id: 'price_1KS55QLaJUYuY17381reKDqb',
      key: 1,
      title: '1 month',
      price: '14.99$',
      billingPeriod: '/ month',
    },
    {
      id: 'price_1KS55QLaJUYuY17381reKDqb',
      title: '3 months',
      key: 2,
      billingPeriod: '/ 3 months',
      price: '13.99$',
    },
    {
      id: 'price_1KS55QLaJUYuY17381reKDqb',
      title: '6 months',
      billingPeriod: '/ 6 months',
      key: 3,
      price: '11.99$',
    },
    {
      id: 'price_1KS55QLaJUYuY17381reKDqb',
      title: '1 year',
      billingPeriod: '/ year',
      key: 4,
      price: '9.99$',
    },
  ];

  const [plan, setPlan] = useState(plans[0]);

  const handleSubscription = () =>
    createCheckoutSession(firestoreUser.id, plan.id);

  const { logout } = useAuth();
  return (
    <div className='bg-indigo-600 h-full w-full flex flex-col'>
      <section
        id='pricing'
        className='bg-indigo-600 py-8 leading-7 text-gray-900 sm:py-12 md:py-16 lg:py-24'
      >
        <div className='box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-7xl'>
          <div className='flex flex-col items-center leading-7 text-center text-gray-900 border-0 border-gray-200'>
            <h2 className='box-border m-0 text-3xl font-semibold leading-tight tracking-tight text-white border-solid sm:text-4xl md:text-5xl'>
              Simple, Transparent Pricing
            </h2>
            <p className='box-border mt-2 text-xl text-white border-solid sm:text-2xl'>
              Pricing to fit the needs of any companie size.
            </p>
          </div>
          <div className='grid grid-cols-1 gap-4 mt-4 leading-7 text-gray-900 border-0 border-gray-200 sm:mt-6 sm:gap-4 md:mt-8 md:gap-0'>
            <div className='relative z-20 flex flex-col items-center max-w-md p-4 mx-auto my-0 bg-white border-4 border-indigo-600 border-solid rounded-lg sm:p-6 md:px-8 md:py-16'>
              <h3 className='m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-3xl md:text-4xl'>
                Personal
              </h3>
              <div className='flex items-end mt-6 leading-7 text-gray-900 border-0 border-gray-200'>
                <p className='box-border m-0 text-6xl font-semibold leading-none border-solid'>
                  {plan.price}
                </p>
                <p
                  className='box-border text-center m-0 border-solid'
                  style={{ borderImage: 'initial' }}
                >
                  {plan.billingPeriod}
                </p>
              </div>
              <p className='text-indigo-800 font-light text-center mt-6 mb-5 leading-normal text-left text-gray-900 border-0 border-gray-200'>
                Free trial for 7 days. <br />
                After this period ends you will be charged: <br />
                {plan.price} {plan.billingPeriod}
              </p>
              <h1>Choose your billing period</h1>
              <div className='grid grid-cols-2 sm:grid-cols-4'>
                {plans.map((item, idx) => {
                  return (
                    <div
                      onClick={() => setPlan(item)}
                      className={`cursor-pointer flex justify-center items-center py-1 text-center px-2 m-2 border rounded-md text-sm sm:text-xs font-semibold ${
                        plan.key === item.key
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : ''
                      }`}
                      key={idx}
                    >
                      {item.title}
                    </div>
                  );
                })}
              </div>
              <ul className='flex-1 p-0 mt-4 leading-7 text-gray-900 border-0 border-gray-200'>
                <li className='inline-flex items-center block w-full mb-2 ml-5 font-semibold text-left border-solid'>
                  <svg
                    className='w-5 h-5 mr-2 font-semibold leading-7 text-indigo-600 sm:h-5 sm:w-5 md:h-6 md:w-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    ></path>
                  </svg>
                  Crypto & NFTs
                </li>
                <li className='inline-flex items-center block w-full mb-2 ml-5 font-semibold text-left border-solid'>
                  <svg
                    className='w-5 h-5 mr-2 font-semibold leading-7 text-indigo-600 sm:h-5 sm:w-5 md:h-6 md:w-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    ></path>
                  </svg>
                  Stocks
                </li>
                <li className='inline-flex items-center block w-full mb-2 ml-5 font-semibold text-left border-solid'>
                  <svg
                    className='w-5 h-5 mr-2 font-semibold leading-7 text-indigo-600 sm:h-5 sm:w-5 md:h-6 md:w-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    ></path>
                  </svg>
                  Real estate, business & other ventures
                </li>
                <li className='inline-flex items-center block w-full mb-2 ml-5 font-semibold text-left border-solid'>
                  <svg
                    className='w-5 h-5 mr-2 font-semibold leading-7 text-indigo-600 sm:h-5 sm:w-5 md:h-6 md:w-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M5 13l4 4L19 7'
                    ></path>
                  </svg>
                  Analytics
                </li>
              </ul>
              <button
                onClick={handleSubscription}
                className='inline-flex justify-center w-full px-4 py-3 mt-8 font-sans text-sm leading-none text-center text-white no-underline bg-indigo-600 border rounded-md cursor-pointer hover:bg-indigo-700 hover:border-indigo-700 hover:text-white focus-within:bg-indigo-700 focus-within:border-indigo-700 focus-within:text-white sm:md:text-lg'
              >
                Subscribe
              </button>
              <h1 onClick={logout} className='text-indigo-600 mt-2'>
                Cancel
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default withAuth(Plans);
