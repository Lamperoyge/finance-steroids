import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
export default function Spinner() {
  return (
    <div className='w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50'>
      <span className='w-full flex justify-center text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0'>
        <FontAwesomeIcon
          className='fa-spin text-indigo-600'
          style={{ fontSize: '10vh' }}
          icon={faCircleNotch}
        />
      </span>
    </div>
  );
}
