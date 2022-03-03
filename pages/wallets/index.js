import { useAuth } from 'context/AuthContext';
import { useFirestore } from 'context/FirestoreContext';
import { deleteUserWallet } from 'services/firestore';

export default function WalletsPage() {
  const { firestoreUser } = useAuth();
  const { wallets } = useFirestore();

  return (
    <>
      {wallets.map((wallet, idx) => {
        return (
          <div key={idx} className='p-6 bg-gray-900 rounded-lg'>
            <div className='flex justify-between items-center pb-4'>
              <h2 className='text-xl font-semibold leading-loose text-white'>
                {wallet.publicKey}
              </h2>
              <button
                type='button'
                onClick={() => deleteUserWallet(wallet, firestoreUser.id)}
                className='text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-transparent border border-indigo-600 hover:border-red-400 hover:text-red-400'
              >
                Delete
              </button>
            </div>
            <table className='w-full'>
              <thead>
                <tr className='text-sm font-semibold text-white'>
                  <td className='py-4 border-b border-gray-700'>Asset</td>
                  <td className='py-4 border-b border-gray-700'>Name</td>
                  <td className='py-4 border-b border-gray-700'>Address</td>
                  <td className='py-4 border-b border-gray-700'>Token ID</td>
                </tr>
              </thead>
              <tbody>
                {wallet.portfolio?.map((item, idx) => {
                  let img = '/favicon.png';
                  const metadata = JSON.parse(item.metadata);
                  if (metadata && metadata.image)
                    img =
                      'https://ipfs.io/ipfs/' +
                      metadata.image.split('ipfs://').pop();
                  return (
                    <tr key={idx} className='text-sm text-gray-500'>
                      <td className='py-4 w-1/4'>
                        <div className='flex gap-4 items-center'>
                          <img width='48' src={img} alt='' />
                        </div>
                      </td>
                      <td className='py-4 w-1/4'>{item.name}</td>

                      <td className='py-4 w-1/4'>
                        {item.token_address.slice(0, 8)}
                        <span>...</span>
                        {item.token_address.slice(-4)}
                      </td>
                      <td className='py-4 w-1/4'>#{item.token_id}</td>
                    </tr>
                  );

                  /* <tr key={idx} className='text-sm text-gray-500'>
                <td className='py-4 w-1/4'>
                  <div className='flex gap-4 items-center'>
                    <img width='48' src={img} alt='' />
                  </div>
                </td>
                <td className='py-4 w-1/4'>{order.name}</td>

                <td className='py-4 w-1/4'>
                  {order.token_address.slice(0, 8)}
                  <span>...</span>
                  {order.token_address.slice(-4)}
                </td>
                <td className='py-4 w-1/4'>#{order.token_id}</td>
              </tr> */
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}
