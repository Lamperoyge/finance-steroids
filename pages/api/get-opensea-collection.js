import axios from 'axios';

export default async function searchNFTs(req, res) {
  try {
    const { data } = await axios.get(
      `https://api.opensea.io/api/v1/collection/${req.body.slug}`
    );
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
}
