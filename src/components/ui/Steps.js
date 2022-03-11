import { useState } from 'react';

const steps = [
  {
    title: 'Step 1',
    subtitle: 'Link your wallets',
    content:
      'Register and select a plan. After that you can link your wallets in order to generate insights. <br /> <i class="mt-2">This action is completely safe and we will never ask for your private keys.</i>',
  },
  {
    title: 'Step 2',
    subtitle: 'Create watchlists',
    content:
      'Head over to the Watchlist section where you can filter the NFT collections and add them to your watchlists. <br />You can create as many watchlists as you need and get valuable data about the collection',
  },
  {
    title: 'Step 3',
    subtitle: 'Observe your collections',
    content:
      'We streamline the trading process for NFTs and give you insights about your collections. <br /> Understand how your crypto assets are performing and make the right decisions during market moves',
  },
];

export default function Steps() {
  const [step, setStep] = useState(steps[0]);
  return (
    <section
      className='w-full px-8 py-12 md:py-16 bg-whitexl:px-0'
      x-data="{ section: 'design' }"
    >
      <h2 className='text-center font-bold box-border m-0 text-3xl leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-500 border-solid sm:text-4xl md:text-5xl'>
        Get started easily
      </h2>
      <p className='text-center py-4 text-center text-xl text-gray-600 font-semibold'>
        {'Gain valuable insights on your NFT portfolio with 3 simple steps'}
      </p>
      <div className='mt-16 flex flex-col max-w-6xl px-3 mx-auto md:px-0 lg:px-8 xl:px-0 md:flex-row'>
        <div className='w-full pr-5 mb-6 space-y-1 md:mb-0 md:space-y-4 md:w-4/12 xl:pr-12'>
          {steps.map((i, idx) => {
            return (
              <h2
                key={idx}
                onClick={() => setStep(steps[idx])}
                className={`pb-2 text-5xl font-extrabold cursor-pointer lg:text-6xl ${
                  step.title === i.title
                    ? 'text-black'
                    : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                {i.title}
              </h2>
            );
          })}
        </div>
        <div className='relative w-full mt-6 overflow-hidden md:mt-1 md:w-9/12'>
          <div key={'transition-key'} className='w-full space-y-6'>
            <h3 className='text-2xl font-bold leading-7'>{step.subtitle}</h3>
            <div className='sm:py-10 font-normal leading-none text-gray-700 md:text-lg'>
              <div
                className='leading-6'
                dangerouslySetInnerHTML={{ __html: step.content }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
