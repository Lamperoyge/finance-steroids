import { useState } from 'react';
import Link from 'next/link';
const config = [
  {
    title: 'Home',
    link: '#',
  },
  {
    title: 'Features',
    link: '/#features',
  },
  {
    title: 'Pricing',
    link: '/#pricing',
  },
];

const buttonsConfig = [
  {
    title: 'Get started',
    link: '/#join',
  },
];

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className='relative z-50 w-full h-24'>
      <div className='container flex items-center justify-center h-full max-w-6xl px-8 mx-auto sm:justify-between xl:px-0'>
        <Link href='/'>
          <a
            href='/'
            className='relative flex items-center inline-block h-5 h-full font-black leading-none'
          >
            <span className='ml-3 text-xl text-gray-800'>
              trackem<span className='text-indigo-600'>.</span>
            </span>
          </a>
        </Link>
        <nav
          className={`absolute top-0 left-0 z-50 flex-col items-center justify-between w-full h-64 pt-5 mt-24 text-sm text-gray-800 bg-white border-t border-gray-200 shadow-xl md:shadow-none md:flex md:w-auto md:flex-row md:h-24 lg:text-base md:bg-transparent md:mt-0 md:border-none md:py-0 md:relative ${
            isOpen ? 'flex fixed' : 'hidden'
          }`}
        >
          {config.map((item, idx) => {
            return (
              <Link key={idx} href={item.link}>
                <a
                  href={item.link}
                  className='ml-0 mr-0 font-bold duration-100 md:ml-12 md:mr-3 lg:mr-8 transition-color hover:text-indigo-600'
                >
                  {item.title}
                </a>
              </Link>
            );
          })}

          <div className='flex flex-col block w-full font-medium border-t border-gray-200 md:hidden'>
            {buttonsConfig.map((item, idx) => {
              return (
                <Link key={idx} href={item.link}>
                  <a className='relative inline-block w-full px-5 py-3 text-sm leading-none text-center text-white bg-indigo-600 fold-bold'>
                    {item.title}
                  </a>
                </Link>
              );
            })}
          </div>
        </nav>
        <div className='absolute left-0 flex-col items-center justify-center hidden w-full pb-8 mt-48 border-b border-gray-200 md:relative md:w-auto md:bg-transparent md:border-none md:mt-0 md:flex-row md:p-0 md:items-end md:flex md:justify-between'>
          {buttonsConfig.map((item, idx) => {
            return (
              <Link href={item.link} key={idx}>
                <a
                  href={item.link}
                  className='relative z-40 inline-block w-auto h-full px-5 py-3 text-sm font-bold leading-none text-white transition-all transition duration-100 duration-300 bg-indigo-600 rounded shadow-md fold-bold sm:w-full lg:shadow-none hover:shadow-xl'
                >
                  {item.title}
                </a>
              </Link>
            );
          })}
        </div>
        <div
          onClick={() => setOpen(!isOpen)}
          className='absolute top-0 right-0 z-50 block w-6 mt-8 mr-10 cursor-pointer select-none md:hidden sm:mt-10'
        >
          <span className='block w-full h-1 mt-2 duration-200 transform bg-gray-800 rounded-full sm:mt-1' />
          <span className='block w-full h-1 mt-1 duration-200 transform bg-gray-800 rounded-full' />
        </div>
      </div>
    </div>
  );
}
