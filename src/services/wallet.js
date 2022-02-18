import axios from 'axios';

export async function getNftBalance(address) {
  try {
    const { data } = await axios.post('/api/get-wallet-data', { address });
    return data.response.result;
  } catch (error) {
    throw new Error(
      error.message || 'Woops, something went wrong reading on-chain data'
    );
  }
}
