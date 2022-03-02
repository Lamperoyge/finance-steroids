import Moralis from 'utils/moralis';
import axios from 'axios';

export default async function searchNFTs(req, res) {
  try {
    const { data } = axios.get(
      `https://api.opensea.io/api/v1/asset_contract/${req.body.address}`
    );
    res
      .status(200)
      .json({
        data,
        market_cap: data.stats.market_cap,
        average_price: data.stats.average_price,
        floor_price: data.stats.floor_price,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error getting NFT', error: error });
  }
}
