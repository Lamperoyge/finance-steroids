import axios from 'axios';

export default async function searchNFTs(req, res) {
  try {
    const { data } = await axios.get(
      `https://api.opensea.io/api/v1/collection/${req.body.slug}`
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
  }
}
