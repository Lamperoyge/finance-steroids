import { fetchEntries } from 'utils/contentfulPosts';
import dynamic from 'next/dynamic';
const Link = dynamic(() => import('next/link'));
const Layout = dynamic(() => import('components/layout'));
export default function Blog({ posts }) {
  const featured = posts.find((i) => i.featured);
  const nonFeaturedPosts = posts.filter((i) => !i.featured);
  return (
    <Layout>
      <section className='bg-white'>
        <div className='w-full px-5 py-6 mx-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16 max-w-7xl'>
          {!!featured && (
            <div className='flex flex-col items-center sm:px-5 md:flex-row'>
              <div className='w-full md:w-1/2'>
                <Link passHref href={`/blog/${featured.slug}`}>
                  <a className='block'>
                    <img
                      className='object-cover w-full h-full rounded-lg max-h-64 sm:max-h-96'
                      src={featured.heroImage.fields.file.url}
                      alt={featured.heroImage.fields.description}
                    />
                  </a>
                </Link>
              </div>
              <div className='flex flex-col items-start justify-center w-full h-full py-6 mb-6 md:mb-0 md:w-1/2'>
                <div className='flex flex-col items-start justify-center h-full space-y-3 transform md:pl-10 lg:pl-16 md:space-y-5'>
                  {featured.tags?.map((tag, idx) => (
                    <div
                      key={idx}
                      className='bg-indigo-600 px-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-white'
                    >
                      <span className='block text-center'>{tag}</span>
                    </div>
                  ))}
                  <h1 className='hover:underline text-4xl font-bold leading-none lg:text-5xl xl:text-6xl'>
                    <Link passHref href={`/blog/${featured.slug}`}>
                      <a>{featured.title}</a>
                    </Link>
                  </h1>
                  <p className='pt-2 text-sm font-medium'>
                    by{' '}
                    <a className='mr-1 underline'>
                      {featured.author.fields.name}
                    </a>{' '}
                    ·
                    <span className='mx-1'>
                      {new Date(featured.publishDate).toLocaleDateString()}
                    </span>{' '}
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className='flex grid grid-cols-12 pb-10 sm:px-5 gap-x-8 gap-y-16'>
            {nonFeaturedPosts?.map((post) => (
              <div
                key={post.slug}
                className='flex flex-col items-start col-span-12 space-y-3 sm:col-span-6 xl:col-span-4'
              >
                <Link passHref href={`/blog/${post.slug}`}>
                  <a className='block'>
                    <img
                      className='object-cover w-full mb-2 overflow-hidden rounded-lg shadow-sm max-h-56'
                      src={post.heroImage.fields.file.url}
                      alt={post.heroImage.fields.description}
                    />
                  </a>
                </Link>
                {post.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className='bg-indigo-400 flex items-center px-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-white inline-block'
                  >
                    <span>{tag}</span>
                  </div>
                ))}
                <h2 className='text-lg font-bold sm:text-xl md:text-2xl'>
                  <Link passHref href={`/blog/${post.slug}`}>
                    <a>{post.title}</a>
                  </Link>
                </h2>
                <p className='text-sm text-gray-500'>{post.description}</p>
                <p className='pt-2 text-xs font-medium'>
                  <a className='mr-1 underline'>{post.author.fields.name}</a> ·
                  <span className='mx-1'>
                    {new Date(post.publishDate).toLocaleDateString()}
                  </span>{' '}
                  ·
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const res = await fetchEntries();
    const posts = await res.map((p) => p.fields);
    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
