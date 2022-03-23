import { TourProvider } from '@reactour/tour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Link from 'next/link';
const Close = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className='absolute right-2 rounded-lg text-white top-2 bg-indigo-600 py-1 px-2 text-sm font-semibold hover:bg-indigo-400 border border-indigo-600'
    >
      Close
    </button>
  );
};

const Button = ({ onClick, title }) => {
  return (
    <button
      type='button'
      onClick={onClick}
      className='relative self-start inline-block w-auto px-4 py-2 mx-auto mt-0 font-bold text-white bg-indigo-600 border-t border-gray-200 rounded-md shadow-xl sm:mt-1 fold-bold lg:mx-0'
    >
      {title}
    </button>
  );
};

const steps = [
  {
    selector: '#dashboard-sidebar',
    content: ({ setCurrentStep, setIsOpen }) => {
      return (
        <div>
          <h1 className='text-xl text-gray-900 font-bold'>
            Welcome to Floordle! 🚀
          </h1>
          <div>Hop on a quick tour to learn how to use the platform.</div>
          <div className='flex justify-around mt-4 items-center'>
            <button
              type='button'
              onClick={() => setCurrentStep(1)}
              className='relative self-start inline-block w-auto px-4 py-2 mx-auto mt-0 font-bold text-white bg-indigo-600 border-t border-gray-200 rounded-md shadow-xl sm:mt-1 fold-bold lg:mx-0'
            >
              Start
            </button>
            <button
              type='button'
              onClick={() => setIsOpen(false)}
              className='relative self-start inline-block w-auto px-4 py-2 mx-auto mt-0 font-bold text-indigo-600 bg-white border border-indigo-600 rounded-md shadow-xl sm:mt-1 fold-bold lg:mx-0'
            >
              Skip
            </button>
          </div>
        </div>
      );
    },
    position: 'right',
  },
  {
    selector: '#wallets-card',
    content: () => (
      <div>
        <h1 className='text-xl text-gray-900 font-bold'>Wallets section</h1>
        <div className='py-2'>
          Link your wallets in order to sync them and visualise all your NFTs
        </div>
      </div>
    ),
  },
  {
    selector: '#home-overview-card',
    content: () => (
      <div>
        <h1 className='text-xl text-gray-900 font-bold'>Overview</h1>
        <div className='py-2'>
          Here you will get an overview of the collections in your wallet
        </div>
      </div>
    ),
  },
  {
    selector: '#home-stats-card',
    content: () => (
      <div>
        <h1 className='text-xl text-gray-900 font-bold'>Stats</h1>
        <div className='py-2'>
          Here you will see the collections from your watchlist and their stats
        </div>
      </div>
    ),
  },
  {
    selector: '#watchlist-sidebar',
    position: 'right',
    stepInteraction: true,
    content: () => (
      <div>
        <h1 className='text-xl text-gray-900 font-bold'>Finish</h1>
        <div className='py-2'>
          Great! Now go to the watchlist section and add a collection to the
          watchlist
        </div>
        <Link href='/watchlist' passHref>
          <a className='mt-2 font-semibold underline cursor-pointer text-indigo-600 hover:text-indigo-400'>
            Watchlist{' '}
          </a>
        </Link>
      </div>
    ),
  },
];

export default function OnboardingTour({ children }) {
  const disableBody = (target) => disableBodyScroll(target);
  const enableBody = (target) => enableBodyScroll(target);

  return (
    <>
      <TourProvider
        afterOpen={disableBody}
        beforeClose={enableBody}
        showCloseButton={true}
        disableInteraction={true}
        onClickMask={() => {}}
        steps={steps}
        components={{ Close }}
        nextButton={({
          currentStep,
          stepsLength,
          setIsOpen,
          setCurrentStep,
        }) => {
          const first = currentStep === 0;
          if (first) return null;
          const last = currentStep === stepsLength - 1;
          return (
            <Button
              onClick={() => {
                if (last) {
                  setIsOpen(false);
                } else {
                  setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1));
                }
              }}
              title={last ? 'Close' : 'Next'}
            />
          );
        }}
        prevButton={({ currentStep, setCurrentStep }) => {
          const first = currentStep === 0;
          if (first) return null;
          return (
            <Button
              onClick={() => {
                if (first) {
                  setCurrentStep((s) => steps.length - 1);
                } else {
                  setCurrentStep((s) => s - 1);
                }
              }}
              title='Prev'
            />
          );
        }}
      >
        {children}
      </TourProvider>
    </>
  );
}
