import { useFirestore } from 'context/FirestoreContext';
import Chart from 'components/chart';
import Reports from 'components/holdings/Reports';
export default function Portfolio() {
  return (
    <div className='h-full'>
      <div className='h-1/2'>
        <div className='p-6 mb-8 bg-gray-900 rounded-lg'>
          <Chart />
        </div>
        <Reports />
      </div>
    </div>
  );
}
