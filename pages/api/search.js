import Moralis from 'utils/moralis';

export default async function searchNFTs(req, res) {
  const options = { q: req.body.keyword, chain: 'eth', filter: 'name' };
  try {
    const NFTs = await Moralis.Web3API.token.searchNFTs(options);
    res.status(200).json({ response: NFTs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error getting NFT', error: error });
  }
}
