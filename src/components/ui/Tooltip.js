import { mobileCheck } from 'utils';
export default function Tooltip({ content = 'Tooltip content' }) {
  const isMobile = mobileCheck();
  if (isMobile) return null;
  return (
    <div
      role='tooltip'
      className='inline-block absolute z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 left-0 rounded-lg shadow-sm opacity-0 hover:opacity-100 transition-opacity duration-300 tooltip dark:bg-gray-700'
    >
      {content}
    </div>
  );
}
