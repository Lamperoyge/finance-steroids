import Link from 'next/link';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useAuth } from 'context/AuthContext';
import withAuth from 'hocs/withAuth';
import Head from 'next/head';

const config = [
  {
    label: 'Name',
    type: 'name',
    name: 'name',
    placeholder: 'Enter your name',
  },
  {
    label: 'Email',
    type: 'email',
    name: 'email',
    placeholder: 'Enter your email',
  },

  {
    label: 'Password',
    type: 'password',
    name: 'password',
    placeholder: 'Password',
  },
  {
    label: 'Confirm password',
    type: 'password',
    name: 'confirm password',
    placeholder: 'Confirm Password',
  },
  {
    label: () => {
      return (
        <>
          I accept the <Link href={'/terms'}>Terms of Service</Link> and have
          read the <Link href='/privacy-policy'>Privacy Policy</Link>
        </>
      );
    },
    type: 'checkbox',
    name: 'termsAgreement',
  },
];

const schema = Yup.object({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
  name: Yup.string().required('How we should call you?').min('1'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  'confirm password': Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  termsAgreement: Yup.boolean().required(),
});

function SignUpPage() {
  const { signUp, logout, isAuthenticated } = useAuth();
  const handleAuth = (values) => {
    signUp(values);
  };
  return (
    <>
      <Head>
        <title>Floordle - NFT Analytics</title>
        <meta property='og:title' content='Floordle - NFT Analytics' />
        <meta name='twitter:title' content='Floordle - NFT Analytics' />
        <meta
          name='description'
          content='Track NFT collections price floors, create watchlists, sync your wallets and analyze metrics to gain valuable insights on your NFT portfolio with Floordle.'
        />
        <meta
          property='og:description'
          content='Track NFT collections price floors, create watchlists, sync your wallets and analyze metrics to gain valuable insights on your NFT portfolio with Floordle.'
        />
        <meta
          name='twitter:description'
          content='Track NFT collections price floors, create watchlists, sync your wallets and analyze metrics to gain valuable insights on your NFT portfolio with Floordle.'
        />
        <meta property='og:image' content={'/test1.svg'} />
        <meta name='twitter:image' content={'/test1.svg'} />
        <meta name='image' content={'/test1.svg'} />
      </Head>

      <div className='bg-indigo-600 h-full w-full flex flex-col'>
        <section className='bg-indigo-600 py-8 leading-7 text-gray-900 sm:py-12 md:py-16 lg:py-24'>
          <div className='box-border px-4 mx-auto drop-shadow-lg rounded-lg sm:px-6 md:px-6 lg:px-8 max-w-2xl bg-white'>
            <div className='flex flex-col items-start justify-center sm:justify-start items-center w-full h-full p-10 lg:p-16 xl:p-24'>
              <h4 className='w-full text-3xl font-bold text-center'>Sign up</h4>

              <div className='relative w-full mt-10 space-y-8'>
                <div className='relative'>
                  <Formik
                    initialValues={{ termsAgreement: true }}
                    validationSchema={schema}
                    onSubmit={handleAuth}
                  >
                    {({
                      values,
                      handleChange,
                      handleSubmit,
                      errors,
                      touched,
                      handleBlur,
                    }) => {
                      return (
                        <Form onSubmit={handleSubmit}>
                          {config.map((item, idx) => {
                            return (
                              <div key={idx} className='py-2'>
                                {item.type === 'checkbox' ? (
                                  <div className='flex'>
                                    <input
                                      id={idx}
                                      name={`${item.name}[]`}
                                      defaultValue={values[item.name]}
                                      type='checkbox'
                                      defaultChecked={values[item.name]}
                                      className='h-8 w-8 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500'
                                    />
                                    <label
                                      htmlFor={idx}
                                      className='ml-3 text-sm text-gray-500'
                                    >
                                      {item.label()}
                                    </label>
                                  </div>
                                ) : (
                                  <>
                                    {' '}
                                    <label className='font-medium text-gray-900'>
                                      {item.label}
                                    </label>
                                    <input
                                      {...item}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values[item.name]}
                                      className='block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50'
                                    />
                                  </>
                                )}

                                {errors[item.name] && touched[item.name] && (
                                  <span className='text-lg text-red-400'>
                                    {errors[item.name]}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                          <button
                            type='submit'
                            className='py-4 mt-5 inline-block w-full px-5 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease'
                          >
                            Create Account
                          </button>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>

                <div className='relative'>
                  <h1 className='text-lg py-10'>
                    Already registered?{' '}
                    <Link passHref href='/sign-in'>
                      <a className='cursor-pointer text-blue-600 underline decoration-blue-600 hover:decoration-blue-400 hover:text-blue:400'>
                        Sign in
                      </a>
                    </Link>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
export default withAuth(SignUpPage);
