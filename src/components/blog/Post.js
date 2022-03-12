import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';
const components = {
  h2: ({ children }) => (
    <h2 className='py-4 text-black text-center tracking-wide font-semibold text-xl'>
      {children}
    </h2>
  ),
  h1: ({ children }) => (
    <h2 className='py-4 text-black text-center tracking-wide font-semibold text-xl'>
      {children}
    </h2>
  ),
  img: (props) => (
    <img
      className='my-4 w-full h-auto rounded-xl w-full '
      src={props.src}
      alt={props.alt || 'blog image'}
    />
  ),
  p: ({ children }) => (
    <p className='tracking-wide py-2 leading-loose text-md text-black'>
      {children}
    </p>
  ),
  li: ({ children }) => (
    <li className='tracking-wide py-2 leading-loose text-black text-md'>
      {children}
    </li>
  ),
  ol: ({ children }) => <ol className='list-disc'>{children}</ol>,
  ul: ({ children }) => <ul className='ml-8 list-decimal'>{children}</ul>,
  a: (props) => (
    <Link href={props.href} passHref>
      <a className='block text-indigo-400 underline hover:text-indigo-500'>
        {props.children}
      </a>
    </Link>
  ),
};
export default function Post({ post }) {
  return (
    <div className='max-w-7xl px-8 w-full flex justify-center items-center flex-col'>
      <div className='w-full sm:w-1/2'>
        <MDXRemote {...post} components={components} />
      </div>
    </div>
  );
}
