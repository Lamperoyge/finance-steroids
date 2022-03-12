import { fetchEntries, getSingleEntryBySlug } from 'utils/contentfulPosts';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Head from 'next/head';
const Layout = dynamic(() => import('components/layout'));
const Post = dynamic(() => import('components/blog/Post'));
import Link from 'next/link';
import { serialize } from 'next-mdx-remote/serialize';

export default function PostPage({ post }) {
  const router = useRouter();
  if (!post) {
    router.push('/blog');
    return null;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        {post.description.trim() !== '' && (
          <meta
            name='description'
            content={post.description}
            key='description'
          />
        )}

        {post.keywords && post.keywords.length > 0 && (
          <meta name='keywords' content={keywords.join(',')} />
        )}
      </Head>
      <Layout>
        <section className='max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8'>
          <div className='w-full flex justify-center items-center flex-col'>
            <h1 className='font-bold text-4xl text-center text-gray-900'>
              {post.title}
            </h1>
            <span className='w-full text-center text-gray-600 mt-4'>
              {new Date(post.publishDate).toLocaleDateString()}
            </span>
            <div className='w-full py-8 flex justify-center items-center'>
              <img
                src={post.heroImage.fields.file.url}
                alt={post.heroImage.fields.description}
                className='w-full sm:w-1/2 h-auto rounded-xl'
              />
            </div>
            <Post post={post.body} />
            <section className='bg-white'>
              <div className='flex flex-col items-center justify-center px-5 py-20 mx-auto max-w-7xl md:px-0'>
                <div className='relative'>
                  <h1
                    className='relative text-5xl font-black text-transparent bg-center bg-cover bg-gradient-to-br from-indigo-400 via-indigo-600 to-indigo-500 lg:text-6xl bg-clip-text'
                    style={{
                      backgroundImage: "url('/colorful-bg.jpeg')",
                    }}
                  >
                    Join now.
                  </h1>
                </div>
                <p className='mt-3 text-xl text-gray-500 lg:text-2xl'>
                  Take control of your NFT investments with Floordle.
                </p>
                <div className='flex flex-col justify-center w-full mt-5 space-y-3 sm:space-x-3 sm:space-y-0 sm:flex-row lg:mt-8'>
                  <Link href='/sign-up'>
                    <button
                      type='button'
                      className='relative self-center inline-block w-auto px-8 py-4 mx-auto mt-0 font-bold text-white bg-indigo-600 border-t border-gray-200 rounded-md shadow-xl sm:mt-1 fold-bold lg:mx-0'
                    >
                      Join now!
                    </button>
                  </Link>
                  {/* {!isEmailSent && (
              <div className='w-full sm:w-1/2'>
                <input
                  className='py-2.5 px-4 mb-4 w-full bg-gray-50 border focus:ring-2 focus:ring-opacity-90 focus:ring-indigo-500 border-gray-300 rounded focus:outline-none'
                  type='email'
                  placeholder='Email address'
                  onChange={(e) => {
                    setEmailValue(e.target.value);
                    if (emailErrors) {
                      setEmailErrors('');
                    }
                  }}
                />
                <div className='flex flex-col justify-center items-center'>
                  {emailErrors && (
                    <span className='text-red-400'>{emailErrors}</span>
                  )}
                  <button
                    onClick={handleEmail}
                    className='relative self-center inline-block w-auto px-8 py-4 mx-auto mt-0 font-bold text-white bg-indigo-600 border-t border-gray-200 rounded-md shadow-xl sm:mt-1 fold-bold lg:mx-0'
                  >
                    Join the waitlist!
                  </button>
                </div>
              </div>
            )}{' '} */}
                </div>
              </div>
            </section>
          </div>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const entries = await fetchEntries();
  const posts = await entries.map((p) => p.fields);
  return { paths: posts.map((post) => `/blog/${post.slug}`), fallback: true };
}

export async function getStaticProps(ctx) {
  const slug = ctx.params.post[0];
  const entry = await getSingleEntryBySlug(slug);

  const source = entry.body;
  const mdxSource = await serialize(source);
  return {
    props: {
      post: { ...entry, body: mdxSource },
    },
  };
}
