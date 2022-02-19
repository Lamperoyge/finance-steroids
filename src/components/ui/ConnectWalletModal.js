import { Dialog, Transition } from '@headlessui/react';
import { useEffect, Fragment } from 'react';
import MetamaskLogo from './icons/metamask';
import WalletConnectLogo from './icons/walletconnect';
import useWallet from 'hooks/useWallet';
const URLS = [
  'https://mainnet.infura.io/v3/8dcf0b36b67249d1b12b34806a67aba0',
  'https://ropsten.infura.io/v3/8dcf0b36b67249d1b12b34806a67aba0',
];

export default function ConnectWalletModal({ isOpen, setIsOpen, callback }) {
  const { connectMetamask, wallets, connectWalletConnect, error, setError } =
    useWallet();

  useEffect(() => {
    setError('');
    if (isOpen) document.getElementById('__next').style.opacity = '0.7';
    else document.getElementById('__next').style.opacity = '1';
  }, [isOpen]);

  useEffect(() => {
    if (wallets.length) callback(wallets);
  }, [wallets]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const config = [
    {
      title: 'Metamask',
      icon: () => <MetamaskLogo />,
      action: () => connectMetamask(),
    },
    {
      title: 'WalletConnect',
      icon: () => <WalletConnectLogo />,
      action: () => connectWalletConnect(),
    },
  ];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={closeModal}
      >
        <div className='min-h-screen px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-800 shadow-xl rounded-2xl'>
              <Dialog.Title
                as='h3'
                className='text-lg text-center py-4 font-medium leading-6 text-white'
              >
                Connect your wallet
              </Dialog.Title>
              <div className='w-full flex flex-col justify-around items-center'>
                <div className='flex justify-around items-center w-full'>
                  {config.map((item, idx) => {
                    return (
                      <div
                        key={idx}
                        onClick={item.action}
                        className='cursor-pointer flex flex-col justify-center text-white items-center'
                      >
                        {item.icon()}
                        {item.title}
                      </div>
                    );
                  })}
                </div>
                {error && (
                  <span className='m-4 text-center text-red-400 w-full'>
                    {error}
                  </span>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
