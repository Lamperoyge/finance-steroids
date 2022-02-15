import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Dialog, Transition } from '@headlessui/react';
import { useEffect, Fragment } from 'react';
import MetamaskLogo from './icons/metamask';
import WalletConnectLogo from './icons/walletconnect';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
const URLS = [
  'https://mainnet.infura.io/v3/8dcf0b36b67249d1b12b34806a67aba0',
  'https://ropsten.infura.io/v3/8dcf0b36b67249d1b12b34806a67aba0',
];

//todo change web3-react to default web3
export const walletlink = new WalletLinkConnector({
  url: URLS[1],
  appName: 'floordle',
  supportedChainIds: [1, 4],
});

const walletconnect = new WalletConnectConnector({
  rpc: { 1: URLS[0], 4: URLS[1] },
  infuraId: '8dcf0b36b67249d1b12b34806a67aba0',
  qrcode: true,
  pollingInterval: 15000,
});

export function resetWalletConnector(connector) {
  if (connector && connector instanceof WalletConnectConnector) {
    connector.walletConnectProvider = undefined;
  }
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4],
});

export default function ConnectWalletModal({ isOpen, setIsOpen }) {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  console.log(account, active, connector);

  useEffect(() => {
    if (isOpen) document.getElementById('__next').style.opacity = '0.2';
    else document.getElementById('__next').style.opacity = '1';
  }, [isOpen]);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  async function connectWalletConnect() {
    try {
      await disconnect();
      resetWalletConnector(walletconnect);
      console.log('here');
      await activate(walletconnect);
    } catch (error) {
      console.log(error);
    }
  }

  async function connectMetamask() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
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
            <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
              <Dialog.Title
                as='h3'
                className='text-lg text-center py-4 font-medium leading-6 text-gray-900'
              >
                Connect your wallet
              </Dialog.Title>
              <div className='w-full flex justify-around items-center'>
                {config.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      onClick={item.action}
                      className='cursor-pointer flex flex-col justify-center items-center'
                    >
                      {item.icon()}
                      {item.title}
                    </div>
                  );
                })}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
