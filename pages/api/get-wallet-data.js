import { ethers } from 'react';
const Moralis = require('moralis/node');

const serverUrl = 'https://xdwpxmthbr7x.usemoralis.com:2053/server';
const appId = 'ZQKlp0YWUD7FN9d8ROABwY6pdxdPb8RqA6zyIRhp';

Moralis.start({ serverUrl, appId });

export default async function getWalletData(req, res) {
  try {
    const NFTs = await Moralis.Web3API.account.getNFTs({
      chain: 'rinkeby', //temporary
      address: req.body.address,
    });
    res.status(200).json({ response: NFTs });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error getting wallet data', error: error });
  }
}
