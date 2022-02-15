import ActionCardLayout from './ActionCardLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import ConnectWalletModal from 'components/ui/ConnectWalletModal';
import { useState } from 'react';
const wallets = [
  '0x6155f139cD692496F24BB127F54eAc3b38CB06EE',
  '0x6155f139cD692496F24BB127F54eAc3b38CB06EE',
  '0x6155f139cD692496F24BB127F54eAc3b38CB06EE',
  '0x6155f139cD692496F24BB127F54eAc3b38CB06EE',
];

export default function WalletsActionCard() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <ActionCardLayout title='Wallets'>
      <button
        onClick={() => setOpenModal(true)}
        className='rounded-full w-1/6 hover:bg-indigo-400 font-semibold py-1 mt-2 text-xs bg-indigo-600 text-center flex justify-center items-center text-white'
      >
        Add
      </button>
      <ConnectWalletModal isOpen={openModal} setIsOpen={setOpenModal} />
      <ul className='mt-4 divide-y'>
        {wallets.map((wallet, idx) => {
          return (
            <li
              key={idx}
              className={
                'flex justify-between mr-2 hover:text-gray-900 cursor-pointer tracking-wide	text-sm text-gray-600 p-1'
              }
            >
              <div>
                {wallet.slice(0, 12)}
                <span className='text-xs text-gray-400'>......</span>
                {wallet.slice(-12)}
              </div>
              <Link passHref href={`/wallets/${wallet}`}>
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
