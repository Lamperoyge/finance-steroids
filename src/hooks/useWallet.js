import { ethers, providers } from 'ethers';
import { useState, useEffect } from 'react';
import WalletConnectProvider from '@walletconnect/web3-provider';

const provider = new WalletConnectProvider({
  infuraId: '8dcf0b36b67249d1b12b34806a67aba0',
});

export default function useWallet() {
  const [error, setError] = useState(null);
  const [wallets, setWallets] = useState([]);

  const connectWalletConnect = async () => {
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    await provider.enable();

    provider.on('accountsChanged', (accounts) => {
      if (!wallets.includes(accounts[0])) {
        setWallets([...wallets, accounts[0]]);
      } else setError('This account is already added');
    });
    provider.on('disconnect', (code, reason) => {
      console.log(code, reason);
    });
  };

  const connectMetamask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    try {
      await signer.signMessage(
        'Welcome to floordle! Please sign this message to confirm your account'
      );
      if (!wallets.includes(accounts[0])) {
        setWallets([...wallets, accounts[0]]);
      } else setError('This account is already added');
    } catch (error) {
      setError(
        'Please sign the message to confirm the ownership of the account'
      );
    }
  };
  return {
    connectMetamask,
    error,
    setError,
    connectWalletConnect,
    wallets,
  };
}
