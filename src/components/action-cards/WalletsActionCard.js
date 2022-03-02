import ActionCardLayout from './ActionCardLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import ConnectWalletModal from 'components/ui/ConnectWalletModal';
import { useState, useEffect } from 'react';
import { useFirestore } from 'context/FirestoreContext';

export default function WalletsActionCard() {
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
    <ActionCardLayout title='Wallets'>
      <button
        onClick={() => setOpenModal(true)}
        className='rounded-full w-1/6 hover:bg-indigo-400 font-semibold py-1 mt-2 text-xs bg-indigo-600 text-center flex justify-center items-center text-white'
      >
        Add
      </button>
      <ConnectWalletModal
        callback={walletCallback}
        isOpen={openModal}
        setIsOpen={setOpenModal}
      />
      <ul className='mt-4 divide-y'>
        {wallets &&
          wallets?.map((wallet, idx) => {
            return (
              <li
                key={idx}
                className={
                  'flex justify-between mr-2 hover:text-gray-900 cursor-pointer tracking-wide	text-sm text-gray-600 p-1'
                }
              >
                <div>
                  {wallet.publicKey.slice(0, 12)}
                  <span className='text-xs text-gray-400'>......</span>
                  {wallet.publicKey.slice(-12)}
                </div>
                <Link passHref href={`/wallets/${wallet.publicKey}`}>
                  <a>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </a>
                </Link>
              </li>
            );
          })}
      </ul>
    </ActionCardLayout>
  );
}
