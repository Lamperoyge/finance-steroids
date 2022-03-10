import Moralis from 'utils/moralis';
import axios from 'axios';

export default async function (req, res) {
  try {
    const options = {
      address: req.body.address,
      limit: '10',
      format: 'decimal',
    };
    if (req.body.cursor) options.cursor = req.body.cursor;
    // const response = await Moralis.Web3API.account.getNFTTransfers(options);
    const { data } = await axios.get(
      `https://deep-index.moralis.io/api/v2/nft/${options.address}/transfers?chain=eth&format=decimal&limit=10`,
      {
        headers: {
          'X-API-Key': process.env.MORALIS_API_KEY,
        },
      }
    );
    res.status(200).json({ response: data });
  } catch (error) {
    res.status(500).json({ error });
  }
}
