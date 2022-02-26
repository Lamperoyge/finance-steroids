import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import ConnectWalletModal from 'components/ui/ConnectWalletModal';
import { useState } from 'react';
import { useFirestore } from 'context/FirestoreContext';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export default function Wallets() {
  const [openModal, setOpenModal] = useState(false);
  const { addUserWallet, wallets } = useFirestore();

  const walletCallback = async (connectedWallets) => {
    setOpenModal(false);
    try {
      addUserWallet(connectedWallets.pop());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col p-6 w-full m-2 sm:m-0 sm:w-auto bg-gray-900 rounded-lg gap-y-6'>
      <ConnectWalletModal
        callback={walletCallback}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      />
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-semibold leading-loose text-white'>
          Wallets
        </h2>
        <button className='flex gap-x-2.5 py-3 px-4 rounded-lg border border-gray-700'>
          <FontAwesomeIcon className='text-white' icon={faChevronDown} />
          <span className='text-sm text-white'>ETH</span>
        </button>
      </div>
      <hr className='border-gray-700' />
      <div className='flex flex-col gap-y-4'>
        {wallets &&
          wallets?.map((wallet, idx) => {
            console.log(wallet);
            return (
              <div key={idx} className='flex gap-x-4 items-center'>
                <Link href={`wallets/${wallet.publicKey}`}>
                  <FontAwesomeIcon
                    className='text-white cursor-pointer'
                    icon={faArrowUpRightFromSquare}
                  />
                </Link>

                <div className='flex flex-col gap-y-0.5'>
                  <div className='text-sm font-medium text-white'>
                    {wallet.publicKey.slice(0, 12)}
                    <span className='text-xs text-gray-400'>......</span>
                    {wallet.publicKey.slice(-12)}
                  </div>
                  <a href={`https://etherscan.io/address/${wallet.publicKey}`}>
                    <div className='hover:underline text-xs text-gray-500'>
                      View on etherscan
                    </div>
                  </a>
                </div>
              </div>
            );
          })}
      </div>
      <div className='w-full flex flex-col justify-center items-center'>
        <button
          type='button'
          onClick={() => setOpenModal(true)}
          className='m-4 hover:bg-primary text-center py-3.5 rounded-lg w-full border border-primary text-white text-sm font-semibold'
        >
          Connect new wallet
        </button>
        <Link href='/wallets'>
          <a className='hover:bg-primary text-center py-3.5 rounded-lg w-full border border-primary text-white text-sm font-semibold'>
            View all
          </a>
        </Link>
      </div>
    </div>
  );
}
