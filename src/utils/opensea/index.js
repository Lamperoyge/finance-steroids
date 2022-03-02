import axios from 'axios';

export async function searchNFTsBySlug(slug) {
  try {
    const { data } = await axios.get(
      `https://api.opensea.io/api/v1/collection/${slug}`
    );
    return {
      data,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getStats(slug) {
  try {
    const { data } = await axios.get(
      `https://api.opensea.io/api/v1/collection/${slug}/stats`
    );
    return { ...data };
  } catch (error) {
    console.log(error);
  }
}
export async function searchNFTsByAddress(address) {
  try {
    const { data } = await axios.get(
      `https://api.opensea.io/api/v1/asset_contract/${address}`
    );

    const stats = await getStats(data.collection.slug);
    return {
      ...data,
      ...stats,
      market_cap: stats.stats.market_cap,
      average_price: stats.stats.average_price,
      floor_price: stats.stats.floor_price,
    };
  } catch (error) {
    console.log(error);
  }
}
