const Moralis = require('moralis/node');

const serverUrl = process.env.MORALIS_SERVER_URL;
const appId = process.env.MORALIS_APP_ID;

Moralis.start({ serverUrl, appId });

export default async function getWalletData(req, res) {
  try {
    const NFTs = await Moralis.Web3API.account.getNFTs({
      chain: 'matic',
      address: req.body.address,
    });
    res.status(200).json({ response: NFTs });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error getting wallet data', error: error });
  }
}
