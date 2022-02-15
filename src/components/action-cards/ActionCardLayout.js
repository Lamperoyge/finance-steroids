import Link from 'next/link';
export default function ActionCardLayout({ title, link, children }) {
  return (
    <div className='bg-white shadow-xl m-4 max-w-xl sm:max-w-sm rounded-xl p-6'>
      <h1 className='text-gray-900 font-semibold text-md'>{title}</h1>
      {children}
    </div>
  );
}
