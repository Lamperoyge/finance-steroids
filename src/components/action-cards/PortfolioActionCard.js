import ActionCardLayout from './ActionCardLayout';
import Pie from 'components/graphs/Pie';
import { useFirestore } from 'context/FirestoreContext';
export default function PortfolioCard() {
  const { wallets } = useFirestore();
  const syncWallets = wallets.map((wallet) => [...wallet.portfolio]).flat();

  const combinedData = syncWallets.reduce((acc, obj) => {
    if (acc[obj.token_address]) {
      acc[obj.token_address] = {
        value: acc[obj.token_address].value + 1,
        name: obj.name,
      };
      return acc;
    } else {
      console.log(obj.name);
      acc[obj.token_address] = {
        value: 0,
        name: obj.name,
      };
      return acc;
    }
  }, {});

  const pieData = Object.keys(combinedData).map((i, idx) => {
    return {
      value: combinedData[i].value,
      label: combinedData[i].name,
      id: combinedData[i].name,
    };
  });
  console.log(pieData);
  return (
    <ActionCardLayout classes={'h-1/2'} title='Portfolio'>
      <div className='h-full'>
        <Pie data={pieData} />
      </div>
    </ActionCardLayout>
  );
}
