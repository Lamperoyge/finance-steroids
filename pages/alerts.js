import CreateAlert from 'components/alerts/create';
import { useFirestore } from 'context/FirestoreContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteAlert } from 'services/firestore';

const typesMap = {
  market_cap: 'Market Cap',
  floor_price: 'Floor Price',
  average_price: 'Average Price',
};

const triggerType = {
  dropsBelow: 'Drops below',
  lessThanOrEqualsTo: 'Drops below or is equal',
  equals: 'Equals',
  risesAbove: 'Rises above',
  risesAboveOrEquals: 'Rises above or is equal',
};

const frequencyMap = {
  once: 'Once',
  daily: 'Daily',
  everytime: 'Everytime target is hit',
};
export default function AlertsPage() {
  const { alerts, deleteUserAlert } = useFirestore();
  const handleDelete = (id) => {
    deleteAlert(id);
    deleteUserAlert(id);
  };
  return (
    <div className='w-full'>
      <div className='w-full'>
        <CreateAlert />
      </div>
      <div className='p-6 bg-gray-900 rounded-lg'>
        <div className='flex justify-between items-center pb-4'>
          <h2 className='text-xl font-semibold leading-loose text-white'>
            Alerts
          </h2>
        </div>
        <table className='w-full'>
          <thead>
            <tr className='text-sm font-semibold text-white'>
              <td className='py-4 border-b border-gray-700'>Collection</td>
              <td className='py-4 border-b border-gray-700'>Type</td>
              <td className='py-4 border-b border-gray-700'>Trigger</td>
              <td className='py-4 border-b border-gray-700'>Target</td>
              <td className='py-4 border-b border-gray-700'>Frequency</td>
              <td className='py-4 border-b border-gray-700'>Active</td>
              <td className='py-4 border-b border-gray-700'>Actions</td>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert, idx) => {
              return (
                <tr key={idx} className='text-sm text-gray-500'>
                  <td className='py-4'>{alert.slug || 'Doodles'}</td>

                  <td className='py-4'>
                    {typesMap[alert.alertType] || 'Alert type'}
                  </td>
                  <td className='py-4'>
                    {triggerType[alert.triggerCondition] || 'trigger'}
                  </td>

                  <td className='py-4'>{alert.target || ''}</td>
                  <td className='py-4'>
                    {frequencyMap[alert.frequency] || 'trigger'}
                  </td>
                  <td className='py-4'>
                    {alert.active ? 'Active' : 'Inactive'}
                  </td>
                  <td className='py-4'>
                    <FontAwesomeIcon
                      className='cursor-pointer'
                      icon={faTrash}
                      onClick={() => handleDelete(alert.id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
